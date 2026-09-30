import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "../components/module-page";
export const Route = createFileRoute("/pequenas-cirurgias")({ component: () => <ModulePage title="Pequenas Cirurgias" description="Base para agenda, pacientes, fila de espera e capacidade variável por data." /> });
