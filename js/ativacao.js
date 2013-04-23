$(document).on('pageinit', function() {
    $('form').insere_mascara();
    $('.bt_ativar').click(function( a ) {
        a.preventDefault();
        if ( $(this).closest("form").form_valida() == true ) {
            var codigo_cliente = $('#codigo_cliente').val();
            var uuid = $('#devUUID').text();
            uuid = (uuid == '' ? '123456' : uuid);
            var codigo_ativacao = Math.ceil(Math.random() * 1000000000);
            solicitar_ativacao(codigo_cliente, uuid, codigo_ativacao);
        }
    });
});

function solicitar_ativacao( codigo_cliente, uuid, codigo_ativacao ) {

    $.send({
        url : _situacoes.urls.ativacao,
        data : {
            cod_cliente : codigo_cliente,
            nome_dispositivo : $('#devName').text(),
            plataforma : $('#devPlatform').text(),
            versao_plataforma : $('#devVersion').text(),
            uuid : uuid
        },
        beforeSend : function() {
            block(false);
        },
        success : function( a ) {
            jSucesso(a.cod_retorno);
            jSucesso(a.mensagem);
            $.each(a.dados, function( b, c ) {
                jAviso(b + ' === ' + c);
            });
            insert_solicitar_ativacao(codigo_cliente, uuid, codigo_ativacao);
        },
        error : function( c, a, b ) {
            block(true);
            insert_solicitar_ativacao(codigo_cliente, uuid, codigo_ativacao)
        }
    });


}

function insert_solicitar_ativacao(codigo_cliente, uuid, codigo_ativacao) {
    var c = 'INSERT INTO empresas ("uuid", "codigo_cliente", "codigo_ativacao", "cpf_cnpj", "nome_empresa", "data_hora_cadastro") VALUES ("' + uuid + '", "' + codigo_cliente + '", "' + codigo_ativacao + '", "15382516000115", "S2I MOBILE - Teste", "' + date('Y-m-d H:i:s') + '");';
    db.transaction(function( e ) {
        e.executeSql(c, [ ], function( g, f ) {
            debug("SUCESSO", c);
            jSucesso('Ativação realizada com sucesso.');
            //_constant.redirect("login.html");
        }, function( g, f ) {
            jAviso('Problemas na ativação tentar novamente.');
            debug("ERROR", c);
            debug("ERROR", f.message);
        });
    });
}

// handling document ready and phonegap deviceready
window.addEventListener('load', function() {
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);

// Phonegap is loaded and can be used
function onDeviceReady() {
    getDeviceInfo();
}

// get device info
function getDeviceInfo() {
    $('#devName').text(device.name);
    $('#devPlatform').text(device.platform);
    $('#devUUID').text(device.uuid);
    $('#devVersion').text(device.version);
}