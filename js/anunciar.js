
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('./dbconfig');
var TYPES = require('tedious').TYPES;
const express = require('express');
const router = express.Router();s

// Rota para cadastro
router.post('/', (req, res) => {
    var idUsuario = -1;
    const { email, titulo, preco, unidade, descricao } = req.body;
    console.log(`Produto a ser cadastrado: Titulo: ${titulo}, preco: ${preco}, unidade: ${unidade}, descricao: ${descricao}`);
    console.log(`Email do usuário: ${email}`)

    var connection = new Connection(config);
    connection.on('connect', function (err) {
        if (err) {
            console.log('Connection failed', err);
        } else {
            console.log('Connected with Windows authentication');
            obterID(email);
        }
    });


    function registrarAnuncio(idUsuario, titulo, preco, unidade, descricao ) {
        // ensure preco is a valid number; if not, set to 0 to avoid NULL insertion
        let precoVal = parseFloat(preco);
        if (!isFinite(precoVal)) {
            precoVal = 0;
        } else {
            // normalize to two decimal places
            precoVal = parseFloat(precoVal.toFixed(2));
        }

        const request = new Request(
            `INSERT INTO anuncio (cod_vendedor, titulo, preco, unidade, descricao) VALUES (@idUsuario, @titulo, @preco, @unidade, @descricao)`,
            function (err) {
                if (err) {
                    console.log('Error inserting data', err);
                } else {
                    console.log('Anúncio cadastrado com sucesso');
                    res.status(200).json({ mensagem: 'Anúncio cadastrado com sucesso' });
                }
            }
        );

        request.addParameter('idUsuario', TYPES.Int, Number(idUsuario));
        request.addParameter('titulo', TYPES.VarChar, titulo);
        request.addParameter('preco', TYPES.Numeric, precoVal);
        request.addParameter('unidade', TYPES.VarChar, unidade);
        request.addParameter('descricao', TYPES.VarChar, descricao);

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
                    registrarAnuncio(idUsuario, titulo, preco, unidade, descricao );
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



