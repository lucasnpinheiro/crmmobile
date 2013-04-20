$(document).on("pageinit", function() {
    $(".crm_mobile_versao").html("Versão: " + _constant.version);
    block(false);

    // Wait for Cordova to load
    // 
    document.addEventListener("deviceready", onDeviceReady, false);

    _configuracoes.verifica_tabelas();
});

// Cordova is loaded and it is now safe to make calls Cordova methods
//
function onDeviceReady() {
    checkConnection();
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {
    };
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    _session.set('connection_type', networkState);
    alert('Connection type: ' + states[networkState]);
}