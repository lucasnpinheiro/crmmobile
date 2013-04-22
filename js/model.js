_configuracoes = {
    tabelas : {
        create : [
            {
                tbl : 'CREATE TABLE IF NOT EXISTS "clientes" ( "id_clientes" INTEGER PRIMARY KEY AUTOINCREMENT,  "id_empresas" INTEGER,  "cod_cliente" VARCHAR(50),  "dsc_cliente" VARCHAR(45),  "data_hora_atualizacao" DATETIME,  "data_hora_exclusao" DATETIME,  "valor_devido" REAL(10, 2),  "situacao" INT(1) DEFAULT 1);'
            }, {
                tbl : 'CREATE TABLE IF NOT EXISTS "empresas" ( "id_empresas" INTEGER PRIMARY KEY AUTOINCREMENT, "uuid" VARCHAR(50), "codigo_cliente" VARCHAR(50), "codigo_ativacao" VARCHAR(50), "cpf_cnpj" VARCHAR(14), "nome_empresa" VARCHAR(50), "data_hora_cadastro" DATETIME, "data_hora_exclusao" DATETIME);'
            }, {
                tbl : 'CREATE TABLE IF NOT EXISTS "pedidos" ( "id_pedidos" INTEGER PRIMARY KEY AUTOINCREMENT, "id_empresas" INTEGER, "id_clientes" INTEGER, "id_equipamentos" INTEGER, "id_usuarios" INTEGER, "data_hora_cadastro" DATETIME, "numero_pedido" VARCHAR(50), "observacao" VARCHAR(255), "situacao_envio" INT(1) DEFAULT 1, "situacao_pedido" INT(1) DEFAULT 1, "valor_total" REAL(10,2));'
            }, {
                tbl : 'CREATE TABLE IF NOT EXISTS "pedidos_itens" ( "id_pedidos_itens" INTEGER PRIMARY KEY AUTOINCREMENT, "id_pedidos" INTEGER, "id_produtos" INTEGER, "data_hora_cadastro" DATETIME, "quantidade" REAL(10,3), "valor_unitario" REAL(10,2), "valor_desconto" REAL(10,2));'
            }, {
                tbl : 'CREATE TABLE IF NOT EXISTS "pedidos_pagamentos" ( "id_pedidos_pagamentos" INTEGER PRIMARY KEY AUTOINCREMENT, "id_pedidos" INTEGER, "data_vencimento" DATE, "forma_pagamento" INTEGER, "valor_parcela" REAL(10, 2));'
            }, {
                tbl : 'CREATE TABLE IF NOT EXISTS "produtos" ( "id_produtos" INTEGER PRIMARY KEY AUTOINCREMENT, "id_empresas" INTEGER, "cod_produto" VARCHAR(25), "dsc_produto" VARCHAR(100), "estoque" REAL(10, 3) DEFAULT 0, "valor" REAL(10,2), "desconto_maximo" REAL (10,2) DEFAULT 0, "data_hora_atualizacao" DATETIME);'
            }, {
                tbl : 'CREATE TABLE IF NOT EXISTS "usuarios" ( "id_usuarios" INTEGER PRIMARY KEY AUTOINCREMENT, "id_empresas" INTEGER, "cod_usuario" VARCHAR(25), "dsc_usuario" VARCHAR(100), "usuario" VARCHAR(50), "nome" VARCHAR(100), "senha" VARCHAR(32), "nivel" INTEGER(1) DEFAULT 2, "data_hora_atualizacao" DATETIME, "data_hora_exclusao" DATETIME);'
            }
        ],
        drop : [
            {
                tbl : "DROP TABLE IF EXISTS clientes"
            }, {
                tbl : "DROP TABLE IF EXISTS empresas"
            }, {
                tbl : "DROP TABLE IF EXISTS pedidos"
            }, {
                tbl : "DROP TABLE IF EXISTS pedidos_itens"
            }, {
                tbl : "DROP TABLE IF EXISTS pedidos_pagamentos"
            }, {
                tbl : "DROP TABLE IF EXISTS produtos"
            }, {
                tbl : "DROP TABLE IF EXISTS usuarios"
            }
        ],
        usuarios : [
            {
                inst : 'INSERT INTO usuarios ("id_empresas", "cod_usuario", "dsc_usuario", "usuario", "nome", "senha", "nivel", "data_hora_atualizacao") VALUES ("1", "124", "Administrador do sistema", "root", "Administrador do sistema", "' + md5('qazse') + '", "1","' + date('Y-m-d H:i:s') + '");'
            },
            {
                inst : 'INSERT INTO usuarios ("id_empresas", "cod_usuario", "dsc_usuario", "usuario", "nome", "senha", "nivel", "data_hora_atualizacao") VALUES ("1", "124", "Teste do sistema", "demo", "Teste do sistema", "' + md5('demo') + '", "2","' + date('Y-m-d H:i:s') + '");'
            }
        ]
    },
    drop_tabelas : function() {
        var total = _configuracoes.tabelas.drop.length - 1;
        $.each(_configuracoes.tabelas.drop, function( d, c ) {
            db.transaction(function( b ) {
                b.executeSql(c.tbl, [ ],
                        function( f, e ) {
                            debug("QUERY", c.tbl);
                            if ( total == d ) {
                                _constant.redirect('index.html');
                            }
                        },
                        function( f, e ) {
                            debug("QUERY", c.tbl);
                            debug("ERROR", e.message);
                        });
            });
        });
    },
    create_tabelas : function() {
        var total = _configuracoes.tabelas.create.length - 1;
        $.each(_configuracoes.tabelas.create, function( d, c ) {
            db.transaction(function( b ) {
                b.executeSql(c.tbl, [ ],
                        function( f, e ) {
                            debug("QUERY", c.tbl);
                            if ( total == d ) {
                                _configuracoes.add_usuarios();
                            }
                        },
                        function( f, e ) {
                            debug("QUERY", c.tbl);
                            debug("ERROR", e.message);
                        });
            });
        });
    },
    add_usuarios : function() {
        var total = _configuracoes.tabelas.usuarios.length - 1;
        $.each(_configuracoes.tabelas.usuarios, function( d, c ) {
            db.transaction(function( b ) {
                b.executeSql(c.inst, [ ],
                        function( f, e ) {
                            debug("QUERY", c.inst);
                            if ( total == d ) {
                                _constant.redirect('atualizacoes_ativacao.html');
                            }
                        },
                        function( f, e ) {
                            debug("QUERY", c.inst);
                            debug("ERROR", e.message);
                        });
            });
        });
    },
    verifica_tabelas : function() {
        var c = 'SELECT name FROM sqlite_master WHERE type="table" AND name="usuarios";';
        db.transaction(function( e ) {
            e.executeSql(c, [ ],
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("TOTAL", f.rows.length);
                        if ( f.rows.length != 0 ) {
                            debug("SUCESSO", 'Redirecionando para o login.');
                            _configuracoes.verifica_usuarios();
                        } else {
                            debug("ERROR", 'Criando tabelas.');
                            _configuracoes.create_tabelas();
                        }
                    },
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("ERROR", f.message);
                        _configuracoes.verifica_tabelas();
                    });
        });
    },
    verifica_usuarios : function() {
        var c = 'SELECT usuario FROM usuarios WHERE usuario="root";';
        db.transaction(function( e ) {
            e.executeSql(c, [ ],
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("TOTAL", f.rows.length);
                        if ( f.rows.length == 0 ) {
                            debug("SUCESSO", 'Criando usuário.');
                            _configuracoes.add_usuarios();
                        } else {
                            debug("ERROR", 'Verificando chaves.');
                            _configuracoes.verifica_chave();
                        }
                    },
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("ERROR", f.message);
                        _configuracoes.verifica_tabelas();
                    });
        });
    },
    get_chave : function( ) {
        var c = 'SELECT * FROM empresas;';
        db.transaction(function( e ) {
            e.executeSql(c, [ ],
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("TOTAL", f.rows.length);
                        if ( f.rows.length == 0 ) {
                            debug("SUCESSO", 'Redirecionando para registro de chaves.');
                            _constant.redirect("atualizacoes_ativacao.html");
                        } else {
                            $.each(f.rows.item(0), function( z, x ) {
                                _session.set(z, x);
                            });
                        }
                    },
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("ERROR", f.message);
                        _configuracoes.verifica_tabelas();
                    });
        });
    },
    verifica_chave : function( ) {
        var c = 'SELECT codigo_cliente, codigo_ativacao FROM empresas;';
        db.transaction(function( e ) {
            e.executeSql(c, [ ],
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("TOTAL", f.rows.length);
                        _session.set("cod_ativacao", f.rows.item(0).codigo_ativacao);
                        if ( f.rows.length == 0 ) {
                            debug("SUCESSO", 'Redirecionando para registro de chaves.');
                            _constant.redirect("atualizacoes_ativacao.html");
                        } else {
                            if ( f.rows.item(0).codigo_cliente == '' ) {
                                debug("SUCESSO", 'Redirecionando para registro de chaves.');
                                _constant.redirect("atualizacoes_ativacao.html");
                            } else {
                                debug("SUCESSO", 'Redirecionando para login.');
                                _configuracoes.verifica_sincronizacao();
                            }
                        }
                    },
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("ERROR", f.message);
                        _configuracoes.verifica_tabelas();
                    });
        });
    },
    verifica_sincronizacao : function() {
        var c = 'SELECT * FROM produtos;';
        db.transaction(function( e ) {
            e.executeSql(c, [ ],
                    function( g, f ) {
                        debug("QUERY", c);
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
                    },
                    function( g, f ) {
                        debug("QUERY", c);
                        debug("ERROR", f.message);
                        _configuracoes.verifica_tabelas();
                    });
        });
    }
};