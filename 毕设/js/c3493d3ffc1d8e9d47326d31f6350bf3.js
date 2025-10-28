var NISLFuzzingFunc = function (s) {
    s.reverse();
    const reverse = (i, j) => {
        while (i < j) {
            const tmp = s[i];
            s[i] = s[j];
            s[j] = tmp;
            i += 1;
            j -= 1;
        }
    };
    let i = 0;
    let j = 0;
    while (j < s.length) {
        if (j + 1 === s.length || s[j + 1] === ' ') {
            reverse(i, j);
            i = j + 1;
        } else if (s[j] === ' ') {
            i = j + 1;
        }
        j += 1;
    }
};
var NISLParameter0 = [
    93723599.31093056,
    -260054.21344229515,
    66042418.36655234
];
var NISLCallingResult = NISLFuzzingFunc(NISLParameter0);
print(NISLCallingResult);