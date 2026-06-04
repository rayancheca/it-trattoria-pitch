import { NextResponse } from 'next/server';
import { z } from 'zod';

const lineSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  itemSlug: z.string(),
  name: z.string(),
  unitPriceCents: z.number(),
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
  region: z.string(),
  photo: z.string().optional(),
});

const schema = z.object({
  orderId: z.string(),
  location: z.string(),
  fulfillment: z.enum(['pickup', 'delivery']),
  lines: z.array(lineSchema).min(1),
  subtotal: z.number().int().nonnegative(),
  tax: z.number().int().nonnegative(),
  tip: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(7),
    notes: z.string().optional(),
  }),
  pickupTime: z.string(),
  paymentMethod: z.enum(['apple-pay', 'google-pay', 'card']),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const result = schema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json({ ok: false, errors: result.error.flatten() }, { status: 400 });
  }

  // Mockup: no-op. Production:
  // 1. POST to Toast Online Ordering API to create the order
  // 2. Send customer email/SMS via Resend or Twilio
  // 3. Forward to kitchen printer
  // 4. Track in Klaviyo for future marketing

  return NextResponse.json({ ok: true, orderId: result.data.orderId });
}
