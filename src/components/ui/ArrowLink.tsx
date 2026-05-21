import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function ArrowLink({ href, children, className, external = false }: Props) {
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        'group inline-flex items-baseline gap-1.5 text-caffe',
        'font-medium tracking-tight',
        className,
      )}
    >
      <span className="link-editorial">{children}</span>
      <ArrowUpRight
        size={16}
        aria-hidden
        className="translate-y-[0.1em] transition-transform duration-300 ease-[var(--ease-default)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
