import { PackageSearch, Plus } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "../components/data-table";
import { FinanceStatusBadge } from "../components/finance-status-badge";
import { PageHeader } from "../components/page-header";
import { PeriodFilter } from "../components/period-filter";
import { demoPurchases } from "../modules/financeiro/mock-data";
import type { Purchase } from "../modules/financeiro/types";

export const Route = createFileRoute("/financeiro/farmacia")({ component: Farmacia });

function Farmacia() {
  const rows = demoPurchases.filter((purchase) => purchase.area === "FARMACIA");

  return (
    <>
      <PageHeader
        title="Farmácia"
        description="Compras de medicamentos e materiais médico-hospitalares."
        actions={<><PeriodFilter /><button type="button" className="inline-flex h-9 items-center gap-2 rounded-md bg-slate-900 px-3 text-sm font-medium text-white"><Plus className="size-4" /> Novo pedido</button></>}
      />
      <div className="mb-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-500">
        Dados demonstrativos para validação da interface. Nenhum lançamento abaixo representa compra real do hospital.
      </div>
      <DataTable<Purchase>
        rows={rows}
        columns={[
          { key: "date", header: "Data", render: (row) => new Date(\`\${row.orderDate}T12:00:00\`).toLocaleDateString("pt-BR") },
          { key: "supplier", header: "Fornecedor", render: (row) => <span className="font-medium text-slate-900">{row.supplier.name}</span> },
          { key: "invoice", header: "Nota fiscal", render: (row) => row.invoiceNumber ?? "—" },
          { key: "status", header: "Status", render: (row) => <FinanceStatusBadge status={row.status} /> },
          { key: "items", header: "Itens", render: (row) => row.items.length },
          { key: "total", header: "Total", align: "right", render: (row) => row.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) },
        ]}
      />
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <PackageSearch className="size-5 text-slate-400" />
        <span>Próxima camada: cadastro de produtos, fornecedores, pedidos e importação/revisão de NF-e.</span>
      </div>
    </>
  );
}
