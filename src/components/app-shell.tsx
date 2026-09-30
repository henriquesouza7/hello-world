import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FlaskConical,
  LayoutDashboard,
  Menu,
  Settings,
  Stethoscope,
  Wallet,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  {
    label: "Financeiro",
    icon: Wallet,
    children: [
      { label: "Visão geral", to: "/financeiro" },
      { label: "Farmácia", to: "/financeiro/farmacia" },
      { label: "Laboratório", to: "/financeiro/laboratorio" },
      { label: "Feira", to: "/financeiro/feira" },
    ],
  },
  { label: "Internações", to: "/internacoes", icon: ClipboardList },
  { label: "Produção Hospitalar", to: "/producao-hospitalar", icon: BarChart3 },
  { label: "Pequenas Cirurgias", to: "/pequenas-cirurgias", icon: Stethoscope },
  { label: "Configurações", to: "/configuracoes", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Activity className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">Gestão Hospitalar</span>
              <span className="block text-[11px] text-slate-500">Administrativo</span>
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
            <X className="size-5 text-slate-500" />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            if ("children" in item) {
              const open = pathname.startsWith("/financeiro");
              return (
                <div key={item.label} className="pt-2">
                  <div className="flex items-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Icon className="size-4" />
                    {item.label}
                    <ChevronDown className={`ml-auto size-4 transition-transform ${open ? "rotate-0" : "-rotate-90"}`} />
                  </div>
                  {open && (
                    <div className="ml-4 space-y-0.5 border-l border-slate-200 pl-2">
                      {item.children.map((child) => (
                        <NavLink key={child.to} to={child.to} active={pathname === child.to} onClick={() => setMobileOpen(false)}>
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <NavLink key={item.to} to={item.to} active={pathname === item.to} onClick={() => setMobileOpen(false)} icon={<Icon className="size-4" />}>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold">AD</div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">Administrador</p>
                <p className="truncate text-[11px] text-slate-500">Acesso interno</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen && <button className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu" />}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-8">
          <button className="mr-3 rounded-md p-2 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <Menu className="size-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 sm:block">Sistema interno</span>
            <div className="flex size-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold">AD</div>
          </div>
        </header>
        <main className="min-h-[calc(100vh-4rem)] p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function NavLink({ to, active, icon, children, onClick }: { to: string; active: boolean; icon?: ReactNode; children: ReactNode; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-slate-900 font-medium text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}
    >
      {icon ?? <span className="size-1.5 rounded-full bg-current opacity-50" />}
      {children}
    </Link>
  );
}

export const moduleIcons = { FlaskConical, CreditCard };
