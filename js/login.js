$(document).on('pageinit', function() {
    $('#bt_logar').click(function(e) {
        e.preventDefault();
        if ($(this).closest('form').form_valida() == true) {
            logar(this);
        }
    });
    $('form').insere_mascara();
});


function logar(obj) {
    var usuario = $(obj).closest('form').find('#usuario').val();
    var senha = $(obj).closest('form').find('#senha').val();

    var query = 'SELECT * FROM usuarios WHERE usuario="' + usuario + '" AND  senha="' + md5(senha) + '"';

    db.transaction(function(tx) {
        tx.executeSql(query, [], function(tx, result) {
            debug('SUCESSO', query);
            debug('TOTAL', result.rows.length);
            if (result.rows.length != 0) {
                debug('SUSSESO', 'ID Usuário: ' + result.rows.item(0).id_usuarios);
                _session.set('id_usuarios', result.rows.item(0).id_usuarios);
                _session.set('usuario', result.rows.item(0).usuario);
                _constant.redirect('painel.html');
            } else {
                insert_usuarios(usuario, senha, obj);
            }
        }, function(tx, result) {
            debug('ERROR', result.message);
            verificar_tabelas();
        });
    });
}

function insert_usuarios(usuario, senha, obj) {
    var query = 'INSERT INTO usuarios (id_empresas, cod_usuario, dsc_usuario, usuario, nome, senha) VALUES (1, "123", "Lucas Pinheiro", "' + usuario + '", "Lucas Teste",  "' + md5(senha) + '");';
    db.transaction(function(tx) {
        tx.executeSql(query, [], function(tx, result) {
            debug('SUCESSO', query);
            debug('TOTAL', result.rows.length);
            logar(obj);
        }, function(tx, result) {
            debug('ERROR', result.message);
            verificar_tabelas();
        });
    });
}