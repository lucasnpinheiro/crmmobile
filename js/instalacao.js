$(document).on("pageinit", function() {
    $(".crm_mobile_versao").html("Versão: " + _constant.version);
    block(false);
   _configuracoes.verifica_tabelas();
});
