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
    pedidos : {
        qtdPaginacao : 25,
        qtdAtual : 0,
        qtdMax : 0,
        sequencia : 0,
        insert : function( a ) {
            if ( _sincronicacao.produtos.qtdAtual < _sincronicacao.produtos.qtdMax ) {
                _sincronicacao.produtos.lista();
            }
            $.each(a, function( e, d ) {
                var f = 'INSERT OR REPLACE INTO produtos (id_produtos, id_empresas, cod_produto, dsc_produto, estoque, valor, desconto_maximo, data_hora_atualizacao) VALUES ("' + d.id_produtos + '","' + d.id_empresas + '","' + d.cod_produto + '","' + d.dsc_produto + '","' + d.estoque + '",' + d.valor + ',"' + d.desconto_maximo + '","' + date("Y-m-d H:i:s") + '");';
                debug("QUERY", f);
                db.transaction(function( g ) {
                    g.executeSql(f, [ ], function() {
                        _sincronicacao.produtos.sequencia++;
                        $("#tr_produtos td:eq(1)").html(_sincronicacao.produtos.sequencia);
                        if ( _sincronicacao.produtos.sequencia >= _sincronicacao.produtos.qtdMax ) {
                            $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_1">Sincronizado</span>');
                            _sincronicacao.fim();
                        }
                        _sincronicacao.atualiza_table();
                    }, function( h, i ) {
                        $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_2">Error</span>');
                        debug("ERROR", i.message);
                        _sincronicacao.fim();
                        _sincronicacao.atualiza_table();
                    });
                });
            });
        }
        ,
        total : function() {
            $.send({
                url : _situacoes.urls.produtos_total,
                beforeSend : function() {
                    tcount.start();
                    block(false);
                    $("#tr_produtos td:eq(1)").html('0');
                    $("#tr_produtos td:eq(2)").html('0');
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    $("#tr_produtos td:eq(2)").html(a);
                    $("#tr_produtos td:eq(0)").html(date("d/m/Y H:i:s"));
                    _sincronicacao.produtos.qtdMax = a;
                    _sincronicacao.produtos.sequencia = 0;
                    _sincronicacao.produtos.qtdAtual = 0;
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
                url : _situacoes.urls.produtos_lista,
                data : {
                    inicio : _sincronicacao.produtos.qtdAtual,
                    qtde : _sincronicacao.produtos.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_4">Sincronizando</span>');
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
            $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_2">Error</span>');
            _sincronicacao.fim();
        }
    },
    usuarios : {
        qtdPaginacao : 25,
        qtdAtual : 0,
        qtdMax : 0,
        sequencia : 0,
        insert : function( a ) {
            if ( _sincronicacao.produtos.qtdAtual < _sincronicacao.produtos.qtdMax ) {
                _sincronicacao.produtos.lista();
            }
            $.each(a, function( e, d ) {
                var f = 'INSERT OR REPLACE INTO produtos (id_produtos, id_empresas, cod_produto, dsc_produto, estoque, valor, desconto_maximo, data_hora_atualizacao) VALUES ("' + d.id_produtos + '","' + d.id_empresas + '","' + d.cod_produto + '","' + d.dsc_produto + '","' + d.estoque + '",' + d.valor + ',"' + d.desconto_maximo + '","' + date("Y-m-d H:i:s") + '");';
                debug("QUERY", f);
                db.transaction(function( g ) {
                    g.executeSql(f, [ ], function() {
                        _sincronicacao.produtos.sequencia++;
                        $("#tr_produtos td:eq(1)").html(_sincronicacao.produtos.sequencia);
                        if ( _sincronicacao.produtos.sequencia >= _sincronicacao.produtos.qtdMax ) {
                            $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_1">Sincronizado</span>');
                            _sincronicacao.fim();
                        }
                        _sincronicacao.atualiza_table();
                    }, function( h, i ) {
                        $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_2">Error</span>');
                        debug("ERROR", i.message);
                        _sincronicacao.fim();
                        _sincronicacao.atualiza_table();
                    });
                });
            });
        }
        ,
        total : function() {
            $.send({
                url : _situacoes.urls.produtos_total,
                beforeSend : function() {
                    tcount.start();
                    block(false);
                    $("#tr_produtos td:eq(1)").html('0');
                    $("#tr_produtos td:eq(2)").html('0');
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    $("#tr_produtos td:eq(2)").html(a);
                    $("#tr_produtos td:eq(0)").html(date("d/m/Y H:i:s"));
                    _sincronicacao.produtos.qtdMax = a;
                    _sincronicacao.produtos.sequencia = 0;
                    _sincronicacao.produtos.qtdAtual = 0;
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
                url : _situacoes.urls.produtos_lista,
                data : {
                    inicio : _sincronicacao.produtos.qtdAtual,
                    qtde : _sincronicacao.produtos.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_4">Sincronizando</span>');
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
            $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_2">Error</span>');
            _sincronicacao.fim();
        }
    },
    clientes : {
        qtdPaginacao : 25,
        qtdAtual : 0,
        qtdMax : 0,
        sequencia : 0,
        insert : function( a ) {
            if ( _sincronicacao.produtos.qtdAtual < _sincronicacao.produtos.qtdMax ) {
                _sincronicacao.produtos.lista();
            }
            $.each(a, function( e, d ) {
                var f = 'INSERT OR REPLACE INTO produtos (id_produtos, id_empresas, cod_produto, dsc_produto, estoque, valor, desconto_maximo, data_hora_atualizacao) VALUES ("' + d.id_produtos + '","' + d.id_empresas + '","' + d.cod_produto + '","' + d.dsc_produto + '","' + d.estoque + '",' + d.valor + ',"' + d.desconto_maximo + '","' + date("Y-m-d H:i:s") + '");';
                debug("QUERY", f);
                db.transaction(function( g ) {
                    g.executeSql(f, [ ], function() {
                        _sincronicacao.produtos.sequencia++;
                        $("#tr_produtos td:eq(1)").html(_sincronicacao.produtos.sequencia);
                        if ( _sincronicacao.produtos.sequencia >= _sincronicacao.produtos.qtdMax ) {
                            $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_1">Sincronizado</span>');
                            _sincronicacao.fim();
                        }
                        _sincronicacao.atualiza_table();
                    }, function( h, i ) {
                        $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_2">Error</span>');
                        debug("ERROR", i.message);
                        _sincronicacao.fim();
                        _sincronicacao.atualiza_table();
                    });
                });
            });
        }
        ,
        total : function() {
            $.send({
                url : _situacoes.urls.produtos_total,
                beforeSend : function() {
                    tcount.start();
                    block(false);
                    $("#tr_produtos td:eq(1)").html('0');
                    $("#tr_produtos td:eq(2)").html('0');
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    $("#tr_produtos td:eq(2)").html(a);
                    $("#tr_produtos td:eq(0)").html(date("d/m/Y H:i:s"));
                    _sincronicacao.produtos.qtdMax = a;
                    _sincronicacao.produtos.sequencia = 0;
                    _sincronicacao.produtos.qtdAtual = 0;
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
                url : _situacoes.urls.produtos_lista,
                data : {
                    inicio : _sincronicacao.produtos.qtdAtual,
                    qtde : _sincronicacao.produtos.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_4">Sincronizando</span>');
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
            $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_2">Error</span>');
            _sincronicacao.fim();
        }
    },
    produtos : {
        qtdPaginacao : 25,
        qtdAtual : 0,
        qtdMax : 0,
        sequencia : 0,
        insert : function( a ) {
            if ( _sincronicacao.produtos.qtdAtual < _sincronicacao.produtos.qtdMax ) {
                _sincronicacao.produtos.lista();
            }
            $.each(a, function( e, d ) {
                var f = 'INSERT OR REPLACE INTO produtos (id_produtos, id_empresas, cod_produto, dsc_produto, estoque, valor, desconto_maximo, data_hora_atualizacao) VALUES ("' + d.id_produtos + '","' + d.id_empresas + '","' + d.cod_produto + '","' + d.dsc_produto + '","' + d.estoque + '",' + d.valor + ',"' + d.desconto_maximo + '","' + date("Y-m-d H:i:s") + '");';
                debug("QUERY", f);
                db.transaction(function( g ) {
                    g.executeSql(f, [ ], function() {
                        _sincronicacao.produtos.sequencia++;
                        $("#tr_produtos td:eq(1)").html(_sincronicacao.produtos.sequencia);
                        if ( _sincronicacao.produtos.sequencia >= _sincronicacao.produtos.qtdMax ) {
                            $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_1">Sincronizado</span>');
                            _sincronicacao.fim();
                        }
                        _sincronicacao.atualiza_table();
                    }, function( h, i ) {
                        $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_2">Error</span>');
                        debug("ERROR", i.message);
                        _sincronicacao.fim();
                        _sincronicacao.atualiza_table();
                    });
                });
            });
        }
        ,
        total : function() {
            $.send({
                url : _situacoes.urls.produtos_total,
                beforeSend : function() {
                    tcount.start();
                    block(false);
                    $("#tr_produtos td:eq(1)").html('0');
                    $("#tr_produtos td:eq(2)").html('0');
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    $("#tr_produtos td:eq(2)").html(a);
                    $("#tr_produtos td:eq(0)").html(date("d/m/Y H:i:s"));
                    _sincronicacao.produtos.qtdMax = a;
                    _sincronicacao.produtos.sequencia = 0;
                    _sincronicacao.produtos.qtdAtual = 0;
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
                url : _situacoes.urls.produtos_lista,
                data : {
                    inicio : _sincronicacao.produtos.qtdAtual,
                    qtde : _sincronicacao.produtos.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_4">Sincronizando</span>');
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
            $("#tr_produtos td:eq(3)").html('<span class="situacoes_sincronizacao_2">Error</span>');
            _sincronicacao.fim();
        }
    },
    fim : function() {
        block(true);
        jAviso("Tempo decorrido para a atualização da tabela de produtos " + tcount.stop() + " segundos.");
        _sincronicacao.atualiza_table();
    },
    atualiza_table : function() {
        $('table').table("refresh");
        $('table').trigger("tablecreate");
    }
};