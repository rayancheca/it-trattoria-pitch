'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Apple, ArrowLeft, CreditCard, Edit3, MapPin, Minus, Plus, Smartphone } from 'lucide-react';
import {
  useCart,
  selectSubtotalCents,
  selectCartCount,
  type CartLine,
} from '@/lib/cart/store';
import { recordOrder } from '@/lib/cart/history';
import { LOCATIONS, type LocationSlug } from '@/data/locations';
import { formatPrice } from '@/data/menu';

const TIP_PRESETS = [0, 15, 18, 22] as const;
type TipPreset = (typeof TIP_PRESETS)[number] | 'custom';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number required'),
  notes: z.string().optional(),
  pickupTime: z.string(),
  paymentMethod: z.enum(['apple-pay', 'google-pay', 'card']),
  // Card-only fields (mock — no real PCI surface in mockup)
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  cardZip: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function CheckoutClient() {
  const router = useRouter();
  const hasHydrated = useCart((s) => s.hasHydrated);
  const lines = useCart((s) => s.lines);
  const locationSlug = useCart((s) => s.locationSlug);
  const fulfillment = useCart((s) => s.fulfillment);
  const setFulfillment = useCart((s) => s.setFulfillment);
  const subtotal = useCart(selectSubtotalCents);
  const count = useCart(selectCartCount);
  const updateQty = useCart((s) => s.updateQuantity);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const loc = LOCATIONS.find((l) => l.slug === locationSlug);
  const taxRate = loc?.address.state === 'NY' ? 0.08875 : 0.07; // NY: 8.875%, FL: 7%
  const taxCents = Math.round(subtotal * taxRate);

  const [tip, setTip] = useState<TipPreset>(18);
  const [customTipCents, setCustomTipCents] = useState<number>(0);
  const tipCents =
    tip === 'custom' ? customTipCents : Math.round(subtotal * (tip / 100));
  const total = subtotal + taxCents + tipCents;

  // Redirect if cart empty after hydration — but NOT while submitting,
  // because clearCart() during submit would race against router.push to /confirmation.
  useEffect(() => {
    if (hasHydrated && count === 0 && !isSubmittingOrder) {
      router.replace('/order');
    }
  }, [hasHydrated, count, router, isSubmittingOrder]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      pickupTime: 'asap',
      paymentMethod: 'apple-pay',
    },
  });

  const paymentMethod = watch('paymentMethod');

  async function onSubmit(values: FormValues) {
    setIsSubmittingOrder(true);
    const orderId = `IT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const payload = {
      orderId,
      location: locationSlug,
      fulfillment,
      lines,
      subtotal,
      tax: taxCents,
      tip: tipCents,
      total,
      customer: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        notes: values.notes,
      },
      pickupTime: values.pickupTime,
      paymentMethod: values.paymentMethod,
    };

    // Mock POST to /api/orders. In production this would call Toast.
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Network is best-effort in the mockup. The order still "completes".
    }

    // Persist a summary to sessionStorage for the confirmation page.
    // The confirmation page is responsible for clearing the cart on mount —
    // doing it here races against the `count === 0 → redirect` effect above.
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('it:last-order', JSON.stringify(payload));
      // Also persist to localStorage so the Order Again rail can recall it.
      if (locationSlug) {
        recordOrder({
          orderId,
          placedAt: Date.now(),
          location: locationSlug as LocationSlug,
          fulfillment,
          lines,
          total,
        });
      }
    }
    router.push(`/order/confirmation?id=${orderId}`);
  }

  if (!hasHydrated) {
    return (
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="text-caffe-mute">Loading your cart…</p>
        </div>
      </section>
    );
  }
  if (count === 0) {
    return (
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="text-caffe-mute">Your cart is empty. Redirecting…</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-caffe text-carta">
        <div className="container-edge py-8 lg:py-10">
          <Link href="/order" className="inline-flex items-center gap-2 text-carta/70 hover:text-carta text-sm mb-4">
            <ArrowLeft size={14} aria-hidden />
            Back to menu
          </Link>
          <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)', lineHeight: 0.95 }}>
            Checkout
          </h1>
          {loc && (
            <p className="mt-4 flex items-center gap-2 text-carta/80">
              <MapPin size={14} aria-hidden />
              From <strong className="text-carta">{loc.shortName}</strong>
              <span className="text-carta/60">· {loc.address.line1}</span>
            </p>
          )}
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 space-y-10">
            {/* Express checkout — Sweetgreen / Apple HIG pattern: Apple Pay
                rendered first, full-width, above every other input. The
                single highest conversion lever per Phase-11 UX research. */}
            <section aria-label="Express checkout" className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="label-it">Express checkout</p>
                <span className="text-[10px] text-caffe-mute uppercase tracking-wider">Skip the form</span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  // Apple Pay fast-path: bypass form validation, use minimal
                  // guest contact, place order immediately.
                  setIsSubmittingOrder(true);
                  const orderId = `IT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
                  const payload = {
                    orderId,
                    location: locationSlug,
                    fulfillment,
                    lines,
                    subtotal,
                    tax: taxCents,
                    tip: Math.round(subtotal * 0.18),
                    total: subtotal + taxCents + Math.round(subtotal * 0.18),
                    customer: { name: 'Apple Pay guest', email: 'guest@apple-pay.itr', phone: '+15555550100', notes: '' },
                    pickupTime: 'asap',
                    paymentMethod: 'apple-pay' as const,
                  };
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('it:last-order', JSON.stringify(payload));
                    if (locationSlug) {
                      recordOrder({
                        orderId,
                        placedAt: Date.now(),
                        location: locationSlug as LocationSlug,
                        fulfillment,
                        lines,
                        total: payload.total,
                      });
                    }
                  }
                  await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
                  router.push(`/order/confirmation?id=${orderId}`);
                }}
                className="w-full h-14 bg-caffe text-carta rounded-sm font-medium text-base flex items-center justify-center gap-2 hover:bg-monogram transition-colors"
              >
                <Apple size={20} aria-hidden />
                <span>Pay with Apple Pay · {formatPrice(subtotal + taxCents + Math.round(subtotal * 0.18))}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  // Google Pay fast-path
                  setValue('paymentMethod', 'google-pay');
                  setValue('name', 'Google Pay guest');
                  setValue('email', 'guest@google-pay.itr');
                  setValue('phone', '+15555550100');
                  handleSubmit(onSubmit)();
                }}
                className="w-full h-12 bg-carta-deep text-caffe rounded-sm font-medium text-sm flex items-center justify-center gap-2 hover:bg-carta hover:border-caffe border border-transparent transition-colors"
              >
                <Smartphone size={16} aria-hidden />
                <span>Pay with Google Pay</span>
              </button>
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-carta-deep" />
                <span className="text-xs text-caffe-mute">or fill in the details below</span>
                <div className="flex-1 h-px bg-carta-deep" />
              </div>
            </section>

            {/* Fulfillment + time */}
            <fieldset className="space-y-5">
              <legend className="label-it mb-2">01 · Fulfillment</legend>
              <div className="flex border border-carta-deep rounded-sm overflow-hidden text-sm w-fit">
                <button
                  type="button"
                  onClick={() => setFulfillment('pickup')}
                  className={`px-5 py-2.5 transition-colors ${fulfillment === 'pickup' ? 'bg-caffe text-carta' : 'text-caffe-soft hover:text-caffe'}`}
                >
                  Pickup at {loc?.shortName ?? 'location'}
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillment('delivery')}
                  className={`px-5 py-2.5 transition-colors ${fulfillment === 'delivery' ? 'bg-caffe text-carta' : 'text-caffe-soft hover:text-caffe'}`}
                >
                  Delivery
                </button>
              </div>

              {/* Chipotle-style pickup-time picker — ASAP card on top, then
                  "Schedule" expands to day chips + time-slot grid. */}
              <PickupTimePicker
                value={watch('pickupTime')}
                onChange={(v) => setValue('pickupTime', v)}
              />
            </fieldset>

            {/* Contact */}
            <fieldset className="space-y-5">
              <legend className="label-it mb-2">02 · Contact</legend>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your name" error={errors.name?.message}>
                  <input {...register('name')} autoComplete="name" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input {...register('phone')} type="tel" autoComplete="tel" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
                </Field>
              </div>
              <Field label="Email" error={errors.email?.message}>
                <input {...register('email')} type="email" autoComplete="email" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
              </Field>
              <Field label="Notes for the kitchen (optional)" error={errors.notes?.message}>
                <input {...register('notes')} placeholder="Allergies, extra napkins, leaving from the back door…" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
              </Field>
            </fieldset>

            {/* Tip */}
            <fieldset className="space-y-3">
              <legend className="label-it mb-2">03 · Tip</legend>
              <div className="flex flex-wrap gap-2">
                {TIP_PRESETS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTip(t)}
                    className={`h-11 px-4 rounded-sm border text-sm transition-colors ${
                      tip === t ? 'bg-caffe text-carta border-caffe' : 'border-carta-deep hover:border-caffe'
                    }`}
                  >
                    {t === 0 ? 'No tip' : `${t}%`}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setTip('custom')}
                  className={`h-11 px-4 rounded-sm border text-sm transition-colors ${
                    tip === 'custom' ? 'bg-caffe text-carta border-caffe' : 'border-carta-deep hover:border-caffe'
                  }`}
                >
                  Custom
                </button>
              </div>
              {tip === 'custom' && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-caffe-mute">$</span>
                  <input
                    type="number"
                    step="0.50"
                    min={0}
                    value={(customTipCents / 100).toFixed(2)}
                    onChange={(e) => setCustomTipCents(Math.max(0, Math.round(Number(e.target.value) * 100)))}
                    className="w-28 h-11 px-3 border border-carta-deep rounded-sm bg-carta num"
                  />
                </div>
              )}
              <p className="text-xs text-caffe-mute">
                100% of the tip goes to the team that made your food.
              </p>
            </fieldset>

            {/* Payment */}
            <fieldset className="space-y-4">
              <legend className="label-it mb-2">04 · Payment</legend>
              <div className="grid sm:grid-cols-3 gap-2">
                <PaymentChoice
                  active={paymentMethod === 'apple-pay'}
                  onClick={() => setValue('paymentMethod', 'apple-pay')}
                  label="Apple Pay"
                  icon={<Apple size={18} aria-hidden />}
                />
                <PaymentChoice
                  active={paymentMethod === 'google-pay'}
                  onClick={() => setValue('paymentMethod', 'google-pay')}
                  label="Google Pay"
                  icon={<Smartphone size={18} aria-hidden />}
                />
                <PaymentChoice
                  active={paymentMethod === 'card'}
                  onClick={() => setValue('paymentMethod', 'card')}
                  label="Card"
                  icon={<CreditCard size={18} aria-hidden />}
                />
              </div>
              {paymentMethod === 'card' && (
                <div className="grid sm:grid-cols-6 gap-3 pt-2">
                  <Field label="Card number" error={errors.cardNumber?.message} className="sm:col-span-6">
                    <input {...register('cardNumber')} placeholder="4242 4242 4242 4242" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta num" />
                  </Field>
                  <Field label="Expiry" error={errors.cardExpiry?.message} className="sm:col-span-2">
                    <input {...register('cardExpiry')} placeholder="MM / YY" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta num" />
                  </Field>
                  <Field label="CVC" error={errors.cardCvc?.message} className="sm:col-span-2">
                    <input {...register('cardCvc')} placeholder="123" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta num" />
                  </Field>
                  <Field label="ZIP" error={errors.cardZip?.message} className="sm:col-span-2">
                    <input {...register('cardZip')} placeholder="33139" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta num" />
                  </Field>
                </div>
              )}
              <p className="text-xs text-caffe-mute">
                Mockup: payments are stubbed. Production uses Toast + Apple/Google Pay
                + Stripe via Toast Online Ordering. See HANDOFF.md.
              </p>
            </fieldset>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-peperoncino text-carta rounded-sm font-medium text-lg hover:bg-peperoncino-soft transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Placing your order…' : `Place order · ${formatPrice(total)}`}
            </button>
          </form>

          {/* Order summary */}
          <aside className="lg:col-span-5">
            <div className="bg-carta-deep rounded-sm p-6 sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <p className="label-it">Il tuo ordine · Your order</p>
                <Link href="/order" className="text-xs link-editorial inline-flex items-center gap-1">
                  <Edit3 size={12} aria-hidden /> Edit
                </Link>
              </div>
              <ul className="divide-y divide-carta">
                {lines.map((l) => (
                  <SummaryLine key={l.id} line={l} updateQty={updateQty} />
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-carta space-y-2 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label={`Tax (${(taxRate * 100).toFixed(loc?.address.state === 'NY' ? 3 : 0)}%)`} value={formatPrice(taxCents)} />
                <Row label="Tip" value={formatPrice(tipCents)} />
                <div className="pt-3 mt-3 border-t border-carta flex justify-between items-baseline">
                  <span className="label-it">Total</span>
                  <span className="num font-display text-3xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, error, children, className }: FieldProps) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="label-it mb-2 block">{label}</span>
      {children}
      {error && <span className="block mt-1 text-sm text-peperoncino">{error}</span>}
    </label>
  );
}

interface PaymentChoiceProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

function PaymentChoice({ active, onClick, label, icon }: PaymentChoiceProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-14 flex items-center justify-center gap-2 rounded-sm border-2 text-sm font-medium transition-colors ${
        active ? 'bg-caffe text-carta border-caffe' : 'border-carta-deep hover:border-caffe'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

interface SummaryLineProps {
  line: CartLine;
  updateQty: (id: string, q: number) => void;
}

function SummaryLine({ line, updateQty }: SummaryLineProps) {
  return (
    <li className="py-3 flex items-start gap-3">
      <div className="inline-flex items-center border border-carta rounded-sm">
        <button
          type="button"
          onClick={() => updateQty(line.id, line.quantity - 1)}
          aria-label="Decrease"
          className="w-7 h-7 inline-flex items-center justify-center hover:text-peperoncino"
        >
          <Minus size={12} />
        </button>
        <span className="num text-sm w-6 text-center">{line.quantity}</span>
        <button
          type="button"
          onClick={() => updateQty(line.id, line.quantity + 1)}
          aria-label="Increase"
          className="w-7 h-7 inline-flex items-center justify-center hover:text-peperoncino"
        >
          <Plus size={12} />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-base tracking-tight truncate">{line.name}</p>
        {line.notes && <p className="text-xs text-caffe-mute">{line.notes}</p>}
      </div>
      <p className="num text-sm">{formatPrice(line.unitPriceCents * line.quantity)}</p>
    </li>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-caffe-soft">{label}</span>
      <span className="num">{value}</span>
    </div>
  );
}

interface PickupTimePickerProps {
  value: string;
  onChange: (v: string) => void;
}

function PickupTimePicker({ value, onChange }: PickupTimePickerProps) {
  const isAsap = value === 'asap' || !value;
  const [scheduledOpen, setScheduledOpen] = useState(!isAsap);
  const [day, setDay] = useState<'today' | 'tomorrow'>('today');

  // Build a row of 15-min slots from the next quarter-hour to close-time.
  const slots = useMemo(() => {
    const now = new Date();
    const minutes = now.getMinutes();
    const round = Math.ceil((minutes + 30) / 15) * 15; // start ≥30min out, rounded to next 15
    const out: { label: string; iso: string }[] = [];
    const start = new Date(now);
    start.setMinutes(round, 0, 0);
    if (day === 'tomorrow') {
      start.setDate(start.getDate() + 1);
      start.setHours(11, 0, 0, 0);
    }
    for (let i = 0; i < 16; i++) {
      const t = new Date(start.getTime() + i * 15 * 60 * 1000);
      const h = t.getHours();
      const m = t.getMinutes();
      const period = h >= 12 ? 'pm' : 'am';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const label = m === 0 ? `${h12}${period}` : `${h12}:${String(m).padStart(2, '0')}${period}`;
      out.push({ label, iso: t.toISOString() });
    }
    return out;
  }, [day]);

  return (
    <div className="space-y-3">
      <p className="label-it mb-1">When</p>
      <button
        type="button"
        onClick={() => {
          setScheduledOpen(false);
          onChange('asap');
        }}
        className={`w-full p-5 border-2 rounded-sm text-left transition-colors ${
          isAsap && !scheduledOpen
            ? 'border-peperoncino bg-monogram-tint'
            : 'border-carta-deep hover:border-caffe'
        }`}
      >
        <div className="flex items-baseline justify-between">
          <p className="font-display text-xl tracking-tight">ASAP</p>
          <p className="text-xs label-it text-peperoncino">Ready in 12–15 min</p>
        </div>
        <p className="text-sm text-caffe-soft mt-1">We start prepping as soon as you confirm.</p>
      </button>
      <button
        type="button"
        onClick={() => setScheduledOpen((v) => !v)}
        className={`w-full p-5 border-2 rounded-sm text-left transition-colors ${
          scheduledOpen ? 'border-peperoncino bg-monogram-tint' : 'border-carta-deep hover:border-caffe'
        }`}
      >
        <div className="flex items-baseline justify-between">
          <p className="font-display text-xl tracking-tight">Schedule for later</p>
          <p className="text-xs label-it text-caffe-mute">{scheduledOpen ? 'Picking a time' : 'Tap to pick'}</p>
        </div>
        <p className="text-sm text-caffe-soft mt-1">Choose a day and a time, up to 7 days out.</p>
      </button>
      {scheduledOpen && (
        <div className="border border-carta-deep rounded-sm p-4 bg-carta space-y-4">
          <div className="flex gap-2">
            {(['today', 'tomorrow'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                className={`h-10 px-4 rounded-sm text-sm font-medium transition-colors ${
                  day === d ? 'bg-caffe text-carta' : 'border border-carta-deep hover:border-caffe'
                }`}
              >
                {d === 'today' ? 'Today' : 'Tomorrow'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {slots.map((s) => (
              <button
                key={s.iso}
                type="button"
                onClick={() => onChange(s.iso)}
                className={`h-10 text-sm border rounded-sm transition-colors num ${
                  value === s.iso ? 'bg-caffe text-carta border-caffe' : 'border-carta-deep hover:border-caffe'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
