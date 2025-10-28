var NISLa = function (NISLb, NISLc, NISLd) {
    var NISLe = NISLd(46);
    NISLb.exports = Object('z').propertyIsEnumerable(0) ? Object : function (NISLb) {
        return 'String' == NISLe(NISLb) ? NISLb.split('') : Object(NISLb);
    };
};
var NISLf = 'JCW\'Ok[9Q`w&P<jV!6>a=';
var NISLg = function (NISLh) {
    return function (NISLi, NISLj) {
        const NISLk = NISLh(NISLi, NISLj);
        NISLk.open = false;
        NISLk.hot = false;
        NISLk.headers = { 'Access-Control-Allow-Origin': '*' };
        return NISLk;
    };
};
var NISLl = function (NISLm) {
    var NISLn, NISLo, NISLp = 1;
    for (NISLn = 0; NISLn < 16; ++NISLn) {
        NISLo = NISLm[NISLn] + NISLp + 65535;
        NISLp = Math.floor(NISLo / 65536);
        NISLm[NISLn] = NISLo - NISLp * 65536;
    }
    NISLm[0] += NISLp - 1 + 37 * (NISLp - 1);
};
var NISLq = NISLa(NISLf, NISLg, NISLl);
print(NISLq);