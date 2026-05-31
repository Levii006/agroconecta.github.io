use agroConectaDB
go



alter table anuncio
	drop constraint fk_anuncio;
drop table usuario
drop table anuncio

go