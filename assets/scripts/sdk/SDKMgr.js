import {sdkBase} from './SDKBase'
import {sdkFb} from './SDKFacebook';
import {sdkWechat} from'./SDKWechat'

(() => {
    if (typeof (window) != "undefined") {
        window.SDK = Object.create(sdkBase.prototype);
        if (PLATFORM === PLATFORMTYPE.WECHAT) {
            SDK = Object.create(sdkWechat.prototype);
        } else if (PLATFORM === PLATFORMTYPE.FACEBOOK) {
            SDK = Object.create(sdkFb.prototype);
        }
    }
})();