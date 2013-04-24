$(document).on("pageinit", function() {
    _produtos.ultimos();
    $("form").insere_mascara();
    $("#bt_consultar_produtos").on("click", function( b ) {
        b.preventDefault();
        if ( $.trim($("#search").val()) != "" ) {
            _produtos.consultar('dsc_produto LIKE "%' + $("#search").val() + '%" OR cod_produto LIKE "%' + $("#search").val() + '%"');
        } else {
            jAviso("Informe o nome produto ou código do produto.");
        }
    });
});

_produtos = {
    ultimos : function() {
        _produtos.consultar('');
    },
    consultar : function( a ) {
        block(false);
        $("#table-produtos tbody").html("");

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
                    var g = "<tr>";
                    g += ' <th>' + v.dsc_produto + "</th>";
                    g += ' <td>' + v.cod_produto + "</td>";
                    g += ' <td>Não informado</td>';
                    g += ' <td><span class="situacoes_protutos_1">' + v.estoque + "</span></td>";
                    g += ' <td><span class="situacoes_produtos_3">R$ ' + number_format(v.valor, 2, ",", ".") + ' </span> | <span class="situacoes_produtos_4">R$ ' + number_format(v.desconto_maximo, 2, ",", ".") + "</span></td>";
                    g += ' <td>' + date("d/m/Y H:i:s", new Date(v.data_hora_atualizacao)) + "</td>";
                    g += "</tr>";
                    $("#table-produtos tbody").append(g);
                }
                _produtos.atualiza_table();
            }
            block(true);
        });
    },
    atualiza_table : function() {
        $('.ui-table-cell-label').remove();
        $('#table-produtos').table("refresh");
    }
};