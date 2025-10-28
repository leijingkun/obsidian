var NISLa = function (NISLb) {
    let NISLc = NISLb.length, NISLd, NISLe;
    while (0 !== NISLc) {
        NISLe = Math.floor(Math.random() * NISLc);
        NISLc -= 1;
        NISLd = NISLb[NISLc];
        NISLb[NISLc] = NISLb[NISLe];
        NISLb[NISLe] = NISLd;
    }
    return NISLb;
};
var NISLf = [
    null,
    null,
    null,
    null,
    null,
    null,
    null
];
var NISLg = NISLa(NISLf);
print(NISLg);