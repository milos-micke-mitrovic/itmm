export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] ${className}`}
    >
      {children}
    </h2>
  );
}
