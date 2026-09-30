# Sistema de Gestão Administrativa Hospitalar

Sistema administrativo interno para centralizar controles hoje distribuídos em planilhas, facilitar lançamentos e gerar indicadores, gráficos, comparações e histórico.

## Estado atual
- Fundação visual e navegação implementadas.
- Migration PostgreSQL inicial em `supabase/migrations/0001_initial_schema.sql`.
- Financeiro iniciado com domínio tipado, dados demonstrativos, tabela reutilizável e telas de Farmácia, Laboratório e Feira.
- Supabase ainda não conectado ao frontend.
- Nenhum dado real do hospital é usado nas telas demonstrativas.

## Próximas etapas
1. Conectar/configurar Supabase e executar migrations.
2. Consolidar UI base, estados de loading/empty/error e formulários.
3. Financeiro: fornecedores, produtos, pedidos, itens, notas fiscais, histórico de preços, comparações e indicadores.
4. Importação de XML de NF-e com revisão antes da confirmação.
5. Internações.
6. Produção Hospitalar e importação de relatórios SUS.
7. Pequenas Cirurgias, capacidade e fila.
8. Dashboard Geral baseado nos dados transacionais.
9. Segurança, RLS, auditoria, LGPD e homologação.

## Regra de desenvolvimento
Seguir o contexto oficial do projeto, não inventar regras do hospital quando ainda não definidas e implementar incrementalmente, testando, revisando e versionando cada etapa.
