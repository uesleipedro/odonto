-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.5
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: new_database | type: DATABASE --
-- DROP DATABASE IF EXISTS new_database;
CREATE DATABASE new_database;
-- ddl-end --


-- object: odonto | type: SCHEMA --
-- DROP SCHEMA IF EXISTS odonto CASCADE;
CREATE SCHEMA odonto;
-- ddl-end --
ALTER SCHEMA odonto OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,odonto;
-- ddl-end --

-- object: odonto.empresa | type: TABLE --
-- DROP TABLE IF EXISTS odonto.empresa CASCADE;
CREATE TABLE odonto.empresa (
	id_empresa serial NOT NULL,
	razao_social varchar,
	nome_fantasia varchar,
	cnpj_cpf varchar(14),
	telefone varchar,
	logo varchar,
	CONSTRAINT pk_id_empresa PRIMARY KEY (id_empresa)
);
-- ddl-end --
ALTER TABLE odonto.empresa OWNER TO postgres;
-- ddl-end --

-- object: odonto.paciente | type: TABLE --
-- DROP TABLE IF EXISTS odonto.paciente CASCADE;
CREATE TABLE odonto.paciente (
	id_paciente serial,
	nome varchar(100),
	cpf varchar(11),
	telefone_fixo varchar(100),
	telefone_movel varchar(100),
	dt_nascimento date,
	rg varchar(30),
	sexo char(1),
	estado_civil varchar(15),
	email varchar(100),
	plano_saude varchar(100),
	numero_carteirinha varchar(100),
	nome_responsavel varchar(100),
	telefone_responsavel varchar(100),
	email_responsavel varchar(100)

);
-- ddl-end --
ALTER TABLE odonto.paciente OWNER TO postgres;
-- ddl-end --

-- object: odonto.usuario | type: TABLE --
-- DROP TABLE IF EXISTS odonto.usuario CASCADE;
CREATE TABLE odonto.usuario (
	email varchar(100) NOT NULL,
	nome varchar(100),
	fk_id_empresa integer,
	senha varchar(255),
	CONSTRAINT pk_email PRIMARY KEY (email)
);
-- ddl-end --
ALTER TABLE odonto.usuario OWNER TO postgres;
-- ddl-end --

-- object: odonto.endereco | type: TABLE --
-- DROP TABLE IF EXISTS odonto.endereco CASCADE;
CREATE TABLE odonto.endereco (
	id_endereco serial,
	logradouro varchar(100),
	numero varchar(20),
	bairro varchar(100),
	municipio integer,
	uf char(2),
	cep varchar(8),
	cidade varchar(100),
	complemento varchar(100),
	principal boolean,
	correspondencia boolean

);
-- ddl-end --
ALTER TABLE odonto.endereco OWNER TO postgres;
-- ddl-end --

-- object: odonto.grupo_usuario | type: TABLE --
-- DROP TABLE IF EXISTS odonto.grupo_usuario CASCADE;
CREATE TABLE odonto.grupo_usuario (
	id_grupo_usuario serial NOT NULL,
	nome varchar(100),
	CONSTRAINT pk_id_grupo_usuario PRIMARY KEY (id_grupo_usuario)
);
-- ddl-end --
ALTER TABLE odonto.grupo_usuario OWNER TO postgres;
-- ddl-end --

-- object: odonto.agenda | type: TABLE --
-- DROP TABLE IF EXISTS odonto.agenda CASCADE;
CREATE TABLE odonto.agenda (
	id_agenda serial NOT NULL,
	fk_id_empresa integer,
	fk_id_paciente integer,
	fk_id_profissional integer,
	start_date_time timestamp,
	end_date_time timestamp,
	obs text,
	fk_id_metodo_pagamento integer,
	total_pagamento_servico float,
	desconto float,
	status integer,
	CONSTRAINT pk_id_agenda PRIMARY KEY (id_agenda)
);
-- ddl-end --
ALTER TABLE odonto.agenda OWNER TO postgres;
-- ddl-end --

-- object: odonto.procedimento | type: TABLE --
-- DROP TABLE IF EXISTS odonto.procedimento CASCADE;
CREATE TABLE odonto.procedimento (
	id_procedimento serial NOT NULL,
	nome_procedimento varchar(100),
	descricao text,
	preco float,
	dente smallint,
	CONSTRAINT pk_id_procedimento PRIMARY KEY (id_procedimento)
);
-- ddl-end --
ALTER TABLE odonto.procedimento OWNER TO postgres;
-- ddl-end --

-- object: odonto.dente | type: TABLE --
-- DROP TABLE IF EXISTS odonto.dente CASCADE;
CREATE TABLE odonto.dente (
	id_paciente integer,
	nome_dente varchar(50)

);
-- ddl-end --
ALTER TABLE odonto.dente OWNER TO postgres;
-- ddl-end --

-- object: odonto.agenda_procedimento | type: TABLE --
-- DROP TABLE IF EXISTS odonto.agenda_procedimento CASCADE;
CREATE TABLE odonto.agenda_procedimento (
	id_agenda integer NOT NULL,
	id_procedimento integer NOT NULL,
	CONSTRAINT pk_id_agenda_procedimento PRIMARY KEY (id_agenda,id_procedimento)
);
-- ddl-end --
ALTER TABLE odonto.agenda_procedimento OWNER TO postgres;
-- ddl-end --

-- object: odonto.orcamento | type: TABLE --
-- DROP TABLE IF EXISTS odonto.orcamento CASCADE;
CREATE TABLE odonto.orcamento (
	id_orcamento serial NOT NULL,
	fk_id_paciente integer,
	data timestamp,
	preco float,
	desconto float,
	fk_id_metodo_pagamento integer,
	quantidade_parcela integer,
	CONSTRAINT fk_id_orcamento PRIMARY KEY (id_orcamento)
);
-- ddl-end --
ALTER TABLE odonto.orcamento OWNER TO postgres;
-- ddl-end --

-- object: odonto.procedimento_orcamento | type: TABLE --
-- DROP TABLE IF EXISTS odonto.procedimento_orcamento CASCADE;
CREATE TABLE odonto.procedimento_orcamento (
	id_orcamento integer NOT NULL,
	id_procedimento integer NOT NULL,
	id_dente integer,
	CONSTRAINT pk_id_procedimento_orcamento PRIMARY KEY (id_orcamento,id_procedimento)
);
-- ddl-end --
ALTER TABLE odonto.procedimento_orcamento OWNER TO postgres;
-- ddl-end --

-- object: odonto.grupo_usuario_conta | type: TABLE --
-- DROP TABLE IF EXISTS odonto.grupo_usuario_conta CASCADE;
CREATE TABLE odonto.grupo_usuario_conta (
	id_grupo_usuario integer NOT NULL,
	id_conta integer NOT NULL,
	CONSTRAINT id_grupo_usuario_conta PRIMARY KEY (id_grupo_usuario,id_conta)
);
-- ddl-end --
ALTER TABLE odonto.grupo_usuario_conta OWNER TO postgres;
-- ddl-end --

-- object: odonto.profissional | type: TABLE --
-- DROP TABLE IF EXISTS odonto.profissional CASCADE;
CREATE TABLE odonto.profissional (
	id_profissional serial NOT NULL,
	nome varchar(100),
	crm integer,
	estado_crm char(2),
	fk_id_empresa integer,
	CONSTRAINT pk_id_profissional PRIMARY KEY (id_profissional)
);
-- ddl-end --
ALTER TABLE odonto.profissional OWNER TO postgres;
-- ddl-end --

-- object: odonto.pessoa_endereco | type: TABLE --
-- DROP TABLE IF EXISTS odonto.pessoa_endereco CASCADE;
CREATE TABLE odonto.pessoa_endereco (
	id_paciente integer NOT NULL,
	id_endereco integer NOT NULL,
	CONSTRAINT pk_id_paciente_endereco PRIMARY KEY (id_paciente,id_endereco)
);
-- ddl-end --
ALTER TABLE odonto.pessoa_endereco OWNER TO postgres;
-- ddl-end --

-- object: odonto.empresa_endereco | type: TABLE --
-- DROP TABLE IF EXISTS odonto.empresa_endereco CASCADE;
CREATE TABLE odonto.empresa_endereco (
	id_empresa integer NOT NULL,
	id_endereco integer NOT NULL,
	CONSTRAINT pk_id_empresa_endereco PRIMARY KEY (id_empresa,id_endereco)
);
-- ddl-end --
ALTER TABLE odonto.empresa_endereco OWNER TO postgres;
-- ddl-end --

-- object: odonto.metodo_pagamento | type: TABLE --
-- DROP TABLE IF EXISTS odonto.metodo_pagamento CASCADE;
CREATE TABLE odonto.metodo_pagamento (
	id_metodo_pagamento serial,
	metodo_pagamento varchar(100)

);
-- ddl-end --
ALTER TABLE odonto.metodo_pagamento OWNER TO postgres;
-- ddl-end --

-- object: odonto.receita | type: TABLE --
-- DROP TABLE IF EXISTS odonto.receita CASCADE;
CREATE TABLE odonto.receita (
	id_receita serial NOT NULL,
	fk_id_orcamento integer,
	fk_id_paciente integer,
	fk_id_profissional smallint,
	forma_pagamento varchar(50),
	tipo_forma_pagamento varchar(50),
	entrada char(1),
	data date,
	desconto float,
	valor float,
	CONSTRAINT pk_id_receita PRIMARY KEY (id_receita)
);
-- ddl-end --
ALTER TABLE odonto.receita OWNER TO postgres;
-- ddl-end --

-- object: fk_id_empresa | type: CONSTRAINT --
-- ALTER TABLE odonto.usuario DROP CONSTRAINT IF EXISTS fk_id_empresa CASCADE;
ALTER TABLE odonto.usuario ADD CONSTRAINT fk_id_empresa FOREIGN KEY (fk_id_empresa)
REFERENCES odonto.empresa (id_empresa) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_paciente | type: CONSTRAINT --
-- ALTER TABLE odonto.agenda DROP CONSTRAINT IF EXISTS fk_id_paciente CASCADE;
ALTER TABLE odonto.agenda ADD CONSTRAINT fk_id_paciente FOREIGN KEY (fk_id_paciente)
REFERENCES odonto.paciente (id_paciente) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_empresa | type: CONSTRAINT --
-- ALTER TABLE odonto.agenda DROP CONSTRAINT IF EXISTS fk_id_empresa CASCADE;
ALTER TABLE odonto.agenda ADD CONSTRAINT fk_id_empresa FOREIGN KEY (fk_id_empresa)
REFERENCES odonto.empresa (id_empresa) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_profissional | type: CONSTRAINT --
-- ALTER TABLE odonto.agenda DROP CONSTRAINT IF EXISTS fk_id_profissional CASCADE;
ALTER TABLE odonto.agenda ADD CONSTRAINT fk_id_profissional FOREIGN KEY (fk_id_profissional)
REFERENCES odonto.profissional (id_profissional) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_metodo_pagamento | type: CONSTRAINT --
-- ALTER TABLE odonto.agenda DROP CONSTRAINT IF EXISTS fk_metodo_pagamento CASCADE;
ALTER TABLE odonto.agenda ADD CONSTRAINT fk_metodo_pagamento FOREIGN KEY (fk_id_metodo_pagamento)
REFERENCES odonto.metodo_pagamento (id_metodo_pagamento) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_agenda | type: CONSTRAINT --
-- ALTER TABLE odonto.agenda_procedimento DROP CONSTRAINT IF EXISTS fk_id_agenda CASCADE;
ALTER TABLE odonto.agenda_procedimento ADD CONSTRAINT fk_id_agenda FOREIGN KEY (id_agenda)
REFERENCES odonto.agenda (id_agenda) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_procedimento | type: CONSTRAINT --
-- ALTER TABLE odonto.agenda_procedimento DROP CONSTRAINT IF EXISTS fk_id_procedimento CASCADE;
ALTER TABLE odonto.agenda_procedimento ADD CONSTRAINT fk_id_procedimento FOREIGN KEY (id_procedimento)
REFERENCES odonto.procedimento (id_procedimento) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_paciente | type: CONSTRAINT --
-- ALTER TABLE odonto.orcamento DROP CONSTRAINT IF EXISTS fk_id_paciente CASCADE;
ALTER TABLE odonto.orcamento ADD CONSTRAINT fk_id_paciente FOREIGN KEY (fk_id_paciente)
REFERENCES odonto.paciente (id_paciente) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_metodo_pagamento | type: CONSTRAINT --
-- ALTER TABLE odonto.orcamento DROP CONSTRAINT IF EXISTS fk_id_metodo_pagamento CASCADE;
ALTER TABLE odonto.orcamento ADD CONSTRAINT fk_id_metodo_pagamento FOREIGN KEY (fk_id_metodo_pagamento)
REFERENCES odonto.metodo_pagamento (id_metodo_pagamento) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_procedimento | type: CONSTRAINT --
-- ALTER TABLE odonto.procedimento_orcamento DROP CONSTRAINT IF EXISTS fk_id_procedimento CASCADE;
ALTER TABLE odonto.procedimento_orcamento ADD CONSTRAINT fk_id_procedimento FOREIGN KEY (id_procedimento)
REFERENCES odonto.procedimento (id_procedimento) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_orcamento | type: CONSTRAINT --
-- ALTER TABLE odonto.procedimento_orcamento DROP CONSTRAINT IF EXISTS fk_id_orcamento CASCADE;
ALTER TABLE odonto.procedimento_orcamento ADD CONSTRAINT fk_id_orcamento FOREIGN KEY (id_orcamento)
REFERENCES odonto.orcamento (id_orcamento) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_grupo_usuario | type: CONSTRAINT --
-- ALTER TABLE odonto.grupo_usuario_conta DROP CONSTRAINT IF EXISTS fk_id_grupo_usuario CASCADE;
ALTER TABLE odonto.grupo_usuario_conta ADD CONSTRAINT fk_id_grupo_usuario FOREIGN KEY (id_grupo_usuario)
REFERENCES odonto.grupo_usuario (id_grupo_usuario) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_empresa | type: CONSTRAINT --
-- ALTER TABLE odonto.profissional DROP CONSTRAINT IF EXISTS fk_id_empresa CASCADE;
ALTER TABLE odonto.profissional ADD CONSTRAINT fk_id_empresa FOREIGN KEY (fk_id_empresa)
REFERENCES odonto.empresa (id_empresa) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_paciente | type: CONSTRAINT --
-- ALTER TABLE odonto.pessoa_endereco DROP CONSTRAINT IF EXISTS fk_id_paciente CASCADE;
ALTER TABLE odonto.pessoa_endereco ADD CONSTRAINT fk_id_paciente FOREIGN KEY (id_paciente)
REFERENCES odonto.paciente (id_paciente) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_endereco | type: CONSTRAINT --
-- ALTER TABLE odonto.pessoa_endereco DROP CONSTRAINT IF EXISTS fk_id_endereco CASCADE;
ALTER TABLE odonto.pessoa_endereco ADD CONSTRAINT fk_id_endereco FOREIGN KEY (id_endereco)
REFERENCES odonto.endereco (id_endereco) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_empresa | type: CONSTRAINT --
-- ALTER TABLE odonto.empresa_endereco DROP CONSTRAINT IF EXISTS fk_id_empresa CASCADE;
ALTER TABLE odonto.empresa_endereco ADD CONSTRAINT fk_id_empresa FOREIGN KEY (id_empresa)
REFERENCES odonto.empresa (id_empresa) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_endereco | type: CONSTRAINT --
-- ALTER TABLE odonto.empresa_endereco DROP CONSTRAINT IF EXISTS fk_id_endereco CASCADE;
ALTER TABLE odonto.empresa_endereco ADD CONSTRAINT fk_id_endereco FOREIGN KEY (id_empresa)
REFERENCES odonto.endereco (id_endereco) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_orcamento | type: CONSTRAINT --
-- ALTER TABLE odonto.receita DROP CONSTRAINT IF EXISTS fk_id_orcamento CASCADE;
ALTER TABLE odonto.receita ADD CONSTRAINT fk_id_orcamento FOREIGN KEY (fk_id_orcamento)
REFERENCES odonto.orcamento (id_orcamento) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_paciente | type: CONSTRAINT --
-- ALTER TABLE odonto.receita DROP CONSTRAINT IF EXISTS fk_id_paciente CASCADE;
ALTER TABLE odonto.receita ADD CONSTRAINT fk_id_paciente FOREIGN KEY (fk_id_paciente)
REFERENCES odonto.paciente (id_paciente) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_id_profissional | type: CONSTRAINT --
-- ALTER TABLE odonto.receita DROP CONSTRAINT IF EXISTS fk_id_profissional CASCADE;
ALTER TABLE odonto.receita ADD CONSTRAINT fk_id_profissional FOREIGN KEY (fk_id_profissional)
REFERENCES odonto.profissional (id_profissional) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


