var NISLa = function (NISLb, NISLc, NISLd) {
    var NISLe = NISLc[0], NISLf = NISLc[1], NISLg = NISLc[2], NISLh = NISLc[3], NISLi = NISLc[4], NISLj = NISLc[5];
    var NISLk = NISLd[0], NISLl = NISLd[1], NISLm = NISLd[2], NISLn = NISLd[3], NISLo = NISLd[4], NISLp = NISLd[5];
    NISLb[0] = NISLe * NISLk + NISLg * NISLl;
    NISLb[1] = NISLf * NISLk + NISLh * NISLl;
    NISLb[2] = NISLe * NISLm + NISLg * NISLn;
    NISLb[3] = NISLf * NISLm + NISLh * NISLn;
    NISLb[4] = NISLe * NISLo + NISLg * NISLp + NISLi;
    NISLb[5] = NISLf * NISLo + NISLh * NISLp + NISLj;
    return NISLb;
};
var NISLq = [
    4354871413,
    908031327.131792,
    [
        -177.71174236976563,
        -251.08620331180387,
        -1887.0030833079259,
        -1.1808786763830084
    ]
];
var NISLr = [
    function () {
        return this.currentCell ? this.currentCell.getComponent() : false;
    },
    -743
];
var NISLs = [
    function () {
        this.table_index_check_error = this.table_index_check();
        setTimeout(() => {
            this.$refs.table_index_check_tooltip && this.$refs.table_index_check_tooltip.show();
        }, 100);
    },
    undefined,
    function (NISLt, NISLu) {
        if (NISLt == null)
            return 0;
        var NISLv = Math.pow(10, isFinite(NISLu) ? NISLu : 0);
        return Math.round(NISLt * NISLv) / NISLv;
    },
    9420986.626492264,
    8,
    '3J$OD7+%P7"^6ON{hM[yQpKl0X6[[yM];',
    -557,
    function (NISLw) {
        for (var NISLx = this._controls.length - 1; NISLx >= 0; NISLx--)
            if (this._controls[NISLx].elmt == NISLw)
                return NISLx;
        return -1;
    },
    7968154868.614223
];
var NISLy = NISLa(NISLq, NISLr, NISLs);
print(NISLy);