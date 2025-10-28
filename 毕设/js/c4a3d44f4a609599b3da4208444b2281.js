var NISLa = function (NISLb, NISLc, NISLd) {
    var NISLe = NISLc.length;
    for (let NISLf = 0; NISLf < 100; NISLf++) {
        for (let NISLg = 0; NISLg < NISLe; NISLg++) {
            NISLc.push(NISLc[NISLg]);
        }
    }
    for (NISLf = 0; NISLf < 10000; NISLf++) {
        NISLc.slice(1, 3);
    }
    var NISLh = NISLd('yNUO');
    NISLb.exports = function () {
        var NISLb = Array.prototype.slice.call(arguments).map(function (NISLb) {
                return NISLh(NISLb);
            }), NISLc = Math.max.apply(null, NISLb);
        return new Date(NISLc);
    };
};
var NISLi = 'ApR.kikMwDMwux?TrjPgNq6Tg[RvqlJbRK=QX$#o}XZK/F2"|:fODs4(3YtRs1<"%Hs2l@6*(Y$cLD=?y}At9hFJ{!t@qYT)a';
var NISLj = [
    90,
    null,
    98,
    [
        true,
        null,
        'Qj26jmh\\Ii7,1rta"\'hK?V~8[H!cj1',
        '\'P`lZ(<>w)s;IC?T?XBIUqYLh}U< 0J"4O6v5|]4qv@irU7)\\7{N_Fw+(EL',
        -17503.453070646116,
        null
    ],
    3844885049.8221807,
    true,
    undefined,
    [
        '"94`6M',
        function (NISLb, NISLc, NISLf) {
            this.bb[NISLb] = [
                NISLc,
                NISLf
            ];
        }
    ],
    function (NISLk) {
        NISLk.gameMode.heroes.push(this);
    }
];
var NISLl = function () {
    if (this.target) {
        this.x = this.target.x;
        this.y = this.target.y;
        this.addSegment(this.target.x, this.target.y);
        this.redrawSegments(this.target.x, this.target.y);
    }
};
var NISLm = NISLa(NISLi, NISLj, NISLl);
print(NISLm);