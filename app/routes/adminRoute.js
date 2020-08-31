const { body } = require('express-validator');
module.exports = function (application) {
    application.get('/incluir_noticia', function (req, res) {
        application.app.controllers.adminController.form_incluir_noticia(application, req, res);
    });
    application.post('/salvar_noticia',
        [
            body('titulo', 'Título da notícia obrigatório.').notEmpty(),
            body('resumo', 'Resumo da notícia obrigatório.').notEmpty(),
            body('resumo', 'Resumo deve conter de 10 a 250 caracteres.').isLength({min: 10, max: 250}),
            body('autor', 'Autor da notícia obrigatório.').notEmpty(),
            body('dataNoticia', 'Data da notícia obrigatório.').notEmpty(),
            body('dataNoticia', 'Data da notícia deve conter o formato (DD/MM/AAAA).').isDate({format: 'DD/MM/YYYY'}),
            body('conteudo', 'Conteúdo da notícia obrigatório.').notEmpty(),
            body('dataInicial', 'Data inicial da vigênica da notícia obrigatório.').notEmpty(),
            body('dataInicial', 'Data inicial da vigênica deve conter o formato (DD/MM/AAAA).').isDate({format: 'DD/MM/YYYY'})
        ], function (req, res) {
        application.app.controllers.adminController.salvar_noticia(application, req, res);
    });
}