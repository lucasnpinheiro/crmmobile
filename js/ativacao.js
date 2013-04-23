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
            nome_dispositivo : $('#devName').text() || 'SGH-T849',
            plataforma : $('#devPlatform').text() || 'Android',
            versao_plataforma : $('#devVersion').text() || '2.2',
            uuid : uuid
        },
        beforeSend : function() {
            block(false);
        },
        success : function( a ) {
            if ( a.cod_retorno == 999 ) {
                jSucesso(a.mensagem);
            } else {
                insert_solicitar_ativacao(codigo_cliente, uuid, a.dados.dscChave, a.dados.idEmpresas.documento, a.dados.idEmpresas.dscEmpresa);
            }
            jSucesso(a.cod_retorno);
        },
        error : function(  ) {
            block(true);
        }
    });
}

function insert_solicitar_ativacao( codigo_cliente, uuid, cod_ativacao, cpf_cnpj, nome_empresa ) {
    db2.replace(
            'empresas',
            {
                uuid : uuid,
                codigo_cliente : codigo_cliente,
                cod_ativacao : cod_ativacao,
                cpf_cnpj : cpf_cnpj,
                nome_empresa : nome_empresa,
                data_hora_cadastro : date('Y-m-d H:i:s')
            },
    function(  ) {
        jSucesso('Ativação realizada com sucesso.');
        _constant.redirect("login.html");
    }
    );
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