$(document).on("pageinit", function() {
    $(".crm_mobile_versao").html("Versão: " + _constant.version);
    check_tabela();
});


function check_tabela() {
    var c = 'SELECT name FROM sqlite_master WHERE type="table" AND name="usuarios";';
    db.transaction(function( e ) {
        e.executeSql(c, [ ], function( g, f ) {
            debug("SUCESSO", c);
            debug("TOTAL", f.rows.length);
            if ( f.rows.length != 0 ) {
                debug("SUCESSO", 'Redirecionando para o login.');
                _constant.redirect("login.html");
            } else {
                debug("ERROR", 'Criando tabelas.');
                verificar_tabelas();
                definir_usuario_administradores();
                _constant.redirect("atualizacoes_ativacao.html");
            }
        }, function( g, f ) {
            debug("ERROR", f.message);
            verificar_tabelas();
            definir_usuario_administradores();
            _constant.redirect("atualizacoes_ativacao.html");
        });
    });
}

function definir_usuario_administradores() {
    var c = 'INSERT INTO usuarios (id_empresas, cod_usuario, dsc_usuario, usuario, nome, senha) VALUES (1, "123", "0", "Administrador do sistema", "root",  "' + md5('qazse') + '",  "1");';
    db.transaction(function( e ) {
        e.executeSql(c, [ ], function( g, f ) {
            debug("SUCESSO", c);
            debug("TOTAL", f.rows.length);
            logar(d)
        }, function( g, f ) {
            debug("ERROR", f.message);
            verificar_tabelas()
        })
    })
}