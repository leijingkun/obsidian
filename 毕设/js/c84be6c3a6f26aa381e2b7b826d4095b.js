var NISLa = function (type = '') {
    if (!type)
        return 'files drive';
    if (type === 'webterm.sh/cmd-pkg')
        return 'webterm command';
    return type;
};
var NISLb = null;
var NISLc = NISLa(NISLb);
print(NISLc);