var NISLa = function () {
    var NISLb = this.toString().match(/^\s*function\s*(\S*)\s*\(/);
    var NISLc = NISLb && NISLb.length > 1 ? NISLb[1] : '';
    Object.defineProperty(this, 'name', { value: NISLc });
    return NISLc;
};
var NISLd = NISLa();
print(NISLd);