use AgroConectaDB
go

SELECT * FROM Usuario

SELECT * FROM anuncio
go

INSERT INTO anuncio (cod_vendedor, titulo, preco, unidade, descricao) VALUES (0,'Morango', CAST(20 AS NUMERIC (10,2)), 'kg', 'Descricao')

SELECT cod_vendedor, titulo, preco, unidade, descricao FROM anuncio ]
SELECT titulo, preco, unidade, descricao, nome FROM anuncio, usuario WHERE cod_vendedor = cod_usuario
select * from anuncio

select categoria, COUNT(categoria) from anuncio group by categoria