use AgroConectaDB
go

SELECT * FROM Usuario

SELECT * FROM anuncio
go

INSERT INTO anuncio (cod_vendedor, titulo, preco, unidade, descricao) VALUES (0,'Morango', CAST(20 AS NUMERIC (10,2)), 'kg', 'Descricao')