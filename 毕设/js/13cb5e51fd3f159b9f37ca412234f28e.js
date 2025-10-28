var NISLa = function (NISLb, NISLc, NISLd, NISLe) {
    if (!NISLb || !NISLc) {
        return NISLb;
    }
    return NISLb.map(NISLf => {
        const NISLg = NISLe.get(NISLf);
        if (NISLg)
            return NISLg;
        const {type, value, loc} = NISLf;
        const NISLh = {
            type: type,
            value: value,
            loc: loc
        };
        if (NISLd) {
            NISLh.loc = null;
        }
        NISLe.set(NISLf, NISLh);
        return NISLh;
    });
};
var NISLi = false;
var NISLj = true;
var NISLk = undefined;
var NISLl = '%_!&&fCZ.@';
var NISLm = NISLa(NISLi, NISLj, NISLk, NISLl);
print(NISLm);