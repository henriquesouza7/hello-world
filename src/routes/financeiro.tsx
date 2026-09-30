import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { AppShell } from "../components/app-shell";
import { ModulePage } from "../components/module-page";

export const Route = createFileRoute("/financeiro")({ component: Financeiro });

function Financeiro() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isOverview = pathname === "/financeiro";
  return (
    <AppShell>
      {isOverview ? (
        <ModulePage title="Financeiro" description="Consolidação administrativa das áreas financeiras do hospital." withShell={false} />
      ) : null}
      <Outlet />
    </AppShell>
  );
}
