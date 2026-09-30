/* eslint-disable */
// @ts-nocheck
// Generated route tree. Keep synchronized with the file-based routes.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as FinanceiroRouteImport } from './routes/financeiro'
import { Route as FarmaciaRouteImport } from './routes/financeiro.farmacia'
import { Route as LaboratorioRouteImport } from './routes/financeiro.laboratorio'
import { Route as FeiraRouteImport } from './routes/financeiro.feira'
import { Route as InternacoesRouteImport } from './routes/internacoes'
import { Route as ProducaoRouteImport } from './routes/producao'
import { Route as PequenasCirurgiasRouteImport } from './routes/pequenas-cirurgias'
import { Route as ConfiguracoesRouteImport } from './routes/configuracoes'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const FinanceiroRoute = FinanceiroRouteImport.update({ id: '/financeiro', path: '/financeiro', getParentRoute: () => rootRouteImport } as any)
const FarmaciaRoute = FarmaciaRouteImport.update({ id: '/financeiro/farmacia', path: '/farmacia', getParentRoute: () => FinanceiroRoute } as any)
const LaboratorioRoute = LaboratorioRouteImport.update({ id: '/financeiro/laboratorio', path: '/laboratorio', getParentRoute: () => FinanceiroRoute } as any)
const FeiraRoute = FeiraRouteImport.update({ id: '/financeiro/feira', path: '/feira', getParentRoute: () => FinanceiroRoute } as any)
const InternacoesRoute = InternacoesRouteImport.update({ id: '/internacoes', path: '/internacoes', getParentRoute: () => rootRouteImport } as any)
const ProducaoRoute = ProducaoRouteImport.update({ id: '/producao', path: '/producao', getParentRoute: () => rootRouteImport } as any)
const PequenasCirurgiasRoute = PequenasCirurgiasRouteImport.update({ id: '/pequenas-cirurgias', path: '/pequenas-cirurgias', getParentRoute: () => rootRouteImport } as any)
const ConfiguracoesRoute = ConfiguracoesRouteImport.update({ id: '/configuracoes', path: '/configuracoes', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/financeiro': typeof FinanceiroRoute
  '/financeiro/farmacia': typeof FarmaciaRoute
  '/financeiro/laboratorio': typeof LaboratorioRoute
  '/financeiro/feira': typeof FeiraRoute
  '/internacoes': typeof InternacoesRoute
  '/producao': typeof ProducaoRoute
  '/pequenas-cirurgias': typeof PequenasCirurgiasRoute
  '/configuracoes': typeof ConfiguracoesRoute
}
export interface FileRoutesByTo extends FileRoutesByFullPath {}
export interface FileRoutesById extends FileRoutesByFullPath {
  __root__: typeof rootRouteImport
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: keyof FileRoutesByFullPath
  fileRoutesByTo: FileRoutesByTo
  to: keyof FileRoutesByTo
  id: '__root__' | keyof FileRoutesByFullPath
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  FinanceiroRoute: typeof FinanceiroRoute
  InternacoesRoute: typeof InternacoesRoute
  ProducaoRoute: typeof ProducaoRoute
  PequenasCirurgiasRoute: typeof PequenasCirurgiasRoute
  ConfiguracoesRoute: typeof ConfiguracoesRoute
}

const financeiroRouteChildren = {
  FarmaciaRoute,
  LaboratorioRoute,
  FeiraRoute,
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute,
  FinanceiroRoute,
  InternacoesRoute,
  ProducaoRoute,
  PequenasCirurgiasRoute,
  ConfiguracoesRoute,
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/financeiro': { id: '/financeiro'; path: '/financeiro'; fullPath: '/financeiro'; preLoaderRoute: typeof FinanceiroRouteImport; parentRoute: typeof rootRouteImport }
    '/financeiro/farmacia': { id: '/financeiro/farmacia'; path: '/farmacia'; fullPath: '/financeiro/farmacia'; preLoaderRoute: typeof FarmaciaRouteImport; parentRoute: typeof FinanceiroRoute }
    '/financeiro/laboratorio': { id: '/financeiro/laboratorio'; path: '/laboratorio'; fullPath: '/financeiro/laboratorio'; preLoaderRoute: typeof LaboratorioRouteImport; parentRoute: typeof FinanceiroRoute }
    '/financeiro/feira': { id: '/financeiro/feira'; path: '/feira'; fullPath: '/financeiro/feira'; preLoaderRoute: typeof FeiraRouteImport; parentRoute: typeof FinanceiroRoute }
    '/internacoes': { id: '/internacoes'; path: '/internacoes'; fullPath: '/internacoes'; preLoaderRoute: typeof InternacoesRouteImport; parentRoute: typeof rootRouteImport }
    '/producao': { id: '/producao'; path: '/producao'; fullPath: '/producao'; preLoaderRoute: typeof ProducaoRouteImport; parentRoute: typeof rootRouteImport }
    '/pequenas-cirurgias': { id: '/pequenas-cirurgias'; path: '/pequenas-cirurgias'; fullPath: '/pequenas-cirurgias'; preLoaderRoute: typeof PequenasCirurgiasRouteImport; parentRoute: typeof rootRouteImport }
    '/configuracoes': { id: '/configuracoes'; path: '/configuracoes'; fullPath: '/configuracoes'; preLoaderRoute: typeof ConfiguracoesRouteImport; parentRoute: typeof rootRouteImport }
  }
}

FinanceiroRoute._addFileChildren(financeiroRouteChildren)
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}
