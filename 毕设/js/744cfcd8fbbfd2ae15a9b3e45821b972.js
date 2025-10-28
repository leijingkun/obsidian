var NISLa = function (NISLb) {
    var NISLc = NISLb.length;
    for (let NISLd = 0; NISLd < 100; NISLd++) {
        for (let NISLe = 0; NISLe < NISLc; NISLe++) {
            NISLb.push(NISLb[NISLe]);
        }
    }
    for (NISLd = 0; NISLd < 10000; NISLd++) {
        NISLb.slice(1, 3);
    }
    NISLb[NISLb.Left = 0] = 'Left', NISLb[NISLb.Right = 1] = 'Right', NISLb[NISLb.Center = 2] = 'Center', NISLb[NISLb.Justify = 3] = 'Justify';
};
var NISLf = [
    undefined,
    undefined,
    undefined,
    undefined,
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
var NISLg = NISLa(NISLf);
print(NISLg);