var NISLa = function (NISLb, NISLc) {
    var NISLd = NISLc.length;
    for (let NISLe = 0; NISLe < 100; NISLe++) {
        for (let NISLf = 0; NISLf < NISLd; NISLf++) {
            NISLc.push(NISLc[NISLf]);
        }
    }
    for (NISLe = 0; NISLe < 10000; NISLe++) {
        NISLc.shift();
    }
    'use strict';
    Object.defineProperty(NISLc, '__esModule', { value: !0 }), NISLc.equals = function (NISLc, NISLg) {
        if (NISLc === NISLg)
            return !0;
        if (null == NISLc || null == NISLg)
            return !1;
        if (typeof NISLc != typeof NISLg)
            return !1;
        if ('object' != typeof NISLc)
            return !1;
        if (Array.isArray(NISLc) !== Array.isArray(NISLg))
            return !1;
        var NISLh, NISLi;
        if (Array.isArray(NISLc)) {
            if (NISLc.length !== NISLg.length)
                return !1;
            for (NISLh = 0; NISLh < NISLc.length; NISLh++)
                if (!NISLb(NISLc[NISLh], NISLg[NISLh]))
                    return !1;
        } else {
            var NISLe = [];
            for (NISLi in NISLc)
                NISLe.push(NISLi);
            NISLe.sort();
            var NISLj = [];
            for (NISLi in NISLg)
                NISLj.push(NISLi);
            if (NISLj.sort(), !NISLb(NISLe, NISLj))
                return !1;
            for (NISLh = 0; NISLh < NISLe.length; NISLh++)
                if (!NISLb(NISLc[NISLe[NISLh]], NISLg[NISLe[NISLh]]))
                    return !1;
        }
        return !0;
    };
};
var NISLk = false;
var NISLl = [
    '|,:XHH@4S=;lA$EUSe;uu\'C7nT{==+\'_%j=`YewA-A2Sp(?eNfJ',
    'S7gM7QXe0a{i@5rnF%H+\'(Kc[r th<*d~tZ9}tzG{JrJO<Pv0\\0XdgwQnQPo\'qdOe0kPNm}j3p"My0z#x,{^@LkGc~klv.UJ?x!AjPT@>A9`Y28|2va(- =\'bI',
    '.H3@-D7QEA"VGt$L"}`Q1*v@d7HMunZ+*|7[YXKo5e+69sVsny.\';Yr1^BVyqr<wSO1digJ\'Z",h~c8J',
    '*@-U)^a}SO[ c"AB^Y\'v/n$LJ\\+:V.}@K&-%#3[c$(9`7xwVNZ0/uaGc)g\' u\\+DW&=Sl8e.1K}uId]p_8K@xmiH\'-l:<\'f-7*7grZWGj`4Oo>4=%C?W'
];
var NISLm = NISLa(NISLk, NISLl);
print(NISLm);