module.exports = function (application) {
    application.get('/noticias', function (req, res) {
        application.app.controllers.noticiaController.listar_noticias(application, req, res);
    });
    application.get('/noticia', function (req, res) {
        application.app.controllers.noticiaController.obter_noticia(application, req, res);
    });
};
