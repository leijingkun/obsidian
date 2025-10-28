var NISLa = function (NISLb) {
    var NISLc = NISLb;
    if (Buffer.isBuffer(NISLc)) {
        if (NISLc[0] > 127 && NISLc[1] === undefined) {
            NISLc[0] -= 128;
            NISLc = '\x1B' + NISLc.toString('utf-8');
        } else {
            NISLc = NISLc.toString('utf-8');
        }
    }
    return NISLb[0] === 27 && NISLb[1] === 91 && NISLb[2] === 77 || /^\x1b\[M([\x00\u0020-\uffff]{3})/.test(NISLc) || /^\x1b\[(\d+;\d+;\d+)M/.test(NISLc) || /^\x1b\[<(\d+;\d+;\d+)([mM])/.test(NISLc) || /^\x1b\[<(\d+;\d+;\d+;\d+)&w/.test(NISLc) || /^\x1b\[24([0135])~\[(\d+),(\d+)\]\r/.test(NISLc) || /^\x1b\[(O|I)/.test(NISLc);
};
var NISLd = [
    null,
    'BLJk)\'!h@ 8/[Y\\{/X:|!n"L7[Kk;6$})[9]5v,t&oZI6=fz>Q4qG*K8mW,L,zF5#?mr.=5K>5/&c"?F\\Tg:C6u2^Pp?2R/gQQ*lG$+C\\h',
    undefined,
    [
        true,
        false,
        true
    ],
    2786410211,
    undefined
];
var NISLe = NISLa(NISLd);
print(NISLe);