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
  globalPlayerStatus: '',
  isRandomMode: false, // 随机模式
  isRotate: false, // 音乐转盘
  isResetRotateAngle: false,

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

  setGlobalPlayerStatus: action(function(value) {
    this.globalPlayerStatus = value
  }),

  // 随机模式
  setIsRandomMode: action(function(value) {
    this.isRandomMode = value
  }),

  // 音乐转盘
  setIsRotate: action(function(value) {
    this.isRotate = value
  }),

  setIsResetRotateAngle: action(function(value) {
    this.isResetRotateAngle = value
  }),

  /** audio 播放器 */
  duration: 0,
  currentTime: 0,

  setDuration: action(function(value) {
    this.duration = value
  }),

  setCurrentTime: action(function(value) {
    this.currentTime = value
  })
})