/**
 * End-to-end smoke test of the ordering flow.
 * Pre-flight check before pushing to Vercel — we don't ship a broken cart.
 *
 * Usage: pnpm start --port 3055  (in another terminal)
 *        pnpm exec tsx scripts/test-order-flow.ts
 */

import { chromium, type Page } from 'playwright';

const BASE = process.env.TEST_BASE ?? 'http://localhost:3055';

interface Step {
  name: string;
  ok: boolean;
  details?: string;
}

const results: Step[] = [];

function record(name: string, ok: boolean, details?: string) {
  results.push({ name, ok, details });
  const tag = ok ? '✓' : '✗';
  console.log(`${tag} ${name}${details ? ` — ${details}` : ''}`);
}

async function step(page: Page, name: string, fn: () => Promise<void>) {
  try {
    await fn();
    record(name, true);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    record(name, false, msg);
    await page.screenshot({ path: `/tmp/it-test-fail-${name.replace(/\W+/g, '-')}.png`, fullPage: true });
  }
}

async function main() {
  console.log(`Testing against ${BASE}\n`);
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('  [browser-error]', msg.text());
  });

  // ───── 1. Homepage loads ─────
  await step(page, 'Homepage loads', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForSelector('h1', { timeout: 15000 });
  });

  // ───── 2. Navigate to /order ─────
  await step(page, '/order page renders', async () => {
    await page.goto(`${BASE}/order`, { waitUntil: 'networkidle' });
    await page.waitForSelector('h1', { timeout: 15000 });
  });

  // ───── 3. Location picker is open (auto-opens on first visit) ─────
  await step(page, 'Location picker auto-opens', async () => {
    await page.waitForSelector('[role="dialog"][aria-label="Pick a trattoria"]', { timeout: 5000 });
  });

  // ───── 4. Pick the Collins location ─────
  await step(page, 'Pick Collins location', async () => {
    const button = page.locator('button:has(h3:has-text("Collins"))').first();
    await button.click();
    await page.waitForSelector('[role="dialog"][aria-label="Pick a trattoria"]', { state: 'hidden', timeout: 5000 });
  });

  // ───── 5. Order header shows the picked location ─────
  await step(page, 'Order header shows Collins', async () => {
    const h1 = page.locator('h1').first();
    const txt = await h1.textContent({ timeout: 5000 });
    if (!txt || !txt.includes('Collins')) {
      throw new Error(`H1 did not contain "Collins": "${txt}"`);
    }
  });

  // ───── 6. Add an item to cart ─────
  await step(page, 'Add Paccheri to cart', async () => {
    // Find the row for "Paccheri alla Calabrese" and click Add
    const row = page.locator('article:has(h3:has-text("Paccheri alla Calabrese"))').first();
    await row.locator('button:has-text("Add")').first().click();
    // Cart drawer should auto-open
    await page.waitForSelector('[role="dialog"][aria-label="Your order"]', { timeout: 5000 });
  });

  // ───── 7. Cart shows the item + subtotal ─────
  await step(page, 'Cart shows Paccheri', async () => {
    const drawer = page.locator('[role="dialog"][aria-label="Your order"]');
    await drawer.locator('text=Paccheri alla Calabrese').waitFor({ timeout: 5000 });
  });

  // ───── 8. Add another item via the +/- quantity ─────
  await step(page, 'Increase quantity to 2', async () => {
    const drawer = page.locator('[role="dialog"][aria-label="Your order"]');
    await drawer.locator('button[aria-label="Increase quantity"]').first().click();
    const qty = await drawer.locator('span.num').first().textContent();
    if (!qty || !qty.trim().startsWith('2')) {
      throw new Error(`Expected qty 2, got "${qty}"`);
    }
  });

  // ───── 9. Proceed to checkout ─────
  await step(page, 'Click Checkout button', async () => {
    const drawer = page.locator('[role="dialog"][aria-label="Your order"]');
    await drawer.locator('a:has-text("Checkout")').click();
    await page.waitForURL(/\/order\/checkout/, { timeout: 10000 });
    await page.waitForSelector('h1:has-text("Checkout")', { timeout: 5000 });
  });

  // ───── 10. Fill checkout form ─────
  await step(page, 'Fill checkout form', async () => {
    await page.fill('input[name="name"]', 'Rayan Test');
    await page.fill('input[name="phone"]', '305-555-0100');
    await page.fill('input[name="email"]', 'test@example.com');
  });

  // ───── 11. Place order ─────
  await step(page, 'Place order', async () => {
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/order\/confirmation/, { timeout: 15000 });
  });

  // ───── 12. Confirmation page renders ─────
  await step(page, 'Confirmation page shows thanks + order id', async () => {
    const h1 = page.locator('h1').first();
    const txt = await h1.textContent({ timeout: 5000 });
    if (!txt || !txt.toLowerCase().includes('thanks')) {
      throw new Error(`Confirmation H1 did not contain "thanks": "${txt}"`);
    }
    // Order ID format IT-XXXXX shows up
    await page.locator('text=/Order #IT-/').waitFor({ timeout: 5000 });
  });

  // ───── 13. Cart is now empty (page reload + /order) ─────
  await step(page, 'Cart cleared after order', async () => {
    await page.goto(`${BASE}/order`, { waitUntil: 'networkidle' });
    // The header now says "Ordering from Collins" (location persisted)
    const h1Txt = await page.locator('h1').first().textContent({ timeout: 5000 });
    if (!h1Txt || !h1Txt.includes('Collins')) {
      throw new Error(`Expected location persisted: "${h1Txt}"`);
    }
    // Cart count badge in nav should not be visible
    const badge = page.locator('header button[aria-label*="Cart"] span.num');
    const visible = await badge.isVisible().catch(() => false);
    if (visible) {
      throw new Error('Cart badge still visible after order — cart not cleared');
    }
  });

  await browser.close();

  console.log('\n— Summary —');
  const pass = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok).length;
  console.log(`${pass} passed, ${fail} failed`);
  if (fail > 0) {
    console.log('\nFailed steps:');
    results.filter((r) => !r.ok).forEach((r) => console.log(`  ✗ ${r.name} — ${r.details ?? ''}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
