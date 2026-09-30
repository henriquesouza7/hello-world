import { useState } from "react";
import type { FairExpense } from "../modules/financeiro/types";

export function FinanceFairForm({ onSubmit, onCancel }: { onSubmit: (expense: FairExpense) => void; onCancel: () => void }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [competence, setCompetence] = useState(new Date().toISOString().slice(0, 7).replace("-", "/"));
  const [supplierOrLocation, setSupplierOrLocation] = useState("");
  const [total, setTotal] = useState("");
  const [notes, setNotes] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!total) return;

    const supplier = supplierOrLocation.trim();
    const trimmedNotes = notes.trim();
    onSubmit({
      id: `fair-${Date.now()}`,
      date,
      competence,
      total: Number(total),
      ...(supplier ? { supplierOrLocation: supplier } : {}),
      ...(trimmedNotes ? { notes: trimmedNotes } : {}),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <form onSubmit={submit} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Novo lançamento</h2>
          <p className="mt-1 text-xs text-slate-500">Cadastro demonstrativo local. Ainda não grava no banco.</p>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Data
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Competência
            <input value={competence} onChange={(event) => setCompetence(event.target.value)} placeholder="09/2026" className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Fornecedor/local
            <input value={supplierOrLocation} onChange={(event) => setSupplierOrLocation(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Valor
            <input required min="0" step="0.01" type="number" value={total} onChange={(event) => setTotal(event.target.value)} className="mt-1 h-10 w-full rounded-md border border-slate-300 px-3 text-sm" />
          </label>
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Observações
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
          <button type="button" onClick={onCancel} className="h-9 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700">Cancelar</button>
          <button type="submit" className="h-9 rounded-md bg-slate-900 px-4 text-sm font-medium text-white">Adicionar demonstração</button>
        </div>
      </form>
    </div>
  );
}
