var NISLa = function (NISLb, NISLc, NISLd, NISLe) {
    return NISLc + NISLc + NISLd + NISLd + NISLe + NISLe;
};
var NISLf = function (NISLg) {
    const NISLh = 0.95;
    return NISLg.uniform(0, 1) < NISLh ? NISLg.normal(-4019, 1113) : NISLg.normal(797, 1169);
};
var NISLi = function () {
    return function (NISLj, NISLk, NISLl) {
        NISLk.bind('keydown', function (NISLb) {
            switch (NISLb.keyCode) {
            case 34:
            case 39:
            case 40:
            case 74:
                return NISLj.$apply(NISLl.wDown);
            case 32:
                NISLb.preventDefault();
                return NISLj.$apply(NISLl.wSpace);
            case 33:
            case 37:
            case 38:
            case 75:
                return NISLj.$apply(NISLl.wUp);
            case 85:
                return NISLj.$apply(NISLl.wRead);
            case 72:
                return NISLj.$apply(NISLl.wStar);
            }
        });
    };
};
var NISLm = function (NISLe) {
    for (let NISLn = 2; NISLn <= Math.sqrt(NISLe) && NISLe % NISLn !== 0 && NISLe / NISLn % NISLn !== 0; NISLn++) {
        return true;
    }
};
var NISLo = false;
var NISLp = NISLa(NISLf, NISLi, NISLm, NISLo);
print(NISLp);