import { FileText, Package, ReceiptText, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { KpiCard } from "./kpi-card";
import { PageHeader } from "./page-header";
import { PeriodFilter } from "./period-filter";

export function FinancePage() {
  return (
    <>
      <PageHeader
        title="Financeiro"
        description="Consolidação administrativa das áreas de Farmácia, Laboratório e Feira."
        actions={<PeriodFilter />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Gastos no mês" value="R$ 34.145,50" helper="Demonstração — sem dados reais." icon={ReceiptText} />
        <KpiCard label="Pedidos no mês" value="3" helper="Demonstração — sem dados reais." icon={FileText} />
        <KpiCard label="Fornecedores ativos" value="3" helper="Demonstração — sem dados reais." icon={Package} />
        <KpiCard label="Variação mensal" value="—" helper="Cálculo será conectado aos dados transacionais." icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <FinanceModuleLink to="/financeiro/farmacia" title="Farmácia" description="Compras, notas fiscais, preços e fornecedores." />
        <FinanceModuleLink to="/financeiro/laboratorio" title="Laboratório" description="Materiais, reagentes, compras e histórico." />
        <FinanceModuleLink to="/financeiro/feira" title="Feira" description="Lançamentos mensais e evolução dos gastos." />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold">Próximas análises</h2>
        <p className="mt-1 text-sm text-slate-500">
          A estrutura já separa dados transacionais de indicadores. Comparações de preços e histórico serão calculados a partir dos itens das compras, sem sobrescrever preços históricos.
        </p>
      </div>
    </>
  );
}

function FinanceModuleLink({ to, title, description }: { to: "/financeiro/farmacia" | "/financeiro/laboratorio" | "/financeiro/feira"; title: string; description: string }) {
  return (
    <Link to={to} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </Link>
  );
}
