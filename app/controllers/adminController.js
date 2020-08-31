module.exports.form_incluir_noticia = function (application, request, response) {
    response.render("admin/form_incluir_noticia", {validacao: null, noticia: {}});
}
const { validationResult } = require('express-validator');
module.exports.salvar_noticia = function (application, request, response) {
    const noticia = request.body;
    const erros = validationResult(request);
    if (!erros.isEmpty()) {
        response.render("admin/form_incluir_noticia", {validacao: erros, noticia: noticia});
        return;
    }
    const connect = application.config.config_database();
    const noticiaModel = new application.app.models.noticiaModel(connect);
    noticiaModel.registrarNoticia(noticia, function (error, result) {
        if (error != null) {
            response.render("erro/erro", {erro: error});
        } else {
            response.redirect("/noticias");
        }
    });
}