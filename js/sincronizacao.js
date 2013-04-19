var tcount = new TimeCounter();
$(document).on("pageinit", function() {
    _sincronicacao.produtos.total();
    $(".selector").table("refresh");
    $(".reload").on("click", function() {
        var a = $(this).closest("tr").attr("id");
        switch ( a ) {
            case"tr_produtos":
                _sincronicacao.produtos.total();
                break;
            case"tr_clientes":
                break;
            case"tr_usuarios":
                break;
            case"tr_pedidos":
                break
        }
    })
});
_sincronicacao = {
    produtos : {
        qtdPaginacao : 75,
        qtdAtual : 0,
        qtdMax : 0,
        sequencia : 0,
        insert : function( a ) {
            if ( _sincronicacao.produtos.qtdAtual < _sincronicacao.produtos.qtdMax ) {
                _sincronicacao.produtos.lista();
            }
            var b = 0;
            var c = a.length;
            $.each(a, function( e, d ) {
                var f = 'INSERT OR REPLACE INTO produtos (id_produtos, id_empresas, cod_produto, dsc_produto, estoque, valor, desconto_maximo, data_hora_atualizacao) VALUES ("' + d.id_produtos + '","' + d.id_empresas + '","' + d.cod_produto + '","' + d.dsc_produto + '","' + d.estoque + '",' + d.valor + ',"' + d.desconto_maximo + '","' + date("Y-m-d H:i:s") + '");';
                debug("QUERY", f);
                db.transaction(function( g ) {
                    g.executeSql(f, [ ], function() {
                        b++;
                        _sincronicacao.produtos.sequencia++;
                        $("#tr_produtos td:eq(1)").html('<b class="ui-table-cell-label">Total sincronizado</b> ' + _sincronicacao.produtos.sequencia);
                        if ( b == c ) {
                            $("#tr_produtos td:eq(3)").html('<b class="ui-table-cell-label">Situação</b> <span class="situacoes_sincronizacao_1">Sincronizado</span>');
                            if ( _sincronicacao.produtos.qtdAtual >= _sincronicacao.produtos.qtdMax ) {
                                $("#tr_produtos td:eq(1)").html('<b class="ui-table-cell-label">Total sincronizado</b> ' + _sincronicacao.produtos.sequencia);
                                _sincronicacao.fim();
                            }
                        }
                    }, function( h, i ) {
                        $("#tr_produtos td:eq(3)").html('<b class="ui-table-cell-label">Situação</b> <span class="situacoes_sincronizacao_2">Error</span>');
                        debug("ERROR", i.message);
                        _sincronicacao.fim();
                    });
                });
            });
        }
        ,
        total : function() {
            $.ajax({
                url : _situacoes.urls.produtos_total,
                dataType : "html",
                type : "GET",
                beforeSend : function() {
                    tcount.start();
                    block(false);
                    $("#tr_produtos td:eq(1)").html('<b class="ui-table-cell-label">Total sincronizado</b> 0');
                    $("#tr_produtos td:eq(2)").html('<b class="ui-table-cell-label">Total registro</b> 0')
                },
                success : function( a ) {
                    $("#tr_produtos td:eq(2)").html('<b class="ui-table-cell-label">Total registro</b> ' + a);
                    $("#tr_produtos td:eq(0)").html('<b class="ui-table-cell-label">Atualização</b> ' + date("d/m/Y H:i:s"));
                    _sincronicacao.produtos.qtdMax = a;
                    _sincronicacao.produtos.sequencia = 0;
                    _sincronicacao.produtos.qtdAtual = 0;
                    _sincronicacao.produtos.lista();
                },
                error : function( c, a, b ) {
                    _sincronicacao.produtos.error(c, a, b);
                }
            });
        },
        lista : function() {
            $.ajax({
                url : _situacoes.urls.produtos_lista,
                dataType : "json",
                type : "GET",
                data : {
                    inicio : _sincronicacao.produtos.qtdAtual,
                    qtde : _sincronicacao.produtos.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_produtos td:eq(1)").html('<b class="ui-table-cell-label">Total sincronizado</b> ' + _sincronicacao.produtos.qtdAtual);
                    $("#tr_produtos td:eq(3)").html('<b class="ui-table-cell-label">Situação</b> <span class="situacoes_sincronizacao_4">Sincronizando</span>');
                },
                success : function( a ) {
                    var b = a.length;
                    _sincronicacao.produtos.qtdAtual += b;
                    _sincronicacao.produtos.insert(a);
                },
                error : function( c, a, b ) {
                    _sincronicacao.produtos.error(c, a, b);
                }
            })
        },
        error : function( c, a, b ) {
            $("#tr_produtos td:eq(3)").html('<b class="ui-table-cell-label">Situação</b> <span class="situacoes_sincronizacao_2">Error</span>');
            _sincronicacao.fim();
            var d = "";
            if ( c.status === 0 ) {
                d = ("Não conectar. \n Verifique Rede.");
            } else if ( c.status === 404 ) {
                d = ("A página solicitada não foi encontrada. [404]");
            } else if ( c.status === 500 ) {
                d = ("Erro interno do servidor. [500]");
            } else if ( a === "parsererror" ) {
                d = ("Solicitado JSON análise falhou.");
            } else if ( a === "timeout" ) {
                d = ("Erro de tempo limite.");
            } else if ( a === "abort" ) {
                d = ("Pedido Ajax abortada.");
            } else {
                d = ("Tipo do erro não detectado. /n " + c.responseText);
            }
            jAviso(d);
        }
    },
    fim : function() {
        block(true);
        jAviso("Tempo decorrido para a atualização da tabela de produtos " + tcount.stop() + " segundos.");
    }
};