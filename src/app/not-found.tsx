import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section bg-caffe text-carta min-h-[80svh] flex items-center">
      <div className="container-edge">
        <p className="label-it text-bergamot mb-4">404</p>
        <h1
          className="font-display tracking-tight text-balance max-w-3xl"
          style={{ fontSize: 'var(--text-display)' }}
        >
          That page isn&rsquo;t on the menu.
        </h1>
        <p className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
          Maybe you wanted the actual menu, or a location, or the story of how we got
          here. We can help with all three.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors">
            Back to home
          </Link>
          <Link href="/menu" className="inline-flex items-center justify-center h-12 px-6 border border-carta rounded-sm hover:bg-carta hover:text-caffe transition-colors">
            Browse the menu
          </Link>
          <Link href="/locations" className="inline-flex items-center justify-center h-12 px-6 border border-carta rounded-sm hover:bg-carta hover:text-caffe transition-colors">
            Find a trattoria
          </Link>
        </div>
      </div>
    </section>
  );
}
