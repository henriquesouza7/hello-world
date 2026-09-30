import { CalendarRange, Plus } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "../components/data-table";
import { PageHeader } from "../components/page-header";
import { PeriodFilter } from "../components/period-filter";
import { demoFairExpenses } from "../modules/financeiro/mock-data";
import type { FairExpense } from "../modules/financeiro/types";

export const Route = createFileRoute("/financeiro/feira")({ component: Feira });

function Feira() {
  return (
    <>
      <PageHeader
        title="Feira"
        description="Controle mensal simplificado de despesas da feira."
        actions={<><PeriodFilter /><button type="button" className="inline-flex h-9 items-center gap-2 rounded-md bg-slate-900 px-3 text-sm font-medium text-white"><Plus className="size-4" /> Novo lançamento</button></>}
      />
      <div className="mb-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        Dados demonstrativos para validação da interface. Nenhum lançamento abaixo representa despesa real do hospital.
      </div>
      <DataTable<FairExpense>
        rows={demoFairExpenses}
        columns={[
          { key: "competence", header: "Competência", render: (row) => row.competence },
          { key: "date", header: "Data", render: (row) => new Date(\`\${row.date}T12:00:00\`).toLocaleDateString("pt-BR") },
          { key: "supplier", header: "Fornecedor/local", render: (row) => row.supplierOrLocation ?? "—" },
          { key: "notes", header: "Observações", render: (row) => row.notes ?? "—" },
          { key: "total", header: "Valor", align: "right", render: (row) => row.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) },
        ]}
      />
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <CalendarRange className="size-5 text-slate-400" />
        <span>O modelo mantém competência, valor e histórico mensal sem criar controle de itens desnecessário.</span>
      </div>
    </>
  );
}
