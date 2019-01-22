/*
    该文件用于定义全局变量以及数据引用。
    1.全局文件定义方式:
        window.XXX = xxx;   全局变量名大写
    2.数据引用:
        import {xxxx} from './data/xxxxx';
        window.STATICDATA = {     使用时通过 STATICDATA.XXX 调用;
            XXX:xxxx,
        }
    3.已使用的全局变量(需要注意部分插件全局名未修改):
        EMgr:全局事件系统
        Utils:插件管理 小功能集成,
        SDK:wechat facebook接入（统一系统）,
*/
import {audioData} from './data/audioData';


window.PLATFORMTYPE = cc.Enum({
    WECHAT: 1,
    FACEBOOK: 2,
    OTHER: 3
})

window.PLATFORM = PLATFORMTYPE.OTHER;
window.ALTAS = {};
window.STATICDATA = {
    AUDIODATA: audioData,
}

window.GAMEDATA = {

}

window.NETDATA = {
    url: 'https://nnjxht.aurorajoy.com',
    token: '',
    enterData: {},
}

window.USER = {
    id: '',
    name: '',
    icon: '',
}