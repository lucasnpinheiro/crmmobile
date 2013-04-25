$(document).on('pageinit', function() {
    $('form').insere_mascara();
    $('.bt_ativar').click(function( a ) {
        a.preventDefault();
        if ( $(this).closest("form").form_valida() == true ) {
            _ativacao.campos.uuid = $('#devUUID').text();
            _ativacao.campos.modelo = $('#devName').text();
            _ativacao.campos.plataforma = $('#devPlatform').text();
            _ativacao.campos.versao = $('#devVersion').text();
            alert('a');
            alert(json_encode(_ativacao.campos));
            if ( _ativacao.campos.uuid == '' ) {
                _ativacao.campos.codigo_cliente = $('#codigo_cliente').val();
                _ativacao.campos.modelo = navigator.appCodeName;
                _ativacao.campos.plataforma = navigator.platform;
                _ativacao.campos.versao = navigator.appVersion;
                _ativacao.campos.uuid = gerar_chave();
            }
            alert('b');
            alert(json_encode(_ativacao.campos));
            _ativacao.ativar();
        }
    });
});

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

_ativacao = {
    campos : {
        uuid : '',
        modelo : '',
        plataforma : '',
        versao : '',
        codigo_cliente : '',
        cod_ativacao : '',
        cpf_cnpj : '',
        nome_empresa : '',
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
            if ( a.cod_retorno == 999 ) {
                jSucesso(a.mensagem);
            } else {
                _ativacao.campos.cod_ativacao = a.dados.dscHash;
                _ativacao.campos.cpf_cnpj = a.dados.documento;
                _ativacao.campos.nome_empresa = a.dados.dscEmpresa;
                _ativacao.campos.id_empresas = a.dados.idEmpresas;
                alert('c');
                alert(json_encode(_ativacao.campos));
                _ativacao.insert();
            }
            jSucesso(a.cod_retorno);
        },
        error : function(  ) {
            block(true);
        }
    });
}

_ativacao.insert = function() {
    alert('d');
    alert(json_encode(_ativacao.campos));
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
                        }
                );
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