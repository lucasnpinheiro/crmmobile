var tcount = new TimeCounter();
$(document).on("pageinit", function() {
    _sincronicacao.inicializa();
    $(".selector").table("refresh");
    $(".reload").on("click", function() {
        var a = $(this).closest("tr").attr("id");
        switch ( a ) {
            case"tr_produtos":
                block(false);
                tcount.start();
                _sincronicacao.produtos.total();
                break;
            case"tr_clientes":
                //block(false);
                //tcount.start();
                //_sincronicacao.clientes.total();
                break;
            case"tr_usuarios":
                //block(false);
                //tcount.start();
                //_sincronicacao.usuarios.total();
                break;
            case"tr_pedidos":
                //block(false);
                //tcount.start();
                //_sincronicacao.pedidos.total();
                break
        }
    })
});
_sincronicacao = {
    produtos : {
        qtdPaginacao : 100,
        qtdAtual : 1,
        qtdMax : 0,
        sequencia : 0,
        concluido : false,
        insert : function( a ) {
            if ( _sincronicacao.produtos.qtdAtual < _sincronicacao.produtos.qtdMax ) {
                _sincronicacao.produtos.lista();
            }
            $.each(a, function( e, d ) {
                db2.replace(
                        'produtos',
                        {
                            id_produtos : d.id_produtos,
                            id_empresas : d.id_empresas,
                            cod_produto : d.cod_produto,
                            dsc_produto : d.dsc_produto,
                            estoque : d.estoque,
                            valor : d.valor,
                            desconto_maximo : d.desconto_maximo,
                            data_hora_atualizacao : date('Y-m-d H:i:s')
                        },
                function() {
                    _sincronicacao.produtos.sequencia++;
                    $("#tr_produtos td:eq(1)").html(_sincronicacao.produtos.sequencia);
                    if ( _sincronicacao.produtos.sequencia >= _sincronicacao.produtos.qtdMax ) {
                        $("#tr_produtos td:eq(3)").html(_situacoes.sincronizacao[1]);
                        _sincronicacao.produtos.concluido = true;
                        _sincronicacao.fim();
                    }
                    _sincronicacao.atualiza_table();
                }, function() {
                    $("#tr_produtos td:eq(3)").html(_situacoes.sincronizacao[2]);
                    _sincronicacao.fim();
                    _sincronicacao.atualiza_table();
                }
                );
            });
        },
        total : function() {
            $.send({
                type : 'GET',
                dataType : 'html',
                url : _situacoes.urls.produtos_total,
                beforeSend : function() {
                    $("#tr_produtos td:eq(1)").html('0');
                    $("#tr_produtos td:eq(2)").html('0');
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    $("#tr_produtos td:eq(2)").html(a);
                    $("#tr_produtos td:eq(0)").html(date("d/m/Y H:i:s"));
                    _sincronicacao.produtos.qtdMax = a;
                    _sincronicacao.produtos.sequencia = 0;
                    _sincronicacao.produtos.qtdAtual = 1;
                    _sincronicacao.produtos.concluido = false;
                    _sincronicacao.produtos.lista();
                    _sincronicacao.atualiza_table();
                },
                error : function() {
                    _sincronicacao.produtos.error();
                }
            });
        },
        lista : function() {
            $.send({
                type : 'GET',
                url : _situacoes.urls.produtos_lista,
                data : {
                    inicio : _sincronicacao.produtos.qtdAtual,
                    qtde : _sincronicacao.produtos.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_produtos td:eq(3)").html(_situacoes.sincronizacao[4]);
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    var b = a.length;
                    _sincronicacao.produtos.qtdAtual += b;
                    _sincronicacao.produtos.insert(a);
                    _sincronicacao.atualiza_table();
                },
                error : function() {
                    _sincronicacao.produtos.error();
                }
            });
        },
        error : function() {
            $("#tr_produtos td:eq(3)").html(_situacoes.sincronizacao[2]);
            _sincronicacao.produtos.concluido = true;
            _sincronicacao.fim();
        }
    },
    inicializa : function() {
        block(false);
        tcount.start();
        _sincronicacao.produtos.total();
    },
    fim : function() {
        if ( _sincronicacao.produtos.concluido == true ) {
            block(true);
            jSucesso('Tempo total da sincronização em segundos: (' + tcount.stop() + ').');
        }
        _sincronicacao.atualiza_table();
    },
    atualiza_table : function() {
        $('.ui-table-cell-label').remove();
        $('table').table("refresh");
    }
};