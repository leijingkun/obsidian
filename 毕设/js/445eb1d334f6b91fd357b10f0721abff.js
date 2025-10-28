var NISLa = function (NISLb, NISLc, NISLd) {
    if (typeof NISLb === 'function') {
        NISLd = NISLb;
        NISLb = NISLc = null;
    } else if (typeof NISLc === 'function') {
        NISLd = NISLc;
        NISLc = null;
    }
    if (!NISLb) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, NISLd);
    } else {
        var NISLe = this;
        var NISLf = this._currentRequest;
        this.write(NISLb, NISLc, function () {
            NISLe._ended = true;
            NISLf.end(null, null, NISLd);
        });
        this._ending = true;
    }
};
var NISLg = true;
var NISLh = 'XAB QV*^x^UO:zY43(a%EQI)g^k;7';
var NISLi = null;
var NISLj = NISLa(NISLg, NISLh, NISLi);
print(NISLj);