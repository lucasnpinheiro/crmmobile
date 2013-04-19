$(document).on('pageinit', function() {
    $('form').insere_mascara();
    $('.bt_ativar').click(function( a ) {
        a.preventDefault();
        if ( $(this).closest("form").form_valida() == true ) {
            var codigo_cliente = $('#codigo_cliente').val();
            var uuid = $('#devUUID').text();
            uuid = (uuid == '' ? '123456' : uuid);
            var codigo_ativacao = Math.random() * 10000;
            solicitar_ativacao(codigo_cliente, uuid, codigo_ativacao);
        }
    });
});

function solicitar_ativacao( codigo_cliente, uuid, codigo_ativacao ) {

    $.ajax({
        url : _situacoes.urls.ativacao,
        dataType : "json",
        type : "POST",
        beforeSend : function() {
            block(false);
        },
        success : function( a ) {
            jSucesso(a.cod_retorno);
            jSucesso(a.mensagem);
            $.each(a.dados, function( b, c ) {
                jAviso(b + ' === ' + c);
            });
            /*var c = 'INSERT INTO empresas ("uuid", "codigo_cliente", "codigo_ativacao", "cpf_cnpj", "nome_empresa", "data_hora_cadastro") VALUES ("' + uuid + '", "' + codigo_cliente + '", "' + codigo_ativacao + '", "15382516000115", "S2I MOBILE - Teste", "' + date('Y-m-d H:i:s') + '");';
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
             });*/
        },
        error : function( c, a, b ) {
            block(true);
            var d = "";
            if ( c.status === 0 ) {
                d = ("Não conectar. \n Verifique Rede.");
            } else if ( c.status === 404 ) {
                d = ("A página solicitada não foi encontrada. [404]");
            } else if ( c.status === 500 ) {
                d = ("Erro interno do servidor. [500]");
            } else if ( a === "parsererror" ) {
                d = ("Solicitado JSON análise falhou.");
            } else if ( a === "timeout" ) {
                d = ("Erro de tempo limite.");
            } else if ( a === "abort" ) {
                d = ("Pedido Ajax abortada.");
            } else {
                d = ("Tipo do erro não detectado. /n " + c.responseText);
            }
            jAviso(d);
        }
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