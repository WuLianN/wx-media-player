import {
  observable,
  action
} from 'mobx-miniprogram'

export const store = observable({
  isShow: false, // 显示歌单信息页
  songListDetail: null, // 歌单信息
  songList: null, // 歌单的歌曲
  allSongId: null, // 歌单的所有歌曲id
  songData: null, // 歌曲信息
  url: '', // 歌曲url
  id: 0, // 歌曲id
  nextIdIndex: 0,

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

  // 歌单的所有歌曲id
  setAllSongId: action(function(value) {
    this.allSongId = value
  }),

  // 歌曲信息
  setSongData: action(function(value) {
    this.songData = value
  }),

  // 歌曲url
  setUrl: action(function(value) {
    this.url = value
  }),

  // 歌曲id
  setId: action(function(value) {
    this.id = value
  }),
  
  // 下一个ID的索引
  setNextIdIndex: action(function(value){
    this.nextIdIndex = value
  }),

  /** audio 播放器 */
  puase: false,

  setPause: action(function(value) {
    this.pause = value
  })
})