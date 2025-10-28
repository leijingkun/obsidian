var NISLa = function (NISLb) {
    if (0 === NISLb.length)
        return -1 / 0;
    let NISLc = NISLb[0];
    for (let NISLd = 1, NISLe = NISLb.length; NISLd < NISLe; ++NISLd)
        NISLb[NISLd] > NISLc && (NISLc = NISLb[NISLd]);
    return NISLc;
};
var NISLf = [
    undefined,
    null,
    -6789584,
    [
        true,
        false,
        false
    ],
    [
        false,
        false,
        false,
        true,
        true
    ]
];
var NISLg = NISLa(NISLf);
print(NISLg);