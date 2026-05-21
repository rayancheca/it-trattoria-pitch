/**
 * Press logo cloud — every quote here is a [PLACEHOLDER — DO NOT PUBLISH UNTIL
 * VERIFIED]. Per the brief: do NOT attribute invented quotes to real publications.
 * The logos shown are aspirational targets, not earned coverage. Documented in
 * QUESTIONS.md and surfaced in /press as a clear placeholder set.
 */
const PUBLICATIONS = [
  'Eater Miami',
  'Time Out NY',
  'The Infatuation',
  'New York Times',
  'Miami Herald',
  'Vogue Italia',
];

export function PressLogoCloud() {
  return (
    <section className="section-tight bg-cartaDeep border-y border-carta" aria-labelledby="press-heading">
      <div className="container-edge">
        <p id="press-heading" className="label-it mb-8 text-center">
          Press · Stampa · <span className="text-caffe-mute italic normal-case tracking-normal text-xs">(placeholder targets — see /press)</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {PUBLICATIONS.map((p) => (
            <p
              key={p}
              className="font-display text-xl lg:text-2xl tracking-tight text-caffe-mute hover:text-caffe transition-colors cursor-default"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
