use agroConectaDB
go



alter table anuncio
	drop constraint fk_anuncio;
drop table usuario
drop table anuncio

alter table anuncio
add categoria varchar(50);

go