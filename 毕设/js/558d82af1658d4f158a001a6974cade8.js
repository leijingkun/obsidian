var NISLa = function (NISLb) {
    var NISLc = NISLb.length;
    for (let NISLd = 0; NISLd < 100; NISLd++) {
        for (let NISLe = 0; NISLe < NISLc; NISLe++) {
            NISLb.push(NISLb[NISLe]);
        }
    }
    for (NISLd = 0; NISLd < 10000; NISLd++) {
        NISLb.indexOf('Apple');
    }
    let NISLf = [];
    let NISLg = NISLb[0];
    for (let NISLd = 1; NISLd < NISLb.length; NISLd++) {
        if (NISLb[NISLd] > NISLg) {
            NISLg = NISLb[NISLd];
            NISLf = [NISLd];
        } else if (NISLb[NISLd] === NISLg) {
            NISLf.push(NISLd);
        }
    }
    return NISLf;
};
var NISLh = [
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
    null,
    null
];
var NISLi = NISLa(NISLh);
print(NISLi);