import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "../components/module-page";
export const Route = createFileRoute("/internacoes")({ component: () => <ModulePage title="Internações Hospitalares" description="Base para acompanhamento mensal, anual, metas, produção médica e comparativos." /> });
