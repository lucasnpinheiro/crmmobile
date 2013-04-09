$(document).on("pageinit", function() {
    produtos_consultar_ultimos();
    $("form").insere_mascara();
    $("#bt_consultar_produtos").on("click", function(b) {
        b.preventDefault();
        if ($.trim($("#search").val()) != "") {
            var a = 'SELECT * FROM produtos WHERE dsc_produto LIKE "%' + $("#search").val() + '%" OR cod_produto LIKE "%' + $("#search").val() + '%"';
            _produtos_consultar(a)
        } else {
            jAviso("Informe o nome produto ou código do produto.")
        }
    })
});
function produtos_consultar_ultimos() {
    var a = "SELECT * FROM produtos ORDER BY data_hora_atualizacao DESC LIMIT 10";
    _produtos_consultar(a)
}
function _produtos_consultar(a) {
    $("#table-produtos tbody").html("");
    db.transaction(function(b) {
        b.executeSql(a, [], function(d, c) {
            debug("SUCESSO", a);
            debug("TOTAL", c.rows.length);
            if (c.rows.length == 0) {
                jAviso("Nenum registro localizado.")
            } else {
                for (var e = 0; e < c.rows.length; e++) {
                    var f = c.rows.item(e);
                    var g = "<tr>";
                    g += ' <th><b class="ui-table-cell-label">Produto</b>' + f.dsc_produto + "</th>";
                    g += ' <td><b class="ui-table-cell-label">Cód.</b>' + f.cod_produto + "</td>";
                    g += ' <td><b class="ui-table-cell-label">Marca</b>Não informado</td>';
                    g += ' <td><b class="ui-table-cell-label">Estoque</b><span class="situacoes_protutos_1"><span class="situacoes_protutos_1">' + f.estoque + "</span></span></td>";
                    g += ' <td><b class="ui-table-cell-label">Valores</b><span class="situacoes_produtos_3">R$ ' + number_format(f.valor, 2, ",", ".") + ' </span> | <span class="situacoes_produtos_4">R$ ' + number_format(f.desconto_maximo, 2, ",", ".") + "</span></td>";
                    g += ' <td><b class="ui-table-cell-label">Atualização</b>' + date("d/m/Y H:i:s", new Date(f.data_hora_atualizacao)) + "</td>";
                    g += "</tr>";
                    $("#table-produtos tbody").append(g)
                }
            }
        }, function(d, c) {
            debug("ERROR", c.message)
        })
    })
}
;