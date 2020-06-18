import {
  observable,
  action
} from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  isShow: false, // 显示歌单信息页
  songListDetail: null, // 歌单信息
  songList: null, // 歌单的歌曲
  songData: null, // 歌曲信息
  url: '', // 歌曲url

  // 显示 songListDetail
  isShowSongListDetail: action(function(value) {
    this.isShow = value

  }),

  // 歌单信息
  setSongListData: action(function(value) {
    this.songListDetail = value
  }),

  // 歌单的歌曲
  setSongList: action(function(value) {
    this.songList = value
  }),

  // 歌曲信息
  setSongData: action(function(value) {
    this.songData = value
  }),

  // 歌曲url
  setUrl: action(function(value) {
    this.url = value
  })
})