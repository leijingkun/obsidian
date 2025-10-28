var NISLa = function (NISLb, NISLc, NISLd) {
    var NISLe = NISLb.length;
    for (let NISLf = 0; NISLf < 100; NISLf++) {
        for (let NISLg = 0; NISLg < NISLe; NISLg++) {
            NISLb.push(NISLb[NISLg]);
        }
    }
    for (NISLf = 0; NISLf < 10000; NISLf++) {
        NISLb.toLocaleString();
    }
    'use strict';
    var NISLh = NISLb('../common').str2arr, NISLf = NISLb('../common').sliceEq, NISLi = NISLb('../common').readUInt16LE, NISLj = NISLh('GIF87a'), NISLk = NISLh('GIF89a');
    NISLc.exports = function (NISLb) {
        if (!(NISLb.length < 10) && (NISLf(NISLb, 0, NISLj) || NISLf(NISLb, 0, NISLk)))
            return {
                width: NISLi(NISLb, 6),
                height: NISLi(NISLb, 8),
                type: 'gif',
                mime: 'image/gif',
                wUnits: 'px',
                hUnits: 'px'
            };
    };
};
var NISLl = [
    true,
    null,
    [
        1000.609713612094,
        46015118.65340691,
        1.050834535151153,
        -1.2706680299561566,
        -9034669.524320176,
        96.85428339886721,
        -78.35300352492594,
        -1.0867407631315462,
        -79215424.3042227,
        747.4929589899409,
        -626652922.6037732,
        -40177974.7776982
    ],
    [
        [
            -1,
            [
                -3091503.8268368784,
                -638029097.7867523
            ],
            null,
            function (NISLm, NISLn) {
                const NISLo = Object.assign({
                    banner: '/*! For detailed credits and licence information see https://github.com/financial-times/polyfill-library */\n',
                    filename: NISLm.defaultFilename
                }, NISLm.NISLo, NISLn);
                if (typeof NISLo.modules === 'string') {
                    NISLo.modules = [NISLo.modules];
                } else if (!Array.isArray(NISLo.modules) || NISLo.modules.length === 0) {
                    throw new Error('[webpack-polyfill-injector] You need to specify the `modules` option!');
                }
                if (typeof NISLo.polyfills === 'string') {
                    NISLo.polyfills = [NISLo.polyfills];
                } else if (!Array.isArray(NISLo.polyfills) || NISLo.polyfills.length === 0) {
                    throw new Error('[webpack-polyfill-injector] You need to specify the `polyfills` option!');
                }
                if (NISLo.polyfills.length === 1) {
                    NISLo.singleFile = true;
                }
                NISLo.polyfills = [].concat(NISLo.polyfills).sort().filter((NISLp, NISLf, NISLi) => NISLf === 0 || NISLp !== NISLi[NISLf - 1]);
                NISLo.excludes = [].concat(NISLo.excludes || []).sort().filter((NISLp, NISLf, NISLi) => NISLf === 0 || NISLp !== NISLi[NISLf - 1]);
                return NISLo;
            }
        ],
        false,
        'zA+6,9`wV"q|xwa+3#ed\':O\'',
        'FFxwu`rQVy.0me[YC\'U6m[MOHwPkQ, L-R_69t^w8.D5`OT[dM-q`M>xux>|Ec.<B\'VRqdDW8U3@@}kOCkR`Aqa3$K4z-/U`UeT=H',
        null,
        -14,
        '4R+4Q7!+bn,vEo@92!q!~g(^6sMbyJ-bD%M_U:(]puS/k).<fY|#YzElGTEiAXL6<87\'bui\'nrO"!TGF z}-Jbt(4/1*frz5Otgc[9',
        88914316.29409753
    ],
    null,
    [
        function (NISLq) {
            setTimeout(NISLq, this.interval);
            this.interval = this.nextInterval_();
        },
        function (NISLr) {
            NISLr.style.color = '#000000';
        },
        function (NISLs, NISLt) {
            if (NISLt.coerceNumber)
                NISLs = +NISLs;
            var NISLu = NISLt.NISLu;
            for (var NISLf = 0; NISLf < NISLu.length; NISLf++) {
                var NISLv = String(NISLu[NISLf]);
                if (NISLv.charAt(0) === '/' && NISLv.charAt(NISLv.length - 1) === '/') {
                    var NISLw = new RegExp(NISLv.substr(1, NISLv.length - 2));
                    if (NISLw.test(NISLs))
                        return true;
                } else if (NISLs === NISLu[NISLf])
                    return true;
            }
            return false;
        }
    ],
    -544084486,
    -1.3171313833056073,
    [
        659343279.3081079,
        -3783093.8131403057,
        [
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
        ]
    ]
];
var NISLx = true;
var NISLy = null;
var NISLz = NISLa(NISLl, NISLx, NISLy);
print(NISLz);