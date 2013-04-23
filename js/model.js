_configuracoes = {
    tabelas : {
        create : [
            {
                name : 'clientes',
                cols : {
                    id_clientes : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                    id_empresas : 'INTEGER',
                    cod_cliente : 'VARCHAR(50)',
                    dsc_cliente : 'VARCHAR(45)',
                    data_hora_atualizacao : 'DATETIME',
                    data_hora_exclusao : 'DATETIME',
                    valor_devido : 'REAL(10, 2)',
                    situacao : 'INT(1) DEFAULT 1'
                }
            }, {
                name : 'empresas',
                cols : {
                    id_empresas : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                    uuid : 'VARCHAR(50)',
                    codigo_cliente : 'VARCHAR(50)',
                    cod_ativacao : 'VARCHAR(50)',
                    cpf_cnpj : 'VARCHAR(14)',
                    nome_empresa : 'VARCHAR(50)',
                    data_hora_cadastro : 'DATETIME'
                }
            }, {
                name : 'pedidos',
                cols : {
                    id_pedidos : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                    id_empresas : 'INTEGER',
                    id_clientes : 'INTEGER',
                    id_usuarios : 'INTEGER',
                    data_hora_cadastro : 'DATETIME',
                    numero_pedido : 'VARCHAR(50)',
                    observacao : 'VARCHAR(255)',
                    situacao_envio : 'INT(1) DEFAULT 1',
                    situacao_pedido : 'INT(1) DEFAULT 1',
                    valor_total : 'REAL(10,2)'
                }
            }, {
                name : 'pedidos_itens',
                cols : {
                    id_pedidos_itens : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                    id_pedidos : 'INTEGER',
                    id_produtos : 'INTEGER',
                    data_hora_cadastro : 'DATETIME',
                    quantidade : 'REAL(10,3)',
                    valor_unitario : 'REAL(10,2)',
                    valor_desconto : 'REAL(10,2)'
                }
            }, {
                name : 'pedidos_pagamentos',
                cols : {
                    id_pedidos_pagamentos : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                    id_pedidos : 'INTEGER',
                    data_vencimento : 'DATE',
                    forma_pagamento : 'INTEGER',
                    valor_parcela : 'REAL(10, 2)'
                }
            }, {
                name : 'produtos',
                cols : {
                    id_produtos : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                    id_empresas : 'INTEGER',
                    cod_produto : 'VARCHAR(25)',
                    dsc_produto : 'VARCHAR(100)',
                    estoque : 'REAL(10, 3) DEFAULT 0',
                    valor : 'REAL(10,2)',
                    desconto_maximo : 'REAL (10,2) DEFAULT 0',
                    data_hora_atualizacao : 'DATETIME'
                }
            }, {
                name : 'usuarios',
                cols : {
                    id_usuarios : 'INTEGER PRIMARY KEY AUTOINCREMENT',
                    id_empresas : 'INTEGER',
                    cod_usuario : 'VARCHAR(25)',
                    dsc_usuario : 'VARCHAR(100)',
                    usuario : 'VARCHAR(50)',
                    nome : 'VARCHAR(100)',
                    senha : 'VARCHAR(32)',
                    nivel : 'INTEGER(1) DEFAULT 2',
                    data_hora_atualizacao : 'DATETIME',
                    data_hora_exclusao : 'DATETIME'
                }
            }
        ],
        drop : [
            {
                tbl : "clientes"
            }, {
                tbl : "empresas"
            }, {
                tbl : "pedidos"
            }, {
                tbl : "pedidos_itens"
            }, {
                tbl : "pedidos_pagamentos"
            }, {
                tbl : "produtos"
            }, {
                tbl : "usuarios"
            }
        ],
        usuarios : [
            {
                inst : {
                    id_empresas : '1',
                    cod_usuario : '1',
                    dsc_usuario : 'Administrador do sistema',
                    usuario : 'root',
                    nome : 'Administrador do sistema',
                    senha : md5('qazse'),
                    nivel : '1',
                    data_hora_atualizacao : date('Y-m-d H:i:s')
                }
            },
            {
                inst : {
                    id_empresas : '1',
                    cod_usuario : '2',
                    dsc_usuario : 'Teste do sistema',
                    usuario : 'demo',
                    nome : 'Teste do sistema',
                    senha : md5('demo'),
                    nivel : '2',
                    data_hora_atualizacao : date('Y-m-d H:i:s')
                }
            }
        ]
    },
    drop_tabelas : function() {
        var total = _configuracoes.tabelas.drop.length - 1;
        $.each(_configuracoes.tabelas.drop, function( d, c ) {
            db2.dropTable(c.tbl,
                    function() {
                        if ( total == d ) {
                            _constant.redirect('index.html');
                        }
                    });

        });
    },
    create_tabelas : function() {
        var total = _configuracoes.tabelas.create.length - 1;
        $.each(_configuracoes.tabelas.create, function( d, c ) {
            db2.createTable(c.name, c.cols,
                    function() {
                        if ( total == d ) {
                            _configuracoes.add_usuarios();
                        }
                    });
        });
    },
    add_usuarios : function() {
        var total = _configuracoes.tabelas.usuarios.length - 1;
        $.each(_configuracoes.tabelas.usuarios, function( d, c ) {
            db2.replace(
                    'usuarios',
                    c.inst,
                    function( f ) {
                        if ( total == d ) {
                            _constant.redirect('atualizacoes_ativacao.html');
                        }
                    }
            );
        });
    },
    verifica_tabelas : function() {
        db2.select(
                'sqlite_master',
                'name',
                {
                    where : {
                        type : "table",
                        name : "usuarios"
                    }
                },
        function( f ) {
            debug("TOTAL", f.rows.length);
            if ( f.rows.length != 0 ) {
                debug("SUCESSO", 'Redirecionando para o login.');
                _configuracoes.verifica_usuarios();
            } else {
                debug("ERROR", 'Criando tabelas.');
                _configuracoes.create_tabelas();
            }
        }, function() {
            _configuracoes.verifica_tabelas();
        }
        );
    },
    verifica_usuarios : function() {
        db2.select(
                'usuarios',
                'usuario',
                {
                    where : {
                        usuario : "root"
                    }
                },
        function( f ) {
            debug("TOTAL", f.rows.length);
            if ( f.rows.length == 0 ) {
                debug("SUCESSO", 'Criando usuário.');
                _configuracoes.add_usuarios();
            } else {
                debug("ERROR", 'Verificando chaves.');
                _configuracoes.verifica_chave();
            }
        }, function() {
            _configuracoes.verifica_tabelas();
        }
        );
    },
    get_chave : function( ) {
        db2.select(
                'empresas',
                '*',
                {
                },
                function( f ) {
                    debug("TOTAL", f.rows.length);
                    if ( f.rows.length == 0 ) {
                        debug("SUCESSO", 'Redirecionando para registro de chaves.');
                        _constant.redirect("atualizacoes_ativacao.html");
                    } else {
                        $.each(f.rows.item(0), function( z, x ) {
                            _session.set(z, x);
                        });
                    }
                }, function() {
            _configuracoes.verifica_tabelas();
        }
        );
    },
    verifica_chave : function( ) {
        db2.select(
                'empresas',
                '*',
                {
                },
                function( f ) {
                    debug("TOTAL", f.rows.length);
                    if ( f.rows.length == 0 ) {
                        debug("SUCESSO", 'Redirecionando para registro de chaves.');
                        _constant.redirect("atualizacoes_ativacao.html");
                    } else {
                        _session.set("cod_ativacao", f.rows.item(0).cod_ativacao);
                        if ( f.rows.item(0).codigo_cliente == '' ) {
                            debug("SUCESSO", 'Redirecionando para registro de chaves.');
                            _constant.redirect("atualizacoes_ativacao.html");
                        } else {
                            debug("SUCESSO", 'Redirecionando para login.');
                            _configuracoes.verifica_sincronizacao();
                        }
                    }
                }, function() {
            _configuracoes.verifica_tabelas();
        }
        );
    },
    verifica_sincronizacao : function() {
        db2.select(
                'produtos',
                '*',
                {
                },
                function( f ) {
                    debug("TOTAL", f.rows.length);
                    if ( f.rows.length == 0 ) {
                        debug("SUCESSO", 'Redirecionando para sincronização.');
                        _constant.redirect("atualizacoes_sincronizacao.html");
                    } else {
                        if ( _session.get("usuario") != null ) {
                            _constant.redirect("painel.html");
                        } else {
                            _session.clear();
                            _constant.redirect("login.html");
                        }

                    }
                }, function() {
            _configuracoes.verifica_tabelas();
        }
        );
    }
};