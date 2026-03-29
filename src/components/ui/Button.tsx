import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "purple";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-milos-blue to-milos-purple text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:brightness-110",
  secondary:
    "border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--text-tertiary)]",
  ghost:
    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]",
  purple:
    "bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:brightness-110",
};

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer text-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
