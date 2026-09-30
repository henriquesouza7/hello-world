import type { LucideIcon } from "lucide-react";

export function KpiCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: LucideIcon }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <Icon className="size-5" />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-400">{helper}</p>
    </section>
  );
}
