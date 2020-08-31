module.exports.listar_noticias = function(application, request, response) {
    var connect = application.config.config_database();
    const noticiaModel = new application.app.models.noticiaModel(connect);
    noticiaModel.listarNoticias(function (error, result) {
        if (error != null) {
            response.render("erro/erro", {erro: error});
        } else {
            response.render("noticia/noticias", {noticias: result});
        }
    });
}

module.exports.obter_noticia = function (application, request, response) {
    var connect = application.config.config_database();
    const noticiaModel = new application.app.models.noticiaModel(connect);
    var idNoticia = request.query.id_noticia;
    if (idNoticia == null || idNoticia == "")
        idNoticia = '0';
    var ipUsuario = getIpUsuario();
    noticiaModel.registrarAcessoNoticia(idNoticia, ipUsuario);
    noticiaModel.obterNoticia(idNoticia,function (error, result) {
        if (error != null) {
            response.render("erro/erro", {erro : error});
        } else {
            response.render("noticia/noticia", {noticia : result});
        }
    });
}

function getIpUsuario() {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    var ipUsuario = '0.0.0.0';
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (net.address!=null && net.address!="") {
                    ipUsuario = net.address;
                }
            }
        }
    }
    return ipUsuario;
}