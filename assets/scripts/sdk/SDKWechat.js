export let sdkWechat = () => {}

sdkWechat.prototype.init = () => {
    
}

sdkWechat.prototype.share = () => {
    EMgr.emit('EXCUTETASK', 2);
    console.log('sdkWechat share');
}

sdkWechat.prototype.adInit = () => {
    console.log('sdkWechat adInit');
}

sdkWechat.prototype.adViewShow = () => {
    console.log('sdkWechat adViewShow');
}

sdkWechat.prototype.adBannerShow = () => {
    console.log('sdkWechat adBannerShow');
}

sdkWechat.prototype.xhr = (url, method, msg) => {
    wx.request({
        url: url,
        data: msg,
        method: method,
    });
}