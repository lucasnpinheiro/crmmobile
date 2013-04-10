$(document).on("pageinit", function() {
    if ( _session.get("usuario") != "" && _session.get("usuario") != undefined && _session.get("usuario") != null ) {
        _constant.redirect('painel.html');
    } else {
        var c = 'SELECT codigo_ativacao FROM empresas;';
        db.transaction(function( e ) {
            e.executeSql(c, [ ], function( g, f ) {
                debug("SUCESSO", c);
                debug("TOTAL", f.rows.length);
                if ( f.rows.item(0).codigo_ativacao == '' ) {
                    _constant.redirect("atualizacoes_ativacao.html");
                }
            }, function( g, f ) {
                debug("ERROR", f.message);
            });
        });
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
    var a = $(d).closest("form").find("#senha").val();
    var c = 'SELECT * FROM usuarios WHERE usuario="' + b + '" AND  senha="' + md5(a) + '"';
    db.transaction(function( e ) {
        e.executeSql(c, [ ], function( g, f ) {
            debug("SUCESSO", c);
            debug("TOTAL", f.rows.length);
            if ( f.rows.length != 0 ) {
                debug("SUSSESO", "ID Usuário: " + f.rows.item(0).id_usuarios);
                _session.set("id_usuarios", f.rows.item(0).id_usuarios);
                _session.set("usuario", f.rows.item(0).usuario);
                _session.set("nivel", f.rows.item(0).nivel);
                _constant.redirect("painel.html");
            } else {
                insert_usuarios(b, a, d)
            }
        }, function( g, f ) {
            debug("ERROR", f.message);
            verificar_tabelas()
        })
    })
}
function insert_usuarios( b, a, d ) {
    var c = 'INSERT INTO usuarios (id_empresas, cod_usuario, dsc_usuario, usuario, nome, senha) VALUES (1, "123", "' + b + '", "' + b + '", "' + b + '",  "' + md5(a) + '",  "2");';
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
