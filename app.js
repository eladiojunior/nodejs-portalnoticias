//Configuração definida em arquivo separado.
const app = require('./config/config_server');

//Definição das Rotas
//Retirar, pois com o Consign não precisa declarar diretamente.
//require('./app/routes/home')(app);
//require('./app/routes/noticias')(app);
//require('./app/routes/form_incluir_noticia')(app);

//Start dp server em uma porta específica para receber as requisições.
app.listen(8080, function () {
   console.log('Servidor HTTP rodando na porta: 8080.');
});