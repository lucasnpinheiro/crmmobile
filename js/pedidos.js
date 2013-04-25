$(document).on("pageinit", function() {
    $("#bt_consultar_pedidos").on("click", function( b ) {
        b.preventDefault();
        _pedidos.all(this);
    });

    $("#bt_adicionar_produtos").on("click", function( b ) {
        b.preventDefault();
        _pedidos.add();
    });

    $(".select_produtos").on("click", function( b ) {
        b.preventDefault();
        _produtos.select($(this).attr('cod_produto'));
        $('.ui-listview-filter').find(':input').val('');
        $('#autocomplete').html('');
        $ul.listview("refresh");
        $ul.trigger("updatelayout");
    });
    $("form, table").insere_mascara();
});
_produtos = {
};
_clientes = {
};
// constantes do objeto pedido
_pedidos = {
    total : 0,
    qtd_itens : 0,
    qtd_volume : 0,
    qtd_parcelas : 0,
    form : {
        dsc : '',
        cod : '',
        unidade : '',
        desconto : '',
        valor : '',
        id : '',
        quantidade : ''
    }
}
// consulta pedido por filtro
_pedidos.all = function( obj ) {
    var and = {
        id_empresas : _session.get('id_empresas')
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
                    and['c.dsc_cliente LIKE'] = $(this).val();
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
}

// consulta ultimos pedido
_pedidos.ultimos = function() {
    _pedidos.consultar({
        options : {
            limit : 100,
            order : 'p.data_hora_cadastro DESC'
        }
    });
}

// consulta pedidos e popula na view
_pedidos.consultar = function( condicoes ) {
    block(false);
    $("#table-consulta-pedidos tbody").html("");
    db2.select(
            'pedidos as p LEFT JOIN clientes as c on c.cod_cliente = p.id_clientes',
            'p.*, c.dsc_cliente, c.cod_cliente',
            condicoes,
            function( f ) {
                debug("TOTAL", f.rows.length);
                if ( f.rows.length == 0 ) {
                    jAviso("Nenum registro localizado.");
                } else {
                    for ( var e = 0; e < f.rows.length; e++ ) {
                        var v = f.rows.item(e);
                        var g = '<tr cod_cliente="' + v.cod_cliente + '">';
                        g += ' <th>' + v.dsc_cliente + '</th>';
                        g += ' <td>' + v.numero_pedido + '</td>';
                        g += ' <td>' + v.valor_total + '</td>';
                        g += ' <td>' + v.data_hora_cadastro + '</td>';
                        g += ' <td>' + v.situacao_pedido + "</td>";
                        g += ' <td> <a href="#" data-role="button" data-icon="bars" data-theme="c" data-inline="true" class="bt_cliente_novo_pedido">Novo Pedido</a> </td>';
                        g += '</tr>';
                        $("#table-consulta-pedidos tbody").append(g);
                    }
                    atualiza_table();
                    $(".bt_cliente_novo_pedido").click(function( b ) {
                        b.preventDefault();
                        var cod_cliente = $(this).closest('tr').attr('cod_cliente');
                        _session.set("cod_cliente", cod_cliente);
                        _constant.redirect("pedidos_novo_01.html");
                    });
                }
                block(true);
            });
}


// adiciona produtos na view
_pedidos._add_table = function(  ) {
    $('table tr[id="' + _pedidos.form.id + '"]').remove();
    var g = '<tr id="' + _pedidos.form.id + '">';
    g += '<th>' + _pedidos.form.dsc + '</th>';
    g += '<td>' + _pedidos.form.cod + '</td>';
    g += '<td>' + _pedidos.form.unidade + '</td>';
    g += '<td>' + number_format(_pedidos.form.desconto, 2, ",", ".") + '</td>';
    g += '<td>' + _pedidos.form.quantidade + '</td>';
    g += '<td>' + number_format(_pedidos.form.valor, 2, ",", ".") + '</td>';
    g += '<td><a href="#" data-role="button" data-icon="minus" data-iconpos="notext" data-theme="e" data-inline="true" class="remove_produtos">Remover</a></td>';
    g += "</tr>";
    $("#table-itens-pedidos tbody").append(g);
    atualiza_table();
    $('#frm_novo_pedido_parte_2 :input').val('');
    $('input[data-type="search"]').val('');
    $('.remove_produtos').click(function( e ) {
        e.preventDefault();
        var obj = this;
        db2.destroy(
                'pedidos_itens',
                {
                    id_produtos : $(obj).closest('tr').attr('id')
                },
        function() {
            $('table tr[id="' + $(obj).closest('tr').attr('id') + '"]').remove();
            $('#frm_novo_pedido_parte_2 :input').val('');
            $('input[data-type="search"]').val('');
            atualiza_table();
            _pedidos.update_totais();
        }
        );

    });
}

// adiciona item ao pedido
_pedidos.insert = function() {
    db2.insert(
            'pedidos_itens',
            {
                id_pedidos : _session.get('id_pedidos'),
                id_produtos : _pedidos.form.id,
                data_hora_cadastro : date('Y-m-d H:i:s'),
                quantidade : _pedidos.form.quantidade,
                valor_unitario : _pedidos.form.valor,
                valor_desconto : _pedidos.form.desconto
            },
    function( ) {
        _pedidos._add_table();
        _pedidos.update_totais();
    });
}

// alterar item ao pedido
_pedidos.update = function( ) {

    db2.update(
            'pedidos_itens',
            {
                data_hora_cadastro : date('Y-m-d H:i:s'),
                quantidade : _pedidos.form.quantidade,
                valor_unitario : _pedidos.form.valor,
                valor_desconto : _pedidos.form.desconto
            },
    {
        id_pedidos : _session.get('id_pedidos'),
        id_produtos : _pedidos.form.id
    },
    function( ) {
        _pedidos._add_table();
        _pedidos.update_totais();
    });
}
// adiciona todos os produtos do carrinho na view
_pedidos.add_all = function() {
    db2.select(
            'pedidos_itens as pi JOIN produtos as p ON pi.id_produtos = p.id_produtos',
            'pi.*, p.dsc_produto, p.cod_produto, p.unidade',
            {
                where : {
                    id_empresas : _session.get('id_empresas'),
                    id_pedidos : _session.get('id_pedidos')
                }
            },
    function( f ) {
        for ( var e = 0; e < f.rows.length; e++ ) {
            var v = f.rows.item(e);
            _pedidos.form = {
                dsc : v.dsc_produto,
                cod : v.cod_produto,
                unidade : v.unidade,
                desconto : v.valor_desconto,
                valor : v.valor_unitario,
                id : v.id_produtos,
                quantidade : v.quantidade
            };
            _pedidos._add_table();
        }
        _pedidos.update_totais();
    });
}
// atualiza totais
_pedidos.update_totais = function() {
    db2.select(
            'pedidos_itens',
            '*',
            {
                where : {
                    id_pedidos : _session.get('id_pedidos')
                }
            },
    function( f ) {
        _pedidos.total = 0;
        _pedidos.qtd_itens = 0;
        _pedidos.qtd_volume = 0;
        if ( f.rows.length > 0 ) {
            for ( var e = 0; e < f.rows.length; e++ ) {
                var v = f.rows.item(e);
                _pedidos.total += (v.quantidade * (v.valor_unitario - v.valor_desconto));
                _pedidos.qtd_itens += v.quantidade;
                _pedidos.qtd_volume++;
            }
        }
        $('#total_produtos_pedido').html(_pedidos.qtd_volume);
        $('#total_produtos_itens_pedido').html(_pedidos.qtd_itens);
        $('#valor_total_pedido').html(number_format(_pedidos.total, 2, ",", "."));

        db2.update(
                'pedidos',
                {
                    valor_total : _pedidos.total
                },
        {
            id_pedidos : _session.get('id_pedidos'),
            id_clientes : _session.get('cod_cliente')
        },
        function( ) {
        });

    });
}

// adiciona produtos no pedido
_pedidos.add = function() {
    _pedidos.form = {
        dsc : $('#frm_novo_pedido_parte_2').find('#dsc_produto_produto').val(),
        cod : $('#frm_novo_pedido_parte_2').find('#cod_produto_produto').val(),
        unidade : $('#frm_novo_pedido_parte_2').find('#unidade_produto').val(),
        desconto : convert_moeda($('#frm_novo_pedido_parte_2').find('#desconto_produto').val() || '0,00'),
        valor : $('#frm_novo_pedido_parte_2').find('#valor_produto').val(),
        id : $('#frm_novo_pedido_parte_2').find('#id_produtos_produto').val(),
        quantidade : ($('#frm_novo_pedido_parte_2').find('#quantidade_produto').val() || '1')
    };

    if ( _session.get('id_pedidos') != null ) {
        db2.select(
                'pedidos_itens',
                '*',
                {
                    where : {
                        id_pedidos : _session.get('id_pedidos'),
                        id_produtos : _pedidos.form.id
                    }
                },
        function( f ) {
            if ( f.rows.length != 0 ) {
                _pedidos.form.quantidade = parseInt(_pedidos.form.quantidade) + parseInt(f.rows.item(0).quantidade);
                _pedidos.update();
            } else {
                _pedidos.insert();
            }
        });
    } else {
        _pedidos.novo();
    }
}

// gera no pedido
_pedidos.novo = function() {
    db2.insert(
            'pedidos',
            {
                id_empresas : _session.get('id_empresas'),
                id_clientes : _session.get('cod_cliente'),
                id_usuarios : _session.get('cod_usuario'),
                data_hora_cadastro : date('Y-m-d H:i:s'),
                numero_pedido : '',
                observacao : '',
                situacao_envio : 3,
                situacao_pedido : 1,
                valor_total : '0.00'
            },
    function( f ) {
        _session.set('id_pedidos', f.insertId);
        _pedidos.add();
    }
    );
}

// consulta ultimos pedidos do cliente
_pedidos.get_all = function() {
    _session.remove('id_pedidos');
    db2.select(
            'pedidos',
            '*',
            {
                where : {
                    id_clientes : _session.get('cod_cliente'),
                    id_empresas : _session.get('id_empresas')
                },
                option : {
                    limit : 5,
                    order : 'data_hora_cadastro DESC',
                }
            },
    function( f ) {
        debug("TOTAL", f.rows.length);
        for ( var e = 0; e < f.rows.length; e++ ) {

            var v = f.rows.item(e);
            if ( v.situacao_pedido == 1 ) {
                _session.set('id_pedidos', v.id_pedidos);
            }
            var g = '<tr>';
            g += '<th>' + v.numero_pedido + '</th>';
            g += '<td>' + _situacoes.pedido[v.situacao_pedido] + '</td>';
            g += '<td>' + _situacoes.sincronizacao[v.situacao_envio] + '</td>';
            g += '<td> R$ ' + number_format(v.valor_total, 2, ",", ".") + '</td>';
            g += '<td>' + date("d/m/Y H:i:s", new Date(v.data_hora_cadastro)) + '</td>';
            g += "</tr>";
            $("#ultimos-pedidos tbody").append(g);
        }
        atualiza_table();
    });
}

// consulta cliente
_clientes.get = function() {
    db2.select(
            'clientes',
            '*',
            {
                where : {
                    id_empresas : _session.get('id_empresas'),
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
                x = _situacoes.clientes[x.situacao]
            }
            $('#' + z).html(x);
        });
        atualiza_table();
        _pedidos.get_all();
    });
}

// consulta produtos
_produtos.get = function() {
    $("#autocomplete").on("listviewbeforefilter", function( e, data ) {
        var $ul = $(this),
                $input = $(data.input),
                value = $input.val(),
                html = "";
        $ul.html("");
        if ( value && value.length > 1 ) {
            $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
            $ul.listview("refresh");
            var a = '(dsc_produto LIKE "%' + value + '%" OR cod_produto LIKE "%' + value + '%") AND id_empresas = "' + _session.get('id_empresas') + '" ';

            db2.select(
                    'produtos',
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
                        html += '<li id_produtos="' + v.id_produtos + '" class="select_produtos">' + v.cod_produto + ' | ' + v.dsc_produto + '</li>';
                    }
                    $ul.html(html);
                    $ul.listview("refresh");
                    $ul.trigger("updatelayout");
                    $(".select_produtos").on("click", function( b ) {
                        b.preventDefault();
                        _produtos.select($(this).attr('id_produtos'));
                        $(".select_produtos").remove();
                    });
                }
            });
        }
    });
}

// seleciona produtos
_produtos.select = function( id_produtos ) {
    db2.select(
            'produtos',
            '*',
            {
                where : {
                    id_empresas : _session.get('id_empresas'),
                    id_produtos : id_produtos
                }
            },
    function( f ) {
        debug("TOTAL", f.rows.length);
        $.each(f.rows.item(0), function( z, x ) {
            $('#frm_novo_pedido_parte_2').find('#' + z + '_produto').val(x);
            debug('LINHA', z + ' === ' + x);
        });
        $('input[data-type="search"]').val(f.rows.item(0).cod_produto + ' | ' + f.rows.item(0).dsc_produto);
        $('#frm_novo_pedido_parte_2').find('#quantidade_produto').focus();
    });
}
// atualiza tabelas
atualiza_table = function() {
    $('.ui-table-cell-label').remove();
    $('.table-stroke').each(function() {
        $(this).table("refresh");
        $(this).find('a').buttonMarkup({
            inline : true,
            iconpos : "notext",
            theme : "c"
        });
    });
    $("table :input").textinput({
        mini : true
    });
}
