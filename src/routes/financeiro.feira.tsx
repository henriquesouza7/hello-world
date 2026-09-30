import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "../components/module-page";
export const Route = createFileRoute("/financeiro/feira")({ component: () => <ModulePage title="Feira" description="Estrutura para controle financeiro e indicadores da feira." /> });
