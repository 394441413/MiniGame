export let sdkBase = () => {};

sdkBase.prototype.init = () => {
    USER.id = 'test9876543210';
    USER.name = 'test9876543210';
    USER.pic = '';
}

sdkBase.prototype.share = (cb) => {
    EMgr.emit('EXCUTETASK', 2);
    console.log('sdkBase share');
    !!cb && cb();
}

sdkBase.prototype.adInit = () => {
    console.log('sdkBase adInit');
}

sdkBase.prototype.adViewShow = () => {
    console.log('sdkBase adViewShow');
}

sdkBase.prototype.adBannerShow = () => {
    console.log('sdkBase adBannerShow');
}

sdkBase.prototype.xhr = (url, method, msg) => {
    return new Promise((resolve, reject) => {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open(method, url, true);
        // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                console.log('http数据：' + xhr.responseText);
                try {
                    var ret = JSON.parse(xhr.responseText);
                    resolve(ret);
                } catch (e) {
                    reject("err:" + e);
                }
            }
        };
        xhr.send(msg);
    })
}