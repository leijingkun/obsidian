var NISLa = function (NISLb) {
    return Array(NISLb).fill().map(() => [
        0,
        0
    ]);
};
var NISLc = [function (NISLd, NISLe, NISLf) {
        'use strict';
        var NISLg = NISLf(514);
        NISLe.__esModule = !0, NISLe.default = function (NISLd, NISLe) {
            NISLd.classList ? NISLd.classList.add(NISLe) : (0, NISLh.default)(NISLd, NISLe) || ('string' === typeof NISLd.className ? NISLd.className = NISLd.className + ' ' + NISLe : NISLd.setAttribute('class', (NISLd.className && NISLd.className.baseVal || '') + ' ' + NISLe));
        };
        var NISLh = NISLg(NISLf(515));
        NISLd.exports = NISLe.default;
    }];
var NISLi = NISLa(NISLc);
print(NISLi);