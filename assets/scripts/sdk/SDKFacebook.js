export let sdkFb = () => {}

sdkFb.prototype.init = () => {
    USER.id = FBInstant.player.getID();
    USER.name = FBInstant.player.getName();
    USER.pic = FBInstant.player.getPhoto();
    console.log(JSON.stringify(USER));
}

sdkFb.prototype.share = (cb, tp) => {
    EMgr.emit('EXCUTETASK', 2);
    if (tp) {
        FBInstant.shareAsync({
            intent: 'REQUEST',
            image: STATICDATA.SHAREPIC[0],
            text: 'Industry Tycoon',
        });
    } else {
        FBInstant.context
            .chooseAsync({
                filters: ['NEW_CONTEXT_ONLY'], //['NEW_CONTEXT_ONLY', 'INCLUDE_EXISTING_CHALLENGES' , 'NEW_PLAYERS_ONLY']
                minSize: 3,
            })
            .then(function () {
                FBInstant.updateAsync({
                    action: 'CUSTOM',
                    cta: 'Industry Tycoon',
                    image: STATICDATA.SHAREPIC[0],
                    text: {
                        default: 'Let us play game together',
                    },
                    template: 'VILLAGE_INVASION',
                    data: {
                        myReplayData: '...'
                    },
                    strategy: 'IMMEDIATE',
                    notification: 'NO_PUSH',
                }).then(function () {
                    console.log('Message was sent successfully');
                    !!cb && cb();
                }).catch(function (err) {
                    console.log('update fail:' + err);
                });
            }).catch(function (err) {
                console.log('chooseAsync fail:' + err);
            });
    }
}

sdkFb.prototype.adInit = () => {
    console.log('sdkFb adInit');
}

sdkFb.prototype.adViewShow = () => {
    console.log('sdkFb adViewShow');
}

sdkFb.prototype.adBannerShow = () => {
    console.log('sdkFb adBannerShow');
}

sdkFb.prototype.setScore = (score) => {
    FBInstant.getLeaderboardAsync('word_rank')
        .then(function (leaderboard) {
            return leaderboard.setScoreAsync(score);
        })
}

sdkFb.prototype.getRank = (cb) => {
    FBInstant.getLeaderboardAsync('word_rank')
        .then(function (leaderboard) {
            return leaderboard.getConnectedPlayerEntriesAsync(20, 0);
        })
        .then(function (entries) {
            console.log("得到数据");
            let data = [];
            for (let i in entries) {
                data[i] = {
                    name: entries[i].getPlayer().getName(),
                    photo: entries[i].getPlayer().getPhoto(),
                    rank: entries[i].getRank(),
                    score: entries[i].getScore()
                }
            }
            cb(data);
        });
}

sdkFb.prototype.xhr = (url, method, msg) => {
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