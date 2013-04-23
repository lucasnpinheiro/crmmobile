$(document).on("pageinit", function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    if ( _session.get("usuario") != null ) {
        _constant.redirect('painel.html');
    } else {
        _session.clear();
    }

    $("#bt_logar").click(function( a ) {
        a.preventDefault();
        if ( $(this).closest("form").form_valida() == true ) {
            logar(this);
        }
    });
    $("form").insere_mascara();
    $(".crm_mobile_versao").html("Versão: " + _constant.version);
});
function logar( d ) {
    var b = $(d).closest("form").find("#usuario").val().toLowerCase();
    var a = $(d).closest("form").find("#senha").val().toLowerCase();
    var c = 'SELECT * FROM usuarios WHERE usuario="' + b + '" AND  senha="' + md5(a) + '"';
    db.transaction(function( e ) {
        e.executeSql(c, [ ],
                function( g, f ) {
                    debug("QUERY", c);
                    debug("TOTAL", f.rows.length);
                    if ( f.rows.length != 0 ) {
                        debug("SUSSESO", "ID Usuário: " + f.rows.item(0).id_usuarios);
                        _session.set("id_usuarios", f.rows.item(0).id_usuarios);
                        _session.set("cod_usuario", f.rows.item(0).cod_usuario);
                        _session.set("usuario", f.rows.item(0).usuario);
                        _session.set("nivel", f.rows.item(0).nivel);
                        _configuracoes.verifica_chave();
                    } else {
                        jAviso('Usuário não localizado.');
                    }
                },
                function( g, f ) {
                    debug("QUERY", c);
                    debug("ERROR", f.message);
                    _configuracoes.verifica_tabelas();
                });
    });
}

function onDeviceReady() {
    checkConnection();
}
function checkConnection() {
    var networkState = navigator.connection.type;
    _session.set('connection_type', networkState);
    $(".crm_mobile_versao").html("Versão: " + _constant.version + " | Conexão: " + _session.get('connection_type'));
}