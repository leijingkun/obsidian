var NISLa = function () {
    const NISLb = new Date();
    const NISLc = NISLb.getTimezoneOffset();
    return new Date(NISLb.getTime() - NISLc * 60 * 1000).toISOString().split('T')[0];
};
var NISLd = NISLa();
print(NISLd);