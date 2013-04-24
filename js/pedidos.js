$(document).on("pageinit", function() {
    $("#bt_consultar_pedidos").on("click", function( b ) {
        b.preventDefault();
        _pedidos.consulta(this);
    });

    $("#bt_adicionar_produtos").on("click", function( b ) {
        b.preventDefault();
        _pedidos.add_produtos();
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
        var and = {
        };
        $(obj).closest('form').find(':input').each(function() {
            switch ( this.name ) {
                case 'codigo_pedido':
                    if ( $.trim($(this).val()) != '' ) {
                        and['p.id_pedidos'] = $(this).val();
                    }
                    break;

                case 'cliente':
                    if ( $.trim($(this).val()) != '' ) {
                        and['c.dsc_cliente LIKE "%'] = $(this).val() + '%"';
                    }
                    break;

                case 'data':
                    if ( $.trim($(this).val()) != '' ) {
                        and['date(p.data_hora_cadastro)'] = convert_date($(this).val());
                    }
                    break;

                case 'situacao_envio':
                    if ( $.isNumeric($(this).val()) ) {
                        and['p.situacao_envio'] = $(this).val();
                    }
                    break;

                case 'situacao_pedido':
                    if ( $.isNumeric($(this).val()) ) {
                        and['p.situacao_pedido'] = $(this).val();
                    }
                    break;
            }
        });
        _pedidos.consultar({
            where : and,
            options : {
                limit : 100,
                order : 'p.data_hora_cadastro DESC'
            }
        });
    },
    ultimos : function() {
        _pedidos.consultar({
            options : {
                limit : 100,
                order : 'p.data_hora_cadastro DESC'
            }
        });
    },
    consultar : function( condicoes ) {
        $("#table-consulta-pedidos tbody").html("");
        db2.select(
                'pedidos as p LEFT JOIN clientes as c on c.id_clientes = p.id_clientes',
                'p.*, c.dsc_cliente',
                condicoes,
                function( f ) {
                    debug("TOTAL", f.rows.length);
                    if ( f.rows.length == 0 ) {
                        jAviso("Nenum registro localizado.");
                    } else {
                        $.each(f.rows.item, function( k, v ) {
                            var g = "<tr>";
                            g += ' <th>' + v.dsc_cliente + "</th>";
                            g += ' <td>' + v.id_pedidos + "</td>";
                            g += ' <td>' + v.valor_total + "</td>";
                            g += ' <td>' + v.data_hora_cadastro + "</td>";
                            g += ' <td>' + v.situacao_pedido + "</td>";
                            g += ' <td><a href="#" data-role="button" data-icon="bars" data-iconpos="notext" data-theme="c" data-inline="true">Detalhes</a></td>';
                            g += "</tr>";
                            $("#table-consulta-pedidos tbody").append(g);
                        });
                        _pedidos.atualiza_table();
                    }
                });
    },
    get_cliente : function() {
        db2.select(
                'clientes',
                '*',
                {
                    where : {
                        cod_cliente : _session.get('cod_cliente')
                    }
                },
        function( f ) {
            debug("TOTAL", f.rows.length);
            $.each(f.rows.item(0), function( z, x ) {
                if ( z == 'data_hora_atualizacao' ) {
                    x = date("d/m/Y H:i:s", new Date(x));
                } else if ( z == 'valor_devido' ) {
                    x = number_format(x, 2, ",", ".");
                } else if ( z == 'situacao' ) {
                    x = _situacoes.clientes[v.situacao]
                }
                $('#' + z).html(x);
            });
            _pedidos.atualiza_table();
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
        });
    },
    _add_produtos_table : function( quantidade ) {
        var g = "<tr>";
        g += '<th>' + $('#frm_novo_pedido_parte_2').find('#dsc_produto_produto').val() + '</th>';
        g += '<td>' + $('#frm_novo_pedido_parte_2').find('#cod_produto_produto').val() + '</td>';
        g += '<td>' + $('#frm_novo_pedido_parte_2').find('#unidade_produto').val() + '</td>';
        g += '<td>' + $('#frm_novo_pedido_parte_2').find('#desconto_produto').val() + '</td>';
        g += '<td>' + quantidade + '</td>';
        g += '<td>' + $('#frm_novo_pedido_parte_2').find('#valor_produto').val() + '</td>';
        g += '<td><a href="#" data-role="button" data-icon="minus" data-iconpos="notext" data-theme="e" data-inline="true" class="select_produtos">Remover</a></td>';
        g += "</tr>";
        $("#table-itens-pedidos tbody").append(g);
        _pedidos.atualiza_table();
        $('#frm_novo_pedido_parte_2 :input').val('');
    },
    add_produtos : function() {
        if ( _session.get('id_pedidos') != null ) {
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
                                data_hora_cadastro : date('Y-m-d H:i:s'),
                                quantidade : parseFloat(f.rows.item(0).quantidade) + convert_moeda($('#frm_novo_pedido_parte_2').find('#quantidade_produto').val() || '1,000'),
                                valor_unitario : $('#frm_novo_pedido_parte_2').find('#valor_produto').val(),
                                valor_desconto : convert_moeda($('#frm_novo_pedido_parte_2').find('#desconto_produto').val() || '0,00')
                            },
                    {
                        id_pedidos : _session.get('id_pedidos'),
                        id_produtos : $('#frm_novo_pedido_parte_2').find('#id_produtos_produto').val()
                    },
                    function( ) {
                        _pedidos._add_produtos_table(parseFloat(f.rows.item(0).quantidade) + convert_moeda($('#frm_novo_pedido_parte_2').find('#quantidade_produto').val() || '1,000'));
                    });
                } else {
                    db2.insert(
                            'pedidos_itens',
                            {
                                id_pedidos : _session.get('id_pedidos'),
                                id_produtos : $('#frm_novo_pedido_parte_2').find('#id_produtos_produto').val(),
                                data_hora_cadastro : date('Y-m-d H:i:s'),
                                quantidade : convert_moeda($('#frm_novo_pedido_parte_2').find('#quantidade_produto').val() || '1,000'),
                                valor_unitario : $('#frm_novo_pedido_parte_2').find('#valor_produto').val(),
                                valor_desconto : convert_moeda($('#frm_novo_pedido_parte_2').find('#desconto_produto').val() || '0,00')
                            },
                    function( ) {
                        _pedidos._add_produtos_table(convert_moeda($('#frm_novo_pedido_parte_2').find('#quantidade_produto').val() || '1,000'));
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
            _session.set('id_pedidos', f.insertId);
            _pedidos.add_produtos();
        }
        );
    },
    atualiza_table : function() {
        $('.ui-table-cell-label').remove();
        $("table :input").textinput({
            mini : true
        });
        $('table').table("refresh");
        $("table a").buttonMarkup({
            inline : true,
            iconpos : "notext",
            theme : "c"
        });
    }
};
