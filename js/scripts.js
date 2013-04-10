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
(function( a ) {
    if ( typeof define === "function" && define.amd ) {
        define([ "jquery" ], a)
    } else {
        a(jQuery)
    }
}(function( e ) {
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
    var c = e.cookie = function( p, o, u ) {
        if ( o !== undefined ) {
            u = e.extend({
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
    e.removeCookie = function( h, g ) {
        if ( e.cookie(h) !== undefined ) {
            e.cookie(h, "", e.extend(g, {
                expires : -1
            }));
            return true
        }
        return false
    }
    e.clearCookie = function() {
        var cookies = document.cookie.split(";");
        for ( var i = 0; i < cookies.length; i++ ) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var h = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            e.cookie(h, "", e.extend(g, {
                expires : -1
            }));
        }
        return false
    }
}));
var _session = {
    get : function( a ) {
        if ( typeof localStorage === "object" ) {
            return localStorage.getItem(a)
        } else {
            return $.cookie(a)
        }
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
    clear : function( a ) {
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
    alert(a);
    debug("AVISO", a)
}
function jSucesso( a ) {
    alert(a);
    debug("SUCESSO", a)
}
function debug( a, b ) {
    console.log(date("Y-m-d H:i:s", (new Date()).getTime() / 1000) + '\n Mesagem: "' + b + '" \n\n\n')
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
var _valida = {
    clear : function( a ) {
        var b = /\.|\_|\:|\;|\ |\-/g;
        return a.toString().replace(b, "")
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
        form_valida : function() {
            var d = 0;
            var c = this;
            var b = "";
            a.each(a(this).find(":input").not(":button, :disabled"), function() {
                var e = a(this).attr("id");
                var f = "";
                if ( a(this).hasClass("obrigatorio") && a.trim(a(this).val()) == "" ) {
                    d++;
                    if ( f != "" ) {
                        f += "<br />"
                    }
                    f += "Campo obrigatório"
                }
                if ( a(this).hasClass("cpf") ) {
                    if ( _valida.cpf(a.trim(a(this).val())) == true ) {
                        d++;
                        if ( f != "" ) {
                            f += "<br />"
                        }
                        f += "CPF inválido"
                    }
                }
                if ( a(this).hasClass("cnpj") ) {
                    if ( _valida.cnpj(a.trim(a(this).val())) == true ) {
                        d++;
                        if ( f != "" ) {
                            f += "<br />"
                        }
                        f += "CNPJ inválido"
                    }
                }
                if ( a(this).hasClass("cpf_cnpj") ) {
                    if ( a.trim(a(this).val()).length == 14 ) {
                        if ( _valida.cpf(a.trim(a(this).val())) == true ) {
                            d++;
                            if ( f != "" ) {
                                f += "<br />"
                            }
                            f += "CPF inválido"
                        }
                    } else {
                        if ( _valida.cnpj(a.trim(a(this).val())) == true ) {
                            d++;
                            if ( f != "" ) {
                                f += "<br />"
                            }
                            f += "CNPJ inválido"
                        }
                    }
                }
                if ( a(this).hasClass("email") ) {
                    if ( _valida.email(a.trim(a(this).val())) == false ) {
                        d++;
                        if ( f != "" ) {
                            f += "<br />"
                        }
                        f += "E-mail inválida"
                    }
                }
                if ( f != "" ) {
                    if ( b != "" ) {
                        b += ", "
                    }
                    b += '"' + e + '" : "' + a.trim(f) + '"'
                }
            });
            if ( d > 0 ) {
                a(c).color_campos_form({
                    campos : a.parseJSON("{ " + b + " }")
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
        color_campos_form : function( c ) {
            var d = {
                campos : {
                }
            };
            var b = a.extend(true, d, c);
            var e = "";
            a.each(b.campos, function( g, f ) {
                if ( e != "" ) {
                    e += "<br />"
                }
                e += f
            });
            jAviso(e)
        }
    })
})(jQuery);
(function( a ) {
    a.fn.extend({
        insere_mascara : function( b ) {
            a.each(a(this).find(":input").not(":button"), function() {
                if ( a(this).attr("disabled") ) {
                    a(this).addClass("disabled");
                    a(this).parent().addClass("disabled")
                }
                if ( a(this).attr("required") ) {
                    a(this).addClass("obrigatorio")
                }
                if ( a(this).hasClass("obrigatorio") ) {
                    a(this).removeAttr("title");
                    a(this).attr("required", "required");
                    a(this).parent().addClass("obrigatorio")
                }
                if ( a(this).hasClass("email") ) {
                    a(this).attr("title", "Informe um E-mail.").attr("maxlength", "255").css("width", "90%")
                }
                if ( a(this).hasClass("cpf") ) {
                    a(this).attr("title", "Informe um CPF.").attr("size", "16").attr("maxlength", "14")
                }
                if ( a(this).hasClass("cnpj") ) {
                    a(this).attr("title", "Informe um CNPJ.").attr("size", "20").attr("maxlength", "18")
                }
                if ( a(this).hasClass("numero") ) {
                    a(this).attr("type", "number");
                    a(this).attr("pattern", "[0-9]*")
                }
                if ( a(this).hasClass("alfa") ) {
                    a(this).attr("type", "text");
                    a(this).attr("pattern", "[a-zA-Z]*")
                }
            });
            a.each(a(this).find(":input").not(":button"), function() {
                var c = "";
                if ( a(this).hasClass("obrigatorio") ) {
                    c = a(this).attr("title");
                    if ( c == undefined || a.trim(c) == "" ) {
                        a(this).attr("title", "Campo obrigatório.")
                    } else {
                        a(this).attr("title", "Campo obrigatório, " + c)
                    }
                }
            })
        }
    })
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
        this.startDate = new Date()
    };
    this.stop = function() {
        return(new Date() - this.startDate) / 1000
    }
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
;