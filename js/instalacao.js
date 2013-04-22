$(document).on("pageinit", function() {
    block(false);
    document.addEventListener("deviceready", onDeviceReady, false);
    _configuracoes.verifica_tabelas();
});
function onDeviceReady() {
    checkConnection();
}
function checkConnection() {
    var networkState = navigator.connection.type;
    _session.set('connection_type', networkState);
    $(".crm_mobile_versao").html("Versão: " + _constant.version + " | Conexão: " + _session.get('connection_type'));
}