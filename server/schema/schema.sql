create database if not exists ondespachante;

use ondespachante;

create table if not exists servico(
  servico_id int primary key AUTO_INCREMENT,
  servico_title varchar(20),
  servico_descricao text,
  servico_valor float
  `created_at` datetime default now()
);

CREATE TABLE if not exists `cliente` (
  `cliente_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cliente_nome` varchar(145) DEFAULT NULL,
  `cliente_sobrenome` varchar(145) DEFAULT NULL,
  `cliente_whatsapp` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_cep` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_endereco` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_numero` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_cidade` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_estado` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_rg` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_cpf` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_bairro` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_complemento` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `cliente_login` varchar(14),
  `cliente_senha` varchar(33),
  `created_at` datetime default now()
) ;

INSERT INTO cliente (cliente_nome, cliente_login, cliente_senha) values ('cliente teste', 'cliente', md5('123456'));

CREATE TABLE if not exists `usuario` (
  `user_id` int(11) NOT NULL primary key AUTO_INCREMENT,
  `user_nome` varchar(45) COLLATE latin1_general_ci DEFAULT NULL,
  `user_login` varchar(45) COLLATE latin1_general_ci DEFAULT NULL,
  `user_senha` varchar(45) COLLATE latin1_general_ci DEFAULT NULL,
  `user_nivel` varchar(1),
  `user_telefone` varchar(45) COLLATE latin1_general_ci DEFAULT NULL,
  `user_ativo` int default 1,
  `created_at` datetime default now()
);

INSERT INTO
  usuario(user_nome, user_login, user_senha, user_nivel)
values
  ('Admin', 'admin', md5('123456'), 'A'), ('Organizador 1', 'org1', md5('123456'), 'S');

create table orcamento(
  orcamento_id int primary key AUTO_INCREMENT,
  orcamento_obs text,
  servico_id int,
  cliente_id int,
  orcamento_status varchar(1),
  orcamento_placa varchar(8),
  orcamento_renavam varchar(14),
  created_at datetime default now()
);

create table if not exists documentacao(
  documentacao_id int primary key,
  documentacao_conteudo text,
  documentacao_data_entrega date,
  servico_id int,
  orcamento_id int,
  created_at datetime default now()
);
