import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  city: z.string().optional(),
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

  // Mockup: no-op. Production: Klaviyo or Customer.io.
  return NextResponse.json({ ok: true });
}
