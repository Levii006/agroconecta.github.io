const cors = require('cors')
const express = require('express');
const app = express();
const port = 3000;

//subarquivos
const cadastrarRouter = require('./cadastrar')
const loginRouter = require('./login')
const anunciarRouter = require('./anunciar')
const anunciosUserRouter = require('./anunciosUser')
const anunciosTodosRouter = require('./anunciosTodos')
const contabilizarRouter = require('./contabilizar')

//conexão front-end
app.use(cors({
    origin: '*',
    credentials: true
}))

//registrando arquivos JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// INICIO CONEXÕES

app.use('/cadastrar', cadastrarRouter);
app.use('/login', loginRouter);
app.use('/anunciar', anunciarRouter);
app.use('/anunciosUser', anunciosUserRouter);
app.use('/anunciosTodos', anunciosTodosRouter);
app.use('/contabilizar', contabilizarRouter);