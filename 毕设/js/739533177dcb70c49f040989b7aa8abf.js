var NISLa = function (NISLb) {
    let NISLc = 0;
    let NISLd = [];
    for (let NISLe = 0; NISLe < NISLb.length; ++NISLe) {
        for (let NISLf = 0, NISLg = 0; NISLf < NISLb.length && NISLf + NISLe + 1 < NISLb.length; ++NISLf) {
            if (NISLb[NISLf] === NISLb[NISLf + NISLe + 1])
                ++NISLg;
            else
                NISLg = 0;
            if (NISLg > NISLc) {
                NISLc = NISLg;
                NISLd = [NISLb.substring(NISLf - NISLg + 1, NISLf + 1)];
            } else if (NISLc && NISLg === NISLc) {
                NISLd.push(NISLb.substring(NISLf - NISLg + 1, NISLf + 1));
            }
        }
    }
    return NISLd;
};
var NISLh = 'Bhxt9in0)}S,NzV6w2LkG2qRQ|@=*2Ai(\\iU>';
var NISLi = NISLa(NISLh);
print(NISLi);