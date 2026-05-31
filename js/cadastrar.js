        
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('./dbconfig');

const express = require('express');
const router = express.Router();

// Rota para cadastro
router.post('/', (req, res) => {
    const { nome, empresa, cnpj, email, senha, telefone } = req.body;
    console.log(`Novo cadastro: Nome: ${nome}, Empresa: ${empresa}, CNPJ: ${cnpj}, Email: ${email}, Senha: ${senha}, Telefone: ${telefone}`);

    var connection = new Connection(config);
        connection.on('connect', function(err) {
            if (err) {
                console.log('Connection failed', err);
            } else {
                console.log('Connected with Windows authentication');
                conferirCadastro(nome, email, cnpj);
            }
        });


    function realizarCadastro(nome, empresa, cnpj, email, senha, telefone) {
        res.json({ message: 'Cadastro recebido com sucesso!', validade : true});
        const request = new Request(
            `INSERT INTO usuario (nome, empresa, cnpj, email, senha, telefone) VALUES ('${nome}', '${empresa}', '${cnpj}', '${email}', '${senha}', '${telefone}')`,
            function(err) {
                if (err) {
                    console.log('Error inserting data', err);
                }
            }
        );
        connection.execSql(request);
    }

    function conferirCadastro(nome, email, cnpj) {
        const request = new Request(
            `SELECT * FROM usuario WHERE nome = '${nome}' OR email = '${email}' or cnpj = '${cnpj}'`,  
            function(err, rowCount) {
                if (err) {
                    console.log('Error querying data', err);        
                } else if (rowCount > 0) {
                    res.json({ message: 'Cadastro já presente no sistema!', validade: false});
                } else {
                    realizarCadastro(nome, empresa, cnpj, email, senha, telefone);
                }
            }
        );
        connection.execSql(request);
    }
    connection.connect();
    connection.close();
});


module.exports = router



