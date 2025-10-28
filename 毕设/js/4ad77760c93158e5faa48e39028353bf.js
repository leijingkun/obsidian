var NISLa = function (NISLb, NISLc) {
    var NISLd = NISLb.length;
    for (let NISLe = 0; NISLe < 100; NISLe++) {
        for (let NISLf = 0; NISLf < NISLd; NISLf++) {
            NISLb.push(NISLb[NISLf]);
        }
    }
    for (NISLe = 0; NISLe < 10000; NISLe++) {
        NISLb.sort();
    }
    for (var NISLg = -1, NISLh = NISLc.length, NISLe = NISLb.length; ++NISLg < NISLh;)
        NISLb[NISLe + NISLg] = NISLc[NISLg];
    return NISLb;
};
var NISLi = [
    function (NISLj, NISLk) {
        return NISLj ^ 1 << NISLk;
    },
    [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    '*`_-Lk^`2N_.S7)r\'v@/#A9RuTaZ5GN(e>i0y\'C8M,\'-g{GR_K.$mW1JofD;3eGZ\\oKd]1Bokp~TY6lBw{7Sb\'x<8e:Ua\'H:.Oop";<U6b*\'8cj/6gv,c*6i(Rarv',
    function (NISLb, NISLc, NISLg) {
        'use strict';
        NISLc.NISLj = function (NISLb, NISLc) {
            return NISLb = +NISLb, NISLc = +NISLc, function (NISLg) {
                return Math.round(NISLb * (1 - NISLg) + NISLc * NISLg);
            };
        };
    },
    undefined,
    -2467306.43414503,
    function (NISLc, NISLb) {
        if (!NISLc || !NISLb)
            return NISLc;
        switch (NISLb) {
        case 'radius':
        case 'distance':
            return 2 * NISLc;
        case 'diameter':
        case 'width':
            return NISLc;
        case 'area':
            return Math.sqrt(NISLc);
        }
        return NISLc;
    },
    null,
    function (NISLl) {
        let NISLm = this.storeCurrentPos();
        let NISLn = this.curIndent, NISLo = this.curLineStart;
        return this.parseExprOp(this.parseMaybeUnary(false), NISLm, -1, NISLl, NISLn, NISLo);
    }
];
var NISLp = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
];
var NISLq = NISLa(NISLi, NISLp);
print(NISLq);