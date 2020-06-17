import {
  request
} from '../utils/request.js'
import {
  search,
  pic,
  lrc,
  url,
  banner,
  recommentList,
  hotSongList,
  highQualityList,
  songList,
  songDetail,
  singerAlbum,
  singerSongList,
  singerMV,
  singerInfo,
  singerRankList,
  songListComment,
  album,
  userSongList,
  mvTop,
  mvUrl,
  rankList,
  rankListDetail,
  topAlbum,
  newSong,
  topSong,
  topList
} from './source'

export default {
  /**
   * @description: 搜索音乐
   * @param keywords 关键词
   * @param type 类型  song singer album songList video radio user lrc
   * @param pageSize 条数
   * @return:
   */

  getSearch(keywords, type, limit) {
    return request({
      path: search,
      params: {
        keywords,
        type,
        limit
      }
    })
  },

  /**
   * @description: 音乐播放地址
   * @param id 音乐ID
   * @param quality 码率类型：128 192 320 flac
   * @return:
   */

  getUrl(id, timestamp) {
    return request({
      path: url,
      params: {
        id,
        timestamp
      }
    })
  },

  /**
   * @description: 音乐图片
   * @param id 音乐ID
   * @param imgSize 图片大小  默认获取 200x200 大小的图片
   * @return:
   */

  getPic(id, imgSize) {
    return request({
      path: pic,
      params: {
        id,
        imgSiz
      }
    })
  },

  /**
   * @description: 音乐歌词
   * @param id 音乐ID
   * @return:
   */

  getLrc(id) {
    return request({
      path: lrc,
      params: {
        id
      }
    })
  },

  /**
   * @description: 首页轮播图
   * @param type
   * @return:
   */

  getBanner(type) {
    return request({
      path: banner,
      params: {
        type
      }
    })
  },

  /**
   * @description: 推荐歌单
   * @param limit 取出数量, 默认为 30
   * @param offset 偏移数量, 用于分页, 如:( 页数 -1)*30, 其中30为limit的值, 默认为0
   * @return:
   */

  getRecommentList(limit, offset = 0) {
    return request({
      path: recommentList,
      params: {
        limit,
        offset
      }
    })
  },

  /**
   * @description: 首页轮播图专辑 ()
   * @param id 专辑id
   * @return:
   */

  getAlbum(id) {
    return request({
      path: album,
      params: {
        id
      }
    })
  },

  /**
   * @description: 热门歌单
   * @param categoryType 歌单分类
   * @param orderType 分别对应最新和最热
   * @param limit 获取条数
   * @param offset 分页
   * @return:
   */

  getHotSongList(cat, limit, offset, order = 'hot') {
    return request({
      path: hotSongList,
      params: {
        cat,
        limit,
        offset,
        order
      }
    })
  },

  /**
   * @description: 精品歌单
   * @param cat 歌单分类
   * @param before 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
   * @param limit 获取条数
   * @return:
   */

  getHighQualityList(cat, limit, before) {
    return request({
      path: highQualityList,
      params: {
        cat,
        limit,
        before
      }
    })
  },

  /**
   * @description: 音乐歌单
   * @param id 网易云歌单的ID
   * @param format 格式化数据 1 格式化 0 不格式化
   * @return:
   */

  getSongList(id) {
    return request({
      path: songList,
      params: {
        id
      }
    })
  },

  /**
   * @description: 歌曲详情
   * @param ids 网易云歌单的ID
   * @return:
   */

  getSongDetail(ids) {
    return request({
      path: songDetail,
      params: {
        ids
      }
    })
  },

  /**
   * @description: 歌手专辑
   * @param id 歌手ID
   * @return:
   */

  getSingerAlbum(id, limit, offset) {
    return request({
      path: singerAlbum,
      params: {
        id,
        limit,
        offset
      }
    })
  },

  /**
   * @description: 歌手歌曲
   * @param id 歌手ID
   * @return:
   */

  getSingerSongList(id) {
    return request({
      path: singerSongList,
      params: {
        id
      }
    })
  },

  /**
   * @description: 歌手MV
   * @param id 歌手ID
   * @return:
   */

  getSingerMV(id) {
    return request({
      path: singerMV,
      params: {
        id
      }
    })
  },

  /**
   * @description: 歌手信息
   * @param id歌手ID
   * @return:
   */

  getSingerInfo(id) {
    return request({
      path: singerInfo,
      params: {
        id
      }
    })
  },

  /**
   * @description: 歌手排行榜
   * @param pageSize
   * @param page
   * @return:
   */

  getSingerRankList(pageSize, page) {
    return request({
      path: singerRankList,
      params: {
        pageSize,
        page
      }
    })
  },

  /**
   * @description: 歌单评论
   * @param id
   * @param pageSize
   * @param page
   * @return:
   */

  getSongListComment(id, limit, offset) {
    return request({
      path: songListComment,
      params: {
        id,
        limit,
        offset
      }
    })
  },

  /**
   * @description:  用户歌单信息
   * @param uid 用户ID
   * @return:
   */

  getUsetSongList(uid) {
    return request({
      path: userSongList,
      params: {
        uid
      },

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  /**
   * @description: mv排行榜
   * @param {type}
   * @return:
   */

  getMVtop() {
    return request(mvTop)
  },

  /**
   * @description: mv地址
   * @param id
   * @return:
   */

  getMVurl(id) {
    return request({
      path: mvUrl,
      params: {
        id
      }
    })
  },

  /**
   * @description: 排行榜
   * @param idx
   * @return:
   */

  getRankList(idx) {
    return request({
      path: rankList,
      params: {
        idx
      }
    })
  },

  /**
   * @description: 所有榜单内容摘要
   * @param {type}
   * @return:
   */

  getRankListDetail() {
    return request(rankListDetail)
  },

  /**
   * @description: 新碟上架
   * @param limit
   * @param offset
   * @return:
   */

  getTopAlbum(limit, offset) {
    return request({
      path: topAlbum,
      params: {
        limit,
        offset
      }
    })
  },

  /**
   * @description: 推荐新音乐
   * @param {type}
   * @return:
   */

  getNewSong() {
    return request(newSong)
  },

  /**
   * @description: 新歌速递
   * @param type 全部:0 华语:7 欧美:96 日本:8 韩国:16
   * @return:
   */

  getTopSong(type) {
    return request({
      path: topSong,
      params: {
        type
      }
    })
  },

  /**
   * @description: 所有榜单
   * @param {type}
   * @return:
   */

  getTopList() {
    return request(topList)
  }
}