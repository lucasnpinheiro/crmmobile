$(document).on("pageinit", function() {
    if (_session.get("usuario") != "" && _session.get("usuario") != undefined && _session.get("usuario") != null) {
        $(".crm_mobile_atutenticacao").html("Usuário: " + _session.get("usuario"));
    } else {
        window.location.href = 'index.html';
    }
    $(".logout").click(function(a) {
        a.preventDefault();
        _session.remove("reset_banco");
        _session.remove("usuario");
        _session.remove("id_usuario");
        _constant.redirect("index.html")
    });
    $(".limpar_banco_dados").click(function(a) {
        a.preventDefault();
        verificar_tabelas();
        _session.remove("reset_banco");
        _session.remove("usuario");
        _session.remove("id_usuario")
    });
});

// Wait for Cordova to load
// 
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is loaded and it is now safe to make calls Cordova methods
//
function onDeviceReady() {
    checkConnection();
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}