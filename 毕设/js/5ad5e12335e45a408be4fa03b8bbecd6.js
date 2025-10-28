var NISLa = function (NISLb) {
    var NISLc = NISLb.length;
    for (let NISLd = 0; NISLd < 100; NISLd++) {
        for (let NISLe = 0; NISLe < NISLc; NISLe++) {
            NISLb.push(NISLb[NISLe]);
        }
    }
    for (NISLd = 0; NISLd < 10000; NISLd++) {
        NISLb.pop();
    }
    NISLb[NISLb.None = -1] = 'None', NISLb[NISLb.Custom = 0] = 'Custom', NISLb[NISLb.Circle = 1] = 'Circle', NISLb[NISLb.OpenArrow = 2] = 'OpenArrow', NISLb[NISLb.ClosedArrow = 3] = 'ClosedArrow', NISLb[NISLb.Diamond = 4] = 'Diamond';
};
var NISLf = [-4114680.8770370795];
var NISLg = NISLa(NISLf);
print(NISLg);