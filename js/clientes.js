$(document).on("pageinit", function() {
    _clientes.ultimos();
    $("form").insere_mascara();
    $("#bt_consultar_cliente").on("click", function( b ) {
        b.preventDefault();
        if ( $.trim($("#search").val()) != "" ) {
            _clientes.consultar('dsc_cliente LIKE "%' + $("#search").val() + '%" OR cod_cliente LIKE "%' + $("#search").val() + '%"');
        } else {
            jAviso("Informe o nome do cliente ou código do cliente.");
        }
    });
});

_clientes = {
    ultimos : function() {
        _clientes.consultar('');
    },
    consultar : function( a ) {
        block(false);
        $("#table-clientes tbody").html("");
        db2.select(
                'clientes',
                '*',
                {
                    where : a,
                    options : {
                        limit : 100,
                        order : 'data_hora_atualizacao'
                    }
                },
        function( f ) {
            debug("TOTAL", f.rows.length);
            if ( f.rows.length == 0 ) {
                jAviso("Nenum registro localizado.");
            } else {
                for ( var e = 0; e < f.rows.length; e++ ) {
                    var v = f.rows.item(e);
                    var g = '<tr cod_cliente="' + v.cod_cliente + '">';
                    g += ' <th>' + v.dsc_cliente + '</th>';
                    g += ' <td>' + v.cod_cliente + '</td>';
                    g += ' <td style="color : red;">' + number_format(v.valor_devido, 2, ",", ".") + '</td>';
                    g += ' <td>' + _situacoes.clientes[v.situacao] + '</td>';
                    g += ' <td>' + date("d/m/Y H:i:s", new Date(v.data_hora_atualizacao)) + '</td>';
                    g += ' <td> <a href="#" data-role="button" data-icon="bars" data-theme="c" data-inline="true" class="bt_cliente_detalhes">Detalhes</a> <a href="#" data-role="button" data-icon="plus" data-theme="c" data-inline="true" class="bt_cliente_novo_pedido">Novo Pedido</a> </td>';
                    g += '</tr>';
                    $("#table-clientes tbody").append(g);
                }
                _clientes.atualiza_table();
            }
            block(true);
        });
    },
    atualiza_table : function() {
        $('.ui-table-cell-label').remove();
        $('#table-clientes').table("refresh");
        $("#table-clientes a").buttonMarkup({
            inline : true,
            iconpos : "notext",
            theme : "c"
        }).click(function( b ) {
            b.preventDefault();
            var cod_cliente = $(this).closest('tr').attr('cod_cliente');
            _session.set("cod_cliente", cod_cliente);
            if ( $(this).hasClass('bt_cliente_detalhes') ) {
                _constant.redirect("pedidos_novo_01.html");
            } else if ( $(this).hasClass('bt_cliente_novo_pedido') ) {
                _constant.redirect("pedidos_novo_01.html");
            }
        });
    }
};