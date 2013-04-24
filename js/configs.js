var _situacoes = {
    urls : {
        ativacao : "http://s2i.com.br:8084/WsCrmMobile/ativar",
        produtos_total : "http://s2i.com.br:8084/WsCrmMobile/produtos/registros/",
        produtos_lista : "http://s2i.com.br:8084/WsCrmMobile/produtos",
        clientes_total : "http://s2i.com.br:8084/WsCrmMobile/clientes/registros/",
        clientes_lista : "http://s2i.com.br:8084/WsCrmMobile/clientes",
        usuarios_total : "http://s2i.com.br:8084/WsCrmMobile/usuarios/registros/",
        usuarios_lista : "http://s2i.com.br:8084/WsCrmMobile/usuarios",
        pedidos_total : "http://s2i.com.br:8084/WsCrmMobile/pedidos/registros/",
        pedidos_lista : "http://s2i.com.br:8084/WsCrmMobile/pedidos"
    },
    clientes : {
        1 : '<span class="situacoes_clientes_1">Ativo</span>',
        2 : '<span class="situacoes_clientes_2">Inativo</span>',
        3 : '<span class="situacoes_clientes_3">Bloqueado</span>',
        4 : '<span class="situacoes_clientes_4">Bloqueado pagamento</span>',
        5 : '<span class="situacoes_clientes_5">Cancelado</span>'
    },
    sincronizacao : {
        1 : '<span class="situacoes_sincronizacao_1">Sincronizado</span>',
        2 : '<span class="situacoes_sincronizacao_2">Error</span>',
        3 : '<span class="situacoes_sincronizacao_3">Não sincronizado</span>',
        4 : '<span class="situacoes_sincronizacao_4">Sincronizando</span>',
        5 : '<span class="situacoes_sincronizacao_5">Cancelado</span>'
    },
    pedido : {
        1 : '<span class="situacoes_pedido_1">Aguardando</span>',
        2 : '<span class="situacoes_pedido_2">Enviado</span>',
        3 : '<span class="situacoes_pedido_3">Error</span>',
        4 : '<span class="situacoes_pedido_4">Cancelado</span>',
        5 : '<span class="situacoes_pedido_5">Aberto</span>'
    },
    produtos : {
        1 : '<span class="situacoes_produtos_1">{0}</span>',
        2 : '<span class="situacoes_produtos_2">{0}</span>',
        min : '<span class="situacoes_produtos_3">{0}</span>',
        max : '<span class="situacoes_produtos_4">{0}</span>'
    }
};
var db = null;
if ( window.openDatabase ) {
    var db = window.openDatabase("crm_mobile", "", "CRM MOBILE", 5 * 1000 * 1000);
    var db2 = SQLite({
        shortName : 'crm_mobile',
        displayName : "CRM MOBILE",
        maxSize : (5 * 1000 * 1000)
    });
} else {
    jAviso("Navegador sem suporte ao banco de dados SqLite.")
}
$(document).bind("mobileinit", function() {
    $.extend($.mobile, {
        phonegapNavigationEnabled : true,
        allowCrossDomainPages : true,
        ajaxEnabled : false,
        touchOverflowEnabled : false,
        defaultPageTransition : "none",
        defaultDialogTransition : "none",
        loadingMessage : "Carregando...",
        buttonMarkup : {
            hoverDelay : 0
        }
    });
});