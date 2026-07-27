type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tighter sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-7 text-slate-600">{description}</p>}
    </div>
  );
}
