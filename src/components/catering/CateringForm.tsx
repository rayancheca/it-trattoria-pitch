'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LOCATIONS, type LocationSlug } from '@/data/locations';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number required'),
  companyName: z.string().optional(),
  preferredLocation: z.enum(
    LOCATIONS.map((l) => l.slug) as [LocationSlug, ...LocationSlug[]],
  ),
  date: z.string().min(1, 'Date required'),
  headcount: z.coerce.number().int().positive('Must be at least 1'),
  packageSlug: z.string().optional(),
  dietaryNotes: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const STEPS = ['Event', 'Contact', 'Details', 'Review'] as const;

export function CateringForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      preferredLocation: 'miami-beach-collins',
      headcount: 20,
    },
  });

  async function next() {
    const fields: (keyof FormValues)[][] = [
      ['preferredLocation', 'date', 'headcount'],
      ['name', 'email', 'phone'],
      ['dietaryNotes', 'message'],
      [],
    ];
    const valid = await trigger(fields[step] as never);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(values: FormValues) {
    const res = await fetch('/api/catering', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-monogram text-carta p-8 lg:p-12 rounded-sm">
        <p className="label-it text-bergamot mb-3">Grazie</p>
        <h3 className="font-display text-3xl lg:text-4xl tracking-tight">
          We&rsquo;ll be in touch within 24 hours.
        </h3>
        <p className="mt-4 text-carta/85 text-pretty max-w-prose">
          Your inquiry is on its way to the catering team. For groups over 50 or anything
          within 48 hours, call your nearest trattoria directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-carta p-6 lg:p-10 rounded-sm border border-carta-deep">
      <ol className="flex flex-wrap gap-2 mb-8">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs label-it ${
              i === step ? 'bg-caffe text-carta' : i < step ? 'text-monogram border border-monogram' : 'text-caffe-mute border border-carta-deep'
            }`}
          >
            {String(i + 1).padStart(2, '0')} · {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="space-y-5">
          <legend className="font-display text-2xl mb-3">Where, when, how many.</legend>
          <Field label="Preferred location" error={errors.preferredLocation?.message}>
            <select
              {...register('preferredLocation')}
              className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta"
            >
              {LOCATIONS.map((l) => (
                <option key={l.slug} value={l.slug}>{l.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Date" error={errors.date?.message}>
            <input type="date" {...register('date')} className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
          </Field>
          <Field label="Headcount" error={errors.headcount?.message}>
            <input
              type="number"
              min={1}
              {...register('headcount', { valueAsNumber: true })}
              className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta num"
            />
          </Field>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="space-y-5">
          <legend className="font-display text-2xl mb-3">Who&rsquo;s asking?</legend>
          <Field label="Your name" error={errors.name?.message}>
            <input {...register('name')} className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input type="email" {...register('email')} className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input {...register('phone')} className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
          </Field>
          <Field label="Company (optional)" error={errors.companyName?.message}>
            <input {...register('companyName')} className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
          </Field>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="space-y-5">
          <legend className="font-display text-2xl mb-3">Anything we should know?</legend>
          <Field label="Dietary notes" error={errors.dietaryNotes?.message}>
            <input {...register('dietaryNotes')} placeholder="Vegetarian, gluten-free, allergies…" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
          </Field>
          <Field label="Message (optional)" error={errors.message?.message}>
            <textarea
              {...register('message')}
              rows={5}
              placeholder="Setup, drop-off vs on-site, anything we&apos;d miss otherwise."
              className="w-full p-3 border border-carta-deep rounded-sm bg-carta resize-y"
            />
          </Field>
        </fieldset>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-display text-2xl">Review</h3>
          <dl className="text-sm grid sm:grid-cols-2 gap-x-6 gap-y-2 text-caffe-soft">
            <dt className="label-it">Location</dt>
            <dd>{LOCATIONS.find((l) => l.slug === getValues('preferredLocation'))?.name}</dd>
            <dt className="label-it">Date</dt><dd>{getValues('date')}</dd>
            <dt className="label-it">Headcount</dt><dd>{getValues('headcount')}</dd>
            <dt className="label-it">Name</dt><dd>{getValues('name')}</dd>
            <dt className="label-it">Email</dt><dd>{getValues('email')}</dd>
            <dt className="label-it">Phone</dt><dd>{getValues('phone')}</dd>
          </dl>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="h-12 px-5 border border-caffe rounded-sm disabled:opacity-30"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="h-12 px-6 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sending…' : 'Submit inquiry'}
          </button>
        )}
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="block">
      <span className="label-it block mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1 text-sm text-peperoncino">{error}</span>}
    </label>
  );
}
