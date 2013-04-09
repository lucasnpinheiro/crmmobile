$(document).on("pageinit", function() {
    if (_session.get("usuario") != "" && _session.get("usuario") != undefined && _session.get("usuario") != null) {
        $(".crm_mobile_atutenticacao").html("Usuário: " + _session.get("usuario"));
    } else {
        window.location.href = 'index.html';
    }
    $(".logout").click(function(a) {
        a.preventDefault();
        _session.clear();
        _constant.redirect("index.html")
    });
    $(".limpar_banco_dados").click(function(a) {
        a.preventDefault();
        verificar_tabelas();
        _session.clear();
    });
});

// Wait for Cordova to load
// 
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is loaded and it is now safe to make calls Cordova methods
//
function onDeviceReady() {
    _session.set("config_device_name", device.name);
    _session.set("config_device_cordova", device.cordova);
    _session.set("config_device_platform", device.platform);
    _session.set("config_device_uuid", device.uuid);
    _session.set("config_device_model", device.model);
    _session.set("config_device_version", device.version);
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

    _session.set("config_conexao_nome", states[networkState]);
    _session.set("config_conexao_id", networkState);
}