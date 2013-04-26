$(document).on('pageinit', function() {

    $('form').insere_mascara();
    $('.bt_ativar').click(function( a ) {
        a.preventDefault();
        if ( $(this).closest("form").form_valida() == true ) {
            _ativacao.campos.codigo_cliente = $('#codigo_cliente').val();
            _ativacao.campos.uuid = $('#devUUID').text();
            _ativacao.campos.modelo = $('#devName').text();
            _ativacao.campos.plataforma = $('#devPlatform').text();
            _ativacao.campos.versao = $('#devVersion').text();
            if ( _ativacao.campos.uuid == '' ) {
                _ativacao.campos.modelo = navigator.appCodeName;
                _ativacao.campos.plataforma = navigator.platform;
                _ativacao.campos.versao = navigator.appVersion;
                _ativacao.campos.cod_ativacao = gerar_chave();
                _ativacao.campos.uuid = gerar_chave();
            }
            _ativacao.ativar();
        }
    });
});

_ativacao = {
    campos : {
        id_empresas : 1,
        uuid : '',
        modelo : '',
        plataforma : '',
        versao : '',
        codigo_cliente : '',
        cod_ativacao : '',
        cpf_cnpj : '04833542000104',
        nome_empresa : 'EMPRESA TESTE',
        data_hora_cadastro : date('Y-m-d H:i:s')
    }
}
_ativacao.ativar = function() {
    $.send({
        url : _situacoes.urls.ativacao,
        type : 'POST',
        crypt : true,
        data : {
            cod_cliente : _ativacao.campos.codigo_cliente,
            nome_dispositivo : _ativacao.campos.modelo,
            plataforma : _ativacao.campos.plataforma,
            versao_plataforma : _ativacao.campos.versao,
            uuid : _ativacao.campos.uuid
        },
        beforeSend : function() {
            block(false);
        },
        success : function( a ) {
            _ativacao.campos.cod_ativacao = a.dados.dscHash;
            _ativacao.campos.cpf_cnpj = a.dados.documento;
            _ativacao.campos.nome_empresa = a.dados.dscEmpresa;
            _ativacao.campos.id_empresas = a.dados.idEmpresas;
            _ativacao.insert();
        },
        error : function(  ) {
            _ativacao.insert();
        }
    });
}

_ativacao.insert = function() {
    db2.destroy(
            'empresas',
            '1=1',
            function(  ) {
                db2.insert(
                        'empresas',
                        _ativacao.campos,
                        function(  ) {
                            jSucesso('Ativação realizada com sucesso.');
                            _constant.redirect("login.html");
                        },
                        function( error, query ) {
                            jSucesso("QUERY", query + ' <br/>Oops. ' + error.message + ' (Code ' + error.code + ')');
                        }
                );
            },
            function( error, query ) {
                jSucesso("QUERY", query + ' <br/>Oops. ' + error.message + ' (Code ' + error.code + ')');
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

function gerar_chave() {
    var c = Math.ceil(Math.random() * 1000000) + "a" + md5((Math.ceil(Math.random() * 1000000) + "v" + md5(_ativacao.campos.versao) + 'r' + Math.ceil(Math.random() * 1000000))) + 'z' + Math.ceil(Math.random() * 1000000);
    var s = '';
    for ( var i = 0; i < c.length; i++ ) {
        if ( i % 2 == 0 ) {
            s += c[i];
        }
    }
    return  s.substr((Math.ceil(s.length / 4) - 1), 16);
}