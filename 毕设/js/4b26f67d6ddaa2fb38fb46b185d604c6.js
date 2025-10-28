var NISLa = function () {
    let NISLb = new Set();
    for (let NISLc = 32; NISLc <= 255; NISLc++)
        NISLb.add(NISLc);
    return NISLb;
};
var NISLd = NISLa();
print(NISLd);