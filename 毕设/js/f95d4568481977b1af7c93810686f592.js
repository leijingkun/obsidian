var NISLa = function (NISLb, NISLc) {
    for (let NISLd in NISLb)
        if (!(NISLd in NISLc))
            return true;
    for (let NISLd in NISLc)
        if (NISLb[NISLd] !== NISLc[NISLd])
            return true;
    return false;
};
var NISLe = [
    false,
    'gp8v^^E-N@\\zKC- L3Y-W#BQd w{,pNt7~jZMgmq(!q2LJvlen\\6&n!$g(mTI',
    637,
    null,
    'HBGhJJ{;81+Y#6kBH8|"x0\'yPqD2>&N}|))-Q/YY;B#B.K',
    -74354917,
    -6877232
];
var NISLf = [
    true,
    '}YpqbN:pmFb~t*mv\\T0Qb{~4TQ;1,&bdpLeP.88\'+FeS5tnh1vXD$b(-Ilrz_f_+J8o/Cl,wYpptb#%@A/,0?eC2ptO#KEQy84x2,9He!2\\"EvdvFVU){7^<H8nz_',
    undefined
];
var NISLg = NISLa(NISLe, NISLf);
print(NISLg);