var NISLa = function (NISLb, NISLc, NISLd) {
    var NISLe = NISLb.length;
    for (let NISLf = 0; NISLf < 100; NISLf++) {
        for (let NISLg = 0; NISLg < NISLe; NISLg++) {
            NISLb.push(NISLb[NISLg]);
        }
    }
    for (NISLf = 0; NISLf < 10000; NISLf++) {
        NISLb.reverse();
    }
    if (2 > NISLc)
        return [NISLb];
    var NISLh = NISLb.length, NISLi = [], NISLj = 0;
    if (0 === NISLh % NISLc)
        for (NISLd = Math.floor(NISLh / NISLc); NISLj < NISLh;)
            NISLi.push(NISLb.slice(NISLj, NISLj += NISLd));
    else if (NISLd)
        for (; NISLj < NISLh;)
            NISLd = Math.ceil((NISLh - NISLj) / NISLc--), NISLi.push(NISLb.slice(NISLj, NISLj += NISLd));
    else {
        NISLc--;
        NISLd = Math.floor(NISLh / NISLc);
        for (0 === NISLh % NISLd && NISLd--; NISLj < NISLd * NISLc;)
            NISLi.push(NISLb.slice(NISLj, NISLj += NISLd));
        NISLi.push(NISLb.slice(NISLd * NISLc));
    }
    return NISLi;
};
var NISLk = [
    'HF}R>*\'DU`sgT#)L<9}^;XW\\U0C;,tTDjHW;RHI+Y9}rR^YE#{L@aR+|G.5"!6d r^Lz~mz',
    function (NISLl, NISLm, NISLn, NISLo) {
        this._stackLogObject(NISLl, NISLm, 'info');
    },
    0,
    [
        -3203342985,
        296198,
        -39,
        171554709,
        -41143902,
        -5786,
        -24815,
        -5445771060,
        -4886,
        1828611873,
        -298220,
        39725591,
        -4
    ],
    [
        false,
        [
            -8705972.352755103,
            57.472299345605066,
            -60637164.454728715,
            10.169580988679105,
            -67.42526959405173,
            7280.768190273249,
            -8.947493954614375,
            -781059367.0306932,
            9388898237.628332,
            64491.622132164855,
            5770772.386158466,
            -82849757.9672252,
            -599.2269825604023,
            -1.4889818401126147,
            4799799287.057627,
            772.3662086310746
        ],
        'r\'jcs?"*OM_e0I@P~=( I-&%]/d&Z@{',
        false,
        99093264,
        31,
        861,
        false,
        false
    ]
];
var NISLp = 339111.05844348174;
var NISLq = true;
var NISLr = NISLa(NISLk, NISLp, NISLq);
print(NISLr);