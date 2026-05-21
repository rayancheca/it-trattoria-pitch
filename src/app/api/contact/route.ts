import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  topic: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  phone: z.string().optional(),
  region: z.string().optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    payload = await request.json();
  } else {
    const formData = await request.formData();
    payload = Object.fromEntries(formData);
  }

  const result = schema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json({ ok: false, errors: result.error.flatten() }, { status: 400 });
  }

  // Production: route by topic to email service (Resend/Postmark).
  // Mockup: no-op + 200.
  // (logger placeholder — replace with production logger in HANDOFF.md)

  return NextResponse.json({ ok: true });
}
