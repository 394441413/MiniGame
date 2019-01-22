(() => {
    let utils = () => { };


    //数字开头填充0
    utils.prototype.padStart = (num, n) => {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num;
    }

    //固定种子重复随机算法 
    utils.prototype.getRandomBySeedRe = (seed, num, minN, maxN) => {
        let seededRandom = function (max, min) {
            max = max || 1;
            min = min || 0;
            seed = (seed * 9301 + 49297) % 233280;
            var rnd = seed / 233280.0;
            return Math.floor(min + rnd * (max - min));
        }

        let list = [];
        while (list.length < num) {
            list.push(seededRandom(maxN, minN));
        }
        return list;
    };

    //固定种子不重复随机算法 
    utils.prototype.getRandomBySeed = (seed, num, minN, maxN) => {
        let seededRandom = function (max, min) {
            max = max || 1;
            min = min || 0;
            seed = (seed * 9301 + 49297) % 233280;
            var rnd = seed / 233280.0;
            return Math.floor(min + rnd * (max - min));
        }

        var list = new Set();
        while (list.size < num) {
            list.add(seededRandom(maxN, minN));
        }
        return [...list];
    };

    //带权重随机
    utils.prototype.RandomWithWeight = weightList => {
        if (weightList.length == 1) {
            return 0;
        }
        var total = 0;
        weightList.forEach(i => {
            total += i;
        });
        var r = this.getRandomInteger(1, total);
        var i = 0;
        var temp = 0;
        while (temp < total) {
            temp += weightList[i];
            if (r <= temp) {
                return i;
            }
            ++i;
        }
        return weightList.length - 1;
    }

    //获取是一年的第几周
    utils.prototype.getWeekOfYear = () => {
        var today = new Date();
        var firstDay = new Date(today.getFullYear(), 0, 1);
        var dayOfWeek = firstDay.getDay();
        var spendDay = 1;
        if (dayOfWeek != 0) {
            spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
        var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
        var result = Math.ceil(d / 7);
        return result + 1;
    };

    //金币转化为100，000  
    utils.prototype.formatMoney = (s, type) => {
        if (/[^0-9\.]/.test(s))
            return "0.00";
        if (s == null || s == "null" || s == "")
            return "0.00";
        s = s.toString().replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        if (type == 0) {
            var a = s.split(".");
            if (a[1] == "00") {
                s = a[0];
            }
        }
        return s;
    };

    //金币转化为 10,000P
    utils.prototype.covertMoney = s => {
        let value = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'B', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz'];
        s = Utils.formatMoney(s, 0);
        let m = (s.match(/,/g) || []).length;
        let n = s.indexOf(','); //-1
        if (m >= 0 && n >= 0) {
            return s.slice(0, n + 4) + value[m - 1];
        } else {
            return s;
        }
    }

    utils.prototype.random = (min, max) => {
        return parseInt(Math.random() * (max - min + 1) + min, 10);
    }

    utils.prototype.playMusic = (name, loop, cb) => {
        cc.loader.loadRes(STATICDATA.AUDIODATA[name], cc.AudioClip, function (err, clip) {
            let id = cc.audioEngine.play(clip, loop, 1);
            if (!!cb) {
                cc.audioEngine.setFinishCallback(id, cb);
            }
        });
    }

    //返回当前到秒的时间戳
    utils.prototype.getTime = () => {
        return parseInt(new Date().getTime() / 1000);
    }

    //返回当前天数时间戳  
    utils.prototype.getDay = () => {
        return parseInt(parseInt(new Date().getTime() / 1000) / 86400);
    }

    //返回00：00形式
    utils.prototype.getTimeFormate = t => {
        let a = parseInt(t / 3600, 10);
        let b = parseInt(t % 3600 / 60, 10);
        let c = parseInt(t % 60, 10);
        return !!a ? `${Utils.padStart(a, 2)}:${Utils.padStart(b, 2)}:${Utils.padStart(c, 2)}` : `${Utils.padStart(b, 2)}:${Utils.padStart(c, 2)}`;
    }

    if (typeof (window) != "undefined") {
        window.Utils = Object.create(utils.prototype);
    }
})();