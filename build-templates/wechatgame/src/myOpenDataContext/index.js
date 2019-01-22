const MSGTYPE = {
  'RANKTYPE1': 0, //横向3个排行
  'RANKTYPE2': 1, //纵向排行
};

let sharedCanvas = wx.getSharedCanvas();
let ctx = sharedCanvas.getContext('2d');


//字符串长度限制
let textWidthLimt = (str, width, fillBool) => {
  if (ctx.measureText(str).width > width) {
    let num = str.length;
    while (ctx.measureText(str).width > width) {
      str = str.slice(0, --num);
    }
    str = fillBool ? str + '...' : str;
  }
  return str;
};

//横向绘制块 
let drawLandScapeItem = (id, rank, nickName, avatarPath, score) => {
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  let x = 190 * id - 70;
  let y = 600;
  if (rank <= 3) {
    let rankBg = wx.createImage();
    rankBg.src = 'res/openDataTexture/' + rank + '.png';
    rankBg.onload = () => {
      ctx.drawImage(rankBg, x + 20, y + 5, 90, 90);
      ctx.font = "50px Verdana";
      ctx.fillText(rank, x + 65, y + 70);
    };
  } else {
    ctx.font = "50px Verdana";
    ctx.fillText(rank, x + 65, y + 70);
  }

  let avatarImg = wx.createImage();
  avatarImg.src = avatarPath;
  avatarImg.onload = () => {
    ctx.drawImage(avatarImg, x + 15, y + 110, 100, 100);
  };
  ctx.font = "28px Verdana";
  ctx.fillText(textWidthLimt(nickName, 180, true), x + 65, y + 250, 200);
  ctx.fillText(score, x + 65, y + 300, 200);
};

//纵向绘制条
let drawPortraitItem = (id, nickName, avatarPath, score) => {
  ctx.textAlign = "left";
  //需要调节的基础位置
  let x = 0;
  let y = 150 * (id - 1) + 20;

  let bg = wx.createImage();
  bg.src = 'res/openDataTexture/rank_tiao.png';
  bg.onload = () => {
    ctx.drawImage(bg, x, y - 18, 598, 135);
    if (id <= 3) {
      let rankBg = wx.createImage();
      rankBg.src = 'res/openDataTexture/' + id + '.png';
      rankBg.onload = () => {
        ctx.drawImage(rankBg, x + 20, y + 5, 90, 90);
        ctx.font = "40px Verdana";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(id, x + 53, y + 65);
      };
    } else {
      ctx.font = "40px Verdana";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(id, x + 53, y + 65);
    }

    let avatarImg = wx.createImage();
    avatarImg.src = avatarPath;
    avatarImg.onload = () => {
      ctx.drawImage(avatarImg, x + 130, y, 100, 100);
    };
    ctx.font = "28px Verdana";
    ctx.fillStyle = "#000000";
    ctx.fillText(textWidthLimt(nickName, 100, true), x + 250, y + 55, 200);
    ctx.fillStyle = "#FF0000";
    ctx.fillText(score, x + 380, y + 55, 200);
  };
};

wx.onMessage(data => {
  // for (let i = 1; i <= 50; i++) {
  //   drawPortraitItem(i, 'civi', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ercK52UBszy5pE4er6wRSUr0vtaqYia05X2WTjUeRuaib0pLZ5tWnWiaWAtNhBFR9NZNk1nicGuEicME7A/132', i)
  // }

  wx.getFriendCloudStorage({
    keyList: ['MAXGRADE'],
    success: (getres) => {
      let rankData = [];
      for (let i in getres.data) {
        let item = (getres.data)[i];
        if (item.KVDataList.length > 0) {
          for (let k in item.KVDataList) {
            if (item.KVDataList[k].key == 'MAXGRADE') {
              let score = item.KVDataList[k].value;
              rankData.push({
                nickname: item.nickname,
                avatarUrl: item.avatarUrl,
                value: score,
              })
            }
          }
        }
      }
      rankData.sort((a, b) => {
        return b.value - a.value;
      })

      for (let i in rankData) {
        drawPortraitItem(parseInt(i, 10) + 1, rankData[i]['nickname'], rankData[i]['avatarUrl'], rankData[i]['value'])
      }
    }
  });

});