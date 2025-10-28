var NISLa = function () {
    let NISLb = Array.prototype.slice.call(arguments);
    let NISLc = NISLb.shift();
    NISLb.unshift(NISLc);
    let NISLd = this.NISLd;
    NISLd && NISLd.forEach(NISLe => {
        NISLe.broadcast.apply(NISLe, NISLb);
    });
};
var NISLf = NISLa();
print(NISLf);