import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-milos-blue to-milos-purple bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-4">
        Lost in the digital void
      </h2>
      <p className="text-[var(--text-secondary)] mb-8 max-w-md">
        This page doesn&apos;t exist. But your future website could.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-milos-blue to-milos-purple text-white font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
      >
        Back to safety
      </Link>
    </div>
  );
}
