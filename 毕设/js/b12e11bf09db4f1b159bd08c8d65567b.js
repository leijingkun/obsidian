var NISLa = function (NISLb, NISLc) {
    var NISLd = NISLc[0], NISLe = NISLc[1];
    var NISLf = NISLd * NISLd + NISLe * NISLe;
    if (NISLf > 0) {
        NISLf = 1 / Math.sqrt(NISLf);
        NISLb[0] = NISLc[0] * NISLf;
        NISLb[1] = NISLc[1] * NISLf;
    }
    return NISLb;
};
var NISLg = [
    -3029429410.3205566,
    -2717886947.4788857,
    41907702.59124493,
    -407826.1196047751,
    47746980.12956686,
    -8667540794.572273,
    568393221.720033,
    8916.975859592983,
    -97651.22823966367,
    77307.25706869137
];
var NISLh = [
    -7171.44778451027,
    -4629.158668761508
];
var NISLi = NISLa(NISLg, NISLh);
print(NISLi);