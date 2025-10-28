var NISLa = function (NISLb, NISLc) {
    let NISLd;
    return function () {
        if (NISLd)
            return;
        NISLd = true;
        NISLb();
        setTimeout(() => {
            NISLd = false;
        }, NISLc);
    };
};
var NISLe = function () {
    var NISLf, NISLg = this.xAxis;
    NISLg.getExtremes && (!(NISLf = this.getUnionExtremes(!0)) || NISLf.dataMin === NISLg.min && NISLf.dataMax === NISLg.max || (NISLg.min = NISLf.dataMin, NISLg.max = NISLf.dataMax));
};
var NISLh = -85930635.016042;
var NISLi = NISLa(NISLe, NISLh);
print(NISLi);