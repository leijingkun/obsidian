var NISLa = function (NISLb) {
    var NISLc = NISLb['Promise'], NISLd = NISLc && 'resolve' in NISLc && 'reject' in NISLc && 'all' in NISLc && 'race' in NISLc && function () {
            var NISLe;
            new NISLc(function (NISLc) {
                NISLe = NISLc;
            });
            return typeof NISLe === 'function';
        }();
    if (NISLd)
        return;
    var NISLf = 'pending', NISLg = 'sealed', NISLh = 'fulfilled', NISLi = 'rejected', NISLj = function () {
        };
    function NISLk(NISLe) {
        return Object.prototype.toString.call(NISLe) === '[object Array]';
    }
    var NISLl = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout, NISLm = [], NISLn;
    function NISLo() {
        for (var NISLe = 0; NISLe < NISLm.length; NISLe++)
            NISLm[NISLe][0](NISLm[NISLe][1]);
        NISLm = [];
        NISLn = false;
    }
    function NISLp(NISLe, NISLc) {
        NISLm.push([
            NISLe,
            NISLc
        ]);
        if (!NISLn) {
            NISLn = true;
            NISLl(NISLo, 0);
        }
    }
    function NISLq(NISLn, NISLc) {
        function NISLh(NISLe) {
            NISLu(NISLc, NISLe);
        }
        function NISLe(NISLe) {
            NISLt(NISLc, NISLe);
        }
        try {
            NISLn(NISLh, NISLe);
        } catch (NISLm) {
            NISLe(NISLm);
        }
    }
    function NISLr(NISLn) {
        var NISLf = NISLn.owner, NISLm = NISLf.state_, NISLe = NISLf.data_, NISLp = NISLn[NISLm], NISLc = NISLn.then;
        if (typeof NISLp === 'function') {
            NISLm = NISLh;
            try {
                NISLe = NISLp(NISLe);
            } catch (NISLr) {
                NISLt(NISLc, NISLr);
            }
        }
        if (!NISLs(NISLc, NISLe)) {
            NISLm === NISLh && NISLu(NISLc, NISLe);
            NISLm === NISLi && NISLt(NISLc, NISLe);
        }
    }
    function NISLs(NISLm, NISLe) {
        var NISLc;
        try {
            if (NISLm === NISLe)
                throw new TypeError('A promises callback cannot return that same promise.');
            if (NISLe && (typeof NISLe === 'function' || typeof NISLe === 'object')) {
                var NISLh = NISLe.then;
                if (typeof NISLh === 'function') {
                    NISLh.call(NISLe, function (NISLt) {
                        if (!NISLc) {
                            NISLc = true;
                            if (NISLe !== NISLt)
                                NISLu(NISLm, NISLt);
                            else
                                NISLv(NISLm, NISLt);
                        }
                    }, function (NISLe) {
                        if (!NISLc) {
                            NISLc = true;
                            NISLt(NISLm, NISLe);
                        }
                    });
                    return true;
                }
            }
        } catch (NISLn) {
            !NISLc && NISLt(NISLm, NISLn);
            return true;
        }
        return false;
    }
    function NISLu(NISLe, NISLc) {
        (NISLe === NISLc || !NISLs(NISLe, NISLc)) && NISLv(NISLe, NISLc);
    }
    function NISLv(NISLe, NISLc) {
        if (NISLe.state_ === NISLf) {
            NISLe.state_ = NISLg;
            NISLe.data_ = NISLc;
            NISLp(NISLx, NISLe);
        }
    }
    function NISLt(NISLe, NISLc) {
        if (NISLe.state_ === NISLf) {
            NISLe.state_ = NISLg;
            NISLe.data_ = NISLc;
            NISLp(NISLy, NISLe);
        }
    }
    function NISLw(NISLm) {
        var NISLc = NISLm.then_;
        NISLm.then_ = undefined;
        for (var NISLe = 0; NISLe < NISLc.length; NISLe++)
            NISLr(NISLc[NISLe]);
    }
    function NISLx(NISLe) {
        NISLe.state_ = NISLh;
        NISLw(NISLe);
    }
    function NISLy(NISLe) {
        NISLe.state_ = NISLi;
        NISLw(NISLe);
    }
    var NISLe = function (NISLc) {
        if (typeof NISLc !== 'function')
            throw new TypeError('Promise constructor takes a function argument');
        if (this instanceof NISLe === false)
            throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
        this.then_ = [];
        NISLq(NISLc, this);
    };
    NISLe.prototype = {
        constructor: NISLe,
        state_: NISLf,
        then_: null,
        data_: undefined,
        then: function (NISLc, NISLm) {
            var NISLe = {
                owner: this,
                then: new this.constructor(NISLj),
                fulfilled: NISLc,
                rejected: NISLm
            };
            if (this.state_ === NISLh || this.state_ === NISLi)
                NISLp(NISLr, NISLe);
            else
                this.then_.push(NISLe);
            return NISLe.then;
        },
        catch: function (NISLe) {
            return this.then(null, NISLe);
        }
    };
    NISLe.all = function (NISLe) {
        var NISLc = this;
        if (!NISLk(NISLe))
            throw new TypeError('You must pass an array to Promise.all().');
        return new NISLc(function (NISLn, NISLi) {
            var NISLt = [], NISLh = 0;
            function NISLp(NISLe) {
                NISLh++;
                return function (NISLc) {
                    NISLt[NISLe] = NISLc;
                    !--NISLh && NISLn(NISLt);
                };
            }
            for (var NISLm = 0, NISLc; NISLm < NISLe.length; NISLm++) {
                NISLc = NISLe[NISLm];
                if (NISLc && typeof NISLc.then === 'function')
                    NISLc.then(NISLp(NISLm), NISLi);
                else
                    NISLt[NISLm] = NISLc;
            }
            !NISLh && NISLn(NISLt);
        });
    };
    NISLe.race = function (NISLe) {
        var NISLc = this;
        if (!NISLk(NISLe))
            throw new TypeError('You must pass an array to Promise.race().');
        return new NISLc(function (NISLt, NISLh) {
            for (var NISLm = 0, NISLc; NISLm < NISLe.length; NISLm++) {
                NISLc = NISLe[NISLm];
                if (NISLc && typeof NISLc.then === 'function')
                    NISLc.then(NISLt, NISLh);
                else
                    NISLt(NISLc);
            }
        });
    };
    NISLe.resolve = function (NISLe) {
        var NISLc = this;
        if (NISLe && typeof NISLe === 'object' && NISLe.constructor === NISLc)
            return NISLe;
        return new NISLc(function (NISLc) {
            NISLc(NISLe);
        });
    };
    NISLe.reject = function (NISLe) {
        var NISLc = this;
        return new NISLc(function (NISLm, NISLc) {
            NISLc(NISLe);
        });
    };
    NISLb['Promise'] = NISLe;
};
var NISLz = [
    29157247.66245834,
    [7011137138],
    '"EZjl+ wQQM#8Un%~[',
    2478076457.2012696,
    null,
    [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    null,
    function (NISLh, NISLf, NISLd) {
        NISLf.exports = function (NISLh, NISLf) {
            return {
                enumerable: !(1 & NISLh),
                configurable: !(2 & NISLh),
                writable: !(4 & NISLh),
                value: NISLf
            };
        };
    }
];
var NISLza = NISLa(NISLz);
print(NISLza);