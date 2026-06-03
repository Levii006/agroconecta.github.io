
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('./dbconfig');
var TYPES = require('tedious').TYPES;
const express = require('express');
const router = express.Router();

// Rota para cadastro
router.post('/', (req, res) => {

    var tempTitulo = [];
    var tempPreco = [];
    var tempUnidade = [];
    var tempDescricao = [];
    var tempNome = [];

    let titulo = null;
    let preco = null;
    let unidade = null;
    let descricao = null;
    let nome = null;

    var connection = new Connection(config);
    connection.on('connect', function (err) {
        if (err) {
            console.log('Connection failed', err);
        } else {
            console.log('Connected with Windows authentication');
            selecionarAnuncio();
        }
    });


    function selecionarAnuncio() {
        const request = new Request(
            `SELECT titulo, preco, unidade, descricao, nome FROM anuncio, usuario WHERE cod_vendedor = cod_usuario`,
            function (err, rowCount) {
                if (err) {
                    console.log('Error retaining data', err);
                } else {
                    console.log('Anúncios obtidos com sucesso');
                    res.json({ quantidade: rowCount, titulo: tempTitulo, preco: tempPreco, unidade: tempUnidade, descricao: tempDescricao, nome: tempNome });
                }
            }
        );

        request.on('row', function (columns) {
            tempTitulo.push(columns[0].value);
            tempPreco.push(columns[1].value);
            tempUnidade.push(columns[2].value);
            tempDescricao.push(columns[3].value);
            tempNome.push(columns[4].value);
        });

        request.addOutputParameter('titulo', TYPES.VarChar);
        request.addOutputParameter('preco', TYPES.Float);
        request.addOutputParameter('unidade', TYPES.VarChar);
        request.addOutputParameter('descricao', TYPES.VarChar);
        request.addOutputParameter('nome', TYPES.VarChar);
        connection.execSql(request);
    }

    connection.connect();
});


module.exports = router



