var tcount = new TimeCounter();
$(document).on('pageinit', function() {

    _sincronicacao.produtos.total();

    $('.reload').on('click', function() {
        var acao = $(this).closest('tr').attr('id');

        switch (acao) {
            case 'tr_produtos':
                _sincronicacao.produtos.total();
                break;
            case 'tr_clientes':
                break;
            case 'tr_usuarios':
                break;
            case 'tr_pedidos':
                break;
        }
    });
});

_sincronicacao = {
    produtos: {
        qtdPaginacao: 25,
        qtdAtual: 0,
        qtdMax: 0,
        sequencia: 0,
        insert: function(result) {
            var i = 0;
            var total = result.length;
            $.each(result, function(a, b) {
                var query = 'INSERT OR REPLACE INTO produtos (id_produtos, cod_produto, dsc_produto, desconto_maximo, data_hora_atualizacao, estoque, valor, id_empresas) VALUES ("' + b.id_produtos + '","' + b.cod_produto + '","' + b.dsc_produto + '","' + b.desconto_maximo + '","' + date('Y-m-d H:i:s') + '","' + b.estoque + '",' + b.valor + ',"' + b.id_empresas + '");';
                debug('QUERY', query);
                db.transaction(function(tx) {
                    tx.executeSql(query, [],
                            function() {
                                i++;
                                _sincronicacao.produtos.sequencia++;
                                $('#tr_produtos td:eq(1)').html('<b class="ui-table-cell-label">Total sincronizado</b> ' + _sincronicacao.produtos.sequencia);
                                if (i == total) {
                                    $('#tr_produtos td:eq(3)').html('<b class="ui-table-cell-label">Situação</b> <span class="situacoes_sincronizacao_1">Sincronizado</span>');
                                    if (_sincronicacao.produtos.qtdAtual < _sincronicacao.produtos.qtdMax) {
                                        _sincronicacao.produtos.lista();
                                    } else {
                                        _sincronicacao.fim();
                                    }
                                }
                            },
                            function(tx, r) {
                                $('#tr_produtos td:eq(3)').html('<b class="ui-table-cell-label">Situação</b> <span class="situacoes_sincronizacao_2">Error</span>');
                                debug('ERROR', r.message);
                                _sincronicacao.fim();
                            });
                });
            });
        },
        total: function() {
            $.ajax({
                url: _situacoes.urls.produtos_total,
                dataType: 'html',
                type: 'GET',
                beforeSend: function() {
                    tcount.start();
                    block(false);
                    $('#tr_produtos td:eq(2)').html('<b class="ui-table-cell-label">Total registro</b> 0');
                },
                success: function(result) {
                    $('#tr_produtos td:eq(2)').html('<b class="ui-table-cell-label">Total registro</b> ' + result);
                    $('#tr_produtos td:eq(0)').html('<b class="ui-table-cell-label">Atualização</b> ' + date('d/m/Y H:i:s'));
                    _sincronicacao.produtos.qtdMax = result;
                    _sincronicacao.produtos.lista();
                },
                error: function() {
                    _sincronicacao.produtos.error();
                }
            });
        },
        lista: function() {
            $.ajax({
                url: _situacoes.urls.produtos_lista,
                dataType: 'json',
                type: 'GET',
                data: {
                    inicio: _sincronicacao.produtos.sequencia + 1,
                    qtde: _sincronicacao.produtos.qtdPaginacao
                },
                beforeSend: function() {
                    $('#tr_produtos td:eq(1)').html('<b class="ui-table-cell-label">Total sincronizado</b> ' + _sincronicacao.produtos.qtdAtual);
                    $('#tr_produtos td:eq(3)').html('<b class="ui-table-cell-label">Situação</b> <span class="situacoes_sincronizacao_4">Sincronizando</span>');
                },
                success: function(result) {
                    var total = result.length;
                    if (total > 0) {
                        _sincronicacao.produtos.qtdAtual += total;
                        _sincronicacao.produtos.insert(result);
                    } else {
                        _sincronicacao.produtos.sequencia++;
                        $('#tr_produtos td:eq(1)').html('<b class="ui-table-cell-label">Total sincronizado</b> ' + _sincronicacao.produtos.sequencia);
                        _sincronicacao.fim();
                    }
                },
                error: function() {
                    _sincronicacao.produtos.error();
                }
            });
        },
        error: function() {
            _sincronicacao.fim();
            $('#tr_produtos td:eq(3)').html('<b class="ui-table-cell-label">Situação</b> <span class="situacoes_sincronizacao_2">Error</span>');
        }
    },
    fim: function() {
        block(true);
        jAviso('Tempo decorrido para a atualização da tabela de produtos ' + tcount.stop() + ' segundos.');
    }
};