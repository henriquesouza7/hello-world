import { Activity, ArrowRight, CalendarDays, ClipboardList, FileText, Wallet } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "../components/app-shell";
import { KpiCard } from "../components/kpi-card";
import { PageHeader } from "../components/page-header";
import { PeriodFilter } from "../components/period-filter";

export const Route = createFileRoute("/")({ component: Dashboard });

function Dashboard() {
  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
        description="Visão geral administrativa do hospital."
        actions={<PeriodFilter />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Despesas no mês" value="R$ —" helper="Dados reais serão conectados posteriormente." icon={Wallet} />
        <KpiCard label="Internações no mês" value="—" helper="Indicador demonstrativo." icon={ClipboardList} />
        <KpiCard label="Procedimentos no mês" value="—" helper="Indicador demonstrativo." icon={Activity} />
        <KpiCard label="Próxima cirurgia" value="—" helper="Agenda ainda não conectada." icon={CalendarDays} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Produção e movimentação</h2>
              <p className="mt-1 text-sm text-slate-500">Área reservada para gráficos e comparativos.</p>
            </div>
            <BarPlaceholder />
          </div>
          <div className="mt-6 flex h-56 items-end gap-3 rounded-lg bg-slate-50 p-5">
            {[34, 52, 43, 67, 58, 76, 61, 82, 70, 88, 64, 74].map((height, i) => (
              <div key={i} className="flex h-full flex-1 items-end">
                <div className="w-full rounded-t bg-slate-300" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Visual demonstrativo — sem dados reais.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold">Acessos rápidos</h2>
          <div className="mt-4 space-y-2">
            <QuickLink to="/financeiro" label="Abrir financeiro" icon={Wallet} />
            <QuickLink to="/internacoes" label="Consultar internações" icon={ClipboardList} />
            <QuickLink to="/producao" label="Ver produção hospitalar" icon={FileText} />
            <QuickLink to="/pequenas-cirurgias" label="Agenda de pequenas cirurgias" icon={CalendarDays} />
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100"><Activity className="size-5" /></div>
          <div>
            <h2 className="text-base font-semibold">Fundação do sistema</h2>
            <p className="text-sm text-slate-500">Navegação, identidade visual e estrutura modular já preparadas.</p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function BarPlaceholder() {
  return <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">Demo</span>;
}

function QuickLink({ to, label, icon: Icon }: { to: string; label: string; icon: typeof Wallet }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">
      <Icon className="size-4 text-slate-500" />
      <span className="flex-1">{label}</span>
      <ArrowRight className="size-4 text-slate-400" />
    </Link>
  );
}
