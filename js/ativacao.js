$(document).on('pageinit', function() {
    $('form').insere_mascara();
    $('.bt_ativar').click(function( e ) {
        a.preventDefault();
        if ( $(this).closest("form").form_valida() == true ) {
            var codigo_cliente = $('#codigo_cliente').val();
            var uuid = _session.get('uuid');
            var codigo_ativacao = Math.random()*10000000;
            solicitar_ativacao( codigo_cliente, uuid, codigo_ativacao );
        }
    });
});

function solicitar_ativacao( codigo_cliente, uuid, codigo_ativacao ) {
    var c = 'INSERT INTO usuarios (uuid, codigo_cliente, codigo_ativacao, cpf_cnpj, nome_empresa, data_hora_cadastro) VALUES ("'+uuid+'", "'+codigo_cliente+'", "'+codigo_ativacao+'", "15382516000115", "S2I MOBILE, Teste", "'+date('Y-m-d H:i:s')+'");';
    db.transaction(function( e ) {
        e.executeSql(c, [ ], function( g, f ) {
            debug("SUCESSO", c);
            jSucesso('Ativação realizada com sucesso.');
            _constant.redirect("painel.html");
        }, function( g, f ) {
            jAviso('Problemas na ativação tentar novamente.');
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
    _session.set('uuid', device.uuid);
}