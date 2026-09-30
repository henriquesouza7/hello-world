import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "../components/module-page";
export const Route = createFileRoute("/financeiro/farmacia")({ component: () => <ModulePage title="Farmácia" description="Estrutura para controle financeiro e indicadores da farmácia." /> });
