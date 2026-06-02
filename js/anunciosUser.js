
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('./dbconfig');
var TYPES = require('tedious').TYPES;
const express = require('express');
const router = express.Router();

// Rota para cadastro
router.post('/', (req, res) => {
    var idUsuario = -1;
    const { email } = req.body;

    var connection = new Connection(config);
    connection.on('connect', function (err) {
        if (err) {
            console.log('Connection failed', err);
        } else {
            console.log('Connected with Windows authentication');
            obterID(email);
        }
    });


    function selecionarAnuncio(idUsuario) {
        const request = new Request(
            `SELECT cod_vendedor, titulo, preco, unidade, descricao FROM anuncio WHERE cod_vendedor = @idusuario`,
            function (err, rowCount) {
                if (err) {
                    console.log('Error retaining data', err);
                } else {
                    console.log('Anúncios obtidos com sucesso');
                    res.json({quantidade: rowCount});
                }
            }
        );

        request.on('row', function (columns) {
            for (let i = 0; i < columns.length; i++) {
                console.log(`Column ${i}: ${columns[i].value}`);
            }
        });

        request.addParameter('idUsuario', TYPES.Int, Number(idUsuario));

        request.addOutputParameter('titulo', TYPES.VarChar);
        request.addOutputParameter('preco', TYPES.Numeric);
        request.addOutputParameter('unidade', TYPES.VarChar);
        request.addOutputParameter('descricao', TYPES.VarChar);
        connection.execSql(request);
    }

    function obterID(email) {
        const request = new Request(
            `SELECT cod_usuario FROM usuario WHERE email = @email`,
            function (err, rowCount) {
                if (err) {
                    console.log('Error querying data', err);
                } else {
                    console.log(`Consultando usuário com ID: ${idUsuario}`);
                    selecionarAnuncio(idUsuario);
                }
            }
        );
        
        request.addParameter('email', TYPES.VarChar, email);
        
        request.on('row', function (columns) {
            idUsuario = columns[0].value;
            console.log(`ID do usuário obtido: ${idUsuario}`);
        });
        connection.execSql(request);
    }
    connection.connect();
});


module.exports = router



