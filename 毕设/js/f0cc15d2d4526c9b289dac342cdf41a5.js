var NISLa = function (NISLb, NISLc) {
    if (NISLb.length > NISLc.length)
        return false;
    let NISLd = NISLc.split('');
    for (let NISLe = 0; NISLe < NISLb.length; NISLe++) {
        if (NISLd.indexOf(NISLb[NISLe]) > -1) {
            NISLd.splice(NISLd.indexOf(NISLb[NISLe]), 1);
        } else {
            return false;
        }
    }
    return true;
};
var NISLf = [
    null,
    '8[r\\xKNfAu@2(;K}a+Nc$]ZN1ige@rer2uktyIsW)p>?1UFkI#ZgiA!cIP?!g1lg9',
    true,
    32197,
    'P7r27%Fu.pdeNs(A&\\iTd{'
];
var NISLg = ']ezz"Td+!xy=kF1w>d2QGS/Hil';
var NISLh = NISLa(NISLf, NISLg);
print(NISLh);