var NISLa = function (NISLb, NISLc) {
    const NISLd = Math.sin(NISLc), NISLe = Math.cos(NISLc);
    return NISLb[0] = NISLe, NISLb[1] = NISLd, NISLb[2] = 0, NISLb[3] = -NISLd, NISLb[4] = NISLe, NISLb[5] = 0, NISLb[6] = 0, NISLb[7] = 0, NISLb[8] = 1, NISLb;
};
var NISLf = [
    [
        function (NISLg, NISLh, NISLi) {
            const NISLj = parseFloat(NISLg.getAttribute(NISLh));
            return !isNaN(NISLj) ? NISLj : NISLi;
        },
        [
            false,
            true
        ],
        true,
        null,
        true,
        87.32055227389216,
        'jq=9?.LgoG%s*,7>*r=dfxlW_M^HF3K&sECj(W$4/\'<z+D.\'Cv7bVe);9KzW.b><QLR#?Hq}4@VOA#]@P;$*&k(b9#FYDXSowU.+pdFcH9K0gq GsDLFv5u',
        [
            function (NISLk, NISLl) {
                if (!NISLl) {
                    NISLl = NISLk;
                    NISLk = NISLl.NISLk;
                }
                if (!NISLk)
                    throw new Error('authentication strategies must have a name');
                this._strategies[NISLk] = NISLl;
                return this;
            },
            null,
            [undefined],
            true,
            null,
            -6060364,
            251715300,
            function (NISLm, NISLn) {
                if (NISLm !== NISLn) {
                    this.setData({ tempSpecList: this.getTempSpecList(NISLm, this.data.selectedValueIds) });
                }
            }
        ],
        undefined
    ],
    function () {
        return this.data;
    }
];
var NISLo = function (NISLp) {
    return this.command({
        command: 'stats-job ' + NISLp + '\r\n',
        expected: [
            'OK',
            'NOT_FOUND'
        ],
        is_yaml: 1
    });
};
var NISLq = NISLa(NISLf, NISLo);
print(NISLq);