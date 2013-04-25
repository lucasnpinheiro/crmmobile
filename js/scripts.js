var _constant = {
    version : "01.00.00",
    maxPaginacao : 10,
    titles : {
        aviso : "CRM Mobile informa:",
        erro : "CRM Mobile informa erros localizados:"
    },
    redirect : function( a ) {
        window.location.href = a
    }
};
(function( $ ) {
    if ( typeof define === "function" && define.amd ) {
        define([ "jquery" ], $)
    } else {
        $(jQuery)
    }
}(function( $ ) {
    var a = /\+/g;
    function d( g ) {
        return g
    }
    function b( g ) {
        return decodeURIComponent(g.replace(a, " "))
    }
    function f( g ) {
        if ( g.indexOf('"') === 0 ) {
            g = g.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        }
        try {
            return c.json ? JSON.parse(g) : g
        } catch ( h ) {
        }
    }
    var c = $.cookie = function( p, o, u ) {
        if ( o !== undefined ) {
            u = $.extend({
            }, c.defaults, u);
            if ( typeof u.expires === "number" ) {
                var q = u.expires, s = u.expires = new Date();
                s.setDate(s.getDate() + q)
            }
            o = c.json ? JSON.stringify(o) : String(o);
            return(document.cookie = [ c.raw ? p : encodeURIComponent(p), "=", c.raw ? o : encodeURIComponent(o), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : "" ].join(""))
        }
        var g = c.raw ? d : b;
        var r = document.cookie.split("; ");
        var v = p ? undefined : {
        };
        for ( var n = 0, k = r.length; n < k; n++ ) {
            var m = r[n].split("=");
            var h = g(m.shift());
            var j = g(m.join("="));
            if ( p && p === h ) {
                v = f(j);
                break
            }
            if ( !p ) {
                v[h] = f(j)
            }
        }
        return v
    };
    c.defaults = {
    };
    $.removeCookie = function( h, g ) {
        if ( $.cookie(h) !== undefined ) {
            $.cookie(h, "", $.extend(g, {
                expires : -1
            }));
            return true
        }
        return false
    }
    $.clearCookie = function() {
        var cookies = document.cookie.split(";");
        for ( var i = 0; i < cookies.length; i++ ) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var h = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            $.cookie(h, "", $.extend({
            }, {
                expires : -1
            }));
        }
        return false
    }
}));
var _session = {
    get : function( a ) {
        var r = null;
        if ( typeof localStorage === "object" ) {
            if ( localStorage.getItem(a) != '' && localStorage.getItem(a) != undefined && localStorage.getItem(a) != null ) {
                r = localStorage.getItem(a);
            } else {
                r = null;
            }
        } else {
            if ( $.cookie(a) != '' && $.cookie(a) != undefined && $.cookie(a) != null ) {
                r = $.cookie(a);
            } else {
                r = null;
            }
        }
        return r;
    },
    set : function( a, b ) {
        if ( typeof localStorage === "object" ) {
            localStorage.setItem(a, b)
        } else {
            var c = new Date();
            c.setDate(exdate.getDate() + 1);
            $.cookie(a, b, {
                expires : c.toUTCString()
            })
        }
    },
    remove : function( a ) {
        if ( typeof localStorage === "object" ) {
            localStorage.removeItem(a)
        } else {
            $.removeCookie(a)
        }
    },
    clear : function(  ) {
        if ( typeof localStorage === "object" ) {
            localStorage.clear()
        } else {
            $.clearCookie()
        }
    }
};
$.fn.serializeObject = function() {
    var a = {
    };
    var b = function( d, c ) {
        var e = a[c.name];
        if ( "undefined" !== typeof e && e !== null ) {
            if ( $.isArray(e) ) {
                e.push(c.value)
            } else {
                a[c.name] = [ e, c.value ]
            }
        } else {
            a[c.name] = c.value
        }
    };
    $.each(this.serializeArray(), b);
    return a
};
function date( k, h ) {
    h = !h ? (new Date()).getTime() / 1000 : h;
    var g = this, j, e, b = /\\?([a-z])/gi, a, c = function( l, f ) {
        l = l.toString();
        return l.length < f ? c("0" + l, f, "0") : l
    }, d = [ "Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    a = function( f, l ) {
        return e[f] ? e[f]() : l
    };
    e = {
        d : function() {
            return c(e.j(), 2)
        },
        D : function() {
            return e.l().slice(0, 3)
        },
        j : function() {
            return j.getDate()
        },
        l : function() {
            return d[e.w()] + "day"
        },
        N : function() {
            return e.w() || 7
        },
        S : function() {
            var f = e.j();
            i = f % 10;
            if ( i <= 3 && parseInt((f % 100) / 10) == 1 ) {
                i = 0
            }
            return[ "st", "nd", "rd" ][i - 1] || "th"
        },
        w : function() {
            return j.getDay()
        },
        z : function() {
            var l = new Date(e.Y(), e.n() - 1, e.j()), f = new Date(e.Y(), 0, 1);
            return Math.round((l - f) / 86400000)
        },
        W : function() {
            var l = new Date(e.Y(), e.n() - 1, e.j() - e.N() + 3), f = new Date(l.getFullYear(), 0, 4);
            return c(1 + Math.round((l - f) / 86400000 / 7), 2)
        },
        F : function() {
            return d[6 + e.n()]
        },
        m : function() {
            return c(e.n(), 2)
        },
        M : function() {
            return e.F().slice(0, 3)
        },
        n : function() {
            return j.getMonth() + 1
        },
        t : function() {
            return(new Date(e.Y(), e.n(), 0)).getDate()
        },
        L : function() {
            var f = e.Y();
            return f % 4 === 0 & f % 100 !== 0 | f % 400 === 0
        },
        o : function() {
            var m = e.n(), f = e.W(), l = e.Y();
            return l + (m === 12 && f < 9 ? 1 : m === 1 && f > 9 ? -1 : 0)
        },
        Y : function() {
            return j.getFullYear()
        },
        y : function() {
            return e.Y().toString().slice(-2)
        },
        a : function() {
            return j.getHours() > 11 ? "pm" : "am"
        },
        A : function() {
            return e.a().toUpperCase()
        },
        B : function() {
            var l = j.getUTCHours() * 3600, f = j.getUTCMinutes() * 60, m = j.getUTCSeconds();
            return c(Math.floor((l + f + m + 3600) / 86.4) % 1000, 3)
        },
        g : function() {
            return e.G() % 12 || 12
        },
        G : function() {
            return j.getHours()
        },
        h : function() {
            return c(e.g(), 2)
        },
        H : function() {
            return c(e.G(), 2)
        },
        i : function() {
            return c(j.getMinutes(), 2)
        },
        s : function() {
            return c(j.getSeconds(), 2)
        },
        u : function() {
            return c(j.getMilliseconds() * 1000, 6)
        },
        e : function() {
            throw"Not supported (see source code of date() for timezone on how to add support)"
        },
        I : function() {
            var l = new Date(e.Y(), 0), n = Date.UTC(e.Y(), 0), f = new Date(e.Y(), 6), m = Date.UTC(e.Y(), 6);
            return((l - n) !== (f - m)) ? 1 : 0
        },
        O : function() {
            var l = j.getTimezoneOffset(), f = Math.abs(l);
            return(l > 0 ? "-" : "+") + c(Math.floor(f / 60) * 100 + f % 60, 4)
        },
        P : function() {
            var f = e.O();
            return(f.substr(0, 3) + ":" + f.substr(3, 2))
        },
        T : function() {
            return"UTC"
        },
        Z : function() {
            return -j.getTimezoneOffset() * 60
        },
        c : function() {
            return"Y-m-d\\TH:i:sP".replace(b, a)
        },
        r : function() {
            return"D, d M Y H:i:s O".replace(b, a)
        },
        U : function() {
            return j / 1000 | 0
        }
    };
    this.date = function( l, f ) {
        g = this;
        j = (f === undefined ? new Date() : (f instanceof Date) ? new Date(f) : new Date(f * 1000));
        return l.replace(b, a)
    };
    return this.date(k, h)
}
(function( j, b ) {
    var f = Array.prototype.push, a = /^(?:radio|checkbox)$/i, e = /\+/g, d = /^(?:option|select-one|select-multiple)$/i, g = /^(?:button|color|date|datetime|datetime-local|email|hidden|month|number|password|range|reset|search|submit|tel|text|textarea|time|url|week)$/i;
    function c( k ) {
        return k.map(function() {
            return this.elements ? j.makeArray(this.elements) : this
        }).filter(":input").get()
    }
    function h( k ) {
        var l, m = {
        };
        j.each(k, function( o, n ) {
            l = m[n.name];
            m[n.name] = l === b ? n : (j.isArray(l) ? l.concat(n) : [ l, n ])
        });
        return m
    }
    j.fn.deserialize = function( A, l ) {
        var y, n, q = c(this), t = [ ];
        if ( !A || !q.length ) {
            return this
        }
        if ( j.isArray(A) ) {
            t = A
        } else {
            if ( j.isPlainObject(A) ) {
                var B, w;
                for ( B in A ) {
                    j.isArray(w = A[B]) ? f.apply(t, j.map(w, function( D ) {
                        return{
                            name : B,
                            value : D
                        }
                    })) : f.call(t, {
                        name : B,
                        value : w
                    })
                }
            } else {
                if ( typeof A === "string" ) {
                    var v;
                    A = A.split("&");
                    for ( y = 0, n = A.length; y < n; y++ ) {
                        v = A[y].split("=");
                        f.call(t, {
                            name : decodeURIComponent(v[0]),
                            value : decodeURIComponent(v[1].replace(e, "%20"))
                        })
                    }
                }
            }
        }
        if ( !(n = t.length) ) {
            return this
        }
        var u, k, x, z, C, o, m, w, p = j.noop, s = j.noop, r = {
        };
        l = l || {
        };
        q = h(q);
        if ( j.isFunction(l) ) {
            s = l
        } else {
            p = j.isFunction(l.change) ? l.change : p;
            s = j.isFunction(l.complete) ? l.complete : s
        }
        for ( y = 0; y < n; y++ ) {
            u = t[y];
            C = u.name;
            w = u.value;
            if ( !(k = q[C]) ) {
                continue
            }
            m = (z = k.length) ? k[0] : k;
            m = (m.type || m.nodeName).toLowerCase();
            o = null;
            if ( g.test(m) ) {
                if ( z ) {
                    x = r[C];
                    k = k[r[C] = (x == b) ? 0 : ++x]
                }
                p.call(k, (k.value = w))
            } else {
                if ( a.test(m) ) {
                    o = "checked"
                } else {
                    if ( d.test(m) ) {
                        o = "selected"
                    }
                }
            }
            if ( o ) {
                if ( !z ) {
                    k = [ k ];
                    z = 1
                }
                for ( x = 0; x < z; x++ ) {
                    u = k[x];
                    if ( u.value == w ) {
                        p.call(u, (u[o] = true) && w)
                    }
                }
            }
        }
        s.call(this);
        return this
    }
})(jQuery);
function jAviso( a ) {
    msg(a, 'error');
    debug("AVISO", a);
}
function jSucesso( a ) {
    msg(a, 'aviso');
    debug("SUCESSO", a);
}
function debug( a, b ) {
    console.log(a + ': ' + date("Y-m-d H:i:s", (new Date()).getTime() / 1000) + '\n Mesagem: "' + b + '" \n\n\n')
}
function number_format( f, c, h, e ) {
    f = (f + "").replace(/[^0-9+\-Ee.]/g, "");
    var b = !isFinite(+f) ? 0 : +f, a = !isFinite(+c) ? 0 : Math.abs(c), k = (typeof e === "undefined") ? "," : e, d = (typeof h === "undefined") ? "." : h, j = "", g = function( o, m ) {
        var l = Math.pow(10, m);
        return"" + Math.round(o * l) / l
    };
    j = (a ? g(b, a) : "" + Math.round(b)).split(".");
    if ( j[0].length > 3 ) {
        j[0] = j[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, k)
    }
    if ( (j[1] || "").length < a ) {
        j[1] = j[1] || "";
        j[1] += new Array(a - j[1].length + 1).join("0")
    }
    return j.join(d)
}
/**
 * 
 * Regras de validação
 * @type Object
 * @return Boolean
 */
var _valida = {
    // Limpa string
    clear : function( string ) {
        var exp = /\.|\_|\:|\;|\ |\-/g;
        return string.toString().replace(exp, "");
    },
    // Valida Data
    data : function( data ) {
        var date = data;
        var array_data = new Array;
        var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
        array_data = date.split("/");
        var erro = false;
        if ( date.search(ExpReg) == -1 ) {
            erro = true;
        } else {
            if ( ((array_data[1] == 4) || (array_data[1] == 6) || (array_data[1] == 9) || (array_data[1] == 11)) && (array_data[0] > 30) ) {
                erro = true;
            } else {
                if ( array_data[1] == 2 ) {
                    if ( (array_data[0] > 28) && ((array_data[2] % 4) != 0) ) {
                        erro = true;
                    }
                    if ( (array_data[0] > 29) && ((array_data[2] % 4) == 0) ) {
                        erro = true;
                    }
                }
            }
        }
        return erro;
    },
    // Valida Hora
    hora : function( h ) {
        var retorno = false;
        if ( h.length > 4 ) {
            var novaHora = h.split(":");
            var hora = (novaHora[0] == undefined || novaHora[0] == "" ? null : novaHora[0]);
            var minuto = (novaHora[1] == undefined || novaHora[1] == "" ? null : novaHora[1]);
            var segundo = (novaHora[2] == undefined || novaHora[2] == "" ? null : novaHora[2]);
            if ( hora != null ) {
                if ( (hora >= 0) && (hora <= 23) ) {
                    if ( minuto != null ) {
                        if ( (minuto >= 0) && (minuto <= 59) ) {
                            if ( segundo != null ) {
                                if ( (segundo >= 0) && (segundo <= 59) ) {
                                    retorno = false;
                                } else {
                                    retorno = true;
                                }
                            } else {
                                retorno = false;
                            }
                        } else {
                            retorno = true;
                        }
                    }
                } else {
                    retorno = true;
                }
            } else {
                retorno = true;
            }
        } else {
            retorno = true;
        }
        return retorno;
    },
    // Valida Data Hora
    data_hora : function( data_hora ) {
        if ( data_hora != '' ) {
            var explode = data_hora.split(" ");
            var data = (explode[0] == undefined || explode[0] == "" ? null : explode[0]);
            var hora = (explode[1] == undefined || explode[1] == "" ? null : explode[1]);
            var retorno = false;
            if ( data != null ) {
                if ( _valida.data($.trim(data)) == true ) {
                    retorno = true;
                }
            } else {
                retorno = true;
            }
            if ( hora != null ) {
                if ( _valida.hora($.trim(hora)) == true ) {
                    retorno = true;
                }
            } else {
                retorno = true;
            }
            return retorno;
        } else {
            return false;
        }
    },
    // Valida CPF
    cpf : function( cpf ) {
        var exp = /\.|\-/g;
        cpf = cpf.toString().replace(exp, "");
        var erro = false;
        var digitos_iguais = 1;
        if ( cpf.length != 11 ) {
            erro = true;
        } else {
            if ( cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999" ) {
                erro = true;
            } else {
                for ( i = 0; i < cpf.length - 1; i++ ) {
                    if ( cpf.charAt(i) != cpf.charAt(i + 1) ) {
                        digitos_iguais = 0;
                        break;
                    }
                }
                if ( !digitos_iguais ) {
                    var numeros = cpf.substring(0, 9);
                    var digitos = cpf.substring(9);
                    var soma = 0;
                    for ( i = 10; i > 1; i-- ) {
                        soma += numeros.charAt(10 - i) * i;
                    }
                    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if ( resultado != digitos.charAt(0) ) {
                        erro = true;
                    }
                    numeros = cpf.substring(0, 10);
                    soma = 0;
                    for ( var i = 11; i > 1; i-- ) {
                        soma += numeros.charAt(11 - i) * i;
                    }
                    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if ( resultado != digitos.charAt(1) ) {
                        erro = true;
                    } else {
                        erro = false;
                    }
                } else {
                    erro = true;
                }
            }
        }
        return erro;
    },
    // Valida CNPJ
    cnpj : function( cnpj ) {
        var erro = false;
        var exp = /\.|\-|\//g;
        cnpj = cnpj.toString().replace(exp, "");
        if ( cnpj.length != 14 ) {
            erro = true;
        } else {
            if ( cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "88888888888888" || cnpj == "99999999999999" ) {
                erro = true;
            } else {
                var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
                var dig1 = new Number;
                var dig2 = new Number;
                var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));
                for ( i = 0; i < valida.length; i++ ) {
                    dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
                    dig2 += cnpj.charAt(i) * valida[i];
                }
                dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
                dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));
                if ( ((dig1 * 10) + dig2) != digito ) {
                    erro = true;
                }
            }
        }
        return erro;
    },
    // Valida E-mail
    email : function( mail ) {
        var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
        if ( er.test(mail) ) {
            return true;
        } else {
            return false;
        }
    }
};

(function( $ ) {
    $.fn.extend({
        form_valida : function( parametros ) {
            var defaults = {
            };

            var options = $.extend(true, defaults, parametros);
            var erro = 0;
            var form = this;
            var campos = "";

            $(this).find(":input").removeClass('textoErro').removeClass('textoSucesso').removeClass('textoAviso');
            $(this).find(":input").parent().removeClass('textoErro').removeClass('textoSucesso').removeClass('textoAviso');

            $.each($(this).find(":input").not(':button, :disabled'), function() {
                var name = this.id;
                var msg_error = '';

                if ( $(this).hasClass("obrigatorio") && $.trim($(this).val()) == "" ) {
                    erro++;
                    if ( msg_error != '' ) {
                        msg_error += "/n";
                    }
                    msg_error += "Campo obrigatório";
                }

                if ( $(this).hasClass("data") ) {
                    if ( _valida.data($.trim($(this).val())) == true ) {
                        erro++;
                        if ( msg_error != '' ) {
                            msg_error += "/n";
                        }
                        msg_error += "Data inválida";
                    }
                }

                if ( ($(this).hasClass("hora") || $(this).hasClass("hora_segundos")) ) {
                    if ( _valida.hora($.trim($(this).val())) == true ) {
                        erro++;
                        if ( msg_error != '' ) {
                            msg_error += "/n";
                        }
                        msg_error += "Hora inválida";
                    }
                }

                if ( $(this).hasClass("data_hora") ) {
                    if ( _valida.data_hora($.trim($(this).val())) == true ) {
                        erro++;
                        if ( msg_error != '' ) {
                            msg_error += "/n";
                        }
                        msg_error += "Data/Hora inválida";
                    }
                }

                if ( $(this).hasClass("cpf") ) {
                    if ( _valida.cpf($.trim($(this).val())) == true ) {
                        erro++;
                        if ( msg_error != '' ) {
                            msg_error += "/n";
                        }
                        msg_error += "CPF inválido";
                    }
                }


                if ( $(this).hasClass("cnpj") ) {
                    if ( _valida.cnpj($.trim($(this).val())) == true ) {
                        erro++;
                        if ( msg_error != '' ) {
                            msg_error += "/n";
                        }
                        msg_error += "CNPJ inválido";
                    }
                }

                if ( $(this).hasClass("cpf_cnpj") ) {
                    if ( $.trim($(this).val()).length == 14 ) {
                        if ( _valida.cpf($.trim($(this).val())) == true ) {
                            erro++;
                            if ( msg_error != '' ) {
                                msg_error += "/n";
                            }
                            msg_error += "CPF inválido";
                        }
                    } else {
                        if ( _valida.cnpj($.trim($(this).val())) == true ) {
                            erro++;
                            if ( msg_error != '' ) {
                                msg_error += "/n";
                            }
                            msg_error += "CNPJ inválido";
                        }
                    }
                }

                if ( $(this).hasClass("email") ) {
                    if ( _valida.email($.trim($(this).val())) == false ) {
                        erro++;
                        if ( msg_error != '' ) {
                            msg_error += "/n";
                        }
                        msg_error += "E-mail inválida";
                    }
                }

                if ( $(this).hasClass("telefone") ) {
                    if ( $.trim($(this).val()).length < 14 && $.trim($(this).val()).length > 15 ) {
                        erro++;
                        if ( msg_error != '' ) {
                            msg_error += "/n";
                        }
                        msg_error += "Formato do telefone inválido";
                    }
                }

                if ( msg_error != "" ) {
                    if ( campos != '' ) {
                        campos += ", ";
                    }
                    campos += '"' + name + '" : "' + $.trim(msg_error) + '"';
                }

            });
            if ( erro > 0 ) {
                $(form).color_campos_form({
                    campos : $.parseJSON('{ ' + campos + ' }'),
                    id_msg : options.id_msg
                });
                return false;
            } else {
                return true;
            }
        }
    });
})(jQuery);

(function( $ ) {
    $.fn.extend({
        color_campos_form : function( parametros ) {
            var defaults = {
                class_erro : "textoErro",
                class_sucesso : "textoSucesso",
                class_aviso : "textoAviso",
                class_desabilitado : "textoDisabled",
                class_span_erro : "spanError",
                campos : {
                }
            };

            var options = $.extend(true, defaults, parametros);
            var obj = $(this);
            var meuArray = new Array();

            $('.' + options.class_span_erro).remove();

            $.each(options.campos, function( a, b ) {
                meuArray[a] = b;
            });
            $.each(obj.find(":input").not(':button'), function( c, d ) {
                $(d).removeClass(options.class_sucesso).removeClass(options.class_erro).removeClass(options.class_aviso).addClass(options.class_sucesso);
                $(d).parent().removeClass(options.class_sucesso).removeClass(options.class_erro).removeClass(options.class_aviso).addClass(options.class_sucesso);
                if ( meuArray[$(d).attr("id")] ) {
                    var b = meuArray[$(d).attr("id")];
                    $(d).removeClass(options.class_sucesso).removeClass(options.class_erro).removeClass(options.class_aviso).removeAttr("title").addClass(options.class_erro).attr("title", b);
                    $(d).parent().removeClass(options.class_sucesso).removeClass(options.class_erro).removeClass(options.class_aviso).removeAttr("title").addClass(options.class_erro).attr("title", b);
                    $(d).parent().after('<span class="span_remove_error_' + $(d).attr("id") + ' ' + options.class_span_erro + '">' + b + '</span>');
                }
            });
        }
    });
})(jQuery);


(function( $ ) {
    $.fn.extend({
        insere_mascara : function( parametros ) {
            var defaults = {
            };

            var options = $.extend(true, defaults, parametros);
            $(this).attr("onsubmit", "return false;");
            $.each($(this).find(":input").not(':button'), function() {
                if ( $(this).attr("disabled") ) {
                    $(this).addClass("textoDisabled");
                }
                if ( $(this).attr("required") ) {
                    $(this).addClass('obrigatorio');
                }

                if ( $(this).hasClass("obrigatorio") ) {
                    $(this).removeAttr("title");
                    $(this).attr("required", true);
                    $(this).parent().addClass('obrigatorio');
                }
                if ( $(this).hasClass("data") ) {
                    $(this).pickadate();
                }
                if ( $(this).hasClass("email") ) {
                    $(this).attr("title", "Informe um E-mail.").attr("maxlength", "255").css('width', '90%');
                }
                if ( $(this).hasClass("cpf") ) {
                    $(this).attr("title", "Informe um CPF.").attr("size", "16").attr("maxlength", "14");
                }
                if ( $(this).hasClass("telefone") ) {
                    $(this).attr("title", "Informe um Telefone com DDD.").attr("size", "16").attr("maxlength", "14");
                }
                if ( $(this).hasClass("cnpj") ) {
                    $(this).attr("title", "Informe um CNPJ.").attr("size", "20").attr("maxlength", "18");
                }
            });

            $.each($(this).find(":input").not(':button'), function() {
                var concat = "";
                if ( $(this).hasClass("obrigatorio") ) {
                    concat = $(this).attr("title");
                    if ( concat == undefined || $.trim(concat) == "" ) {
                        $(this).attr("title", "Campo obrigatório.");
                    } else {
                        $(this).attr("title", "Campo obrigatório, " + concat);
                    }
                }
            });
        }
    });
})(jQuery);

function md5( D ) {
    var E;
    var y = function( b, a ) {
        return(b << a) | (b >>> (32 - a))
    };
    var I = function( k, b ) {
        var W, a, d, x, c;
        d = (k & 2147483648);
        x = (b & 2147483648);
        W = (k & 1073741824);
        a = (b & 1073741824);
        c = (k & 1073741823) + (b & 1073741823);
        if ( W & a ) {
            return(c ^ 2147483648 ^ d ^ x)
        }
        if ( W | a ) {
            if ( c & 1073741824 ) {
                return(c ^ 3221225472 ^ d ^ x)
            } else {
                return(c ^ 1073741824 ^ d ^ x)
            }
        } else {
            return(c ^ d ^ x)
        }
    };
    var s = function( a, c, b ) {
        return(a & c) | ((~a) & b)
    };
    var r = function( a, c, b ) {
        return(a & b) | (c & (~b))
    };
    var q = function( a, c, b ) {
        return(a ^ c ^ b)
    };
    var o = function( a, c, b ) {
        return(c ^ (a | (~b)))
    };
    var v = function( X, W, ab, aa, k, Y, Z ) {
        X = I(X, I(I(s(W, ab, aa), k), Z));
        return I(y(X, Y), W)
    };
    var f = function( X, W, ab, aa, k, Y, Z ) {
        X = I(X, I(I(r(W, ab, aa), k), Z));
        return I(y(X, Y), W)
    };
    var G = function( X, W, ab, aa, k, Y, Z ) {
        X = I(X, I(I(q(W, ab, aa), k), Z));
        return I(y(X, Y), W)
    };
    var u = function( X, W, ab, aa, k, Y, Z ) {
        X = I(X, I(I(o(W, ab, aa), k), Z));
        return I(y(X, Y), W)
    };
    var e = function( W ) {
        var X;
        var d = W.length;
        var c = d + 8;
        var b = (c - (c % 64)) / 64;
        var x = (b + 1) * 16;
        var Y = new Array(x - 1);
        var a = 0;
        var k = 0;
        while ( k < d ) {
            X = (k - (k % 4)) / 4;
            a = (k % 4) * 8;
            Y[X] = (Y[X] | (W.charCodeAt(k) << a));
            k++
        }
        X = (k - (k % 4)) / 4;
        a = (k % 4) * 8;
        Y[X] = Y[X] | (128 << a);
        Y[x - 2] = d << 3;
        Y[x - 1] = d >>> 29;
        return Y
    };
    var t = function( d ) {
        var a = "", b = "", k, c;
        for ( c = 0; c <= 3; c++ ) {
            k = (d >>> (c * 8)) & 255;
            b = "0" + k.toString(16);
            a = a + b.substr(b.length - 2, 2)
        }
        return a
    };
    var F = [ ], M, h, H, w, g, V, U, T, S, P = 7, N = 12, K = 17, J = 22, C = 5, B = 9, A = 14, z = 20, p = 4, n = 11, m = 16, l = 23, R = 6, Q = 10, O = 15, L = 21;
    D = this.utf8_encode(D);
    F = e(D);
    V = 1732584193;
    U = 4023233417;
    T = 2562383102;
    S = 271733878;
    E = F.length;
    for ( M = 0; M < E; M += 16 ) {
        h = V;
        H = U;
        w = T;
        g = S;
        V = v(V, U, T, S, F[M + 0], P, 3614090360);
        S = v(S, V, U, T, F[M + 1], N, 3905402710);
        T = v(T, S, V, U, F[M + 2], K, 606105819);
        U = v(U, T, S, V, F[M + 3], J, 3250441966);
        V = v(V, U, T, S, F[M + 4], P, 4118548399);
        S = v(S, V, U, T, F[M + 5], N, 1200080426);
        T = v(T, S, V, U, F[M + 6], K, 2821735955);
        U = v(U, T, S, V, F[M + 7], J, 4249261313);
        V = v(V, U, T, S, F[M + 8], P, 1770035416);
        S = v(S, V, U, T, F[M + 9], N, 2336552879);
        T = v(T, S, V, U, F[M + 10], K, 4294925233);
        U = v(U, T, S, V, F[M + 11], J, 2304563134);
        V = v(V, U, T, S, F[M + 12], P, 1804603682);
        S = v(S, V, U, T, F[M + 13], N, 4254626195);
        T = v(T, S, V, U, F[M + 14], K, 2792965006);
        U = v(U, T, S, V, F[M + 15], J, 1236535329);
        V = f(V, U, T, S, F[M + 1], C, 4129170786);
        S = f(S, V, U, T, F[M + 6], B, 3225465664);
        T = f(T, S, V, U, F[M + 11], A, 643717713);
        U = f(U, T, S, V, F[M + 0], z, 3921069994);
        V = f(V, U, T, S, F[M + 5], C, 3593408605);
        S = f(S, V, U, T, F[M + 10], B, 38016083);
        T = f(T, S, V, U, F[M + 15], A, 3634488961);
        U = f(U, T, S, V, F[M + 4], z, 3889429448);
        V = f(V, U, T, S, F[M + 9], C, 568446438);
        S = f(S, V, U, T, F[M + 14], B, 3275163606);
        T = f(T, S, V, U, F[M + 3], A, 4107603335);
        U = f(U, T, S, V, F[M + 8], z, 1163531501);
        V = f(V, U, T, S, F[M + 13], C, 2850285829);
        S = f(S, V, U, T, F[M + 2], B, 4243563512);
        T = f(T, S, V, U, F[M + 7], A, 1735328473);
        U = f(U, T, S, V, F[M + 12], z, 2368359562);
        V = G(V, U, T, S, F[M + 5], p, 4294588738);
        S = G(S, V, U, T, F[M + 8], n, 2272392833);
        T = G(T, S, V, U, F[M + 11], m, 1839030562);
        U = G(U, T, S, V, F[M + 14], l, 4259657740);
        V = G(V, U, T, S, F[M + 1], p, 2763975236);
        S = G(S, V, U, T, F[M + 4], n, 1272893353);
        T = G(T, S, V, U, F[M + 7], m, 4139469664);
        U = G(U, T, S, V, F[M + 10], l, 3200236656);
        V = G(V, U, T, S, F[M + 13], p, 681279174);
        S = G(S, V, U, T, F[M + 0], n, 3936430074);
        T = G(T, S, V, U, F[M + 3], m, 3572445317);
        U = G(U, T, S, V, F[M + 6], l, 76029189);
        V = G(V, U, T, S, F[M + 9], p, 3654602809);
        S = G(S, V, U, T, F[M + 12], n, 3873151461);
        T = G(T, S, V, U, F[M + 15], m, 530742520);
        U = G(U, T, S, V, F[M + 2], l, 3299628645);
        V = u(V, U, T, S, F[M + 0], R, 4096336452);
        S = u(S, V, U, T, F[M + 7], Q, 1126891415);
        T = u(T, S, V, U, F[M + 14], O, 2878612391);
        U = u(U, T, S, V, F[M + 5], L, 4237533241);
        V = u(V, U, T, S, F[M + 12], R, 1700485571);
        S = u(S, V, U, T, F[M + 3], Q, 2399980690);
        T = u(T, S, V, U, F[M + 10], O, 4293915773);
        U = u(U, T, S, V, F[M + 1], L, 2240044497);
        V = u(V, U, T, S, F[M + 8], R, 1873313359);
        S = u(S, V, U, T, F[M + 15], Q, 4264355552);
        T = u(T, S, V, U, F[M + 6], O, 2734768916);
        U = u(U, T, S, V, F[M + 13], L, 1309151649);
        V = u(V, U, T, S, F[M + 4], R, 4149444226);
        S = u(S, V, U, T, F[M + 11], Q, 3174756917);
        T = u(T, S, V, U, F[M + 2], O, 718787259);
        U = u(U, T, S, V, F[M + 9], L, 3951481745);
        V = I(V, h);
        U = I(U, H);
        T = I(T, w);
        S = I(S, g)
    }
    var j = t(V) + t(U) + t(T) + t(S);
    return j.toLowerCase()
}
String.prototype.format = function() {
    var c = this;
    for ( var a = 0; a < arguments.length; a++ ) {
        var b = new RegExp("\\{" + a + "\\}", "gi");
        c = c.replace(b, arguments[a])
    }
    return c
};
function block( a ) {
    $("body").append("<div class='ui-loader-background'> </div>");
    $.mobile.loading("show", {
        text : "Aguarde sincronizando a base de dados.",
        textVisible : true,
        theme : "e",
        textonly : false
    });
    $(".ui-loader").css("display", "block");
    if ( a == true ) {
        $("div.ui-loader-background").remove();
        $.mobile.loading("hide");
        $(".ui-loader").css("display", "none")
    }
}
function TimeCounter() {
    this.startDate = null;
    this.ellapsedTime = null;
    this.start = function() {
        this.startDate = new Date();
    };
    this.stop = function() {
        return Math.ceil((new Date() - this.startDate) / 1000);
    };
}
function utf8_encode( a ) {
    if ( a === null || typeof a === "undefined" ) {
        return""
    }
    var j = (a + "");
    var k = "", b, e, c = 0;
    b = e = 0;
    c = j.length;
    for ( var d = 0; d < c; d++ ) {
        var h = j.charCodeAt(d);
        var g = null;
        if ( h < 128 ) {
            e++
        } else {
            if ( h > 127 && h < 2048 ) {
                g = String.fromCharCode((h >> 6) | 192, (h & 63) | 128)
            } else {
                if ( h & 63488 != 55296 ) {
                    g = String.fromCharCode((h >> 12) | 224, ((h >> 6) & 63) | 128, (h & 63) | 128)
                } else {
                    if ( h & 64512 != 55296 ) {
                        throw new RangeError("Unmatched trail surrogate at " + d)
                    }
                    var f = j.charCodeAt(++d);
                    if ( f & 64512 != 56320 ) {
                        throw new RangeError("Unmatched lead surrogate at " + (d - 1))
                    }
                    h = ((h & 1023) << 10) + (f & 1023) + 65536;
                    g = String.fromCharCode((h >> 18) | 240, ((h >> 12) & 63) | 128, ((h >> 6) & 63) | 128, (h & 63) | 128)
                }
            }
        }
        if ( g !== null ) {
            if ( e > b ) {
                k += j.slice(b, e)
            }
            k += g;
            b = e = d + 1
        }
    }
    if ( e > b ) {
        k += j.slice(b, c)
    }
    return k
}

function convert_date( d, s ) {
    s = (!s ? '-' : s);
    var a = d.split('/');
    return a[2] + s + a[1] + s + a[0];
}
function convert_moeda( d ) {
    d = d.replace(/\./g,'');
    d = d.replace(/\,/g,'.');
    return parseFloat(d);
}

(function( $ ) {
    $.send = function( options ) {
        var settings = $.extend(true, {
            type : 'POST',
            crypt : false,
            url : '',
            dataType : 'json',
            data : {
            },
            beforeSend : function( result, settings ) {
            },
            success : function( result, settings ) {
            },
            error : function( result, settings ) {
            },
            extra : function( result, settings ) {
            },
            execute : function( settings ) {
                $.ajax({
                    type : settings.type,
                    data : (settings.crypt == true ? json_encode(settings.data) : settings.data),
                    dataType : settings.dataType,
                    url : settings.url,
                    contentType : 'application/json',
                    crossDomain : true,
                    beforeSend : function() {
                        settings.beforeSend.call(null, {
                        }, settings);
                    },
                    success : function( b ) {
                        if ( b.cod_retorno == 999 ) {
                            jAviso(b.mensagem);
                            settings.error.call(null, b, settings);
                        } else {
                            settings.success.call(null, b, settings);
                        }
                    },
                    error : function( c, a ) {
                        var d = "";
                        if ( c.status === 0 ) {
                            d = ("Não conectar. \n Verifique Rede.");
                        } else if ( c.status === 404 ) {
                            d = ("A url:'" + settings.url + "' solicitada não foi encontrada. [404]");
                        } else if ( c.status === 500 ) {
                            d = ("A url:'" + settings.url + "' solicitada contém um error interno no servidor. [500]");
                        } else if ( a === "parsererror" ) {
                            d = ("Solicitado de análise do JSON falhou.");
                        } else if ( a === "timeout" ) {
                            d = ("Erro. Tempo limite excedeu.");
                        } else if ( a === "abort" ) {
                            d = ("Pedido Ajax abortada.");
                        } else {
                            d = ("Tipo do erro não detectado. /n " + c.responseText);
                        }
                        jAviso(d);
                        settings.error.call(null, {
                        }, settings);
                    }
                });
            }
        },
        options);
        settings.extra.call(null, {
        }, settings);
        if ( settings.url != _situacoes.urls.ativacao ) {
            settings.data.cod_ativacao = (_session.get("cod_ativacao") == null ? '' : _session.get("cod_ativacao"));
            settings.data.cod_usuario = (_session.get("cod_usuario") == null ? '' : _session.get("cod_usuario"));
            settings.data.tipo_conexao = (_session.get("tipo_conexao") == null ? '' : _session.get("tipo_conexao"));
        }
        settings.execute.call(null, settings);
    }
})(jQuery);

function msg( a, c ) {
    $('div.conteudo .msg_sistema').fadeOut("slow");
    if ( $('div.conteudo .msg_sistema').length == 0 ) {
        $('div.conteudo').prepend('<div class="msg_sistema"></div>');
    }
    $('div.conteudo .msg_sistema').html(a).addClass('msg_' + c).css({
        'margin' : '1em 0',
        'padding' : '5px',
        'text-align' : 'center',
        'font-size' : '0.9em',
        'font-weight' : 'bold'
    }).fadeIn("slow");
    ;
}

function SQLite( cfg ) {
    if ( typeof window.openDatabase === 'undefined' ) {
        return;
    }

    function log( str ) {
        if ( typeof console !== 'undefined' ) {
            console.log(str);
        }
    }

    function isNumber( val ) {
        switch ( typeof val ) {
            case 'number':
                return true;
            case 'string':
                return (/^\d+$/).test(val);
            case 'object':
                return false;
        }
    }

    // Default Handlers
    function nullDataHandler( results ) {
    }

    function errorHandler( error, query ) {
        debug("QUERY", query);
        debug('Oops. ' + error.message + ' (Code ' + error.code + ')');
    }

    var config = cfg || {
    }, db;

    config.shortName = config.shortName || 'mydatabase';
    config.version = config.version || '';
    config.displayName = config.displayName || 'My SQLite Database';
    config.maxSize = 65536;
    config.defaultErrorHandler = config.defaultErrorHandler || errorHandler;
    config.defaultDataHandler = config.defaultDataHandler || nullDataHandler;

    try {
        db = openDatabase(config.shortName, config.version, config.displayName, config.maxSize);
    } catch ( e ) {
        if ( e === 2 ) {
            log("Invalid database version.");
        } else {
            log("Unknown error " + e + ".");
        }

        return;
    }

    function execute( query, v, d, e ) {
        var values = v || [ ],
                dH = d || config.defaultDataHandler,
                eH = e || config.defaultErrorHandler;

        if ( !query || query === '' ) {
            return;
        }

        function db_err( t, error ) {
            eH(error, query);
        }

        function db_data( t, result ) {
            dH(result, query);
        }

        db.transaction(
                function( transaction ) {
                    transaction.executeSql(query, values, db_data, db_err);
                    debug("QUERY", query);
                    debug("VALUES", values.join('|'));
                }
        );
    }

    function buildConditions( conditions ) {
        var results = [ ], values = [ ], x;

        if ( typeof conditions === 'string' ) {
            results.push(conditions);
        } else if ( typeof conditions === 'number' ) {
            results.push("id=?");
            values.push(conditions);
        } else if ( typeof conditions === 'object' ) {
            for ( x in conditions ) {
                if ( conditions.hasOwnProperty(x) ) {
                    if ( isNumber(x) ) {
                        results.push(conditions[x]);
                    } else if ( (/like/gi).test(x) ) {
                        results.push(x.replace(/like/gi,"") + " LIKE '%"+conditions[x]+"%' ");
                    } else {
                        results.push(x + '=?');
                        values.push(conditions[x]);
                    }
                }
            }
        }

        if ( results.length > 0 ) {
            results = " WHERE " + results.join(' AND ');
        } else {
            results = '';
        }

        return [ results, values ];
    }

    function createTableSQL( name, cols ) {
        var c = '';
        if ( typeof cols == 'object' ) {
            $.each(cols, function( a, b ) {
                if ( c != '' ) {
                    c += ', ';
                }
                c += a + ' ' + b;
            })
        } else {
            c = cols;
        }
        var query = "CREATE TABLE IF NOT EXISTS " + name + "(" + c + ");";

        return [ query, [ ] ];
    }

    function dropTableSQL( name ) {
        var query = "DROP TABLE IF EXISTS " + name + ";";

        return [ query, [ ] ];
    }

    function insertSQL( table, map ) {
        var query = "INSERT INTO " + table + " (#k#) VALUES(#v#);", keys = [ ], holders = [ ], values = [ ], x;

        for ( x in map ) {
            if ( map.hasOwnProperty(x) ) {
                keys.push(x);
                holders.push('?');
                values.push(map[x]);
            }
        }

        query = query.replace("#k#", keys.join(','));
        query = query.replace("#v#", holders.join(','));

        return [ query, values ];
    }

    function replaceSQL( table, map ) {
        var query = "INSERT OR REPLACE INTO " + table + " (#k#) VALUES(#v#);", keys = [ ], holders = [ ], values = [ ], x;

        for ( x in map ) {
            if ( map.hasOwnProperty(x) ) {
                keys.push(x);
                holders.push('?');
                values.push(map[x]);
            }
        }

        query = query.replace("#k#", keys.join(','));
        query = query.replace("#v#", holders.join(','));

        return [ query, values ];
    }

    function updateSQL( table, map, conditions ) {
        var query = "UPDATE " + table + " SET #k##m#", keys = [ ], values = [ ], x;

        for ( x in map ) {
            if ( map.hasOwnProperty(x) ) {
                keys.push(x + '=?');
                values.push(map[x]);
            }
        }

        conditions = buildConditions(conditions);

        values = values.concat(conditions[1]);

        query = query.replace("#k#", keys.join(','));
        query = query.replace("#m#", conditions[0]);

        return [ query, values ];
    }

    function selectSQL( table, columns, conditions, options ) {
        var query = 'SELECT #col# FROM ' + table + '#cond#', values = [ ];

        if ( typeof columns === 'undefined' ) {
            columns = '*';
        } else if ( typeof columns === 'object' ) {
            columns.join(',');
        }

        conditions = buildConditions(conditions);

        values = values.concat(conditions[1]);

        query = query.replace("#col#", columns);
        query = query.replace('#cond#', conditions[0]);

        if ( options ) {
            if ( options.order ) {
                query = query + ' ORDER BY ?';
                values.push(options.order);
            }
            if ( options.limit ) {
                query = query + ' LIMIT ?';
                values.push(options.limit);
            }
            if ( options.offset ) {
                query = query + ' OFFSET ?';
                values.push(options.offset);
            }
        }

        query = query + ';';

        return [ query, values ];
    }

    function destroySQL( table, conditions ) {
        var query = 'DELETE FROM ' + table + '#c#;';

        conditions = buildConditions(conditions);

        query = query.replace('#c#', conditions[0]);

        return [ query, conditions[1] ];
    }

    return {
        database : db,
        createTable : function( name, cols, db_data, db_error ) {
            var sql = createTableSQL(name, cols);
            execute(sql[0], sql[1], db_data, db_error);
        },
        dropTable : function( name, db_data, db_error ) {
            var sql = dropTableSQL(name);
            execute(sql[0], sql[1], db_data, db_error);
        },
        insert : function( table, map, db_data, db_error ) {
            var sql = insertSQL(table, map);
            execute(sql[0], sql[1], db_data, db_error);
        },
        replace : function( table, map, db_data, db_error ) {
            var sql = replaceSQL(table, map);
            execute(sql[0], sql[1], db_data, db_error);
        },
        update : function( table, map, conditions, db_data, db_error ) {
            var sql = updateSQL(table, map, conditions);
            execute(sql[0], sql[1], db_data, db_error);
        },
        select : function( table, columns, conditions, db_data, db_error ) {
            conditions.where = conditions.where || {
            };
            conditions.options = conditions.options || {
            };
            var sql = selectSQL(table, columns, conditions.where, conditions.options);
            execute(sql[0], sql[1], db_data, db_error);
        },
        destroy : function( table, conditions, db_data, db_error ) {
            var sql = destroySQL(table, conditions);
            execute(sql[0], sql[1], db_data, db_error);
        }
    };
}

function json_encode( mixed_val ) {
    // http://kevin.vanzonneveld.net
    // +      original by: Public Domain (http://www.json.org/json2.js)
    // + reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      improved by: Michael White
    // +      input by: felix
    // +      bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *        example 1: json_encode(['e', {pluribus: 'unum'}]);
    // *        returns 1: '[\n    "e",\n    {\n    "pluribus": "unum"\n}\n]'
    /*
     http://www.JSON.org/json2.js
     2008-11-19
     Public Domain.
     NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
     See http://www.JSON.org/js.html
     */
    var retVal, json = this.window.JSON;
    try {
        if ( typeof json === 'object' && typeof json.stringify === 'function' ) {
            retVal = json.stringify(mixed_val); // Errors will not be caught here if our own equivalent to resource
            //  (an instance of PHPJS_Resource) is used
            if ( retVal === undefined ) {
                throw new SyntaxError('json_encode');
            }
            return retVal;
        }

        var value = mixed_val;

        var quote = function( string ) {
            var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            var meta = { // table of character substitutions
                '\b' : '\\b',
                '\t' : '\\t',
                '\n' : '\\n',
                '\f' : '\\f',
                '\r' : '\\r',
                '"' : '\\"',
                '\\' : '\\\\'
            };

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function( a ) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        };

        var str = function( key, holder ) {
            var gap = '';
            var indent = '    ';
            var i = 0; // The loop counter.
            var k = ''; // The member key.
            var v = ''; // The member value.
            var length = 0;
            var mind = gap;
            var partial = [ ];
            var value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.
            if ( value && typeof value === 'object' && typeof value.toJSON === 'function' ) {
                value = value.toJSON(key);
            }

            // What happens next depends on the value's type.
            switch ( typeof value ) {
                case 'string':
                    return quote(value);

                case 'number':
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':
                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.
                    return String(value);

                case 'object':
                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if ( !value ) {
                        return 'null';
                    }
                    if ( (this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource && value instanceof window.PHPJS_Resource) ) {
                        throw new SyntaxError('json_encode');
                    }

                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent;
                    partial = [ ];

                    // Is the value an array?
                    if ( Object.prototype.toString.apply(value) === '[object Array]' ) {
                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.
                        length = value.length;
                        for ( i = 0; i < length; i += 1 ) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // Iterate through all of the keys in the object.
                    for ( k in value ) {
                        if ( Object.hasOwnProperty.call(value, k) ) {
                            v = str(k, value);
                            if ( v ) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
                case 'undefined':
                    // Fall-through
                case 'function':
                    // Fall-through
                default:
                    throw new SyntaxError('json_encode');
            }
        };

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str('', {
            '' : value
        });

    } catch ( err ) { // Todo: ensure error handling above throws a SyntaxError in all cases where it could
        // (i.e., when the JSON global is not available and there is an error)
        if ( !(err instanceof SyntaxError) ) {
            throw new Error('Unexpected error type in json_encode()');
        }
        this.php_js = this.php_js || {
        };
        this.php_js.last_error_json = 4; // usable by json_last_error()
        return null;
    }
}

/*!
 * pickadate.js v2.1.7 - 25 March, 2013
 * By Amsul (http://amsul.ca)
 * Hosted on https://github.com/amsul/pickadate.js
 * Licensed under MIT ("expat" flavour) license.
 */
;(function(d,k,f){var g=7,o=6,e=o*g,j="div",i="pickadate__",l=navigator.userAgent.match(/MSIE/),p=d(k),n=d(k.body),h=function(K,ah){var Q=function(){},z=Q.prototype={constructor:Q,$node:K,init:function(){K.on({"focus click":function(){if(!l||(l&&!ab._IE)){z.open()}I.addClass(S.focused);ab._IE=0},blur:function(){I.removeClass(S.focused)},change:function(){if(R){R.value=Z.value?N(ah.formatSubmit):""}},keydown:function(ak){var P=ak.keyCode,al=P==8||P==46;if(al||!ab.isOpen&&B[P]){ak.preventDefault();W(ak);if(al){z.clear().close()}else{z.open()}}}}).after([I,R]);if(Z.autofocus){z.open()}ab.items=v();a(ah.onStart,z);a(ah.onRender,z);return z},open:function(){if(ab.isOpen){return z}ab.isOpen=1;u(0);K.focus().addClass(S.inputActive);I.addClass(S.opened);n.addClass(S.bodyActive);p.on("focusin.P"+ab.id,function(P){if(!I.find(P.target).length&&P.target!=Z){z.close()}}).on("click.P"+ab.id,function(P){if(P.target!=Z){z.close()}}).on("keydown.P"+ab.id,function(ak){var P=ak.keyCode,al=B[P];if(P==27){Z.focus();z.close()}else{if(ak.target==Z&&(al||P==13)){ak.preventDefault();if(al){F(t([aa.YEAR,aa.MONTH,D.DATE+al],al),1)}else{aj(D);ag();z.close()}}}});a(ah.onOpen,z);return z},close:function(){if(!ab.isOpen){return z}ab.isOpen=0;u(-1);K.removeClass(S.inputActive);I.removeClass(S.opened);n.removeClass(S.bodyActive);p.off(".P"+ab.id);a(ah.onClose,z);return z},isOpen:function(){return ab.isOpen===1},show:function(ak,P){O(--ak,P);return z},clear:function(){aj(0);ag();return z},getDate:function(P){return P===true?U.OBJ:!Z.value?"":N(P)},setDate:function(ak,am,P,al){F(t([ak,--am,P]),al);return z},getDateLimit:function(P,ak){return N(ak,P?af:C)},setDateLimit:function(P,ak){if(ak){af=Y(P,ak);if(aa.TIME>af.TIME){aa=af}}else{C=Y(P);if(aa.TIME<C.TIME){aa=C}}ag();return z}},Z=(function(P){P.autofocus=(P==k.activeElement);P.type="text";P.readOnly=true;return P})(K[0]),ab={id:~~(Math.random()*1000000000)},S=ah.klass,M=(function(){function al(am){return am.match(/\w+/)[0].length}function P(am){return(/\d/).test(am[1])?2:1}function ak(an,am,ap){var ao=an.match(/\w+/)[0];if(!am.mm&&!am.m){am.m=ap.indexOf(ao)+1}return ao.length}return{d:function(am){return am?P(am):this.DATE},dd:function(am){return am?2:b(this.DATE)},ddd:function(am){return am?al(am):ah.weekdaysShort[this.DAY]},dddd:function(am){return am?al(am):ah.weekdaysFull[this.DAY]},m:function(am){return am?P(am):this.MONTH+1},mm:function(am){return am?2:b(this.MONTH+1)},mmm:function(am,an){var ao=ah.monthsShort;return am?ak(am,an,ao):ao[this.MONTH]},mmmm:function(am,an){var ao=ah.monthsFull;return am?ak(am,an,ao):ao[this.MONTH]},yy:function(am){return am?2:(""+this.YEAR).slice(2)},yyyy:function(am){return am?4:this.YEAR},toArray:function(am){return am.split(/(?=\b)(d{1,4}|m{1,4}|y{4}|yy)+(\b)/g)}}})(),s=c(),C=Y(ah.dateMin),af=Y(ah.dateMax,1),L=af,x=C,w=(function(P){if(Array.isArray(P)){if(P[0]===true){ab.off=P.shift()}return P.map(function(ak){if(!isNaN(ak)){ab.offDays=1;return ah.firstDay?ak%g:--ak}--ak[1];return c(ak)})}})(ah.datesDisabled),H=(function(){var P=function(ak){return this.TIME==ak.TIME||w.indexOf(this.DAY)>-1};if(ab.off){w.map(function(ak){if(ak.TIME<L.TIME&&ak.TIME>C.TIME){L=ak}if(ak.TIME>x.TIME&&ak.TIME<=af.TIME){x=ak}});return function(ak,al,am){return(am.map(P,this).indexOf(true)<0)}}return P})(),D=(function(ak,P){if(ak){P={};M.toArray(ah.formatSubmit).map(function(am){var al=M[am]?M[am](ak,P):am.length;if(M[am]){P[am]=ak.slice(0,al)}ak=ak.slice(al)});P=[+(P.yyyy||P.yy),+(P.mm||P.m)-1,+(P.dd||P.d)]}else{P=Date.parse(P)}return t(P&&(!isNaN(P)||Array.isArray(P))?P:s)})(Z.getAttribute("data-value"),Z.value),U=D,aa=D,R=ah.formatSubmit?d("<input type=hidden name="+Z.name+ah.hiddenSuffix+">").val(Z.value?N(ah.formatSubmit):"")[0]:null,X=(function(P){if(ah.firstDay){P.push(P.splice(0,1)[0])}return r("thead",r("tr",P.map(function(ak){return r("th",ak,S.weekdays)})))})((ah.showWeekdaysShort?ah.weekdaysShort:ah.weekdaysFull).slice(0)),I=d(r(j,G(),S.holder)).on("mousedown",function(P){if(ab.items.indexOf(P.target)<0){P.preventDefault()}}).on("click",function(ak){if(!ab.isOpen&&!ak.clientX&&!ak.clientY){return}var al,P=d(ak.target),am=P.data();W(ak);Z.focus();ab._IE=1;if(am.nav){O(aa.MONTH+am.nav)}else{if(am.clear){z.clear().close()}else{if(am.date){al=am.date.split("/");z.setDate(+al[0],+al[1],+al[2]).close()}else{if(P[0]==I[0]){z.close()}}}}}),B={40:7,38:-7,39:1,37:-1};function Y(P,ak){if(P===true){return s}if(Array.isArray(P)){--P[1];return c(P)}if(P&&!isNaN(P)){return c([s.YEAR,s.MONTH,s.DATE+P])}return c(0,ak?Infinity:-Infinity)}function t(ak,am,P){ak=!ak.TIME?c(ak):ak;if(ab.off&&!ab.offDays){ak=ak.TIME<L.TIME?L:ak.TIME>x.TIME?x:ak}else{if(w){var al=ak;while(w.filter(H,ak).length){ak=c([ak.YEAR,ak.MONTH,ak.DATE+(am||1)]);if(!P&&ak.MONTH!=al.MONTH){al=ak=c([al.YEAR,al.MONTH,am<0?--al.DATE:++al.DATE])}}}}if(ak.TIME<C.TIME){ak=t(C,1,1)}else{if(ak.TIME>af.TIME){ak=t(af,-1,1)}}return ak}function y(ak){if((ak&&aa.YEAR>=af.YEAR&&aa.MONTH>=af.MONTH)||(!ak&&aa.YEAR<=C.YEAR&&aa.MONTH<=C.MONTH)){return""}var P="month"+(ak?"Next":"Prev");return r(j,ah[P],S[P],"data-nav="+(ak||-1))}function J(P){return ah.monthSelector?r("select",P.map(function(ak,al){return r("option",ak,0,"value="+al+(aa.MONTH==al?" selected":"")+A(al,aa.YEAR," disabled",""))}),S.selectMonth,V()):r(j,P[aa.MONTH],S.month)}function ad(){var aq=aa.YEAR,ao=ah.yearSelector;if(ao){ao=ao===true?5:~~(ao/2);var al=[],P=aq-ao,ap=ae(P,C.YEAR),an=aq+ao+(ap-P),am=ae(an,af.YEAR,1);ap=ae(P-(an-am),C.YEAR);for(var ak=0;ak<=am-ap;ak+=1){al.push(ap+ak)}return r("select",al.map(function(ar){return r("option",ar,0,"value="+ar+(aq==ar?" selected":""))}),S.selectYear,V())}return r(j,aq,S.year)}function E(){var ak,aq,am,ap=[],ao="",P=c([aa.YEAR,aa.MONTH+1,0]).DATE,an=c([aa.YEAR,aa.MONTH,1]).DAY+(ah.firstDay?-2:-1);an+=an<-1?7:0;for(var al=0;al<e;al+=1){aq=al-an;ak=c([aa.YEAR,aa.MONTH,aq]);am=T(ak,(aq>0&&aq<=P));ap.push(r("td",r(j,ak.DATE,am[0],am[1])));if((al%g)+1==g){ao+=r("tr",ap.splice(0,g))}}return r("tbody",ao,S.body)}function T(ak,al){var am,P=[S.day,(al?S.dayInfocus:S.dayOutfocus)];if(ak.TIME<C.TIME||ak.TIME>af.TIME||(w&&w.filter(H,ak).length)){am=1;P.push(S.dayDisabled)}if(ak.TIME==s.TIME){P.push(S.dayToday)}if(ak.TIME==D.TIME){P.push(S.dayHighlighted)}if(ak.TIME==U.TIME){P.push(S.daySelected)}return[P.join(" "),"data-"+(am?"disabled":"date")+"="+[ak.YEAR,ak.MONTH+1,ak.DATE].join("/")]}function ai(){return r("button",ah.today,S.buttonToday,"data-date="+N("yyyy/mm/dd",s)+" "+V())+r("button",ah.clear,S.buttonClear,"data-clear=1 "+V())}function G(){return r(j,r(j,r(j,r(j,y()+y(1)+J(ah.showMonthsFull?ah.monthsFull:ah.monthsShort)+ad(),S.header)+r("table",[X,E()],S.table)+r(j,ai(),S.footer),S.calendar),S.wrap),S.frame)}function ae(al,P,ak){return(ak&&al<P)||(!ak&&al>P)?al:P}function A(am,ak,P,al){if(ak<=C.YEAR&&am<C.MONTH){return P||C.MONTH}if(ak>=af.YEAR&&am>af.MONTH){return P||af.MONTH}return al!=null?al:am}function V(){return"tabindex="+(ab.isOpen?0:-1)}function N(ak,P){return M.toArray(ak||ah.format).map(function(al){return a(M[al],P||U)||al}).join("")}function F(ak,P){D=ak;aa=ak;if(!P){aj(ak)}ag()}function aj(P){U=P||U;K.val(P?N():"").trigger("change");a(ah.onSelect,z)}function ac(P){return I.find("."+P)}function O(ak,P){P=P||aa.YEAR;ak=A(ak,P);aa=c([P,ak,1]);ag()}function u(P){ab.items.map(function(ak){if(ak){ak.tabIndex=P}})}function v(){return[ac(S.selectMonth).on({click:W,change:function(){O(+this.value);ac(S.selectMonth).focus()}})[0],ac(S.selectYear).on({click:W,change:function(){O(aa.MONTH,+this.value);ac(S.selectYear).focus()}})[0],ac(S.buttonToday)[0],ac(S.buttonClear)[0]]}function ag(){I.html(G());ab.items=v();a(ah.onRender,z)}function W(P){P.stopPropagation()}return new z.init()};function a(t,s){if(typeof t=="function"){return t.call(s)}}function b(s){return(s<10?"0":"")+s}function r(v,u,s,t){if(!u){return""}u=Array.isArray(u)?u.join(""):u;s=s?' class="'+s+'"':"";t=t?" "+t:"";return"<"+v+s+t+">"+u+"</"+v+">"}function c(t,s){if(Array.isArray(t)){t=new Date(t[0],t[1],t[2])}else{if(!isNaN(t)){t=new Date(t)}else{if(!s){t=new Date();t.setHours(0,0,0,0)}}}return{YEAR:s||t.getFullYear(),MONTH:s||t.getMonth(),DATE:s||t.getDate(),DAY:s||t.getDay(),TIME:s||t.getTime(),OBJ:s||t}}d.fn.pickadate=function(s){var t="pickadate";s=d.extend(true,{},d.fn.pickadate.defaults,s);if(s.disablePicker){return this}return this.each(function(){var u=d(this);if(this.nodeName=="INPUT"&&!u.data(t)){u.data(t,new h(u,s))}})};d.fn.pickadate.defaults={monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],monthPrev:"&#9664;",monthNext:"&#9654;",showMonthsFull:1,showWeekdaysShort:1,today:"Today",clear:"Clear",format:"d mmmm, yyyy",formatSubmit:0,hiddenSuffix:"_submit",firstDay:0,monthSelector:0,yearSelector:0,dateMin:0,dateMax:0,datesDisabled:0,disablePicker:0,onOpen:0,onClose:0,onSelect:0,onStart:0,onRender:0,klass:{bodyActive:i+"active",inputActive:i+"input--active",holder:i+"holder",opened:i+"holder--opened",focused:i+"holder--focused",frame:i+"frame",wrap:i+"wrap",calendar:i+"calendar",table:i+"table",header:i+"header",monthPrev:i+"nav--prev",monthNext:i+"nav--next",month:i+"month",year:i+"year",selectMonth:i+"select--month",selectYear:i+"select--year",weekdays:i+"weekday",body:i+"body",day:i+"day",dayDisabled:i+"day--disabled",daySelected:i+"day--selected",dayHighlighted:i+"day--highlighted",dayToday:i+"day--today",dayInfocus:i+"day--infocus",dayOutfocus:i+"day--outfocus",footer:i+"footer",buttonClear:i+"button--clear",buttonToday:i+"button--today"}};var m=String.prototype.split,q=/()??/.exec("")[1]===f;String.prototype.split=function(x,w){var A=this;if(Object.prototype.toString.call(x)!=="[object RegExp]"){return m.call(A,x,w)}var u=[],v=(x.ignoreCase?"i":"")+(x.multiline?"m":"")+(x.extended?"x":"")+(x.sticky?"y":""),s=0,t,y,z,B;x=new RegExp(x.source,v+"g");A+="";if(!q){t=new RegExp("^"+x.source+"$(?!\\s)",v)}w=w===f?-1>>>0:w>>>0;while(y=x.exec(A)){z=y.index+y[0].length;if(z>s){u.push(A.slice(s,y.index));if(!q&&y.length>1){y[0].replace(t,function(){for(var C=1;C<arguments.length-2;C++){if(arguments[C]===f){y[C]=f}}})}if(y.length>1&&y.index<A.length){Array.prototype.push.apply(u,y.slice(1))}B=y[0].length;s=z;if(u.length>=w){break}}if(x.lastIndex===y.index){x.lastIndex++}}if(s===A.length){if(B||!x.test("")){u.push("")}}else{u.push(A.slice(s))}return u.length>w?u.slice(0,w):u};if(!Array.isArray){Array.isArray=function(s){return{}.toString.call(s)=="[object Array]"}}if(![].map){Array.prototype.map=function(x,u){var w=this,t=w.length,s=new Array(t);for(var v=0;v<t;v++){if(v in w){s[v]=x.call(u,w[v],v,w)}}return s}}if(![].filter){Array.prototype.filter=function(z){if(this==null){throw new TypeError()}var x=Object(this),u=x.length>>>0;if(typeof z!="function"){throw new TypeError()}var s=[],w=arguments[1];for(var v=0;v<u;v++){if(v in x){var y=x[v];if(z.call(w,y,v,x)){s.push(y)}}}return s}}if(![].indexOf){Array.prototype.indexOf=function(v){if(this==null){throw new TypeError()}var w=Object(this),s=w.length>>>0;if(s===0){return -1}var x=0;if(arguments.length>1){x=Number(arguments[1]);if(x!=x){x=0}else{if(x!=0&&x!=Infinity&&x!=-Infinity){x=(x>0||-1)*Math.floor(Math.abs(x))}}}if(x>=s){return -1}var u=x>=0?x:Math.max(s-Math.abs(x),0);for(;u<s;u++){if(u in w&&w[u]===v){return u}}return -1}}})(jQuery,document);

/*!
 * pickadate.js v2.1.7 - 25 March, 2013
 * By Amsul (http://amsul.ca)
 * Hosted on https://github.com/amsul/pickadate.js
 * Licensed under MIT ("expat" flavour) license.
 */
//;(function(g,j,b){var p=7,i=6,h=i*p,o="div",n="pickadate__",a=navigator.userAgent.match(/MSIE/),d=g(j),f=g(j.body),k=function(I,af){var N=function(){},x=N.prototype={constructor:N,$node:I,init:function(){I.on({"focus click":function(){if(!a||(a&&!Z._IE)){x.open()}G.addClass(Q.focused);Z._IE=0},blur:function(){G.removeClass(Q.focused)},change:function(){if(O){O.value=X.value?L(af.formatSubmit):""}},keydown:function(ai){var P=ai.keyCode,aj=P==8||P==46;if(aj||!Z.isOpen&&z[P]){ai.preventDefault();U(ai);if(aj){x.clear().close()}else{x.open()}}}}).after([G,O]);if(X.autofocus){x.open()}Z.items=t();c(af.onStart,x);c(af.onRender,x);return x},open:function(){if(Z.isOpen){return x}Z.isOpen=1;s(0);I.focus().addClass(Q.inputActive);G.addClass(Q.opened);f.addClass(Q.bodyActive);d.on("focusin.P"+Z.id,function(P){if(!G.find(P.target).length&&P.target!=X){x.close()}}).on("click.P"+Z.id,function(P){if(P.target!=X){x.close()}}).on("keydown.P"+Z.id,function(ai){var P=ai.keyCode,aj=z[P];if(P==27){X.focus();x.close()}else{if(ai.target==X&&(aj||P==13)){ai.preventDefault();if(aj){D(r([Y.YEAR,Y.MONTH,B.DATE+aj],aj),1)}else{ah(B);ae();x.close()}}}});c(af.onOpen,x);return x},close:function(){if(!Z.isOpen){return x}Z.isOpen=0;s(-1);I.removeClass(Q.inputActive);G.removeClass(Q.opened);f.removeClass(Q.bodyActive);d.off(".P"+Z.id);c(af.onClose,x);return x},isOpen:function(){return Z.isOpen===1},show:function(ai,P){M(--ai,P);return x},clear:function(){ah(0);ae();return x},getDate:function(P){return P===true?S.OBJ:!X.value?"":L(P)},setDate:function(ai,ak,P,aj){D(r([ai,--ak,P]),aj);return x},getDateLimit:function(P,ai){return L(ai,P?ad:A)},setDateLimit:function(P,ai){if(ai){ad=W(P,ai);if(Y.TIME>ad.TIME){Y=ad}}else{A=W(P);if(Y.TIME<A.TIME){Y=A}}ae();return x}},X=(function(P){P.autofocus=(P==j.activeElement);P.type="text";P.readOnly=true;return P})(I[0]),Z={id:~~(Math.random()*1000000000)},Q=af.klass,K=(function(){function aj(ak){return ak.match(/\w+/)[0].length}function P(ak){return(/\d/).test(ak[1])?2:1}function ai(al,ak,an){var am=al.match(/\w+/)[0];if(!ak.mm&&!ak.m){ak.m=an.indexOf(am)+1}return am.length}return{d:function(ak){return ak?P(ak):this.DATE},dd:function(ak){return ak?2:e(this.DATE)},ddd:function(ak){return ak?aj(ak):af.weekdaysShort[this.DAY]},dddd:function(ak){return ak?aj(ak):af.weekdaysFull[this.DAY]},m:function(ak){return ak?P(ak):this.MONTH+1},mm:function(ak){return ak?2:e(this.MONTH+1)},mmm:function(ak,al){var am=af.monthsShort;return ak?ai(ak,al,am):am[this.MONTH]},mmmm:function(ak,al){var am=af.monthsFull;return ak?ai(ak,al,am):am[this.MONTH]},yy:function(ak){return ak?2:(""+this.YEAR).slice(2)},yyyy:function(ak){return ak?4:this.YEAR},toArray:function(ak){return ak.split(/(?=\b)(d{1,4}|m{1,4}|y{4}|yy)+(\b)/g)}}})(),q=l(),A=W(af.dateMin),ad=W(af.dateMax,1),J=ad,v=A,u=(function(P){if(Array.isArray(P)){if(P[0]===true){Z.off=P.shift()}return P.map(function(ai){if(!isNaN(ai)){Z.offDays=1;return af.firstDay?ai%p:--ai}--ai[1];return l(ai)})}})(af.datesDisabled),F=(function(){var P=function(ai){return this.TIME==ai.TIME||u.indexOf(this.DAY)>-1};if(Z.off){u.map(function(ai){if(ai.TIME<J.TIME&&ai.TIME>A.TIME){J=ai}if(ai.TIME>v.TIME&&ai.TIME<=ad.TIME){v=ai}});return function(ai,aj,ak){return(ak.map(P,this).indexOf(true)<0)}}return P})(),B=(function(ai,P){if(ai){P={};K.toArray(af.formatSubmit).map(function(ak){var aj=K[ak]?K[ak](ai,P):ak.length;if(K[ak]){P[ak]=ai.slice(0,aj)}ai=ai.slice(aj)});P=[+(P.yyyy||P.yy),+(P.mm||P.m)-1,+(P.dd||P.d)]}else{P=Date.parse(P)}return r(P&&(!isNaN(P)||Array.isArray(P))?P:q)})(X.getAttribute("data-value"),X.value),S=B,Y=B,O=af.formatSubmit?g("<input type=hidden name="+X.name+af.hiddenSuffix+">").val(X.value?L(af.formatSubmit):"")[0]:null,V=(function(P){if(af.firstDay){P.push(P.splice(0,1)[0])}return m("thead",m("tr",P.map(function(ai){return m("th",ai,Q.weekdays)})))})((af.showWeekdaysShort?af.weekdaysShort:af.weekdaysFull).slice(0)),G=g(m(o,E(),Q.holder)).on("mousedown",function(P){if(Z.items.indexOf(P.target)<0){P.preventDefault()}}).on("click",function(ai){if(!Z.isOpen&&!ai.clientX&&!ai.clientY){return}var aj,P=g(ai.target),ak=P.data();U(ai);X.focus();Z._IE=1;if(ak.nav){M(Y.MONTH+ak.nav)}else{if(ak.clear){x.clear().close()}else{if(ak.date){aj=ak.date.split("/");x.setDate(+aj[0],+aj[1],+aj[2]).close()}else{if(P[0]==G[0]){x.close()}}}}}),z={40:7,38:-7,39:1,37:-1};function W(P,ai){if(P===true){return q}if(Array.isArray(P)){--P[1];return l(P)}if(P&&!isNaN(P)){return l([q.YEAR,q.MONTH,q.DATE+P])}return l(0,ai?Infinity:-Infinity)}function r(ai,ak,P){ai=!ai.TIME?l(ai):ai;if(Z.off&&!Z.offDays){ai=ai.TIME<J.TIME?J:ai.TIME>v.TIME?v:ai}else{if(u){var aj=ai;while(u.filter(F,ai).length){ai=l([ai.YEAR,ai.MONTH,ai.DATE+(ak||1)]);if(!P&&ai.MONTH!=aj.MONTH){aj=ai=l([aj.YEAR,aj.MONTH,ak<0?--aj.DATE:++aj.DATE])}}}}if(ai.TIME<A.TIME){ai=r(A,1,1)}else{if(ai.TIME>ad.TIME){ai=r(ad,-1,1)}}return ai}function w(ai){if((ai&&Y.YEAR>=ad.YEAR&&Y.MONTH>=ad.MONTH)||(!ai&&Y.YEAR<=A.YEAR&&Y.MONTH<=A.MONTH)){return""}var P="month"+(ai?"Next":"Prev");return m(o,af[P],Q[P],"data-nav="+(ai||-1))}function H(P){return af.monthSelector?m("select",P.map(function(ai,aj){return m("option",ai,0,"value="+aj+(Y.MONTH==aj?" selected":"")+y(aj,Y.YEAR," disabled",""))}),Q.selectMonth,T()):m(o,P[Y.MONTH],Q.month)}function ab(){var ao=Y.YEAR,am=af.yearSelector;if(am){am=am===true?5:~~(am/2);var aj=[],P=ao-am,an=ac(P,A.YEAR),al=ao+am+(an-P),ak=ac(al,ad.YEAR,1);an=ac(P-(al-ak),A.YEAR);for(var ai=0;ai<=ak-an;ai+=1){aj.push(an+ai)}return m("select",aj.map(function(ap){return m("option",ap,0,"value="+ap+(ao==ap?" selected":""))}),Q.selectYear,T())}return m(o,ao,Q.year)}function C(){var ai,ao,ak,an=[],am="",P=l([Y.YEAR,Y.MONTH+1,0]).DATE,al=l([Y.YEAR,Y.MONTH,1]).DAY+(af.firstDay?-2:-1);al+=al<-1?7:0;for(var aj=0;aj<h;aj+=1){ao=aj-al;ai=l([Y.YEAR,Y.MONTH,ao]);ak=R(ai,(ao>0&&ao<=P));an.push(m("td",m(o,ai.DATE,ak[0],ak[1])));if((aj%p)+1==p){am+=m("tr",an.splice(0,p))}}return m("tbody",am,Q.body)}function R(ai,aj){var ak,P=[Q.day,(aj?Q.dayInfocus:Q.dayOutfocus)];if(ai.TIME<A.TIME||ai.TIME>ad.TIME||(u&&u.filter(F,ai).length)){ak=1;P.push(Q.dayDisabled)}if(ai.TIME==q.TIME){P.push(Q.dayToday)}if(ai.TIME==B.TIME){P.push(Q.dayHighlighted)}if(ai.TIME==S.TIME){P.push(Q.daySelected)}return[P.join(" "),"data-"+(ak?"disabled":"date")+"="+[ai.YEAR,ai.MONTH+1,ai.DATE].join("/")]}function ag(){return m("button",af.today,Q.buttonToday,"data-date="+L("yyyy/mm/dd",q)+" "+T())+m("button",af.clear,Q.buttonClear,"data-clear=1 "+T())}function E(){return m(o,m(o,m(o,m(o,w()+w(1)+H(af.showMonthsFull?af.monthsFull:af.monthsShort)+ab(),Q.header)+m("table",[V,C()],Q.table)+m(o,ag(),Q.footer),Q.calendar),Q.wrap),Q.frame)}function ac(aj,P,ai){return(ai&&aj<P)||(!ai&&aj>P)?aj:P}function y(ak,ai,P,aj){if(ai<=A.YEAR&&ak<A.MONTH){return P||A.MONTH}if(ai>=ad.YEAR&&ak>ad.MONTH){return P||ad.MONTH}return aj!=null?aj:ak}function T(){return"tabindex="+(Z.isOpen?0:-1)}function L(ai,P){return K.toArray(ai||af.format).map(function(aj){return c(K[aj],P||S)||aj}).join("")}function D(ai,P){B=ai;Y=ai;if(!P){ah(ai)}ae()}function ah(P){S=P||S;I.val(P?L():"").trigger("change");c(af.onSelect,x)}function aa(P){return G.find("."+P)}function M(ai,P){P=P||Y.YEAR;ai=y(ai,P);Y=l([P,ai,1]);ae()}function s(P){Z.items.map(function(ai){if(ai){ai.tabIndex=P}})}function t(){return[aa(Q.selectMonth).on({click:U,change:function(){M(+this.value);aa(Q.selectMonth).focus()}})[0],aa(Q.selectYear).on({click:U,change:function(){M(Y.MONTH,+this.value);aa(Q.selectYear).focus()}})[0],aa(Q.buttonToday)[0],aa(Q.buttonClear)[0]]}function ae(){G.html(E());Z.items=t();c(af.onRender,x)}function U(P){P.stopPropagation()}return new x.init()};function c(r,q){if(typeof r=="function"){return r.call(q)}}function e(q){return(q<10?"0":"")+q}function m(t,s,q,r){if(!s){return""}s=Array.isArray(s)?s.join(""):s;q=q?' class="'+q+'"':"";r=r?" "+r:"";return"<"+t+q+r+">"+s+"</"+t+">"}function l(r,q){if(Array.isArray(r)){r=new Date(r[0],r[1],r[2])}else{if(!isNaN(r)){r=new Date(r)}else{if(!q){r=new Date();r.setHours(0,0,0,0)}}}return{YEAR:q||r.getFullYear(),MONTH:q||r.getMonth(),DATE:q||r.getDate(),DAY:q||r.getDay(),TIME:q||r.getTime(),OBJ:q||r}}g.fn.pickadate=function(q){var r="pickadate";q=g.extend(true,{},g.fn.pickadate.defaults,q);if(q.disablePicker){return this}return this.each(function(){var s=g(this);if(this.nodeName=="INPUT"&&!s.data(r)){s.data(r,new k(s,q))}})};g.fn.pickadate.defaults={monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],monthPrev:"&#9664;",monthNext:"&#9654;",showMonthsFull:1,showWeekdaysShort:1,today:"Today",clear:"Clear",format:"d mmmm, yyyy",formatSubmit:0,hiddenSuffix:"_submit",firstDay:0,monthSelector:0,yearSelector:0,dateMin:0,dateMax:0,datesDisabled:0,disablePicker:0,onOpen:0,onClose:0,onSelect:0,onStart:0,onRender:0,klass:{bodyActive:n+"active",inputActive:n+"input--active",holder:n+"holder",opened:n+"holder--opened",focused:n+"holder--focused",frame:n+"frame",wrap:n+"wrap",calendar:n+"calendar",table:n+"table",header:n+"header",monthPrev:n+"nav--prev",monthNext:n+"nav--next",month:n+"month",year:n+"year",selectMonth:n+"select--month",selectYear:n+"select--year",weekdays:n+"weekday",body:n+"body",day:n+"day",dayDisabled:n+"day--disabled",daySelected:n+"day--selected",dayHighlighted:n+"day--highlighted",dayToday:n+"day--today",dayInfocus:n+"day--infocus",dayOutfocus:n+"day--outfocus",footer:n+"footer",buttonClear:n+"button--clear",buttonToday:n+"button--today"}}})(jQuery,document);

// Brazilian Portuguese

$.extend( $.fn.pickadate.defaults, {
    monthsFull: [ 'janeiro', 'fevereiro', 'marÃ§o', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
    monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
    weekdaysFull: [ 'domingo', 'segunda-feira', 'terÃ§a-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sÃ¡bado' ],
    weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
    today: 'hoje',
    clear: 'excluir',
    format: 'dd/mm/yyyy',
    formatSubmit: 'dd/mm/yyyy'
})