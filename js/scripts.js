var _constant = {
    version : "01.00.00",
    maxPaginacao : 10,
    titles : {
        aviso : "CRM Mobile informa:",
        erro : "CRM Mobile informa erros localizados:"
    },
    redirect : function( b ) {
        window.location.href = b
    }
};
(function( a ) {
    if ( typeof define === "function" && define.amd ) {
        define([ "jquery" ], a)
    } else {
        a(jQuery)
    }
}(function( j ) {
    var g = /\+/g;
    function k( a ) {
        return a
    }
    function e( a ) {
        return decodeURIComponent(a.replace(g, " "))
    }
    function h( b ) {
        if ( b.indexOf('"') === 0 ) {
            b = b.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        }
        try {
            return l.json ? JSON.parse(b) : b
        } catch ( a ) {
        }
    }
    var l = j.cookie = function( c, d, B ) {
        if ( d !== undefined ) {
            B = j.extend({
            }, l.defaults, B);
            if ( typeof B.expires === "number" ) {
                var b = B.expires, C = B.expires = new Date();
                C.setDate(C.getDate() + b)
            }
            d = l.json ? JSON.stringify(d) : String(d);
            return(document.cookie = [ l.raw ? c : encodeURIComponent(c), "=", l.raw ? d : encodeURIComponent(d), B.expires ? "; expires=" + B.expires.toUTCString() : "", B.path ? "; path=" + B.path : "", B.domain ? "; domain=" + B.domain : "", B.secure ? "; secure" : "" ].join(""))
        }
        var z = l.raw ? k : e;
        var a = document.cookie.split("; ");
        var A = c ? undefined : {
        };
        for ( var f = 0, w = a.length; f < w; f++ ) {
            var t = a[f].split("=");
            var y = z(t.shift());
            var x = z(t.join("="));
            if ( c && c === y ) {
                A = h(x);
                break
            }
            if ( !c ) {
                A[y] = h(x)
            }
        }
        return A
    };
    l.defaults = {
    };
    j.removeCookie = function( a, b ) {
        if ( j.cookie(a) !== undefined ) {
            j.cookie(a, "", j.extend(b, {
                expires : -1
            }));
            return true
        }
        return false
    };
    j.clearCookie = function() {
        var d = document.cookie.split(";");
        for ( var b = 0; b < d.length; b++ ) {
            var a = d[b];
            var f = a.indexOf("=");
            var c = f > -1 ? a.substr(0, f) : a;
            j.cookie(c, "", j.extend({
            }, {
                expires : -1
            }))
        }
        return false
    }
}));
var _session = {
    get : function( b ) {
        var c = null;
        if ( typeof localStorage === "object" ) {
            if ( localStorage.getItem(b) != "" && localStorage.getItem(b) != undefined && localStorage.getItem(b) != null ) {
                c = localStorage.getItem(b)
            } else {
                c = null
            }
        } else {
            if ( $.cookie(b) != "" && $.cookie(b) != undefined && $.cookie(b) != null ) {
                c = $.cookie(b)
            } else {
                c = null
            }
        }
        return c
    },
    set : function( e, d ) {
        if ( typeof localStorage === "object" ) {
            localStorage.setItem(e, d)
        } else {
            var f = new Date();
            f.setDate(exdate.getDate() + 1);
            $.cookie(e, d, {
                expires : f.toUTCString()
            })
        }
    },
    remove : function( b ) {
        if ( typeof localStorage === "object" ) {
            localStorage.removeItem(b)
        } else {
            $.removeCookie(b)
        }
    },
    clear : function() {
        if ( typeof localStorage === "object" ) {
            localStorage.clear()
        } else {
            $.clearCookie()
        }
    }
};
$.fn.serializeObject = function() {
    var d = {
    };
    var c = function( b, f ) {
        var a = d[f.name];
        if ( "undefined" !== typeof a && a !== null ) {
            if ( $.isArray(a) ) {
                a.push(f.value)
            } else {
                d[f.name] = [ a, f.value ]
            }
        } else {
            d[f.name] = f.value
        }
    };
    $.each(this.serializeArray(), c);
    return d
};
function date( f, m ) {
    m = !m ? (new Date()).getTime() / 1000 : m;
    var n = this, l, o, r = /\\?([a-z])/gi, s, q = function( a, b ) {
        a = a.toString();
        return a.length < b ? q("0" + a, b, "0") : a
    }, p = [ "Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    s = function( b, a ) {
        return o[b] ? o[b]() : a
    };
    o = {
        d : function() {
            return q(o.j(), 2)
        },
        D : function() {
            return o.l().slice(0, 3)
        },
        j : function() {
            return l.getDate()
        },
        l : function() {
            return p[o.w()] + "day"
        },
        N : function() {
            return o.w() || 7
        },
        S : function() {
            var a = o.j();
            i = a % 10;
            if ( i <= 3 && parseInt((a % 100) / 10) == 1 ) {
                i = 0
            }
            return[ "st", "nd", "rd" ][i - 1] || "th"
        },
        w : function() {
            return l.getDay()
        },
        z : function() {
            var a = new Date(o.Y(), o.n() - 1, o.j()), b = new Date(o.Y(), 0, 1);
            return Math.round((a - b) / 86400000)
        },
        W : function() {
            var a = new Date(o.Y(), o.n() - 1, o.j() - o.N() + 3), b = new Date(a.getFullYear(), 0, 4);
            return q(1 + Math.round((a - b) / 86400000 / 7), 2)
        },
        F : function() {
            return p[6 + o.n()]
        },
        m : function() {
            return q(o.n(), 2)
        },
        M : function() {
            return o.F().slice(0, 3)
        },
        n : function() {
            return l.getMonth() + 1
        },
        t : function() {
            return(new Date(o.Y(), o.n(), 0)).getDate()
        },
        L : function() {
            var a = o.Y();
            return a % 4 === 0 & a % 100 !== 0 | a % 400 === 0
        },
        o : function() {
            var a = o.n(), c = o.W(), b = o.Y();
            return b + (a === 12 && c < 9 ? 1 : a === 1 && c > 9 ? -1 : 0)
        },
        Y : function() {
            return l.getFullYear()
        },
        y : function() {
            return o.Y().toString().slice(-2)
        },
        a : function() {
            return l.getHours() > 11 ? "pm" : "am"
        },
        A : function() {
            return o.a().toUpperCase()
        },
        B : function() {
            var b = l.getUTCHours() * 3600, c = l.getUTCMinutes() * 60, a = l.getUTCSeconds();
            return q(Math.floor((b + c + a + 3600) / 86.4) % 1000, 3)
        },
        g : function() {
            return o.G() % 12 || 12
        },
        G : function() {
            return l.getHours()
        },
        h : function() {
            return q(o.g(), 2)
        },
        H : function() {
            return q(o.G(), 2)
        },
        i : function() {
            return q(l.getMinutes(), 2)
        },
        s : function() {
            return q(l.getSeconds(), 2)
        },
        u : function() {
            return q(l.getMilliseconds() * 1000, 6)
        },
        e : function() {
            throw"Not supported (see source code of date() for timezone on how to add support)"
        },
        I : function() {
            var b = new Date(o.Y(), 0), d = Date.UTC(o.Y(), 0), c = new Date(o.Y(), 6), a = Date.UTC(o.Y(), 6);
            return((b - d) !== (c - a)) ? 1 : 0
        },
        O : function() {
            var a = l.getTimezoneOffset(), b = Math.abs(a);
            return(a > 0 ? "-" : "+") + q(Math.floor(b / 60) * 100 + b % 60, 4)
        },
        P : function() {
            var a = o.O();
            return(a.substr(0, 3) + ":" + a.substr(3, 2))
        },
        T : function() {
            return"UTC"
        },
        Z : function() {
            return -l.getTimezoneOffset() * 60
        },
        c : function() {
            return"Y-m-d\\TH:i:sP".replace(r, s)
        },
        r : function() {
            return"D, d M Y H:i:s O".replace(r, s)
        },
        U : function() {
            return l / 1000 | 0
        }
    };
    this.date = function( a, b ) {
        n = this;
        l = (b === undefined ? new Date() : (b instanceof Date) ? new Date(b) : new Date(b * 1000));
        return a.replace(r, s)
    };
    return this.date(f, m)
}
(function( k, r ) {
    var n = Array.prototype.push, s = /^(?:radio|checkbox)$/i, o = /\+/g, p = /^(?:option|select-one|select-multiple)$/i, m = /^(?:button|color|date|datetime|datetime-local|email|hidden|month|number|password|range|reset|search|submit|tel|text|textarea|time|url|week)$/i;
    function q( a ) {
        return a.map(function() {
            return this.elements ? k.makeArray(this.elements) : this
        }).filter(":input").get()
    }
    function l( c ) {
        var b, a = {
        };
        k.each(c, function( d, e ) {
            b = a[e.name];
            a[e.name] = b === r ? e : (k.isArray(b) ? b.concat(e) : [ b, e ])
        });
        return a
    }
    k.fn.deserialize = function( G, L ) {
        var b, J, F = q(this), g = [ ];
        if ( !G || !F.length ) {
            return this
        }
        if ( k.isArray(G) ) {
            g = G
        } else {
            if ( k.isPlainObject(G) ) {
                var E, d;
                for ( E in G ) {
                    k.isArray(d = G[E]) ? n.apply(g, k.map(d, function( t ) {
                        return{
                            name : E,
                            value : t
                        }
                    })) : n.call(g, {
                        name : E,
                        value : d
                    })
                }
            } else {
                if ( typeof G === "string" ) {
                    var e;
                    G = G.split("&");
                    for ( b = 0, J = G.length; b < J; b++ ) {
                        e = G[b].split("=");
                        n.call(g, {
                            name : decodeURIComponent(e[0]),
                            value : decodeURIComponent(e[1].replace(o, "%20"))
                        })
                    }
                }
            }
        }
        if ( !(J = g.length) ) {
            return this
        }
        var f, M, c, a, D, I, K, d, H = k.noop, h = k.noop, j = {
        };
        L = L || {
        };
        F = l(F);
        if ( k.isFunction(L) ) {
            h = L
        } else {
            H = k.isFunction(L.change) ? L.change : H;
            h = k.isFunction(L.complete) ? L.complete : h
        }
        for ( b = 0; b < J; b++ ) {
            f = g[b];
            D = f.name;
            d = f.value;
            if ( !(M = F[D]) ) {
                continue
            }
            K = (a = M.length) ? M[0] : M;
            K = (K.type || K.nodeName).toLowerCase();
            I = null;
            if ( m.test(K) ) {
                if ( a ) {
                    c = j[D];
                    M = M[j[D] = (c == r) ? 0 : ++c]
                }
                H.call(M, (M.value = d))
            } else {
                if ( s.test(K) ) {
                    I = "checked"
                } else {
                    if ( p.test(K) ) {
                        I = "selected"
                    }
                }
            }
            if ( I ) {
                if ( !a ) {
                    M = [ M ];
                    a = 1
                }
                for ( c = 0; c < a; c++ ) {
                    f = M[c];
                    if ( f.value == d ) {
                        H.call(f, (f[I] = true) && d)
                    }
                }
            }
        }
        h.call(this);
        return this
    }
})(jQuery);
function jAviso( b ) {
    msg(b, "error");
    debug("AVISO", b)
}
function jSucesso( b ) {
    msg(b, "aviso");
    debug("SUCESSO", b)
}
function debug( d, c ) {
    console.log(d + ": " + date("Y-m-d H:i:s", (new Date()).getTime() / 1000) + '\n Mesagem: "' + c + '" \n\n\n')
}
function number_format( p, s, n, q ) {
    p = (p + "").replace(/[^0-9+\-Ee.]/g, "");
    var t = !isFinite(+p) ? 0 : +p, u = !isFinite(+s) ? 0 : Math.abs(s), l = (typeof q === "undefined") ? "," : q, r = (typeof n === "undefined") ? "." : n, m = "", o = function( c, a ) {
        var b = Math.pow(10, a);
        return"" + Math.round(c * b) / b
    };
    m = (u ? o(t, u) : "" + Math.round(t)).split(".");
    if ( m[0].length > 3 ) {
        m[0] = m[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, l)
    }
    if ( (m[1] || "").length < u ) {
        m[1] = m[1] || "";
        m[1] += new Array(u - m[1].length + 1).join("0")
    }
    return m.join(r)
}
var _valida = {
    clear : function( a ) {
        var b = /\.|\_|\:|\;|\ |\-/g;
        return a.toString().replace(b, "")
    },
    data : function( c ) {
        var a = c;
        var e = new Array;
        var d = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
        e = a.split("/");
        var b = false;
        if ( a.search(d) == -1 ) {
            b = true
        } else {
            if ( ((e[1] == 4) || (e[1] == 6) || (e[1] == 9) || (e[1] == 11)) && (e[0] > 30) ) {
                b = true
            } else {
                if ( e[1] == 2 ) {
                    if ( (e[0] > 28) && ((e[2] % 4) != 0) ) {
                        b = true
                    }
                    if ( (e[0] > 29) && ((e[2] % 4) == 0) ) {
                        b = true
                    }
                }
            }
        }
        return b
    },
    hora : function( b ) {
        var c = false;
        if ( b.length > 4 ) {
            var f = b.split(":");
            var a = (f[0] == undefined || f[0] == "" ? null : f[0]);
            var e = (f[1] == undefined || f[1] == "" ? null : f[1]);
            var d = (f[2] == undefined || f[2] == "" ? null : f[2]);
            if ( a != null ) {
                if ( (a >= 0) && (a <= 23) ) {
                    if ( e != null ) {
                        if ( (e >= 0) && (e <= 59) ) {
                            if ( d != null ) {
                                if ( (d >= 0) && (d <= 59) ) {
                                    c = false
                                } else {
                                    c = true
                                }
                            } else {
                                c = false
                            }
                        } else {
                            c = true
                        }
                    }
                } else {
                    c = true
                }
            } else {
                c = true
            }
        } else {
            c = true
        }
        return c
    },
    data_hora : function( c ) {
        if ( c != "" ) {
            var b = c.split(" ");
            var e = (b[0] == undefined || b[0] == "" ? null : b[0]);
            var a = (b[1] == undefined || b[1] == "" ? null : b[1]);
            var d = false;
            if ( e != null ) {
                if ( _valida.data($.trim(e)) == true ) {
                    d = true
                }
            } else {
                d = true
            }
            if ( a != null ) {
                if ( _valida.hora($.trim(a)) == true ) {
                    d = true
                }
            } else {
                d = true
            }
            return d
        } else {
            return false
        }
    },
    cpf : function( b ) {
        var d = /\.|\-/g;
        b = b.toString().replace(d, "");
        var h = false;
        var c = 1;
        if ( b.length != 11 ) {
            h = true
        } else {
            if ( b == "00000000000" || b == "11111111111" || b == "22222222222" || b == "33333333333" || b == "44444444444" || b == "55555555555" || b == "66666666666" || b == "77777777777" || b == "88888888888" || b == "99999999999" ) {
                h = true
            } else {
                for ( f = 0; f < b.length - 1; f++ ) {
                    if ( b.charAt(f) != b.charAt(f + 1) ) {
                        c = 0;
                        break
                    }
                }
                if ( !c ) {
                    var a = b.substring(0, 9);
                    var g = b.substring(9);
                    var j = 0;
                    for ( f = 10; f > 1; f-- ) {
                        j += a.charAt(10 - f) * f
                    }
                    var e = j % 11 < 2 ? 0 : 11 - j % 11;
                    if ( e != g.charAt(0) ) {
                        h = true
                    }
                    a = b.substring(0, 10);
                    j = 0;
                    for ( var f = 11; f > 1; f-- ) {
                        j += a.charAt(11 - f) * f
                    }
                    e = j % 11 < 2 ? 0 : 11 - j % 11;
                    if ( e != g.charAt(1) ) {
                        h = true
                    } else {
                        h = false
                    }
                } else {
                    h = true
                }
            }
        }
        return h
    },
    cnpj : function( cnpj ) {
        var erro = false;
        var exp = /\.|\-|\//g;
        cnpj = cnpj.toString().replace(exp, "");
        if ( cnpj.length != 14 ) {
            erro = true
        } else {
            if ( cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "88888888888888" || cnpj == "99999999999999" ) {
                erro = true
            } else {
                var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
                var dig1 = new Number;
                var dig2 = new Number;
                var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));
                for ( i = 0; i < valida.length; i++ ) {
                    dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
                    dig2 += cnpj.charAt(i) * valida[i]
                }
                dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
                dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));
                if ( ((dig1 * 10) + dig2) != digito ) {
                    erro = true
                }
            }
        }
        return erro
    },
    email : function( a ) {
        var b = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
        if ( b.test(a) ) {
            return true
        } else {
            return false
        }
    }
};
(function( a ) {
    a.fn.extend({
        form_valida : function( d ) {
            var g = {
            };
            var c = a.extend(true, g, d);
            var f = 0;
            var e = this;
            var b = "";
            a(this).find(":input").removeClass("textoErro").removeClass("textoSucesso").removeClass("textoAviso");
            a(this).find(":input").parent().removeClass("textoErro").removeClass("textoSucesso").removeClass("textoAviso");
            a.each(a(this).find(":input").not(":button, :disabled"), function() {
                var h = this.id;
                var j = "";
                if ( a(this).hasClass("obrigatorio") && a.trim(a(this).val()) == "" ) {
                    f++;
                    if ( j != "" ) {
                        j += "/n"
                    }
                    j += "Campo obrigatório"
                }
                if ( a(this).hasClass("data") ) {
                    if ( _valida.data(a.trim(a(this).val())) == true ) {
                        f++;
                        if ( j != "" ) {
                            j += "/n"
                        }
                        j += "Data inválida"
                    }
                }
                if ( (a(this).hasClass("hora") || a(this).hasClass("hora_segundos")) ) {
                    if ( _valida.hora(a.trim(a(this).val())) == true ) {
                        f++;
                        if ( j != "" ) {
                            j += "/n"
                        }
                        j += "Hora inválida"
                    }
                }
                if ( a(this).hasClass("data_hora") ) {
                    if ( _valida.data_hora(a.trim(a(this).val())) == true ) {
                        f++;
                        if ( j != "" ) {
                            j += "/n"
                        }
                        j += "Data/Hora inválida"
                    }
                }
                if ( a(this).hasClass("cpf") ) {
                    if ( _valida.cpf(a.trim(a(this).val())) == true ) {
                        f++;
                        if ( j != "" ) {
                            j += "/n"
                        }
                        j += "CPF inválido"
                    }
                }
                if ( a(this).hasClass("cnpj") ) {
                    if ( _valida.cnpj(a.trim(a(this).val())) == true ) {
                        f++;
                        if ( j != "" ) {
                            j += "/n"
                        }
                        j += "CNPJ inválido"
                    }
                }
                if ( a(this).hasClass("cpf_cnpj") ) {
                    if ( a.trim(a(this).val()).length == 14 ) {
                        if ( _valida.cpf(a.trim(a(this).val())) == true ) {
                            f++;
                            if ( j != "" ) {
                                j += "/n"
                            }
                            j += "CPF inválido"
                        }
                    } else {
                        if ( _valida.cnpj(a.trim(a(this).val())) == true ) {
                            f++;
                            if ( j != "" ) {
                                j += "/n"
                            }
                            j += "CNPJ inválido"
                        }
                    }
                }
                if ( a(this).hasClass("email") ) {
                    if ( _valida.email(a.trim(a(this).val())) == false ) {
                        f++;
                        if ( j != "" ) {
                            j += "/n"
                        }
                        j += "E-mail inválida"
                    }
                }
                if ( a(this).hasClass("telefone") ) {
                    if ( a.trim(a(this).val()).length < 14 && a.trim(a(this).val()).length > 15 ) {
                        f++;
                        if ( j != "" ) {
                            j += "/n"
                        }
                        j += "Formato do telefone inválido"
                    }
                }
                if ( j != "" ) {
                    if ( b != "" ) {
                        b += ", "
                    }
                    b += '"' + h + '" : "' + a.trim(j) + '"'
                }
            });
            if ( f > 0 ) {
                a(e).color_campos_form({
                    campos : a.parseJSON("{ " + b + " }"),
                    id_msg : c.id_msg
                });
                return false
            } else {
                return true
            }
        }
    })
})(jQuery);
(function( a ) {
    a.fn.extend({
        color_campos_form : function( d ) {
            var f = {
                class_erro : "textoErro",
                class_sucesso : "textoSucesso",
                class_aviso : "textoAviso",
                class_desabilitado : "textoDisabled",
                class_span_erro : "spanError",
                campos : {
                }
            };
            var c = a.extend(true, f, d);
            var e = a(this);
            var b = new Array();
            a("." + c.class_span_erro).remove();
            a.each(c.campos, function( h, g ) {
                b[h] = g
            });
            a.each(e.find(":input").not(":button"), function( j, h ) {
                a(h).removeClass(c.class_sucesso).removeClass(c.class_erro).removeClass(c.class_aviso).addClass(c.class_sucesso);
                a(h).parent().removeClass(c.class_sucesso).removeClass(c.class_erro).removeClass(c.class_aviso).addClass(c.class_sucesso);
                if ( b[a(h).attr("id")] ) {
                    var g = b[a(h).attr("id")];
                    a(h).removeClass(c.class_sucesso).removeClass(c.class_erro).removeClass(c.class_aviso).removeAttr("title").addClass(c.class_erro).attr("title", g);
                    a(h).parent().removeClass(c.class_sucesso).removeClass(c.class_erro).removeClass(c.class_aviso).removeAttr("title").addClass(c.class_erro).attr("title", g);
                    a(h).parent().after('<span class="span_remove_error_' + a(h).attr("id") + " " + c.class_span_erro + '">' + g + "</span>")
                }
            })
        }
    })
})(jQuery);
(function( a ) {
    a.fn.extend({
        insere_mascara : function( c ) {
            var d = {
            };
            var b = a.extend(true, d, c);
            a(this).attr("onsubmit", "return false;");
            a.each(a(this).find(":input").not(":button"), function() {
                if ( a(this).attr("disabled") ) {
                    a(this).addClass("textoDisabled")
                }
                if ( a(this).attr("required") ) {
                    a(this).addClass("obrigatorio")
                }
                if ( a(this).hasClass("obrigatorio") ) {
                    a(this).removeAttr("title");
                    a(this).attr("required", true);
                    a(this).parent().addClass("obrigatorio")
                    if(a(this).parent().hasClass('ui-select')){
                        a(this).parent().removeClass("obrigatorio")
                        a(this).parent().find('a').addClass("obrigatorio")
                    }
                }
                if ( a(this).hasClass("data") ) {
                    a(this).pickadate()
                }
                if ( a(this).hasClass("email") ) {
                    a(this).attr("title", "Informe um E-mail.").attr("maxlength", "255").css("width", "90%")
                }
                if ( a(this).hasClass("cpf") ) {
                    a(this).attr("title", "Informe um CPF.").attr("size", "16").attr("maxlength", "14")
                }
                if ( a(this).hasClass("telefone") ) {
                    a(this).attr("title", "Informe um Telefone com DDD.").attr("size", "16").attr("maxlength", "14")
                }
                if ( a(this).hasClass("cnpj") ) {
                    a(this).attr("title", "Informe um CNPJ.").attr("size", "20").attr("maxlength", "18")
                }
            });
            a.each(a(this).find(":input").not(":button"), function() {
                var e = "";
                if ( a(this).hasClass("obrigatorio") ) {
                    e = a(this).attr("title");
                    if ( e == undefined || a.trim(e) == "" ) {
                        a(this).attr("title", "Campo obrigatório.")
                    } else {
                        a(this).attr("title", "Campo obrigatório, " + e)
                    }
                }
            })
        }
    })
})(jQuery);
function md5( ai ) {
    var ah;
    var an = function( e, f ) {
        return(e << f) | (e >>> (32 - f))
    };
    var ad = function( j, g ) {
        var f, h, l, e, m;
        l = (j & 2147483648);
        e = (g & 2147483648);
        f = (j & 1073741824);
        h = (g & 1073741824);
        m = (j & 1073741823) + (g & 1073741823);
        if ( f & h ) {
            return(m ^ 2147483648 ^ l ^ e)
        }
        if ( f | h ) {
            if ( m & 1073741824 ) {
                return(m ^ 3221225472 ^ l ^ e)
            } else {
                return(m ^ 1073741824 ^ l ^ e)
            }
        } else {
            return(m ^ l ^ e)
        }
    };
    var at = function( f, g, e ) {
        return(f & g) | ((~f) & e)
    };
    var au = function( f, g, e ) {
        return(f & e) | (g & (~e))
    };
    var av = function( f, g, e ) {
        return(f ^ g ^ e)
    };
    var ax = function( f, g, e ) {
        return(g ^ (f | (~e)))
    };
    var ap = function( m, e, g, j, f, l, h ) {
        m = ad(m, ad(ad(at(e, g, j), f), h));
        return ad(an(m, l), e)
    };
    var aE = function( m, e, g, j, f, l, h ) {
        m = ad(m, ad(ad(au(e, g, j), f), h));
        return ad(an(m, l), e)
    };
    var af = function( m, e, g, j, f, l, h ) {
        m = ad(m, ad(ad(av(e, g, j), f), h));
        return ad(an(m, l), e)
    };
    var aq = function( m, e, g, j, f, l, h ) {
        m = ad(m, ad(ad(ax(e, g, j), f), h));
        return ad(an(m, l), e)
    };
    var aF = function( g ) {
        var f;
        var j = g.length;
        var l = j + 8;
        var m = (l - (l % 64)) / 64;
        var o = (m + 1) * 16;
        var e = new Array(o - 1);
        var n = 0;
        var h = 0;
        while ( h < j ) {
            f = (h - (h % 4)) / 4;
            n = (h % 4) * 8;
            e[f] = (e[f] | (g.charCodeAt(h) << n));
            h++
        }
        f = (h - (h % 4)) / 4;
        n = (h % 4) * 8;
        e[f] = e[f] | (128 << n);
        e[o - 2] = j << 3;
        e[o - 1] = j >>> 29;
        return e
    };
    var ar = function( h ) {
        var f = "", e = "", g, j;
        for ( j = 0; j <= 3; j++ ) {
            g = (h >>> (j * 8)) & 255;
            e = "0" + g.toString(16);
            f = f + e.substr(e.length - 2, 2)
        }
        return f
    };
    var ag = [ ], Z, aC, ae, ao, aD, a, b, c, d, W = 7, Y = 12, ab = 17, ac = 22, aj = 5, ak = 9, al = 14, am = 20, aw = 4, ay = 11, az = 16, aA = 23, k = 6, x = 10, X = 15, aa = 21;
    ai = this.utf8_encode(ai);
    ag = aF(ai);
    a = 1732584193;
    b = 4023233417;
    c = 2562383102;
    d = 271733878;
    ah = ag.length;
    for ( Z = 0; Z < ah; Z += 16 ) {
        aC = a;
        ae = b;
        ao = c;
        aD = d;
        a = ap(a, b, c, d, ag[Z + 0], W, 3614090360);
        d = ap(d, a, b, c, ag[Z + 1], Y, 3905402710);
        c = ap(c, d, a, b, ag[Z + 2], ab, 606105819);
        b = ap(b, c, d, a, ag[Z + 3], ac, 3250441966);
        a = ap(a, b, c, d, ag[Z + 4], W, 4118548399);
        d = ap(d, a, b, c, ag[Z + 5], Y, 1200080426);
        c = ap(c, d, a, b, ag[Z + 6], ab, 2821735955);
        b = ap(b, c, d, a, ag[Z + 7], ac, 4249261313);
        a = ap(a, b, c, d, ag[Z + 8], W, 1770035416);
        d = ap(d, a, b, c, ag[Z + 9], Y, 2336552879);
        c = ap(c, d, a, b, ag[Z + 10], ab, 4294925233);
        b = ap(b, c, d, a, ag[Z + 11], ac, 2304563134);
        a = ap(a, b, c, d, ag[Z + 12], W, 1804603682);
        d = ap(d, a, b, c, ag[Z + 13], Y, 4254626195);
        c = ap(c, d, a, b, ag[Z + 14], ab, 2792965006);
        b = ap(b, c, d, a, ag[Z + 15], ac, 1236535329);
        a = aE(a, b, c, d, ag[Z + 1], aj, 4129170786);
        d = aE(d, a, b, c, ag[Z + 6], ak, 3225465664);
        c = aE(c, d, a, b, ag[Z + 11], al, 643717713);
        b = aE(b, c, d, a, ag[Z + 0], am, 3921069994);
        a = aE(a, b, c, d, ag[Z + 5], aj, 3593408605);
        d = aE(d, a, b, c, ag[Z + 10], ak, 38016083);
        c = aE(c, d, a, b, ag[Z + 15], al, 3634488961);
        b = aE(b, c, d, a, ag[Z + 4], am, 3889429448);
        a = aE(a, b, c, d, ag[Z + 9], aj, 568446438);
        d = aE(d, a, b, c, ag[Z + 14], ak, 3275163606);
        c = aE(c, d, a, b, ag[Z + 3], al, 4107603335);
        b = aE(b, c, d, a, ag[Z + 8], am, 1163531501);
        a = aE(a, b, c, d, ag[Z + 13], aj, 2850285829);
        d = aE(d, a, b, c, ag[Z + 2], ak, 4243563512);
        c = aE(c, d, a, b, ag[Z + 7], al, 1735328473);
        b = aE(b, c, d, a, ag[Z + 12], am, 2368359562);
        a = af(a, b, c, d, ag[Z + 5], aw, 4294588738);
        d = af(d, a, b, c, ag[Z + 8], ay, 2272392833);
        c = af(c, d, a, b, ag[Z + 11], az, 1839030562);
        b = af(b, c, d, a, ag[Z + 14], aA, 4259657740);
        a = af(a, b, c, d, ag[Z + 1], aw, 2763975236);
        d = af(d, a, b, c, ag[Z + 4], ay, 1272893353);
        c = af(c, d, a, b, ag[Z + 7], az, 4139469664);
        b = af(b, c, d, a, ag[Z + 10], aA, 3200236656);
        a = af(a, b, c, d, ag[Z + 13], aw, 681279174);
        d = af(d, a, b, c, ag[Z + 0], ay, 3936430074);
        c = af(c, d, a, b, ag[Z + 3], az, 3572445317);
        b = af(b, c, d, a, ag[Z + 6], aA, 76029189);
        a = af(a, b, c, d, ag[Z + 9], aw, 3654602809);
        d = af(d, a, b, c, ag[Z + 12], ay, 3873151461);
        c = af(c, d, a, b, ag[Z + 15], az, 530742520);
        b = af(b, c, d, a, ag[Z + 2], aA, 3299628645);
        a = aq(a, b, c, d, ag[Z + 0], k, 4096336452);
        d = aq(d, a, b, c, ag[Z + 7], x, 1126891415);
        c = aq(c, d, a, b, ag[Z + 14], X, 2878612391);
        b = aq(b, c, d, a, ag[Z + 5], aa, 4237533241);
        a = aq(a, b, c, d, ag[Z + 12], k, 1700485571);
        d = aq(d, a, b, c, ag[Z + 3], x, 2399980690);
        c = aq(c, d, a, b, ag[Z + 10], X, 4293915773);
        b = aq(b, c, d, a, ag[Z + 1], aa, 2240044497);
        a = aq(a, b, c, d, ag[Z + 8], k, 1873313359);
        d = aq(d, a, b, c, ag[Z + 15], x, 4264355552);
        c = aq(c, d, a, b, ag[Z + 6], X, 2734768916);
        b = aq(b, c, d, a, ag[Z + 13], aa, 1309151649);
        a = aq(a, b, c, d, ag[Z + 4], k, 4149444226);
        d = aq(d, a, b, c, ag[Z + 11], x, 3174756917);
        c = aq(c, d, a, b, ag[Z + 2], X, 718787259);
        b = aq(b, c, d, a, ag[Z + 9], aa, 3951481745);
        a = ad(a, aC);
        b = ad(b, ae);
        c = ad(c, ao);
        d = ad(d, aD)
    }
    var aB = ar(a) + ar(b) + ar(c) + ar(d);
    return aB.toLowerCase()
}
String.prototype.format = function() {
    var f = this;
    for ( var e = 0; e < arguments.length; e++ ) {
        var d = new RegExp("\\{" + e + "\\}", "gi");
        f = f.replace(d, arguments[e])
    }
    return f
};
function block( b ) {
    $("body").append("<div class='ui-loader-background'> </div>");
    $.mobile.loading("show", {
        text : "Aguarde sincronizando a base de dados.",
        textVisible : true,
        theme : "e",
        textonly : false
    });
    $(".ui-loader").css("display", "block");
    if ( b == true ) {
        $("div.ui-loader-background").remove();
        $.mobile.loading("hide");
        $(".ui-loader").css("display", "none")
    }
}
function TimeCounter() {
    this.startDate = null;
    this.ellapsedTime = null;
    this.start = function() {
        this.startDate = new Date()
    };
    this.stop = function() {
        return Math.ceil((new Date() - this.startDate) / 1000)
    }
}
function utf8_encode( u ) {
    if ( u === null || typeof u === "undefined" ) {
        return""
    }
    var m = (u + "");
    var l = "", t, q, s = 0;
    t = q = 0;
    s = m.length;
    for ( var r = 0; r < s; r++ ) {
        var n = m.charCodeAt(r);
        var o = null;
        if ( n < 128 ) {
            q++
        } else {
            if ( n > 127 && n < 2048 ) {
                o = String.fromCharCode((n >> 6) | 192, (n & 63) | 128)
            } else {
                if ( n & 63488 != 55296 ) {
                    o = String.fromCharCode((n >> 12) | 224, ((n >> 6) & 63) | 128, (n & 63) | 128)
                } else {
                    if ( n & 64512 != 55296 ) {
                        throw new RangeError("Unmatched trail surrogate at " + r)
                    }
                    var p = m.charCodeAt(++r);
                    if ( p & 64512 != 56320 ) {
                        throw new RangeError("Unmatched lead surrogate at " + (r - 1))
                    }
                    n = ((n & 1023) << 10) + (p & 1023) + 65536;
                    o = String.fromCharCode((n >> 18) | 240, ((n >> 12) & 63) | 128, ((n >> 6) & 63) | 128, (n & 63) | 128)
                }
            }
        }
        if ( o !== null ) {
            if ( q > t ) {
                l += m.slice(t, q)
            }
            l += o;
            t = q = r + 1
        }
    }
    if ( q > t ) {
        l += m.slice(t, s)
    }
    return l
}
function convert_date( e, c ) {
    c = (!c ? "-" : c);
    var b = e.split("/");
    return b[2] + c + b[1] + c + b[0]
}
function convert_moeda( a ) {
    a = a.replace(/\./g, "");
    a = a.replace(/\,/g, ".");
    return parseFloat(a)
}
(function( a ) {
    a.send = function( b ) {
        var c = a.extend(true, {
            type : "POST",
            crypt : false,
            url : "",
            dataType : "json",
            data : {
            },
            beforeSend : function( d, e ) {
            },
            success : function( d, e ) {
            },
            error : function( d, e ) {
            },
            extra : function( d, e ) {
            },
            execute : function( d ) {
                a.ajax({
                    type : d.type,
                    data : (d.crypt == true ? json_encode(d.data) : d.data),
                    dataType : d.dataType,
                    url : d.url,
                    contentType : "application/json",
                    crossDomain : true,
                    beforeSend : function() {
                        d.beforeSend.call(null, {
                        }, d)
                    },
                    success : function( e ) {
                        if ( e.cod_retorno == 999 ) {
                            jAviso(e.mensagem);
                            d.error.call(null, e, d)
                        } else {
                            jSucesso(e.mensagem);
                            d.success.call(null, e, d)
                        }
                    },
                    error : function( g, e ) {
                        var f = "";
                        if ( g.status === 0 ) {
                            f = ("Não conectar. \n Verifique Rede.")
                        } else {
                            if ( g.status === 404 ) {
                                f = ("A url:'" + d.url + "' solicitada não foi encontrada. [404]")
                            } else {
                                if ( g.status === 500 ) {
                                    f = ("A url:'" + d.url + "' solicitada contém um error interno no servidor. [500]")
                                } else {
                                    if ( e === "parsererror" ) {
                                        f = ("Solicitado de análise do JSON falhou.")
                                    } else {
                                        if ( e === "timeout" ) {
                                            f = ("Erro. Tempo limite excedeu.")
                                        } else {
                                            if ( e === "abort" ) {
                                                f = ("Pedido Ajax abortada.")
                                            } else {
                                                f = ("Tipo do erro não detectado. /n " + g.responseText)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        jAviso(f);
                        d.error.call(null, {
                        }, d)
                    }
                })
            }
        }, b);
        c.extra.call(null, {
        }, c);
        if ( c.url != _situacoes.urls.ativacao ) {
            c.data.cod_ativacao = (_session.get("cod_ativacao") == null ? "" : _session.get("cod_ativacao"));
            c.data.cod_usuario = (_session.get("cod_usuario") == null ? "" : _session.get("cod_usuario"));
            c.data.tipo_conexao = (_session.get("tipo_conexao") == null ? "" : _session.get("tipo_conexao"))
        }
        c.execute.call(null, c)
    }
})(jQuery);
function msg( b, d ) {
    $("div.conteudo .msg_sistema").fadeOut("slow");
    if ( $("div.conteudo .msg_sistema").length == 0 ) {
        $("div.conteudo").prepend('<div class="msg_sistema"></div>')
    }
    $("div.conteudo .msg_sistema").html(b).addClass("msg_" + d).css({
        margin : "1em 0",
        padding : "5px",
        "text-align" : "center",
        "font-size" : "0.9em",
        "font-weight" : "bold"
    }).fadeIn("slow").delay(10000).fadeOut("slow");
}
function SQLite( k ) {
    if ( typeof window.openDatabase === "undefined" ) {
        return
    }
    function h( e ) {
        if ( typeof console !== "undefined" ) {
            console.log(e)
        }
    }
    function q( e ) {
        switch ( typeof e ) {
            case"number":
                return true;
            case"string":
                return(/^\d+$/).test(e);
            case"object":
                return false
            }
    }
    function f( e ) {
    }
    function j( e, t ) {
        debug("QUERY", t);
        debug("Oops. " + e.message + " (Code " + e.code + ")")
    }
    var b = k || {
    }, r;
    b.shortName = b.shortName || "mydatabase";
    b.version = b.version || "";
    b.displayName = b.displayName || "My SQLite Database";
    b.maxSize = 65536;
    b.defaultErrorHandler = b.defaultErrorHandler || j;
    b.defaultDataHandler = b.defaultDataHandler || f;
    try {
        r = openDatabase(b.shortName, b.version, b.displayName, b.maxSize)
    } catch ( l ) {
        if ( l === 2 ) {
            h("Invalid database version.")
        } else {
            h("Unknown error " + l + ".")
        }
        return
    }
    function n( y, B, x, w ) {
        var C = B || [ ], t = x || b.defaultDataHandler, z = w || b.defaultErrorHandler;
        if ( !y || y === "" ) {
            return
        }
        function A( v, e ) {
            z(e, y)
        }
        function u( v, e ) {
            t(e, y)
        }
        r.transaction(function( e ) {
            e.executeSql(y, C, u, A);
            debug("QUERY", y);
            debug("VALUES", C.join("|"))
        })
    }
    function s( v ) {
        var u = [ ], t = [ ], e;
        if ( typeof v === "string" ) {
            u.push(v)
        } else {
            if ( typeof v === "number" ) {
                u.push("id=?");
                t.push(v)
            } else {
                if ( typeof v === "object" ) {
                    for ( e in v ) {
                        if ( v.hasOwnProperty(e) ) {
                            if ( q(e) ) {
                                u.push(v[e])
                            } else {
                                if ( (/like/gi).test(e) ) {
                                    u.push(e.replace(/like/gi, "") + " LIKE '%" + v[e] + "%' ")
                                } else {
                                    u.push(e + "=?");
                                    t.push(v[e])
                                }
                            }
                        }
                    }
                }
            }
        }
        if ( u.length > 0 ) {
            u = " WHERE " + u.join(" AND ")
        } else {
            u = ""
        }
        return[ u, t ]
    }
    function o( e, u ) {
        var v = "";
        if ( typeof u == "object" ) {
            $.each(u, function( x, w ) {
                if ( v != "" ) {
                    v += ", "
                }
                v += x + " " + w
            })
        } else {
            v = u
        }
        var t = "CREATE TABLE IF NOT EXISTS " + e + "(" + v + ");";
        return[ t, [ ] ]
    }
    function a( e ) {
        var t = "DROP TABLE IF EXISTS " + e + ";";
        return[ t, [ ] ]
    }
    function d( v, y ) {
        var w = "INSERT INTO " + v + " (#k#) VALUES(#v#);", u = [ ], z = [ ], t = [ ], e;
        for ( e in y ) {
            if ( y.hasOwnProperty(e) ) {
                u.push(e);
                z.push("?");
                t.push(y[e])
            }
        }
        w = w.replace("#k#", u.join(","));
        w = w.replace("#v#", z.join(","));
        return[ w, t ]
    }
    function g( v, y ) {
        var w = "INSERT OR REPLACE INTO " + v + " (#k#) VALUES(#v#);", u = [ ], z = [ ], t = [ ], e;
        for ( e in y ) {
            if ( y.hasOwnProperty(e) ) {
                u.push(e);
                z.push("?");
                t.push(y[e])
            }
        }
        w = w.replace("#k#", u.join(","));
        w = w.replace("#v#", z.join(","));
        return[ w, t ]
    }
    function m( v, z, y ) {
        var w = "UPDATE " + v + " SET #k##m#", u = [ ], t = [ ], e;
        for ( e in z ) {
            if ( z.hasOwnProperty(e) ) {
                u.push(e + "=?");
                t.push(z[e])
            }
        }
        y = s(y);
        t = t.concat(y[1]);
        w = w.replace("#k#", u.join(","));
        w = w.replace("#m#", y[0]);
        return[ w, t ]
    }
    function p( v, u, x, t ) {
        var w = "SELECT #col# FROM " + v + "#cond#", e = [ ];
        if ( typeof u === "undefined" ) {
            u = "*"
        } else {
            if ( typeof u === "object" ) {
                u.join(",")
            }
        }
        x = s(x);
        e = e.concat(x[1]);
        w = w.replace("#col#", u);
        w = w.replace("#cond#", x[0]);
        if ( t ) {
            if ( t.order ) {
                w = w + " ORDER BY ?";
                e.push(t.order)
            }
            if ( t.limit ) {
                w = w + " LIMIT ?";
                e.push(t.limit)
            }
            if ( t.offset ) {
                w = w + " OFFSET ?";
                e.push(t.offset)
            }
        }
        w = w + ";";
        return[ w, e ]
    }
    function c( e, u ) {
        var t = "DELETE FROM " + e + "#c#;";
        u = s(u);
        t = t.replace("#c#", u[0]);
        return[ t, u[1] ]
    }
    return{
        database : r,
        createTable : function( e, v, t, u ) {
            var w = o(e, v);
            n(w[0], w[1], t, u)
        },
        dropTable : function( e, t, u ) {
            var v = a(e);
            n(v[0], v[1], t, u)
        },
        insert : function( u, v, e, t ) {
            var w = d(u, v);
            n(w[0], w[1], e, t)
        },
        replace : function( u, v, e, t ) {
            var w = g(u, v);
            n(w[0], w[1], e, t)
        },
        update : function( u, w, v, e, t ) {
            var x = m(u, w, v);
            n(x[0], x[1], e, t)
        },
        select : function( v, t, w, e, u ) {
            w.where = w.where || {
            };
            w.options = w.options || {
            };
            var x = p(v, t, w.where, w.options);
            n(x[0], x[1], e, u)
        },
        destroy : function( u, v, e, t ) {
            var w = c(u, v);
            n(w[0], w[1], e, t)
        }
    }
}
function json_encode( g ) {
    var e, b = this.window.JSON;
    try {
        if ( typeof b === "object" && typeof b.stringify === "function" ) {
            e = b.stringify(g);
            if ( e === undefined ) {
                throw new SyntaxError("json_encode")
            }
            return e
        }
        var d = g;
        var a = function( h ) {
            var k = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            var j = {
                "\b" : "\\b",
                "\t" : "\\t",
                "\n" : "\\n",
                "\f" : "\\f",
                "\r" : "\\r",
                '"' : '\\"',
                "\\" : "\\\\"
            };
            k.lastIndex = 0;
            return k.test(h) ? '"' + h.replace(k, function( l ) {
                var m = j[l];
                return typeof m === "string" ? m : "\\u" + ("0000" + l.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + h + '"'
        };
        var f = function( s, o ) {
            var q = "";
            var j = "    ";
            var m = 0;
            var l = "";
            var t = "";
            var h = 0;
            var p = q;
            var n = [ ];
            var r = o[s];
            if ( r && typeof r === "object" && typeof r.toJSON === "function" ) {
                r = r.toJSON(s)
            }
            switch ( typeof r ) {
                case"string":
                    return a(r);
                case"number":
                    return isFinite(r) ? String(r) : "null";
                case"boolean":
                case"null":
                    return String(r);
                case"object":
                    if ( !r ) {
                        return"null"
                    }
                    if ( (this.PHPJS_Resource && r instanceof this.PHPJS_Resource) || (window.PHPJS_Resource && r instanceof window.PHPJS_Resource) ) {
                        throw new SyntaxError("json_encode")
                    }
                    q += j;
                    n = [ ];
                    if ( Object.prototype.toString.apply(r) === "[object Array]" ) {
                        h = r.length;
                        for ( m = 0; m < h; m += 1 ) {
                            n[m] = f(m, r) || "null"
                        }
                        t = n.length === 0 ? "[]" : q ? "[\n" + q + n.join(",\n" + q) + "\n" + p + "]" : "[" + n.join(",") + "]";
                        q = p;
                        return t
                    }
                    for ( l in r ) {
                        if ( Object.hasOwnProperty.call(r, l) ) {
                            t = f(l, r);
                            if ( t ) {
                                n.push(a(l) + (q ? ": " : ":") + t)
                            }
                        }
                    }
                    t = n.length === 0 ? "{}" : q ? "{\n" + q + n.join(",\n" + q) + "\n" + p + "}" : "{" + n.join(",") + "}";
                    q = p;
                    return t;
                case"undefined":
                case"function":
                default:
                    throw new SyntaxError("json_encode")
                }
        };
        return f("", {
            "" : d
        })
    } catch ( c ) {
        if ( !(c instanceof SyntaxError) ) {
            throw new Error("Unexpected error type in json_encode()")
        }
        this.php_js = this.php_js || {
        };
        this.php_js.last_error_json = 4;
        return null
    }
}
/*!
 * pickadate.js v2.1.7 - 25 March, 2013
 * By Amsul (http://amsul.ca)
 * Hosted on https://github.com/amsul/pickadate.js
 * Licensed under MIT ("expat" flavour) license.
 */
;(function(g,j,b){var p=7,i=6,h=i*p,o="div",n="pickadate__",a=navigator.userAgent.match(/MSIE/),d=g(j),f=g(j.body),k=function(I,af){var N=function(){},x=N.prototype={constructor:N,$node:I,init:function(){I.on({"focus click":function(){if(!a||(a&&!Z._IE)){x.open()}G.addClass(Q.focused);Z._IE=0},blur:function(){G.removeClass(Q.focused)},change:function(){if(O){O.value=X.value?L(af.formatSubmit):""}},keydown:function(ai){var P=ai.keyCode,aj=P==8||P==46;if(aj||!Z.isOpen&&z[P]){ai.preventDefault();U(ai);if(aj){x.clear().close()}else{x.open()}}}}).after([G,O]);if(X.autofocus){x.open()}Z.items=t();c(af.onStart,x);c(af.onRender,x);return x},open:function(){if(Z.isOpen){return x}Z.isOpen=1;s(0);I.focus().addClass(Q.inputActive);G.addClass(Q.opened);f.addClass(Q.bodyActive);d.on("focusin.P"+Z.id,function(P){if(!G.find(P.target).length&&P.target!=X){x.close()}}).on("click.P"+Z.id,function(P){if(P.target!=X){x.close()}}).on("keydown.P"+Z.id,function(ai){var P=ai.keyCode,aj=z[P];if(P==27){X.focus();x.close()}else{if(ai.target==X&&(aj||P==13)){ai.preventDefault();if(aj){D(r([Y.YEAR,Y.MONTH,B.DATE+aj],aj),1)}else{ah(B);ae();x.close()}}}});c(af.onOpen,x);return x},close:function(){if(!Z.isOpen){return x}Z.isOpen=0;s(-1);I.removeClass(Q.inputActive);G.removeClass(Q.opened);f.removeClass(Q.bodyActive);d.off(".P"+Z.id);c(af.onClose,x);return x},isOpen:function(){return Z.isOpen===1},show:function(ai,P){M(--ai,P);return x},clear:function(){ah(0);ae();return x},getDate:function(P){return P===true?S.OBJ:!X.value?"":L(P)},setDate:function(ai,ak,P,aj){D(r([ai,--ak,P]),aj);return x},getDateLimit:function(P,ai){return L(ai,P?ad:A)},setDateLimit:function(P,ai){if(ai){ad=W(P,ai);if(Y.TIME>ad.TIME){Y=ad}}else{A=W(P);if(Y.TIME<A.TIME){Y=A}}ae();return x}},X=(function(P){P.autofocus=(P==j.activeElement);P.type="text";P.readOnly=true;return P})(I[0]),Z={id:~~(Math.random()*1000000000)},Q=af.klass,K=(function(){function aj(ak){return ak.match(/\w+/)[0].length}function P(ak){return(/\d/).test(ak[1])?2:1}function ai(al,ak,an){var am=al.match(/\w+/)[0];if(!ak.mm&&!ak.m){ak.m=an.indexOf(am)+1}return am.length}return{d:function(ak){return ak?P(ak):this.DATE},dd:function(ak){return ak?2:e(this.DATE)},ddd:function(ak){return ak?aj(ak):af.weekdaysShort[this.DAY]},dddd:function(ak){return ak?aj(ak):af.weekdaysFull[this.DAY]},m:function(ak){return ak?P(ak):this.MONTH+1},mm:function(ak){return ak?2:e(this.MONTH+1)},mmm:function(ak,al){var am=af.monthsShort;return ak?ai(ak,al,am):am[this.MONTH]},mmmm:function(ak,al){var am=af.monthsFull;return ak?ai(ak,al,am):am[this.MONTH]},yy:function(ak){return ak?2:(""+this.YEAR).slice(2)},yyyy:function(ak){return ak?4:this.YEAR},toArray:function(ak){return ak.split(/(?=\b)(d{1,4}|m{1,4}|y{4}|yy)+(\b)/g)}}})(),q=l(),A=W(af.dateMin),ad=W(af.dateMax,1),J=ad,v=A,u=(function(P){if(Array.isArray(P)){if(P[0]===true){Z.off=P.shift()}return P.map(function(ai){if(!isNaN(ai)){Z.offDays=1;return af.firstDay?ai%p:--ai}--ai[1];return l(ai)})}})(af.datesDisabled),F=(function(){var P=function(ai){return this.TIME==ai.TIME||u.indexOf(this.DAY)>-1};if(Z.off){u.map(function(ai){if(ai.TIME<J.TIME&&ai.TIME>A.TIME){J=ai}if(ai.TIME>v.TIME&&ai.TIME<=ad.TIME){v=ai}});return function(ai,aj,ak){return(ak.map(P,this).indexOf(true)<0)}}return P})(),B=(function(ai,P){if(ai){P={};K.toArray(af.formatSubmit).map(function(ak){var aj=K[ak]?K[ak](ai,P):ak.length;if(K[ak]){P[ak]=ai.slice(0,aj)}ai=ai.slice(aj)});P=[+(P.yyyy||P.yy),+(P.mm||P.m)-1,+(P.dd||P.d)]}else{P=Date.parse(P)}return r(P&&(!isNaN(P)||Array.isArray(P))?P:q)})(X.getAttribute("data-value"),X.value),S=B,Y=B,O=af.formatSubmit?g("<input type=hidden name="+X.name+af.hiddenSuffix+">").val(X.value?L(af.formatSubmit):"")[0]:null,V=(function(P){if(af.firstDay){P.push(P.splice(0,1)[0])}return m("thead",m("tr",P.map(function(ai){return m("th",ai,Q.weekdays)})))})((af.showWeekdaysShort?af.weekdaysShort:af.weekdaysFull).slice(0)),G=g(m(o,E(),Q.holder)).on("mousedown",function(P){if(Z.items.indexOf(P.target)<0){P.preventDefault()}}).on("click",function(ai){if(!Z.isOpen&&!ai.clientX&&!ai.clientY){return}var aj,P=g(ai.target),ak=P.data();U(ai);X.focus();Z._IE=1;if(ak.nav){M(Y.MONTH+ak.nav)}else{if(ak.clear){x.clear().close()}else{if(ak.date){aj=ak.date.split("/");x.setDate(+aj[0],+aj[1],+aj[2]).close()}else{if(P[0]==G[0]){x.close()}}}}}),z={40:7,38:-7,39:1,37:-1};function W(P,ai){if(P===true){return q}if(Array.isArray(P)){--P[1];return l(P)}if(P&&!isNaN(P)){return l([q.YEAR,q.MONTH,q.DATE+P])}return l(0,ai?Infinity:-Infinity)}function r(ai,ak,P){ai=!ai.TIME?l(ai):ai;if(Z.off&&!Z.offDays){ai=ai.TIME<J.TIME?J:ai.TIME>v.TIME?v:ai}else{if(u){var aj=ai;while(u.filter(F,ai).length){ai=l([ai.YEAR,ai.MONTH,ai.DATE+(ak||1)]);if(!P&&ai.MONTH!=aj.MONTH){aj=ai=l([aj.YEAR,aj.MONTH,ak<0?--aj.DATE:++aj.DATE])}}}}if(ai.TIME<A.TIME){ai=r(A,1,1)}else{if(ai.TIME>ad.TIME){ai=r(ad,-1,1)}}return ai}function w(ai){if((ai&&Y.YEAR>=ad.YEAR&&Y.MONTH>=ad.MONTH)||(!ai&&Y.YEAR<=A.YEAR&&Y.MONTH<=A.MONTH)){return""}var P="month"+(ai?"Next":"Prev");return m(o,af[P],Q[P],"data-nav="+(ai||-1))}function H(P){return af.monthSelector?m("select",P.map(function(ai,aj){return m("option",ai,0,"value="+aj+(Y.MONTH==aj?" selected":"")+y(aj,Y.YEAR," disabled",""))}),Q.selectMonth,T()):m(o,P[Y.MONTH],Q.month)}function ab(){var ao=Y.YEAR,am=af.yearSelector;if(am){am=am===true?5:~~(am/2);var aj=[],P=ao-am,an=ac(P,A.YEAR),al=ao+am+(an-P),ak=ac(al,ad.YEAR,1);an=ac(P-(al-ak),A.YEAR);for(var ai=0;ai<=ak-an;ai+=1){aj.push(an+ai)}return m("select",aj.map(function(ap){return m("option",ap,0,"value="+ap+(ao==ap?" selected":""))}),Q.selectYear,T())}return m(o,ao,Q.year)}function C(){var ai,ao,ak,an=[],am="",P=l([Y.YEAR,Y.MONTH+1,0]).DATE,al=l([Y.YEAR,Y.MONTH,1]).DAY+(af.firstDay?-2:-1);al+=al<-1?7:0;for(var aj=0;aj<h;aj+=1){ao=aj-al;ai=l([Y.YEAR,Y.MONTH,ao]);ak=R(ai,(ao>0&&ao<=P));an.push(m("td",m(o,ai.DATE,ak[0],ak[1])));if((aj%p)+1==p){am+=m("tr",an.splice(0,p))}}return m("tbody",am,Q.body)}function R(ai,aj){var ak,P=[Q.day,(aj?Q.dayInfocus:Q.dayOutfocus)];if(ai.TIME<A.TIME||ai.TIME>ad.TIME||(u&&u.filter(F,ai).length)){ak=1;P.push(Q.dayDisabled)}if(ai.TIME==q.TIME){P.push(Q.dayToday)}if(ai.TIME==B.TIME){P.push(Q.dayHighlighted)}if(ai.TIME==S.TIME){P.push(Q.daySelected)}return[P.join(" "),"data-"+(ak?"disabled":"date")+"="+[ai.YEAR,ai.MONTH+1,ai.DATE].join("/")]}function ag(){return m("button",af.today,Q.buttonToday,"data-date="+L("yyyy/mm/dd",q)+" "+T())+m("button",af.clear,Q.buttonClear,"data-clear=1 "+T())}function E(){return m(o,m(o,m(o,m(o,w()+w(1)+H(af.showMonthsFull?af.monthsFull:af.monthsShort)+ab(),Q.header)+m("table",[V,C()],Q.table)+m(o,ag(),Q.footer),Q.calendar),Q.wrap),Q.frame)}function ac(aj,P,ai){return(ai&&aj<P)||(!ai&&aj>P)?aj:P}function y(ak,ai,P,aj){if(ai<=A.YEAR&&ak<A.MONTH){return P||A.MONTH}if(ai>=ad.YEAR&&ak>ad.MONTH){return P||ad.MONTH}return aj!=null?aj:ak}function T(){return"tabindex="+(Z.isOpen?0:-1)}function L(ai,P){return K.toArray(ai||af.format).map(function(aj){return c(K[aj],P||S)||aj}).join("")}function D(ai,P){B=ai;Y=ai;if(!P){ah(ai)}ae()}function ah(P){S=P||S;I.val(P?L():"").trigger("change");c(af.onSelect,x)}function aa(P){return G.find("."+P)}function M(ai,P){P=P||Y.YEAR;ai=y(ai,P);Y=l([P,ai,1]);ae()}function s(P){Z.items.map(function(ai){if(ai){ai.tabIndex=P}})}function t(){return[aa(Q.selectMonth).on({click:U,change:function(){M(+this.value);aa(Q.selectMonth).focus()}})[0],aa(Q.selectYear).on({click:U,change:function(){M(Y.MONTH,+this.value);aa(Q.selectYear).focus()}})[0],aa(Q.buttonToday)[0],aa(Q.buttonClear)[0]]}function ae(){G.html(E());Z.items=t();c(af.onRender,x)}function U(P){P.stopPropagation()}return new x.init()};function c(r,q){if(typeof r=="function"){return r.call(q)}}function e(q){return(q<10?"0":"")+q}function m(t,s,q,r){if(!s){return""}s=Array.isArray(s)?s.join(""):s;q=q?' class="'+q+'"':"";r=r?" "+r:"";return"<"+t+q+r+">"+s+"</"+t+">"}function l(r,q){if(Array.isArray(r)){r=new Date(r[0],r[1],r[2])}else{if(!isNaN(r)){r=new Date(r)}else{if(!q){r=new Date();r.setHours(0,0,0,0)}}}return{YEAR:q||r.getFullYear(),MONTH:q||r.getMonth(),DATE:q||r.getDate(),DAY:q||r.getDay(),TIME:q||r.getTime(),OBJ:q||r}}g.fn.pickadate=function(q){var r="pickadate";q=g.extend(true,{},g.fn.pickadate.defaults,q);if(q.disablePicker){return this}return this.each(function(){var s=g(this);if(this.nodeName=="INPUT"&&!s.data(r)){s.data(r,new k(s,q))}})};g.fn.pickadate.defaults={monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],monthPrev:"&#9664;",monthNext:"&#9654;",showMonthsFull:1,showWeekdaysShort:1,today:"Today",clear:"Clear",format:"d mmmm, yyyy",formatSubmit:0,hiddenSuffix:"_submit",firstDay:0,monthSelector:0,yearSelector:0,dateMin:0,dateMax:0,datesDisabled:0,disablePicker:0,onOpen:0,onClose:0,onSelect:0,onStart:0,onRender:0,klass:{bodyActive:n+"active",inputActive:n+"input--active",holder:n+"holder",opened:n+"holder--opened",focused:n+"holder--focused",frame:n+"frame",wrap:n+"wrap",calendar:n+"calendar",table:n+"table",header:n+"header",monthPrev:n+"nav--prev",monthNext:n+"nav--next",month:n+"month",year:n+"year",selectMonth:n+"select--month",selectYear:n+"select--year",weekdays:n+"weekday",body:n+"body",day:n+"day",dayDisabled:n+"day--disabled",daySelected:n+"day--selected",dayHighlighted:n+"day--highlighted",dayToday:n+"day--today",dayInfocus:n+"day--infocus",dayOutfocus:n+"day--outfocus",footer:n+"footer",buttonClear:n+"button--clear",buttonToday:n+"button--today"}}})(jQuery,document);
/*!
 * pickadate.js v2.1.7 - 25 March, 2013
 * By Amsul (http://amsul.ca)
 * Hosted on https://github.com/amsul/pickadate.js
 * Licensed under MIT ("expat" flavour) license.
 */
$.extend($.fn.pickadate.defaults,{monthsFull:["janeiro","fevereiro","marÃ§o","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],monthsShort:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],weekdaysFull:["domingo","segunda-feira","terÃ§a-feira","quarta-feira","quinta-feira","sexta-feira","sÃ¡bado"],weekdaysShort:["dom","seg","ter","qua","qui","sex","sab"],today:"hoje",clear:"excluir",format:"dd/mm/yyyy",formatSubmit:"dd/mm/yyyy"});