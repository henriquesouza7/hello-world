import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "../components/module-page";
export const Route = createFileRoute("/financeiro/laboratorio")({ component: () => <ModulePage title="Laboratório" description="Estrutura para controle financeiro e indicadores do laboratório." withShell={false} /> });
