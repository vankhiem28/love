"use client";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) => (
  <div className="text-center">
    <p className="text-xs uppercase tracking-[0.45em] text-[#b07a8a]">
      {eyebrow}
    </p>
    <h2 className="font-display mt-3 text-3xl font-semibold text-[#4b2b36] md:text-4xl">
      {title}
    </h2>
    {subtitle ? (
      <p className="mt-3 text-base text-[#73515f] md:text-lg">{subtitle}</p>
    ) : null}
  </div>
);
