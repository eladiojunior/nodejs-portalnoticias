const express = require('express');
const consign = require('consign');
const body_parser = require('body-parser');

//utilizando o modulo Express.
const app = express();

//Adicionar a engine EJS.
app.set('view engine', 'ejs');

//Setar o diretorio de views.
app.set('views', './app/views');

//Estrutura dos arquivos estáticos.
app.use(express.static('./app/public'));

//Configuração do midleware, Body-Parser.
app.use(body_parser.urlencoded({
    extended: true
}));

//Incluir o midleware (Express-Validator) no projeto;
app.use(express.json());

//Incluir as rotas com Consign e adicionar no Express:
consign()
    .include('app/routes')
    .then('config/config_database.js')   //Incluir no Consign mais módulos diretamente, com extensão (.js).
    .then('app/models')         //Incluir no Consign os Models da aplicação, todas;
    .then('app/controllers')    //Incluir no Consign os Controllers da aplicação, todas;
    .into(app);

//Expor como módulo
module.exports = app;