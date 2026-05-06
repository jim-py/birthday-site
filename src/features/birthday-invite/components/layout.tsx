import type { ElementType, ReactNode } from "react";

export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`relative flex-shrink-0 ${className}`}>{children}</div>;
}

export function SectionCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 lg:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black/10 p-4 shadow-lg shadow-black/10 sm:gap-4">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
        <Icon className="h-4 w-4 text-pink-200" />
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</div>
        <div className="mt-1 truncate text-base font-medium text-white/92">{value}</div>
      </div>
    </div>
  );
}

export function FeatureLine({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 shadow-lg shadow-black/10">
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-300" />
      <div>
        <div className="font-medium text-white">{title}</div>
        <div className="mt-1 text-sm leading-6 text-white/65">{text}</div>
      </div>
    </div>
  );
}