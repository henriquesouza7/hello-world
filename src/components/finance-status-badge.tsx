import type { PurchaseStatus } from "../modules/financeiro/types";

const labels: Record<PurchaseStatus, string> = {
  REALIZADO: "Pedido realizado",
  FATURADO: "Faturado",
  RECEBIDO: "Recebido",
};

export function FinanceStatusBadge({ status }: { status: PurchaseStatus }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
      {labels[status]}
    </span>
  );
}
