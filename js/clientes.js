$(document).on("pageinit", function() {
    _clientes.ultimos();
    $("form").insere_mascara();
    $("#bt_consultar_clientes").on("click", function( b ) {
        b.preventDefault();
        if ( $.trim($("#search").val()) != "" ) {
            var a = 'SELECT * FROM clientes WHERE dsc_cliente LIKE "%' + $("#search").val() + '%" OR cod_cliente LIKE "%' + $("#search").val() + '%" ORDER BY data_hora_atualizacao DESC LIMIT 100';
            _clientes.consultar(a);
        } else {
            jAviso("Informe o nome do cliente ou código do cliente.");
        }
    });
    $(".bt_cliente_novo_pedido, .bt_cliente_detalhes").on("click", function( b ) {
        b.preventDefault();
        var cod_cliente = $(this).closest('tr').attr('cod_cliente');
        _session.set("cod_cliente", cod_cliente);
        if($(this).hasClass('bt_cliente_detalhes')){
            _constant.redirect("pedidos_novo_01.html");
        } else if($(this).hasClass('bt_cliente_novo_pedido')){
            _constant.redirect("pedidos_novo_01.html");
        }
    });
});

_clientes = {
    ultimos : function() {
        var a = "SELECT * FROM clientes ORDER BY data_hora_atualizacao DESC LIMIT 10";
        _clientes.consultar(a);
    },
    consultar : function( a ) {
        $("#table-clientes tbody").html("");
        db.transaction(function( b ) {
            b.executeSql(a, [ ],
                    function( d, c ) {
                        debug("QUERY", a);
                        debug("TOTAL", c.rows.length);
                        if ( c.rows.length == 0 ) {
                            jAviso("Nenum registro localizado.");
                        } else {
                            for ( var e = 0; e < c.rows.length; e++ ) {
                                var f = c.rows.item(e);
                                var g = '<tr cod_cliente="' + f.cod_cliente + '">';
                                g += ' <th>' + f.dsc_cliente + '</th>';
                                g += ' <td>' + f.cod_cliente + '</td>';
                                g += ' <td>' + f.valor_devido + '</td>';
                                g += ' <td>' + f.situacao + '</td>';
                                g += ' <td>' + f.data_hora_atualizacao + '</td>';
                                g += ' <td> <a href="#" data-role="button" data-icon="bars" data-iconpos="notext" data-theme="c" data-inline="true" class="bt_cliente_detalhes">Detalhes</a> <a href="#" data-role="button" data-icon="plus" data-iconpos="notext" data-theme="c" data-inline="true" class="bt_cliente_novo_pedido">Novo Pedido</a></td>';
                                g += '</tr>';
                                $("#table-clientes tbody").append(g);
                            }
                            $("#table-clientes").table("refresh");
                        }
                    },
                    function( d, c ) {
                        debug("QUERY", a);
                        debug("ERROR", c.message);
                    });
        });
    }
};