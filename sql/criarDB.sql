use master
go

--create database AgroConectaDB
use AgroConectaDB
go


create table usuario(
	cod_usuario int identity(0,1) primary key,
	nome varchar(50) not null,
	empresa varchar(50) not null,
	cnpj varchar(18) not null,
	cidade varchar(50) not null,
	estado varchar(10) not null,
	email varchar(25) not null,
	senha varchar(256) not null,
	telefone varchar(16) not null
)
go

create table anuncio (
	cod_anuncio int identity (0, 1) primary key,
	cod_vendedor int constraint fk_anuncio foreign key (cod_vendedor) references usuario(cod_usuario),
	titulo varchar(50) not null,
	preco numeric(10, 2) not null,
	unidade varchar(10) not null,
	descricao varchar(500) not null
	--imagem varbinary(max) not null,
)
go


--drop database AgroConectaDB
