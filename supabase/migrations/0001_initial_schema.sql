-- Sistema de Gestão Administrativa Hospitalar
-- Migration inicial: estrutura relacional preparada para Supabase/PostgreSQL.
-- Nenhum dado real do hospital é inserido nesta migration.

create table if not exists setores (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists fornecedores (
  id uuid primary key default gen_random_uuid(),
  razao_social text not null,
  nome_fantasia text,
  cnpj text,
  telefone text,
  email text,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists fornecedores_cnpj_unique
  on fornecedores (cnpj)
  where cnpj is not null;

create table if not exists produtos (
  id uuid primary key default gen_random_uuid(),
  setor_id uuid references setores(id),
  nome text not null,
  principio_ativo text,
  concentracao text,
  apresentacao text,
  embalagem text,
  unidade text not null,
  quantidade_por_embalagem numeric(12,3),
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists produtos_nome_idx on produtos (nome);
create index if not exists produtos_setor_idx on produtos (setor_id);

create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  setor_id uuid not null references setores(id),
  fornecedor_id uuid not null references fornecedores(id),
  data_pedido date not null,
  data_nota_fiscal date,
  numero_nota_fiscal text,
  chave_nfe text,
  desconto numeric(14,2) not null default 0 check (desconto >= 0),
  frete numeric(14,2) not null default 0 check (frete >= 0),
  status text not null default 'REALIZADO'
    check (status in ('REALIZADO', 'FATURADO', 'RECEBIDO')),
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pedidos_data_idx on pedidos (data_pedido);
create index if not exists pedidos_fornecedor_idx on pedidos (fornecedor_id);
create index if not exists pedidos_setor_idx on pedidos (setor_id);

create unique index if not exists pedidos_chave_nfe_unique
  on pedidos (chave_nfe)
  where chave_nfe is not null;

create table if not exists pedido_itens (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references pedidos(id) on delete restrict,
  produto_id uuid not null references produtos(id) on delete restrict,
  quantidade numeric(12,3) not null check (quantidade > 0),
  unidade text not null,
  preco_unitario numeric(14,4) not null check (preco_unitario >= 0),
  subtotal numeric(14,2) generated always as (round(quantidade * preco_unitario, 2)) stored,
  created_at timestamptz not null default now()
);

create index if not exists pedido_itens_pedido_idx on pedido_itens (pedido_id);
create index if not exists pedido_itens_produto_idx on pedido_itens (produto_id);

create table if not exists notas_fiscais (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid references pedidos(id) on delete set null,
  chave_acesso text,
  numero text,
  data_emissao date,
  arquivo_path text,
  mime_type text,
  origem text not null default 'MANUAL'
    check (origem in ('MANUAL', 'XML', 'PDF', 'OCR')),
  status_importacao text not null default 'PENDENTE'
    check (status_importacao in ('PENDENTE', 'REVISAR', 'CONFIRMADA', 'REJEITADA')),
  dados_extraidos jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists notas_fiscais_chave_unique
  on notas_fiscais (chave_acesso)
  where chave_acesso is not null;

create table if not exists medicos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lancamentos_ih (
  id uuid primary key default gen_random_uuid(),
  medico_id uuid not null references medicos(id),
  data date not null,
  quantidade integer not null check (quantidade >= 0),
  observacao text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lancamentos_ih_data_idx on lancamentos_ih (data);
create index if not exists lancamentos_ih_medico_idx on lancamentos_ih (medico_id);

create table if not exists metas_ih (
  id uuid primary key default gen_random_uuid(),
  ano integer not null check (ano >= 2000),
  mes integer check (mes between 1 and 12),
  medico_id uuid references medicos(id),
  quantidade_meta integer not null check (quantidade_meta >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (ano, mes, medico_id)
);

create table if not exists categorias_procedimentos (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists tipos_procedimentos (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid not null references categorias_procedimentos(id),
  nome text not null,
  codigo text,
  unidade_contagem text not null default 'UNIDADE',
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  unique (categoria_id, nome)
);

create table if not exists importacoes_producao (
  id uuid primary key default gen_random_uuid(),
  arquivo_nome text not null,
  tipo_arquivo text not null,
  origem text not null,
  competencia_ano integer,
  competencia_mes integer check (competencia_mes between 1 and 12),
  status text not null default 'PENDENTE'
    check (status in ('PENDENTE', 'PROCESSANDO', 'REVISAR', 'CONFIRMADA', 'REJEITADA')),
  quantidade_registros integer not null default 0 check (quantidade_registros >= 0),
  quantidade_erros integer not null default 0 check (quantidade_erros >= 0),
  hash_arquivo text,
  detalhes jsonb,
  created_at timestamptz not null default now()
);

create table if not exists lancamentos_producao (
  id uuid primary key default gen_random_uuid(),
  procedimento_id uuid not null references tipos_procedimentos(id),
  competencia_ano integer not null check (competencia_ano >= 2000),
  competencia_mes integer not null check (competencia_mes between 1 and 12),
  quantidade integer not null check (quantidade >= 0),
  importacao_id uuid references importacoes_producao(id),
  origem text not null default 'MANUAL'
    check (origem in ('MANUAL', 'IMPORTACAO')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (procedimento_id, competencia_ano, competencia_mes, importacao_id)
);

create index if not exists lancamentos_producao_competencia_idx
  on lancamentos_producao (competencia_ano, competencia_mes);

create table if not exists pacientes (
  id uuid primary key default gen_random_uuid(),
  nome_completo text not null,
  telefone text,
  observacoes_administrativas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists dias_cirurgia (
  id uuid primary key default gen_random_uuid(),
  data date not null unique,
  capacidade integer not null default 10 check (capacidade >= 0),
  observacoes text,
  status text not null default 'PLANEJADO'
    check (status in ('PLANEJADO', 'REALIZADO', 'CANCELADO')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists dias_cirurgia_data_idx on dias_cirurgia (data);

create table if not exists agendamentos_cirurgicos (
  id uuid primary key default gen_random_uuid(),
  dia_cirurgia_id uuid not null references dias_cirurgia(id),
  paciente_id uuid not null references pacientes(id),
  status text not null default 'AGUARDANDO_CONFIRMACAO'
    check (status in ('CONFIRMADO', 'AGUARDANDO_CONFIRMACAO', 'CANCELADO')),
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists agendamentos_cirurgicos_dia_idx
  on agendamentos_cirurgicos (dia_cirurgia_id);

create table if not exists fila_espera (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references pacientes(id),
  data_solicitacao date not null default current_date,
  status text not null default 'AGUARDANDO'
    check (status in ('AGUARDANDO', 'AGUARDANDO_CONTATO', 'AGENDADO', 'DESISTENCIA', 'CANCELADO')),
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists fila_espera_status_data_idx
  on fila_espera (status, data_solicitacao);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  action text not null,
  module text not null,
  entity text not null,
  entity_id uuid,
  previous_data jsonb,
  new_data jsonb,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_module_created_idx
  on audit_log (module, created_at desc);

-- Observação:
-- RLS, políticas de acesso, triggers de auditoria e regras transacionais
-- específicas (como limite concorrente de vagas cirúrgicas) serão implementados
-- nas etapas de Segurança e Pequenas Cirurgias, conforme o plano oficial.
