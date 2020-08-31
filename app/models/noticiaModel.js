/**
 * Implementação de classe em JS para DAO.
 * @constructor
 */

function noticiaModel(connection) {
    this._connection = connection;
}

/**
 * Recuperar as últimas 5 últimas noticias.
 * @param callback - função de retorno com o resultado.
 */
noticiaModel.prototype.listarUltimasNoticias = function (callback) {
    const SQL =
        'SELECT ' +
        'ID_NOTICIA, TX_TITULO_NOTICIA, TX_RESUMO_NOTICIA, NM_AUTOR_NOTICIA, DT_NOTICIA, QT_ACESSO_NOTICIA ' +
        'FROM ' +
        'TB_NOTICIA ' +
        'WHERE ' +
        'DH_INICIAL_VIGENCIA_NOTICIA <= CURRENT_DATE AND ' +
        '(DH_FINAL_VIGENCIA_NOTICIA IS NULL OR DH_FINAL_VIGENCIA_NOTICIA >= CURRENT_DATE) ' +
        'ORDER BY DT_REGISTRO_NOTICIA DESC LIMIT 5';
    this._connection.query(SQL, callback);
}

/**
 * Lista todas as notícias vigentes da base;
 * @param callback - função de retorno com o resultado.
 */
noticiaModel.prototype.listarNoticias = function (callback) {
    const SQL =
        'SELECT ' +
        'ID_NOTICIA, TX_TITULO_NOTICIA, TX_RESUMO_NOTICIA, NM_AUTOR_NOTICIA, DT_NOTICIA, QT_ACESSO_NOTICIA ' +
        'FROM ' +
        'TB_NOTICIA ' +
        'WHERE ' +
        'DH_INICIAL_VIGENCIA_NOTICIA <= CURRENT_DATE AND ' +
        '(DH_FINAL_VIGENCIA_NOTICIA IS NULL OR DH_FINAL_VIGENCIA_NOTICIA >= CURRENT_DATE) ' +
        'ORDER BY DT_REGISTRO_NOTICIA DESC';
    this._connection.query(SQL, callback);
}
/**
 * @param idNoticia - Identificador da notícia que será consultada.
 * @param callback - função de retorno com o resultado.
 */
noticiaModel.prototype.obterNoticia = function (idNoticia, callback) {
    const SQL =
        'SELECT ' +
        'ID_NOTICIA, TX_TITULO_NOTICIA, TX_RESUMO_NOTICIA, DS_CONTEUDO_NOTICIA, NM_AUTOR_NOTICIA, DT_NOTICIA, DT_REGISTRO_NOTICIA, DH_INICIAL_VIGENCIA_NOTICIA, DH_FINAL_VIGENCIA_NOTICIA, QT_ACESSO_NOTICIA ' +
        'FROM ' +
        'TB_NOTICIA ' +
        'WHERE ID_NOTICIA = ' + idNoticia;
    this._connection.query(SQL, callback);
}

/**
 * Registra um nova notícia no portal de noticias.
 * @param noticia - Noticia a ser registrada.
 * @param callback - função de retorno com o resultado.
 */
noticiaModel.prototype.registrarNoticia = function(noticia, callback) {
    let payload_insert = {
        TX_TITULO_NOTICIA           : noticia.titulo,
        TX_RESUMO_NOTICIA           : noticia.resumo,
        DS_CONTEUDO_NOTICIA         : noticia.conteudo,
        NM_AUTOR_NOTICIA            : noticia.autor,
        DT_NOTICIA                  : noticia.dataNoticia,
        DH_INICIAL_VIGENCIA_NOTICIA : noticia.dataInicial,
        DH_FINAL_VIGENCIA_NOTICIA   : (noticia.dataFinal == '' ? null : noticia.dataFinal)
    };
    const SQL = 'INSERT INTO TB_NOTICIA SET ?';
    this._connection.query(SQL, payload_insert, callback);
}

/**
 * Registrar o acesso a uma notícia.
 * @param idNoticia - Identificador da notícia;
 */
noticiaModel.prototype.registrarAcessoNoticia = function (idNoticia, ipUsuario) {

    let payload_insert = {
        ID_NOTICIA                : idNoticia,
        NR_IDENTIFICADOR_USUARIO  : ipUsuario
    };
    const SQL_INSERT = 'INSERT INTO TB_ACESSO_NOTICIA SET ?';
    this._connection.query(SQL_INSERT, payload_insert, function (error, result){
        if (error!=null)
            console.log(error)
    });

    //Atualizar quantidade de acesso a noticia.
    const SQL_UPDATE = 'UPDATE TB_NOTICIA SET QT_ACESSO_NOTICIA = (SELECT COUNT(ID_ACESSO_NOTICIA) FROM TB_ACESSO_NOTICIA WHERE ID_NOTICIA = ?) WHERE ID_NOTICIA = ?;';
    this._connection.query(SQL_UPDATE, [idNoticia, idNoticia], function (error, result){
        if (error!=null)
            console.log(error)
    });

}

module.exports = function (){
    return noticiaModel;
};