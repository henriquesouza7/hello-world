import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "../components/module-page";

export const Route = createFileRoute("/producao-hospitalar")({
  component: () => (
    <ModulePage
      title="Produção Hospitalar"
      description="Base para procedimentos, indicadores e futura importação de produção SUS."
    />
  ),
});
