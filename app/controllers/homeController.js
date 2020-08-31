module.exports.index = function (application, request, response) {
    var connect = application.config.config_database();
    const noticiaModel = new application.app.models.noticiaModel(connect);
    noticiaModel.listarUltimasNoticias(function (error, result) {
        if (error != null) {
            response.render("erro/erro", {erro: error});
        } else {
            response.render("home/index", {ultimas_noticias: result});
        }
    });

}