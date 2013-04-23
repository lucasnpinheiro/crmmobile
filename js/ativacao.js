$(document).on('pageinit', function() {
    $('form').insere_mascara();
    $('.bt_ativar').click(function( a ) {
        a.preventDefault();
        if ( $(this).closest("form").form_valida() == true ) {
            var codigo_cliente = $('#codigo_cliente').val();
            var uuid = $('#devUUID').text();
            uuid = (uuid == '' ? '123456' : uuid);
            var cod_ativacao = Math.ceil(Math.random() * 1000000000);
            solicitar_ativacao(codigo_cliente, uuid, cod_ativacao);
        }
    });
});

function solicitar_ativacao( codigo_cliente, uuid, cod_ativacao ) {
    $.send({
        url : _situacoes.urls.ativacao,
        type : 'POST',
        crypt : true,
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
            if ( a.cod_retorno == 999 ) {
                jSucesso(a.mensagem);
            } else {
                nsert_solicitar_ativacao(codigo_cliente, uuid, cod_ativacao);
            }
            jSucesso(a.cod_retorno);
        },
        error : function( c, a, b ) {
            block(true);
        }
    });
}

function insert_solicitar_ativacao( codigo_cliente, uuid, cod_ativacao ) {
    var c = 'INSERT INTO empresas ("uuid", "codigo_cliente", "cod_ativacao", "cpf_cnpj", "nome_empresa", "data_hora_cadastro") VALUES ("' + uuid + '", "' + codigo_cliente + '", "' + cod_ativacao + '", "15382516000115", "S2I MOBILE - Teste", "' + date('Y-m-d H:i:s') + '");';
    db.transaction(function( e ) {
        e.executeSql(c, [ ], function( g, f ) {
            debug("SUCESSO", c);
            jSucesso('Ativação realizada com sucesso.');
            _constant.redirect("login.html");
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