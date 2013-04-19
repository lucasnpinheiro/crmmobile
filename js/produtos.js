$(document).on("pageinit", function() {
    _produtos.ultimos();
    $("form").insere_mascara();
    $("#bt_consultar_produtos").on("click", function( b ) {
        b.preventDefault();
        if ( $.trim($("#search").val()) != "" ) {
            var a = 'SELECT * FROM produtos WHERE dsc_produto LIKE "%' + $("#search").val() + '%" OR cod_produto LIKE "%' + $("#search").val() + '%" ORDER BY data_hora_atualizacao DESC LIMIT 100';
            _produtos.consultar(a);
        } else {
            jAviso("Informe o nome produto ou código do produto.");
        }
    });
});

_produtos = {
    ultimos : function() {
        var a = "SELECT * FROM produtos ORDER BY data_hora_atualizacao DESC LIMIT 10";
        _produtos.consultar(a);
    },
    consultar : function( a ) {
        $("#table-produtos tbody").html("");
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
                                g += ' <th>' + f.dsc_produto + "</th>";
                                g += ' <td>' + f.cod_produto + "</td>";
                                g += ' <td>Não informado</td>';
                                g += ' <td><span class="situacoes_protutos_1">' + f.estoque + "</span></td>";
                                g += ' <td><span class="situacoes_produtos_3">R$ ' + number_format(f.valor, 2, ",", ".") + ' </span> | <span class="situacoes_produtos_4">R$ ' + number_format(f.desconto_maximo, 2, ",", ".") + "</span></td>";
                                g += ' <td>' + date("d/m/Y H:i:s", new Date(f.data_hora_atualizacao)) + "</td>";
                                g += "</tr>";
                                $("#table-produtos tbody").append(g);
                            }
                            $("#table-produtos").table( "refresh" );
                        }
                    },
                    function( d, c ) {
                        debug("QUERY", a);
                        debug("ERROR", c.message);
                    });
        });
    }
};