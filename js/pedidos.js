$(document).on("pageinit", function() {
    if ( $("#frm_novo_pedido_parte_1").length > 0 ) {
        if ( _session.get('cod_cliente') == null ) {
            jAviso('Cliente não informado.');
            _constant.redirect("clientes_consultar.html");
        }
    }
    _pedidos.get_produtos();
    _pedidos.ultimos();
    $("#bt_consultar_pedidos").on("click", function( b ) {
        b.preventDefault();
        _pedidos.consulta(this);
    });
    $("#autocomplete ul li").on("click", function( b ) {
        b.preventDefault();
        _pedidos.select_produtos($(this).attr('cod_produto'));
    });
    $(".select_produtos").on("click", function( b ) {
        b.preventDefault();
        _pedidos.select_produtos($(this).attr('cod_produto'));
        $('.ui-listview-filter').find(':input').val('');
        $('#autocomplete').html('');
        $ul.listview("refresh");
        $ul.trigger("updatelayout");
    });
    $("form").insere_mascara();
});

_pedidos = {
    total : 0,
    qtd_itens : 0,
    qtd_volume : 0,
    qtd_parcelas : 0,
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
    },
    get_produtos : function() {
        $("#autocomplete").on("listviewbeforefilter", function( e, data ) {
            var $ul = $(this),
                    $input = $(data.input),
                    value = $input.val(),
                    html = "";
            $ul.html("");
            if ( value && value.length > 1 ) {
                $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
                $ul.listview("refresh");
                var a = 'SELECT * FROM produtos WHERE dsc_produto LIKE "%' + value + '%" OR cod_produto LIKE "%' + value + '%" ORDER BY data_hora_atualizacao DESC LIMIT 100';
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
                                        html += '<li cod_produto="' + f.cod_produto + '" class="select_produtos">' + f.cod_produto + ' | ' + f.dsc_produto + '</li>';
                                    }
                                    $ul.html(html);
                                    $ul.listview("refresh");
                                    $ul.trigger("updatelayout");
                                }
                            },
                            function( d, c ) {
                                debug("QUERY", a);
                                debug("ERROR", c.message);
                            });
                });
            }
        });
    },
    select_produtos : function( cod_produto ) {
        var a = 'SELECT * FROM produtos WHERE cod_produto = "' + cod_produto + '"';
        db.transaction(function( b ) {
            b.executeSql(a, [ ],
                    function( d, c ) {
                        debug("QUERY", a);
                        debug("TOTAL", c.rows.length);
                        var f = c.rows.item(0);
                        $('#frm_novo_pedido_parte_2 #codigo_produto').val(f.codigo_produto);
                        $('#frm_novo_pedido_parte_2 #valor_produto').val(f.valor_produto);
                        $('#frm_novo_pedido_parte_2 #estoque_produto').val(f.estoque_produto);
                        $('#frm_novo_pedido_parte_2 #desconto_maximo_produto').val(f.desconto_maximo_produto);
                        $('#frm_novo_pedido_parte_2 #unidade_produto').val(f.unidade_produto);
                        $('#frm_novo_pedido_parte_2 #desconto_produto').val('');
                        $('#frm_novo_pedido_parte_2 #quantidade_produto').val('');
                    },
                    function( d, c ) {
                        debug("QUERY", a);
                        debug("ERROR", c.message);
                    });
        });
    }
};
