import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { AppShell } from "../components/app-shell";
import { FinancePage } from "../components/finance-page";

export const Route = createFileRoute("/financeiro")({ component: Financeiro });

function Financeiro() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isOverview = pathname === "/financeiro";

  return (
    <AppShell>
      {isOverview ? <FinancePage /> : null}
      <Outlet />
    </AppShell>
  );
}
