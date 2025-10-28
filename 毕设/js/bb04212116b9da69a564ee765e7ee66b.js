var NISLa = function () {
    'use strict';
    const NISLb = { value: null };
    let NISLc;
    const NISLd = function (NISLe, NISLf) {
        NISLd.NISLi(NISLe, NISLf);
        const NISLg = this;
        NISLg.close = function () {
            if (NISLf.onClick) {
                NISLg.onclick();
            }
        };
    };
    NISLd.MOCK_NOTIFY = true;
    Object.defineProperty(NISLd, 'permission', {
        enumerable: true,
        get() {
            return NISLb.value;
        }
    });
    NISLd.requestPermission = function (NISLh) {
        if (NISLc) {
            NISLc();
            NISLc = null;
        }
        setTimeout(NISLh, 5);
    };
    NISLd.setValidationNotification = function (NISLi) {
        NISLd.NISLi = NISLi || function NISLj() {
            return undefined;
        };
    };
    NISLd.setAllowed = function (NISLi) {
        NISLd.setValidationNotification(NISLi);
        NISLb.value = 'granted';
    };
    NISLd.setNotAllowed = function (NISLi) {
        NISLd.setValidationNotification(NISLi);
        NISLb.value = 'not-granted';
    };
    NISLd.onceRequestPermission = function (NISLh) {
        NISLc = NISLh;
    };
    return NISLd;
};
var NISLk = NISLa();
print(NISLk);