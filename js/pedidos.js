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
                                        html += '<li id_produtos="' + f.id_produtos + '" class="select_produtos">' + f.cod_produto + ' | ' + f.dsc_produto + '</li>';
                                    }
                                    $ul.html(html);
                                    $ul.listview("refresh");
                                    $ul.trigger("updatelayout");
                                    $(".select_produtos").on("click", function( b ) {
                                        b.preventDefault();
                                        _pedidos.select_produtos($(this).attr('id_produtos'));
                                        $(".select_produtos").remove();
                                    });
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
    select_produtos : function( id_produtos ) {
        db2.select(
                'produtos',
                '*',
                {
                    where : {
                        id_produtos : id_produtos
                    }
                },
        function( f ) {
            debug("TOTAL", f.rows.length);
            $.each(f.rows.item(0), function( z, x ) {
                $('#frm_novo_pedido_parte_2').find('#' + z + '_produto').val(x);
            });
            $('#frm_novo_pedido_parte_2').find('#quantidade_produto').focus();
        }
        );
    },
    add_produtos : function() {
        if ( _session.get('id_pedidos') != null ) {
            var g = "<tr>";
            g += '<th>' + $('#frm_novo_pedido_parte_2').find('#dsc_produto_produto').val() + '</th>';
            g += '<td>' + $('#frm_novo_pedido_parte_2').find('#cod_produto').val() + '</td>';
            g += '<td>' + $('#frm_novo_pedido_parte_2').find('#unidade_produto').val() + '</td>';
            g += '<td><input type="text" data-mini="true" name="desconto_produto_unitario" id="desconto_produto_unitario" value="' + $('#frm_novo_pedido_parte_2').find('#desconto_produto').val() + '" placeholder="Desconto"></td>';
            g += '<td><input type="text" data-mini="true" name="quatidade_produto_unitario" id="quatidade_produto_unitario" value="' + $('#frm_novo_pedido_parte_2').find('#quatidade_produto').val() + '" placeholder="Desconto"></td>';
            g += '<td><input type="text" data-mini="true" name="valor_produto_unitario" id="valor_produto_unitario" value="' + $('#frm_novo_pedido_parte_2').find('#valor_produto').val() + '" placeholder="Desconto"></td>';
            g += '<td><a href="#" data-role="button" data-icon="minus" data-iconpos="notext" data-theme="e" data-inline="true" class="select_produtos">Remover</a></td>';
            g += "</tr>";
            $("#table-itens-pedidos tbody").append(g);
            $("#table-itens-pedidos").table("refresh");

            db2.select(
                    'pedidos_itens',
                    'id_pedidos_itens',
                    {
                        where : {
                            id_pedidos : _session.get('id_pedidos'),
                            id_produtos : $('#frm_novo_pedido_parte_2').find('#id_produtos').val()
                        }
                    },
            function( f ) {
                if ( f.rows.length != 0 ) {
                    db2.update(
                            'pedidos_itens',
                            {
                                data_hora_cadastro : $('#frm_novo_pedido_parte_2').find('#id_produtos').val(),
                                quantidade : $('#frm_novo_pedido_parte_2').find('#quantidade_produto').val(),
                                valor_unitario : $('#frm_novo_pedido_parte_2').find('#valor_produto').val(),
                                valor_desconto : $('#frm_novo_pedido_parte_2').find('#desconto_produto').val()
                            },
                    {
                        id_pedidos : _session.get('id_pedidos'),
                        id_produtos : $('#frm_novo_pedido_parte_2').find('#id_produtos').val(),
                    },
                            function( f ) {
                                $('#frm_novo_pedido_parte_2 :input').val('');
                            });
                } else {
                    db2.insert(
                            'pedidos_itens',
                            {
                                id_pedidos : _session.get('id_pedidos'),
                                id_produtos : $('#frm_novo_pedido_parte_2').find('#id_produtos').val(),
                                data_hora_cadastro : $('#frm_novo_pedido_parte_2').find('#id_produtos').val(),
                                quantidade : $('#frm_novo_pedido_parte_2').find('#quantidade_produto').val(),
                                valor_unitario : $('#frm_novo_pedido_parte_2').find('#valor_produto').val(),
                                valor_desconto : $('#frm_novo_pedido_parte_2').find('#desconto_produto').val()
                            },
                    function( f ) {
                        $('#frm_novo_pedido_parte_2 :input').val('');
                    });
                }
            });
        } else {
            _pedidos.novo_pedido();
        }
    },
    novo_pedido : function() {
        db2.insert(
                'pedidos',
                {
                    id_empresas : _session.get('id_empresas'),
                    id_clientes : _session.get('id_clientes'),
                    id_usuarios : _session.get('cod_usuario'),
                    data_hora_cadastro : date('Y-m-d H:i:s'),
                    numero_pedido : '',
                    observacao : '',
                    situacao_envio : 1,
                    situacao_pedido : 1,
                    valor_total : '0.00'
                },
        function( f ) {
            _session.get('id_pedidos', f.insertId);
            _pedidos.add_produtos();
        }
        );
    }
};
