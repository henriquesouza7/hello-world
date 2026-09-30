import { Clock3 } from "lucide-react";
import { AppShell } from "./app-shell";
import { PageHeader } from "./page-header";

export function ModulePage({ title, description, withShell = true }: { title: string; description: string; withShell?: boolean }) {
  const content = (
    <>
      <PageHeader title={title} description={description} />
      <div className="grid gap-4 md:grid-cols-3">
        {["Visão geral", "Registros", "Indicadores"].map((label) => (
          <div key={label} className="rounded-xl border border-dashed border-slate-300 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Clock3 className="size-4 text-slate-400" />
              {label}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Estrutura preparada para a próxima etapa de implementação deste módulo.
            </p>
            <span className="mt-4 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">Em preparação</span>
          </div>
        ))}
      </div>
    </>
  );
  return withShell ? <AppShell>{content}</AppShell> : content;
}
