$(document).on('pageinit', function() {
    $('form').insere_mascara();
});
// get device info
function getDeviceInfo() {
    $('#devName').text(_session.get("config_device_name"));
    $('#devPlatform').text(_session.get("config_device_platform"));
    $('#devUUID').text(_session.get("config_device_uuid"));
    $('#devVersion').text(_session.get("config_device_version"));
    $('#devModel').text(_session.get("config_device_model"));
    $('#devCordova').text(_session.get("config_device_cordova"));
}