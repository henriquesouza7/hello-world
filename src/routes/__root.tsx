import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><div className="max-w-md text-center"><h1 className="text-7xl font-bold text-slate-900">404</h1><h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2><p className="mt-2 text-sm text-slate-500">A página solicitada não existe ou foi movida.</p><div className="mt-6"><Link to="/" className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">Voltar ao dashboard</Link></div></div></div>;
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><div className="max-w-md text-center"><h1 className="text-xl font-semibold">Não foi possível carregar esta página</h1><p className="mt-2 text-sm text-slate-500">Ocorreu um erro inesperado. Tente novamente.</p><div className="mt-6 flex justify-center gap-2"><button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">Tentar novamente</button><Link to="/" className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium">Dashboard</Link></div></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "Gestão Hospitalar | Administrativo" },
    { name: "description", content: "Sistema interno de gestão administrativa hospitalar." },
  ], links: [{ rel: "stylesheet", href: appCss }, { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }] }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
