import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  companyName: z.string().optional(),
  preferredLocation: z.string(),
  date: z.string(),
  headcount: z.coerce.number().int().positive(),
  packageSlug: z.string().optional(),
  dietaryNotes: z.string().optional(),
  message: z.string().optional(),
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

  // Mockup: stub. Production: route to office.florida@it-trattoria.com / NYC equivalent.
  return NextResponse.json({ ok: true });
}
