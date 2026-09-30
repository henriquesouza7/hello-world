import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "../components/module-page";
export const Route = createFileRoute("/configuracoes")({ component: () => <ModulePage title="Configurações" description="Estrutura reservada para parâmetros do sistema e administração de acesso." /> });
