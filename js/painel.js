$(document).on("pageinit", function() {
    if ( _session.get("usuario") != "" && _session.get("usuario") != undefined && _session.get("usuario") != null ) {
        $(".crm_mobile_atutenticacao").html("Usuário: " + _session.get("usuario"));
        if ( _session.get('nivel') == 1 ) {
            $('.painel_extra').show();
        }
    } else {
        _constant.redirect('login.html');
    }
    $(".logout").click(function( a ) {
        a.preventDefault();
        _session.clear();
        _constant.redirect("login.html");
    });
    $(".sair").click(function( a ) {
        a.preventDefault();
        _session.clear();
        navigator.app.exitApp();
    });
    $(".limpar_banco_dados").click(function( a ) {
        a.preventDefault();
        _session.clear();
        _configuracoes.drop_tabelas();
    });
});