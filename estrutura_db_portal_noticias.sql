CREATE DATABASE DB_PORTAL_NOTICIAS;
CREATE TABLE TB_NOTICIA (
    ID_NOTICIA INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TX_TITULO_NOTICIA VARCHAR(100) NOT NULL,
    DS_CONTEUDO_NOTICIA TEXT,
    DT_REGISTRO_NOTICIA TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DH_INICIAL_VIGENCIA_NOTICIA DATETIME NOT NULL,
    DH_FINAL_VIGENCIA_NOTICIA DATETIME,
    QT_ACESSO_NOTICIA INT NOT NULL DEFAULT 0
);
-- Criar estrutura para contar os acessos aos notícias.
CREATE TABLE TB_ACESSO_NOTICIA (
    ID_ACESSO_NOTICIA INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ID_NOTICIA INT NOT NULL,
    DT_ACESSO_NOTICIA TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    NR_IDENTIFICADOR_USUARIO VARCHAR(100) NOT NULL,
    CONSTRAINT FK_NOTICIA_ACESSO FOREIGN KEY (ID_NOTICIA) REFERENCES TB_NOTICIA (ID_NOTICIA)
);

-- Criar um usuário proprio para o Portal de Noticias.
-- Esse usuário pode acessar o database de qualquer IP (<user>@%).
CREATE USER 'portal_noticias'@'%' IDENTIFIED WITH mysql_native_password BY 'portalnoticias';
GRANT ALL PRIVILEGES ON DB_PORTAL_NOTICIAS.* TO 'portal_noticias'@'%';
FLUSH PRIVILEGES;

-- INSERIR UMA NOTICIA DE TESTE
INSERT INTO TB_NOTICIA (TX_TITULO_NOTICIA, DS_CONTEUDO_NOTICIA, DH_INICIAL_VIGENCIA_NOTICIA, DH_FINAL_VIGENCIA_NOTICIA)
 VALUES ('Notícia corrente',
         'Lorem ipsum ac neque purus sit quisque imperdiet amet commodo, volutpat integer pellentesque augue ullamcorper ac semper. viverra dapibus congue semper netus phasellus curabitur torquent ultrices quam felis vel aliquet sodales, diam lorem turpis ligula sollicitudin erat cursus adipiscing lectus ad sit. lectus facilisis libero hac laoreet a dolor nisl nunc, cursus conubia eu aliquam donec eleifend suspendisse sit curabitur, blandit mauris facilisis auctor vivamus torquent tempus. ante non praesent aliquam sodales curae volutpat, mi mattis tempor libero praesent inceptos fermentum, suspendisse nullam rutrum lacinia scelerisque. neque vivamus sociosqu potenti ultricies iaculis conubia commodo, potenti ante nec etiam netus nam ut, consequat augue fames rhoncus ut orci.',
         CURRENT_DATE(), NULL);
INSERT INTO TB_NOTICIA (TX_TITULO_NOTICIA, DS_CONTEUDO_NOTICIA, DH_INICIAL_VIGENCIA_NOTICIA, DH_FINAL_VIGENCIA_NOTICIA)
VALUES ('Notícia antiga vigente',
        'Lorem ipsum ac neque purus sit quisque imperdiet amet commodo, volutpat integer pellentesque augue ullamcorper ac semper. ',
        '2020-01-01', NULL);
INSERT INTO TB_NOTICIA (TX_TITULO_NOTICIA, DS_CONTEUDO_NOTICIA, DH_INICIAL_VIGENCIA_NOTICIA, DH_FINAL_VIGENCIA_NOTICIA)
VALUES ('Notícia antiga finalidada',
        'viverra dapibus congue semper netus phasellus curabitur torquent ultrices quam felis vel aliquet sodales, diam lorem turpis ligula sollicitudin erat cursus adipiscing lectus ad sit. lectus facilisis libero hac laoreet a dolor nisl nunc, cursus conubia eu aliquam donec eleifend suspendisse sit curabitur, blandit mauris facilisis auctor vivamus torquent tempus. ante non praesent aliquam sodales curae volutpat, mi mattis tempor libero praesent inceptos fermentum, suspendisse nullam rutrum lacinia scelerisque. neque vivamus sociosqu potenti ultricies iaculis conubia commodo, potenti ante nec etiam netus nam ut, consequat augue fames rhoncus ut orci.',
        '2020-01-01', '2020-07-31');
INSERT INTO TB_NOTICIA (TX_TITULO_NOTICIA, DS_CONTEUDO_NOTICIA, DH_INICIAL_VIGENCIA_NOTICIA, DH_FINAL_VIGENCIA_NOTICIA)
VALUES ('Notícia nova vigente amanhã',
        'Lorem ipsum ac neque purus sit quisque imperdiet amet commodo, volutpat integer pellentesque augue ullamcorper ac semper. ',
        CURRENT_DATE()+1, NULL);
INSERT INTO TB_NOTICIA (TX_TITULO_NOTICIA, DS_CONTEUDO_NOTICIA, DH_INICIAL_VIGENCIA_NOTICIA, DH_FINAL_VIGENCIA_NOTICIA)
VALUES ('Notícia nova vigente amanhã e finalizada um dia depois',
        'Lorem ipsum ac neque purus sit quisque imperdiet amet commodo, volutpat integer pellentesque augue ullamcorper ac semper. ',
        CURRENT_DATE()+1, CURRENT_DATE()+2);

-- INCLUSÃO DE MAIS CAMPOS NA NOTICIA...
-- RESUMO DA NOTICIA, AUTOR DA NOTICIA E DATA DA NOTICIA
ALTER TABLE TB_NOTICIA ADD COLUMN TX_RESUMO_NOTICIA VARCHAR(250) NOT NULL;
ALTER TABLE TB_NOTICIA ADD COLUMN NM_AUTOR_NOTICIA VARCHAR(30);
ALTER TABLE TB_NOTICIA ADD COLUMN DT_NOTICIA DATE;