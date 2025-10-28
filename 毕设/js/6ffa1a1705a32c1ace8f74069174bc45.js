var NISLa = function (NISLb) {
    let NISLc = [];
    if (Array.isArray(NISLb)) {
        for (let NISLd of NISLb) {
            NISLd = NISLd.split('@')[0];
            if (NISLd !== '')
                NISLc.push(`${ NISLd }@g.us`);
        }
    } else {
        let NISLe = NISLb.split(/\s*[,;]\s*/g);
        for (let NISLd of NISLe) {
            NISLd = NISLd.split('@')[0];
            if (NISLd !== '')
                NISLc.push(`${ NISLd }@g.us`);
        }
    }
    return NISLc;
};
var NISLf = '8oxR`/$JJ^j`p`60vc8wN';
var NISLg = NISLa(NISLf);
print(NISLg);