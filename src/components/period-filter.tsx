export function PeriodFilter() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select defaultValue="2026" className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400">
        <option>2026</option>
        <option>2025</option>
      </select>
      <select defaultValue="09" className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400">
        <option value="09">Setembro</option>
        <option value="08">Agosto</option>
        <option value="07">Julho</option>
      </select>
    </div>
  );
}
