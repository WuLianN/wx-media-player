## 微信小程序 - 音乐播放器

为了深入了解微信小程序，决定写个音乐播放器，将之前写好的 [Vue 音乐播放器](https://github.com/WuLianN/music-player) 进行移植，改造过程还算顺利，坑有点多。还是 Vue 香啊！:yum:



<br>



## display :video_camera:

![](https://github.com/WuLianN/wx-media-player/blob/master/assets/display/discover.png)

![](https://github.com/WuLianN/wx-media-player/blob/master/assets/display/player.png)





使用了那些东西呢？:stuck_out_tongue:

* vant-webapp UI框架
* mobx 状态管理器 具体可看[[mobx-miniprogram-bindings](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/mobx.html)]
* [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 提供音乐api，感谢作者



<br>



想体验吗？:stuck_out_tongue_winking_eye:

* clone [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

```js
npm install // 下载依赖
npm run start // 开启node服务
```

* clone 本仓库

1. 使用微信开发者工具打开本项目
2. npm install 下载依赖



<br>



已完成 - 技术

- [x] 播放页
- [x] 歌词页


<br>

待完成 - 业务

- [ ] 歌手
- [x] 歌单
- [ ] 排行榜
- [ ] MV



<br>



## 对比 Vue 2.x

### 对模板中数据进行过滤



**微信小程序**

```html
<wxs src="../../../../../utils/util.wxs" module="util" />
<view class="recommentList-show-count">{{ util.snippetNum(item.playCount) }}</view>
```

使用 WXS      注意：不支持ES6 

```js
function snippetNum(value) {
   if (!value) {
     return ''
   } else {
     if (value > 99999 && value <= 99999999) {
       var result = Math.floor(value / 10000)
       return result + '万'
     } else if (value > 99999999) {
       var result = (value / 100000000)
       var Tresult = result.toString().slice(0, 3)
       return Tresult + '亿'
     } else {
       return value
     }
   }
}

module.exports = {
  snippetNum: snippetNum
}
```



<br>



**Vue 2.x**

```html
<span class="recommentList-show-count">{{ item.playCount | snippetNum }}</span>
```

使用 filter 过滤器

```js
Vue.filter('snippetNum', function (value) {
  if (!value) {
    return ''
  } else {
    if (value > 99999 && value <= 99999999) {
      const result = Math.floor(value / 10000)
      return result + '万'
    } else if (value > 99999999) {
      const result = (value / 100000000)
      const Tresult = result.toString().slice(0, 3)
      return Tresult + '亿'
    } else {
      return value
    }
  }
})
```
   

<br>



### 获取 dom 节点

**微信小程序**  

使用 wx.createSelectorQuery()，组件中使用 this.createSelectorQuery()

```js
// dom总长度
const query = this.createSelectorQuery()
query.select('.progress-line')
  .boundingClientRect(function(rect) {
     const lineLength = rect.width
     // 向下取整
     const TcurrentTime = Math.floor(currentTime)
     const Tduration = Math.floor(duration)
     const TlineLength = Math.floor(lineLength)

     // 当前进度
     const progress =
     Math.floor((TcurrentTime / Tduration) * TlineLength) + 'px'

     _this.setData({
       progress: progress
     })
   })
  .exec()
```



<br>



**Vue 2.x**

使用 ref

```html
<div class="line1" ref="line"></div>
```

```js
// dom总长度
const lineLength = this.$refs.line.offsetWidth

// 向下取整
const TcurrentTime = Math.floor(currentTime)
const Tduration = Math.floor(duration)
const TlineLength = Math.floor(lineLength)

// 当前进度
this.progress = Math.floor((TcurrentTime / Tduration) * TlineLength) + 'px'
```



