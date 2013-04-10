if ( db != null ) {
    function verificar_tabelas( ) {
        var a = [ {
                tbl : "DROP TABLE IF EXISTS empresas"
            }, {
                tbl : "DROP TABLE IF EXISTS equipamentos"
            }, {
                tbl : "DROP TABLE IF EXISTS clientes"
            }, {
                tbl : "DROP TABLE IF EXISTS produtos"
            }, {
                tbl : "DROP TABLE IF EXISTS usuarios"
            }, {
                tbl : "DROP TABLE IF EXISTS pedidos"
            }, {
                tbl : "DROP TABLE IF EXISTS pedidos_itens"
            }, {
                tbl : "DROP TABLE IF EXISTS sqlite_sequence"
            }, {
                tbl : "CREATE TABLE IF NOT EXISTS empresas ( id_empresas INTEGER PRIMARY KEY AUTOINCREMENT, uuid VARCHAR, codigo_cliente VARCHAR, codigo_ativacao VARCHAR, cpf_cnpj VARCHAR(14), nome_empresa VARCHAR(50), data_hora_cadastro TEXT, data_hora_exclusao TEXT )"
            }, {
                tbl : "CREATE TABLE IF NOT EXISTS equipamentos ( id_equipamentos INTEGER PRIMARY KEY AUTOINCREMENT, id_empresas INTEGER, imei VARCHAR(100) )"
            }, {
                tbl : "CREATE TABLE IF NOT EXISTS clientes ( id_clientes INTEGER PRIMARY KEY AUTOINCREMENT, id_empresas INTEGER, cod_cliente VARCHAR(50), dsc_cliente VARCHAR(45), data_hora_atualizacao TEXT, data_hora_exclusao TEXT )"
            }, {
                tbl : "CREATE TABLE IF NOT EXISTS produtos ( id_produtos INTEGER PRIMARY KEY AUTOINCREMENT, id_empresas INTEGER, cod_produto VARCHAR(50), dsc_produto VARCHAR(100), estoque REAL (10,5) DEFAULT 0, desconto_maximo REAL (10,2) DEFAULT 0, data_hora_atualizacao TEXT, valor REAL (10,2) )"
            }, {
                tbl : "CREATE TABLE IF NOT EXISTS usuarios ( id_usuarios INTEGER PRIMARY KEY AUTOINCREMENT, id_empresas INTEGER, cod_usuario VARCHAR(50), dsc_usuario VARCHAR(50) , usuario VARCHAR(50), nome VARCHAR(50), senha VARCHAR(32), nivel INTEGER, data_hora_atualizacao TEXT, data_hora_exclusao TEXT )"
            }, {
                tbl : "CREATE TABLE IF NOT EXISTS pedidos ( id_pedidos INTEGER PRIMARY KEY AUTOINCREMENT, id_empresas INTEGER, id_clientes INTEGER, id_equipamentos INTEGER, id_usuarios INTEGER, data_hora_cadastro TEXT , data_hora_finalizacao TEXT , data_hora_envio TEXT, data_hora_transmissao TEXT, data_hora_exclusao TEXT, observacao VARCHAR(255) )"
            }, {
                tbl : "CREATE TABLE IF NOT EXISTS pedidos_itens ( id_pedidos_itens INTEGER PRIMARY KEY AUTOINCREMENT, id_pedidos INTEGER, id_produtos INTEGER, data_hora_cadastro TEXT , quantidade VARCHAR(45), valor_unitario VARCHAR(45), data_hora_exclusao TEXT )"
            } ];
        $.each(a, function( d, c ) {
            db.transaction(function( b ) {
                b.executeSql(c.tbl, [ ], function( f, e ) {
                    debug("SUCESSO", c.tbl);
                    if ( d == (a.length - 1) ) {
                        definir_usuario_administradores();
                    }
                }, function( f, e ) {
                    debug("ERROR", e.message);
                });
            });
        });
    }

    function definir_usuario_administradores() {
        var a = [
            {
                inst : 'INSERT INTO usuarios ("id_empresas", "cod_usuario", "dsc_usuario", "usuario", "nome", "senha", "nivel") VALUES ("1", "124", "Administrador do sistema", "root", "Administrador do sistema", "' + md5('qazse') + '", "1");'
            },
            {
                inst : 'INSERT INTO usuarios ("id_empresas", "cod_usuario", "dsc_usuario", "usuario", "nome", "senha", "nivel") VALUES ("1", "123", "Tester do sistema", "demo", "Tester do sistema", "' + md5('demo') + '", "2");'
            } ];
        
        $.each(a, function( d, c ) {
            db.transaction(function( b ) {
                b.executeSql(c.inst, [ ], function( f, e ) {
                    debug("SUCESSO", c.inst);
                    if ( d == 1 ) {
                        constant.redirect("atualizacoes_ativacao.html");
                    }
                }, function( f, e ) {
                    debug("QUERY", c.inst);
                    debug("ERROR", e.message);
                });
            });
        });
    }

    function check_tabela() {
        var c = 'SELECT name FROM sqlite_master WHERE type="table" AND name="usuarios";';
        db.transaction(function( e ) {
            e.executeSql(c, [ ], function( g, f ) {
                debug("SUCESSO", c);
                debug("TOTAL", f.rows.length);
                if ( f.rows.length != 0 ) {
                    debug("SUCESSO", 'Redirecionando para o login.');
                    check_usuario_root();
                } else {
                    debug("ERROR", 'Criando tabelas.');
                    verificar_tabelas();
                }
            }, function( g, f ) {
                debug("ERROR", f.message);
                verificar_tabelas();
            });
        });
    }

    function check_usuario_root() {
        var c = 'SELECT usuario FROM usuarios WHERE usuario="root";';
        db.transaction(function( e ) {
            e.executeSql(c, [ ], function( g, f ) {
                debug("SUCESSO", c);
                debug("TOTAL", f.rows.length);
                if ( f.rows.length == 0 ) {
                    debug("SUCESSO", 'Criando usuário.');
                    verificar_tabelas();
                } else {
                    debug("ERROR", 'Redirecionando.');
                    _constant.redirect("login.html");
                }
            }, function( g, f ) {
                debug("ERROR", f.message);
                verificar_tabelas();

            });
        });
    }

}

