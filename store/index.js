import {
  observable,
  action
} from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  isShow: false,
  songListDetail: null,
  songList: null,

  // 显示 songListDetail
  openSongListDetail: action(function (value) {
    this.isShow = value
    
  }),
  
  // 隐藏 songListDetail
  closeSongListDetail: action(function() {
    this.isShow = false
  }),
  
  // 设置歌单数据
  setSongListData: action(function (value){
    this.songListDetail = value
  }),

  // 歌单
  setSongList: action(function(value){
    this.songList = value
  })
})