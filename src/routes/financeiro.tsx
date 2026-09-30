import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "../components/module-page";
export const Route = createFileRoute("/financeiro")({ component: () => <ModulePage title="Financeiro" description="Consolidação administrativa das áreas financeiras do hospital." /> });
