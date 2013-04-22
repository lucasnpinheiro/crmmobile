$(document).on("pageinit", function() {
    _sincronicacao.inicializa();
    $(".selector").table("refresh");
    $(".reload").on("click", function() {
        var a = $(this).closest("tr").attr("id");
        switch ( a ) {
            case"tr_produtos":
                _sincronicacao.produtos.total();
                break;
            case"tr_clientes":
                _sincronicacao.clientes.total();
                break;
            case"tr_usuarios":
                _sincronicacao.usuarios.total();
                break;
            case"tr_pedidos":
                _sincronicacao.pedidos.total();
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
            if ( _sincronicacao.pedidos.qtdAtual < _sincronicacao.pedidos.qtdMax ) {
                _sincronicacao.pedidos.lista();
            }
            $.each(a, function( e, d ) {
                var f = 'INSERT OR REPLACE INTO produtos (id_produtos, id_empresas, cod_produto, dsc_produto, estoque, valor, desconto_maximo, data_hora_atualizacao) VALUES ("' + d.id_produtos + '","' + d.id_empresas + '","' + d.cod_produto + '","' + d.dsc_produto + '","' + d.estoque + '",' + d.valor + ',"' + d.desconto_maximo + '","' + date("Y-m-d H:i:s") + '");';
                debug("QUERY", f);
                db.transaction(function( g ) {
                    g.executeSql(f, [ ], function() {
                        _sincronicacao.pedidos.sequencia++;
                        $("#tr_pedidos td:eq(1)").html(_sincronicacao.pedidos.sequencia);
                        if ( _sincronicacao.pedidos.sequencia >= _sincronicacao.pedidos.qtdMax ) {
                            $("#tr_pedidos td:eq(3)").html(_situacoes.sincronizacao[1]);
                            _sincronicacao.fim();
                        }
                        _sincronicacao.atualiza_table();
                    }, function( h, i ) {
                        $("#tr_pedidos td:eq(3)").html(_situacoes.sincronizacao[2]);
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
                url : _situacoes.urls.pedidos_total,
                beforeSend : function() {
                    $("#tr_pedidos td:eq(1)").html('0');
                    $("#tr_pedidos td:eq(2)").html('0');
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    $("#tr_pedidos td:eq(2)").html(a);
                    $("#tr_pedidos td:eq(0)").html(date("d/m/Y H:i:s"));
                    _sincronicacao.pedidos.qtdMax = a;
                    _sincronicacao.pedidos.sequencia = 0;
                    _sincronicacao.pedidos.qtdAtual = 0;
                    _sincronicacao.pedidos.lista();
                    _sincronicacao.atualiza_table();
                },
                error : function() {
                    _sincronicacao.pedidos.error();
                }
            });
        },
        lista : function() {
            $.send({
                url : _situacoes.urls.pedidos_lista,
                data : {
                    inicio : _sincronicacao.pedidos.qtdAtual,
                    qtde : _sincronicacao.pedidos.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_pedidos td:eq(3)").html(_situacoes.sincronizacao[4]);
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    var b = a.length;
                    _sincronicacao.pedidos.qtdAtual += b;
                    _sincronicacao.pedidos.insert(a);
                    _sincronicacao.atualiza_table();
                },
                error : function() {
                    _sincronicacao.pedidos.error();
                }
            });
        },
        error : function() {
            $("#tr_pedidos td:eq(3)").html(_situacoes.sincronizacao[2]);
            _sincronicacao.fim();
        }
    },
    usuarios : {
        qtdPaginacao : 25,
        qtdAtual : 0,
        qtdMax : 0,
        sequencia : 0,
        insert : function( a ) {
            if ( _sincronicacao.usuarios.qtdAtual < _sincronicacao.usuarios.qtdMax ) {
                _sincronicacao.usuarios.lista();
            }
            $.each(a, function( e, d ) {
                var f = 'INSERT OR REPLACE INTO produtos (id_produtos, id_empresas, cod_produto, dsc_produto, estoque, valor, desconto_maximo, data_hora_atualizacao) VALUES ("' + d.id_produtos + '","' + d.id_empresas + '","' + d.cod_produto + '","' + d.dsc_produto + '","' + d.estoque + '",' + d.valor + ',"' + d.desconto_maximo + '","' + date("Y-m-d H:i:s") + '");';
                debug("QUERY", f);
                db.transaction(function( g ) {
                    g.executeSql(f, [ ], function() {
                        _sincronicacao.usuarios.sequencia++;
                        $("#tr_usuarios td:eq(1)").html(_sincronicacao.usuarios.sequencia);
                        if ( _sincronicacao.usuarios.sequencia >= _sincronicacao.usuarios.qtdMax ) {
                            $("#usuarios td:eq(3)").html(_situacoes.sincronizacao[1]);
                            _sincronicacao.fim();
                        }
                        _sincronicacao.atualiza_table();
                    }, function( h, i ) {
                        $("#tr_usuarios td:eq(3)").html(_situacoes.sincronizacao[2]);
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
                url : _situacoes.urls.usuarios_total,
                beforeSend : function() {
                    $("#tr_usuarios td:eq(1)").html('0');
                    $("#tr_usuarios td:eq(2)").html('0');
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    $("#tr_usuarios td:eq(2)").html(a);
                    $("#tr_usuarios td:eq(0)").html(date("d/m/Y H:i:s"));
                    _sincronicacao.usuarios.qtdMax = a;
                    _sincronicacao.usuarios.sequencia = 0;
                    _sincronicacao.usuarios.qtdAtual = 0;
                    _sincronicacao.usuarios.lista();
                    _sincronicacao.atualiza_table();
                },
                error : function() {
                    _sincronicacao.usuarios.error();
                }
            });
        },
        lista : function() {
            $.send({
                url : _situacoes.urls.usuarios_lista,
                data : {
                    inicio : _sincronicacao.usuarios.qtdAtual,
                    qtde : _sincronicacao.usuarios.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_usuarios td:eq(3)").html(_situacoes.sincronizacao[4]);
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    var b = a.length;
                    _sincronicacao.usuarios.qtdAtual += b;
                    _sincronicacao.usuarios.insert(a);
                    _sincronicacao.atualiza_table();
                },
                error : function() {
                    _sincronicacao.usuarios.error();
                }
            });
        },
        error : function() {
            $("#tr_usuarios td:eq(3)").html(_situacoes.sincronizacao[2]);
            _sincronicacao.fim();
        }
    },
    clientes : {
        qtdPaginacao : 25,
        qtdAtual : 0,
        qtdMax : 0,
        sequencia : 0,
        insert : function( a ) {
            if ( _sincronicacao.clientes.qtdAtual < _sincronicacao.clientes.qtdMax ) {
                _sincronicacao.clientes.lista();
            }
            $.each(a, function( e, d ) {
                var f = 'INSERT OR REPLACE INTO produtos (id_produtos, id_empresas, cod_produto, dsc_produto, estoque, valor, desconto_maximo, data_hora_atualizacao) VALUES ("' + d.id_produtos + '","' + d.id_empresas + '","' + d.cod_produto + '","' + d.dsc_produto + '","' + d.estoque + '",' + d.valor + ',"' + d.desconto_maximo + '","' + date("Y-m-d H:i:s") + '");';
                debug("QUERY", f);
                db.transaction(function( g ) {
                    g.executeSql(f, [ ], function() {
                        _sincronicacao.clientes.sequencia++;
                        $("#tr_clientes td:eq(1)").html(_sincronicacao.clientes.sequencia);
                        if ( _sincronicacao.clientes.sequencia >= _sincronicacao.clientes.qtdMax ) {
                            $("#tr_clientes td:eq(3)").html(_situacoes.sincronizacao[1]);
                            _sincronicacao.fim();
                        }
                        _sincronicacao.atualiza_table();
                    }, function( h, i ) {
                        $("#tr_clientes td:eq(3)").html(_situacoes.sincronizacao[2]);
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
                url : _situacoes.urls.clientes_total,
                beforeSend : function() {
                    $("#tr_clientes td:eq(1)").html('0');
                    $("#tr_clientes td:eq(2)").html('0');
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    $("#tr_clientes td:eq(2)").html(a);
                    $("#tr_clientes td:eq(0)").html(date("d/m/Y H:i:s"));
                    _sincronicacao.clientes.qtdMax = a;
                    _sincronicacao.clientes.sequencia = 0;
                    _sincronicacao.clientes.qtdAtual = 0;
                    _sincronicacao.clientes.lista();
                    _sincronicacao.atualiza_table();
                },
                error : function() {
                    _sincronicacao.clientes.error();
                }
            });
        },
        lista : function() {
            $.send({
                url : _situacoes.urls.clientes_lista,
                data : {
                    inicio : _sincronicacao.clientes.qtdAtual,
                    qtde : _sincronicacao.clientes.qtdPaginacao
                },
                beforeSend : function() {
                    $("#tr_clientes td:eq(3)").html(_situacoes.sincronizacao[4]);
                    _sincronicacao.atualiza_table();
                },
                success : function( a ) {
                    var b = a.length;
                    _sincronicacao.clientes.qtdAtual += b;
                    _sincronicacao.clientes.insert(a);
                    _sincronicacao.atualiza_table();
                },
                error : function() {
                    _sincronicacao.clientes.error();
                }
            });
        },
        error : function() {
            $("#tr_clientes td:eq(3)").html(_situacoes.sincronizacao[2]);
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
                            $("#tr_produtos td:eq(3)").html(_situacoes.sincronizacao[1]);
                            _sincronicacao.fim();
                        }
                        _sincronicacao.atualiza_table();
                    }, function( h, i ) {
                        $("#tr_produtos td:eq(3)").html(_situacoes.sincronizacao[2]);
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
            _sincronicacao.fim();
        }
    },
    inicializa : function() {
        block(false);
        _sincronicacao.produtos.total();
        _sincronicacao.clientes.total();
        _sincronicacao.usuarios.total();
        _sincronicacao.pedidos.total();
        _sincronicacao.atualiza_table();
    },
    fim : function() {
        if ( (_sincronicacao.produtos.qtdAtual == _sincronicacao.produtos.qtdMax) &&
                (_sincronicacao.clientes.qtdAtual == _sincronicacao.clientes.qtdMax) &&
                (_sincronicacao.usuarios.qtdAtual == _sincronicacao.usuarios.qtdMax) &&
                (_sincronicacao.pedidos.qtdAtual == _sincronicacao.pedidos.qtdMax) )
            block(true);
        _sincronicacao.atualiza_table();
    },
    atualiza_table : function() {
        $('table').table("refresh");
        $('table').trigger("tablecreate");
    }
};