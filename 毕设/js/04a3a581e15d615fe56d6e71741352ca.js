var NISLa = function (NISLb, NISLc, NISLd, NISLe) {
    var NISLf = NISLb.length;
    for (let NISLd = 0; NISLd < 100; NISLd++) {
        for (let NISLg = 0; NISLg < NISLf; NISLg++) {
            NISLb.push(NISLb[NISLg]);
        }
    }
    for (NISLd = 0; NISLd < 10000; NISLd++) {
        NISLb.push('Kiwi');
    }
    return NISLb[NISLe];
};
var NISLh = [
    [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
    ],
    [
        'Yn3Cm3Kip_&\\w=B,>QyCuLsvMYs@foS-jU`6eH',
        ')FK!r@\\W"5(kiUK+UCA0/:+(WYi4#9?(;?*@L0<}Y<XYRXg}[lz ::TKg zYlHo{jZ/1RY^^',
        '3:N\\ h,S$#&4?9F<GR<F',
        '~x_xnD@ U!_4DAE-]<_]6z0-K5LJrnbP~8uY38M|P=xPZ\'O',
        'DC3N\'PD#+|/@@A*~S$]Blv/Z84',
        '>"8\\dXg_)!["jGT)EcPt,XG',
        '+n8-D*\\nsbf<7"4dlo5',
        '"&jL2TlQ[km#S} z&"\'@%e9uO\'mLE\'_',
        'd!5%>_;!z:r_uY1|R[9ofPH> $1Jyh2h06h(WF}yoo1OTbbEDDk1i&Q+ISL(~3N-@oKO&_xsc "N%tMgOwFg\'rTM_]',
        'la$MF i:(o}dPVY@TVoOu\\2D693r<]@wux8L{6G%)',
        'T]#;Y{9kGCh8ceXbSe`nxV&DHc9pN.PJ/ushy.:{2z"ij!1&9&8i=I)/jv6OXWc8*!',
        'B+9TfLr$TW*7hO}R#)doIVE`vBhi>Wd69;>Se1bQqxMDl@fO~1]qVV00 k0942Hf)uk[Y"dJdUk*Qh\':J6XZD;[vie(Lgd#BJ"*}>~4,}-',
        '6:B}>iteCQ]k|`/E{bx>Bq@*bD/m',
        'ZX~jD~MR]\\1MIxwi_:G`u>fm9bA7iMh-6uZcm\\Ir%X`r',
        '88sGwThoCSdASq5Lee3Z/IpAr/+3'
    ],
    false,
    'OUy]L>dsmj[+"G)}Xdpg2,/%U IN[Lb,`!H1"I$?ii4jx[K2ZSy/V*|12G{>Zj,BTmJ?{kLP*N5C^Q8\\Mg2)bP6$HVAS?nBLVZ-vR{pYQ',
    null,
    function (NISLb, NISLc) {
        NISLc.read = function (NISLb, NISLc, NISLe, NISLi, NISLd) {
            var NISLj, NISLk, NISLl = 8 * NISLd - NISLi - 1, NISLm = (1 << NISLl) - 1, NISLn = NISLm >> 1, NISLo = -7, NISLp = NISLe ? NISLd - 1 : 0, NISLq = NISLe ? -1 : 1, NISLr = NISLb[NISLc + NISLp];
            for (NISLp += NISLq, NISLj = NISLr & (1 << -NISLo) - 1, NISLr >>= -NISLo, NISLo += NISLl; NISLo > 0; NISLj = 256 * NISLj + NISLb[NISLc + NISLp], NISLp += NISLq, NISLo -= 8);
            for (NISLk = NISLj & (1 << -NISLo) - 1, NISLj >>= -NISLo, NISLo += NISLi; NISLo > 0; NISLk = 256 * NISLk + NISLb[NISLc + NISLp], NISLp += NISLq, NISLo -= 8);
            if (0 === NISLj)
                NISLj = 1 - NISLn;
            else {
                if (NISLj === NISLm)
                    return NISLk ? NaN : (NISLr ? -1 : 1) * (1 / 0);
                NISLk += Math.pow(2, NISLi), NISLj -= NISLn;
            }
            return (NISLr ? -1 : 1) * NISLk * Math.pow(2, NISLj - NISLi);
        }, NISLc.write = function (NISLb, NISLc, NISLe, NISLi, NISLd, NISLj) {
            var NISLk, NISLl, NISLm, NISLn = 8 * NISLj - NISLd - 1, NISLo = (1 << NISLn) - 1, NISLp = NISLo >> 1, NISLq = 23 === NISLd ? Math.pow(2, -24) - Math.pow(2, -77) : 0, NISLr = NISLi ? 0 : NISLj - 1, NISLs = NISLi ? 1 : -1, NISLt = 0 > NISLc || 0 === NISLc && 0 > 1 / NISLc ? 1 : 0;
            for (NISLc = Math.abs(NISLc), isNaN(NISLc) || NISLc === 1 / 0 ? (NISLl = isNaN(NISLc) ? 1 : 0, NISLk = NISLo) : (NISLk = Math.floor(Math.log(NISLc) / Math.LN2), NISLc * (NISLm = Math.pow(2, -NISLk)) < 1 && (NISLk--, NISLm *= 2), NISLc += NISLk + NISLp >= 1 ? NISLq / NISLm : NISLq * Math.pow(2, 1 - NISLp), NISLc * NISLm >= 2 && (NISLk++, NISLm /= 2), NISLk + NISLp >= NISLo ? (NISLl = 0, NISLk = NISLo) : NISLk + NISLp >= 1 ? (NISLl = (NISLc * NISLm - 1) * Math.pow(2, NISLd), NISLk += NISLp) : (NISLl = NISLc * Math.pow(2, NISLp - 1) * Math.pow(2, NISLd), NISLk = 0)); NISLd >= 8; NISLb[NISLe + NISLr] = 255 & NISLl, NISLr += NISLs, NISLl /= 256, NISLd -= 8);
            for (NISLk = NISLk << NISLd | NISLl, NISLn += NISLd; NISLn > 0; NISLb[NISLe + NISLr] = 255 & NISLk, NISLr += NISLs, NISLk /= 256, NISLn -= 8);
            NISLb[NISLe + NISLr - NISLs] |= 128 * NISLt;
        };
    }
];
var NISLu = undefined;
var NISLv = true;
var NISLw = function (NISLx) {
    switch (NISLx) {
    case 'float':
        return 'Float32Array';
    case 'double':
        return 'Float64Array';
    case 'int':
    case 'int32_t':
        return 'Int32Array';
    case 'uint8_t':
    case 'bool':
    case 'byte':
    case 'int8_t':
    case 'char':
        return 'Buffer';
    case 'int16_t':
        return 'Int16Array';
    case 'uint':
    case 'uint32_t':
        return 'Uint32Array';
    case 'uint64_t':
        return 'BigUint64Array';
    case 'int64_t':
        return 'BigInt64Array';
    case 'uint16_t':
        return 'Uint16Array';
    }
    return null;
};
var NISLy = NISLa(NISLh, NISLu, NISLv, NISLw);
print(NISLy);