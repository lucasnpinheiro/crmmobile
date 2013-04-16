$(document).on("pageinit", function() {
    _pedidos.ultimos();
    $("#bt_consultar_pedidos").on("click", function( b ) {
        b.preventDefault();
        _pedidos.consulta(this);
    });
    $("form").insere_mascara();
});

_pedidos = {
    consulta : function( obj ) {
        var form = $(obj).closest('form').find(':input');
        var and = '';
        $.each(form, function() {
            switch ( this.name ) {
                case 'codigo_pedido':
                    if ( $.trim($(this).val()) != '' ) {
                        and += (and == '' ? ' WHERE ' : ' AND ');
                        and += ' p.id_pedidos = "' + $(this).val() + '" ';
                    }
                    break;

                case 'cliente':
                    if ( $.trim($(this).val()) != '' ) {
                        and += (and == '' ? ' WHERE ' : ' AND ');
                        and += ' c.dsc_cliente LIKE "%' + $(this).val() + '%"';
                    }
                    break;

                case 'data':
                    if ( $.trim($(this).val()) != '' ) {
                        and += (and == '' ? ' WHERE ' : ' AND ');
                        and += ' date(p.data_hora_cadastro) = "' + convert_date($(this).val()) + '"';
                    }
                    break;

                case 'situacao_envio':
                    if ( $.isNumeric($(this).val()) ) {
                        and += (and == '' ? ' WHERE ' : ' AND ');
                        and += ' p.situacao_envio = "' + $(this).val() + '"';
                    }
                    break;

                case 'situacao_pedido':
                    if ( $.isNumeric($(this).val()) ) {
                        and += (and == '' ? ' WHERE ' : ' AND ');
                        and += ' p.situacao_pedido = "' + $(this).val() + '"';
                    }
                    break;
            }
        });
        and += ' ORDER BY p.data_hora_cadastro DESC LIMIT 100';
        _pedidos.consultar('SELECT p.*, c.dsc_cliente FROM pedidos as p LEFT JOIN clientes as c on c.id_clientes = p.id_clientes ' + and);
    },
    ultimos : function() {
        if ( $("#table-consulta-pedidos").length > 0 ) {
            _pedidos.consultar('SELECT p.*, c.dsc_cliente FROM pedidos as p LEFT JOIN clientes as c on c.id_clientes = p.id_clientes ORDER BY p.data_hora_cadastro DESC LIMIT 100');
        }
    },
    consultar : function( a ) {
        $("#table-consulta-pedidos tbody").html("");
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
                                var g = "<tr>";
                                g += ' <th>' + f.dsc_cliente + "</th>";
                                g += ' <td>' + f.id_pedidos + "</td>";
                                g += ' <td>' + f.valor_total + "</td>";
                                g += ' <td>' + f.data_hora_cadastro + "</td>";
                                g += ' <td>' + f.situacao_pedido + "</td>";
                                g += ' <td><a href="#" data-role="button" data-icon="bars" data-iconpos="notext" data-theme="c" data-inline="true">Detalhes</a></td>';
                                g += "</tr>";
                                $("#table-consulta-pedidos tbody").append(g);
                            }
                            $("#table-consulta-pedidos").table("refresh");
                        }
                    },
                    function( d, c ) {
                        debug("QUERY", a);
                        debug("ERROR", c.message);
                    });
        });
    }
};
