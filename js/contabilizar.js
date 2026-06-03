
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('./dbconfig');
var TYPES = require('tedious').TYPES;
const express = require('express');
const router = express.Router();

// Rota para cadastro
router.post('/', (req, res) => {


    var connection = new Connection(config);
    connection.on('connect', function (err) {
        if (err) {
            console.log('Connection failed', err);
        } else {
            console.log('Connected with Windows authentication');
            contar();
        }
    });


    function contar() {

        const results = [];

        const request = new Request(
            `SELECT categoria, COUNT(categoria) as quantidade FROM anuncio GROUP BY categoria`,
            function (err) {
                if (err) {
                    console.log('Error inserting data', err);
                    res.status(500).json({ mensagem: 'Erro ao realizar a contagem' });
                    connection.close();
                } else {
                    res.json({ mensagem: 'Contagem realizada com sucesso', resultados: results });
                    connection.close();
                }
            }
        );

        request.on('row', columns => {
            const row = {};
            columns.forEach(column => {
                row[column.metadata.colName] = column.value;
            });
            results.push(row);
        });

        connection.execSql(request);
    }

    connection.connect();
    connection.close();
    });

module.exports = router



