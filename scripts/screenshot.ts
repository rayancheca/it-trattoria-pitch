/**
 * Screenshot capture for the pitch deck.
 *
 * Usage: pnpm start (in another terminal) then `pnpm exec tsx scripts/screenshot.ts`
 *
 * Captures every key page at two viewports:
 *   desktop 1440x900
 *   mobile  390x844
 *
 * Outputs to /pitch/screenshots/{desktop,mobile}/<route>.png
 */

import { chromium, type Browser, type Page } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = process.env.SCREENSHOT_BASE ?? 'http://localhost:3055';
const OUT_ROOT = join(process.cwd(), 'pitch', 'screenshots');

interface Route {
  path: string;
  slug: string;
  scrollOnly?: boolean;
}

const ROUTES: Route[] = [
  { path: '/', slug: '01-home' },
  { path: '/menu', slug: '02-menu' },
  { path: '/menu/paccheri-alla-calabrese', slug: '03-menu-item-paccheri' },
  { path: '/menu/builder', slug: '04-menu-builder' },
  { path: '/regions', slug: '05-regions' },
  { path: '/regions/calabria', slug: '06-regions-calabria' },
  { path: '/story', slug: '07-story' },
  { path: '/locations', slug: '08-locations' },
  { path: '/locations/miami-beach/collins', slug: '09-location-collins' },
  { path: '/locations/nyc/midtown-7th', slug: '10-location-7th' },
  { path: '/catering', slug: '11-catering' },
  { path: '/order', slug: '12-order' },
  { path: '/journal', slug: '13-journal' },
  { path: '/journal/why-bergamot-only-grows-in-calabria', slug: '14-journal-bergamot' },
  { path: '/press', slug: '15-press' },
  { path: '/careers', slug: '16-careers' },
  { path: '/not-a-real-page', slug: '99-404' },
];

const VIEWPORTS: { name: 'desktop' | 'mobile'; width: number; height: number; deviceScaleFactor: number }[] = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 2 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2 },
];

async function capture(browser: Browser, route: Route, viewport: (typeof VIEWPORTS)[number]) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
    // Allow motion (we want post-animation states); the production runtime
    // still respects each user's prefers-reduced-motion via Framer Motion.
  });
  const page: Page = await context.newPage();
  try {
    await page.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    // Let fonts settle
    await page.waitForTimeout(900);

    // Scroll through the full page in chunks to trigger whileInView animations
    // before the full-page screenshot is taken. Then return to top.
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    const step = viewport.height * 0.7;
    for (let y = 0; y < bodyHeight; y += step) {
      await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' as ScrollBehavior }), y);
      await page.waitForTimeout(220);
    }
    // Scroll back to top and let one more frame settle
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
    await page.waitForTimeout(400);

    const outDir = join(OUT_ROOT, viewport.name);
    await mkdir(outDir, { recursive: true });
    const out = join(outDir, `${route.slug}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log(`✓ ${viewport.name.padEnd(7)} ${route.path.padEnd(50)} → ${out}`);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error(`✗ ${viewport.name.padEnd(7)} ${route.path}: ${msg}`);
  } finally {
    await context.close();
  }
}

async function main() {
  console.log(`Starting screenshot capture against ${BASE}\n`);
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of VIEWPORTS) {
      console.log(`\n— ${viewport.name} ${viewport.width}×${viewport.height} —`);
      for (const route of ROUTES) {
        await capture(browser, route, viewport);
      }
    }
  } finally {
    await browser.close();
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
