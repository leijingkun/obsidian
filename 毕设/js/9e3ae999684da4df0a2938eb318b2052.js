var NISLa = function (NISLb, NISLc) {
    var NISLd = NISLc.length;
    for (let NISLe = 0; NISLe < 100; NISLe++) {
        for (let NISLf = 0; NISLf < NISLd; NISLf++) {
            NISLc.push(NISLc[NISLf]);
        }
    }
    for (NISLe = 0; NISLe < 10000; NISLe++) {
        NISLc.map(Math.sqrt);
    }
    var NISLg = false;
    if (Object.keys(NISLb).length !== Object.keys(NISLc).length) {
        NISLg = true;
    } else {
        Object.keys(NISLb).forEach(function (NISLh) {
            if (!this.isSame(NISLb[NISLh], NISLc[NISLh])) {
                NISLg = true;
            }
        }, this);
    }
    return NISLg;
};
var NISLi = [
    false,
    false
];
var NISLj = [
    'r?H&9QyZG;#P#<^ULY%+aOt7Fe6HD60;N(EL}#^;19f6:]]%*Qx@b|^]Ckg,XV$mhx+2j1vv$aSC&my}xbNfcCg*l&&f??3;*H*Xf50D!ku\'a/I X',
    -527783,
    -4865313,
    -1.207711801573121,
    'n=_\'PGyN<NK+6HB}fj` ?{*',
    true,
    [' sw4#Bp,QX3;hbC|;^SxCScM.Ft2-Xvzn5+e2h~oH}10yblR0<}Px[F9iYX//k gP/Z2es>Zj*%k.&GtSHm|WYaFZ'],
    'wMh}{~)YX<[,p={q$go',
    true,
    '>\\O~.4VQ;6Ldk6y,r>JI$Qi\'?dtAsrj)_)"aJ=i_u8LA-YTX'
];
var NISLk = NISLa(NISLi, NISLj);
print(NISLk);