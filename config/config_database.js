//referencia para o modulo MySQL.
var db_mysql = require('mysql');

//Criando um conexao com o banco de dados (./estrutura_db_portal_noticias.sql);

//Para evitar que o autoload (Consign) crie uma conexao com o DB, será transformado em variavel.
const connect_mysql = function () {
    return db_mysql.createConnection({
        host: '192.168.0.18',
        user: 'portal_noticias',
        password: 'portalnoticias',
        database: 'DB_PORTAL_NOTICIAS'
    });
}
//Expor essa variavel, para evitar o autoload de acesso ao BD.
module.exports = function () {
    return connect_mysql;
};