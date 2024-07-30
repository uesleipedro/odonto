-- Database: postgres

-- DROP DATABASE IF EXISTS postgres;

CREATE DATABASE postgres
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE postgres
    IS 'default administrative connection database';
    
-- SCHEMA: odonto

-- DROP SCHEMA IF EXISTS odonto ;

CREATE SCHEMA IF NOT EXISTS odonto
    AUTHORIZATION admin;

GRANT ALL ON SCHEMA odonto TO admin;

-- Table: odonto.agenda

-- DROP TABLE IF EXISTS odonto.agenda;

CREATE TABLE IF NOT EXISTS odonto.agenda
(
    id_agenda integer NOT NULL DEFAULT nextval('odonto.agenda_id_agenda_seq1'::regclass),
    id_empresa integer,
    id_paciente integer,
    id_profissional integer,
    start timestamp without time zone,
    "end" timestamp without time zone,
    obs text COLLATE pg_catalog."default",
    id_metodo_pagamento integer,
    total_pagamento_servico double precision,
    desconto double precision,
    status integer,
    descricao character varying COLLATE pg_catalog."default",
    dia_inteiro boolean,
    CONSTRAINT id_agenda PRIMARY KEY (id_agenda)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.agenda
    OWNER to admin;

GRANT ALL ON TABLE odonto.agenda TO admin;

-- Table: odonto.anamnese

-- DROP TABLE IF EXISTS odonto.anamnese;

CREATE TABLE IF NOT EXISTS odonto.anamnese
(
    id_anamnese integer NOT NULL DEFAULT nextval('odonto.anamnese_id_anamnese_seq'::regclass),
    id_paciente integer,
    doenca boolean,
    descricao_doenca character varying(100) COLLATE pg_catalog."default",
    gravidez boolean,
    mes_gravidez integer,
    uso_medicacao boolean,
    descricao_medicacoes text COLLATE pg_catalog."default",
    nome_medico_assistente character varying(100) COLLATE pg_catalog."default",
    telefone_medico_assistente character varying(20) COLLATE pg_catalog."default",
    alergia boolean,
    descricao_alergia character varying(244) COLLATE pg_catalog."default",
    fuma boolean,
    bebe boolean,
    pratica_exercicio boolean,
    ja_foi_operado boolean,
    descricao_operacao text COLLATE pg_catalog."default",
    problema_anestesia boolean,
    problema_hemorragia boolean,
    doenca_reumatica boolean,
    problema_cardiaco boolean,
    problema_renal boolean,
    problema_gastrico boolean,
    problema_alergico boolean,
    problemas_articulares_reumatismo boolean,
    diabetes boolean,
    hipertensao boolean,
    outra boolean,
    descricao_outra character varying(100) COLLATE pg_catalog."default",
    problema_cicatrizacao boolean,
    tratamento_medico boolean,
    historico_familiar_doenca boolean,
    descricao_historico_familiar_doenca character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.anamnese
    OWNER to admin;
    
-- Table: odonto.contas_receber

-- DROP TABLE IF EXISTS odonto.contas_receber;

CREATE TABLE IF NOT EXISTS odonto.contas_receber
(
    id_pagamento integer,
    nr_parcela integer,
    valor double precision,
    dt_vencimento date,
    status character varying COLLATE pg_catalog."default",
    id_paciente integer,
    id_empresa integer,
    dt_recebimento date
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.contas_receber
    OWNER to admin;
    
-- Table: odonto.empresa

-- DROP TABLE IF EXISTS odonto.empresa;

CREATE TABLE IF NOT EXISTS odonto.empresa
(
    id_empresa integer NOT NULL DEFAULT nextval('odonto.empresa_id_empresa_seq1'::regclass),
    razao_social character varying COLLATE pg_catalog."default",
    nome_fantasia character varying COLLATE pg_catalog."default",
    cnpj_cpf character varying(14) COLLATE pg_catalog."default",
    telefone character varying COLLATE pg_catalog."default",
    logo character varying COLLATE pg_catalog."default",
    CONSTRAINT pk_id_empresa PRIMARY KEY (id_empresa)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.empresa
    OWNER to admin;

GRANT ALL ON TABLE odonto.empresa TO admin;

-- Table: odonto.faces_dente

-- DROP TABLE IF EXISTS odonto.faces_dente;

CREATE TABLE IF NOT EXISTS odonto.faces_dente
(
    dente character varying COLLATE pg_catalog."default" NOT NULL,
    face character(1) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.faces_dente
    OWNER to admin;
    
-- Table: odonto.orcamento

-- DROP TABLE IF EXISTS odonto.orcamento;

CREATE TABLE IF NOT EXISTS odonto.orcamento
(
    id_orcamento integer NOT NULL DEFAULT nextval('odonto.orcamento_id_orcamento_seq'::regclass),
    id_empresa integer,
    id_profissional integer,
    id_paciente integer,
    preco double precision,
    date date,
    status character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.orcamento
    OWNER to admin;
    
-- Table: odonto.paciente

-- DROP TABLE IF EXISTS odonto.paciente;

CREATE TABLE IF NOT EXISTS odonto.paciente
(
    id_paciente integer NOT NULL DEFAULT nextval('odonto.paciente_id_paciente_seq1'::regclass),
    nome character varying(100) COLLATE pg_catalog."default",
    cpf character varying(11) COLLATE pg_catalog."default",
    telefone_fixo character varying(100) COLLATE pg_catalog."default",
    telefone_movel character varying(100) COLLATE pg_catalog."default",
    dt_nascimento date,
    rg character varying(30) COLLATE pg_catalog."default",
    sexo character(1) COLLATE pg_catalog."default",
    estado_civil character varying(15) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    plano_saude character varying(100) COLLATE pg_catalog."default",
    numero_carteirinha character varying(100) COLLATE pg_catalog."default",
    nome_responsavel character varying(100) COLLATE pg_catalog."default",
    telefone_responsavel character varying(100) COLLATE pg_catalog."default",
    email_responsavel character varying(100) COLLATE pg_catalog."default",
    id_empresa integer,
    inserted_at date
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.paciente
    OWNER to admin;

GRANT ALL ON TABLE odonto.paciente TO admin;

-- Table: odonto.pagamento

-- DROP TABLE IF EXISTS odonto.pagamento;

CREATE TABLE IF NOT EXISTS odonto.pagamento
(
    id_pagamento integer NOT NULL DEFAULT nextval('odonto.pagamento_id_pagamento_seq'::regclass),
    id_orcamento integer,
    tipo_desconto character varying COLLATE pg_catalog."default",
    valor_desconto double precision,
    quantidade_parcelas integer,
    data_primeiro_vencimento date,
    entrada double precision,
    data_pagamento date,
    id_empresa integer,
    valor_total double precision,
    status character varying COLLATE pg_catalog."default",
    id_paciente integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.pagamento
    OWNER to admin;
    
-- Table: odonto.procedimento

-- DROP TABLE IF EXISTS odonto.procedimento;

CREATE TABLE IF NOT EXISTS odonto.procedimento
(
    id_procedimento integer NOT NULL DEFAULT nextval('odonto.newtable_id_procedimento_seq'::regclass),
    dente character varying COLLATE pg_catalog."default",
    estado character varying(13) COLLATE pg_catalog."default",
    observacao text COLLATE pg_catalog."default",
    id_profissional integer,
    face_dente character varying COLLATE pg_catalog."default",
    adicionado date,
    preco double precision,
    id_procedimento_list integer,
    id_paciente integer,
    orcado boolean,
    id_empresa integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.procedimento
    OWNER to admin;

GRANT ALL ON TABLE odonto.procedimento TO admin;

-- Table: odonto.procedimento_list

-- DROP TABLE IF EXISTS odonto.procedimento_list;

CREATE TABLE IF NOT EXISTS odonto.procedimento_list
(
    id_procedimento integer NOT NULL DEFAULT nextval('odonto.procedimento_list_id_procedimento_seq1'::regclass),
    descricao character varying COLLATE pg_catalog."default",
    categoria character varying COLLATE pg_catalog."default",
    preco double precision,
    ativo boolean,
    id_empresa integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.procedimento_list
    OWNER to admin;

GRANT ALL ON TABLE odonto.procedimento_list TO admin;

-- Table: odonto.procedimento_orcamento

-- DROP TABLE IF EXISTS odonto.procedimento_orcamento;

CREATE TABLE IF NOT EXISTS odonto.procedimento_orcamento
(
    id_orcamento integer NOT NULL,
    id_procedimento integer,
    preco double precision,
    id_empresa integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.procedimento_orcamento
    OWNER to admin;
    
-- Table: odonto.procedimento_pre

-- DROP TABLE IF EXISTS odonto.procedimento_pre;

CREATE TABLE IF NOT EXISTS odonto.procedimento_pre
(
    id_procedimento integer NOT NULL DEFAULT nextval('odonto.procedimento_pre_id_procedimento_seq1'::regclass),
    descricao character varying COLLATE pg_catalog."default",
    preco real,
    ativo boolean,
    categoria character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto.procedimento_pre
    OWNER to postgres;

GRANT ALL ON TABLE odonto.procedimento_pre TO postgres;

-- Table: odonto.user

-- DROP TABLE IF EXISTS odonto."user";

CREATE TABLE IF NOT EXISTS odonto."user"
(
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    nome character varying(100) COLLATE pg_catalog."default",
    id_empresa integer,
    senha character varying(255) COLLATE pg_catalog."default",
    id_user integer NOT NULL DEFAULT nextval('odonto.user_id_user_seq'::regclass),
    CONSTRAINT pk_email PRIMARY KEY (email),
    CONSTRAINT user_id_user_key UNIQUE (id_user)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS odonto."user"
    OWNER to admin;

GRANT ALL ON TABLE odonto."user" TO admin;
