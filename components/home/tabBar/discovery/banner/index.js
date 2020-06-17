// components/home/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
     songInfo: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getBannerInfo(image) {
      const targetType = image.targetType

      if (targetType === 1) {
        const id = image.song.al.id
        const picUrl = image.song.al.picUrl
        const songName = image.song.al.name
        const songArtist = image.song.ar[0].name
        const api = 'WY'

        clearArray(this.songInfo)
        
        this.songInfo.push({
          id,
          picUrl,
          songName,
          songArtist,
          api
        })

        const isUpdate = true
        const isFirstTime = true

        // id
        this.$store.commit('setID', this.songInfo[0].id)
        // 图片链接
        this.$store.commit('setPicUrl', this.songInfo[0].picUrl)
        // 歌曲名
        this.$store.commit('setSongName', this.songInfo[0].songName)
        // 歌曲作者
        this.$store.commit('setSongArtist', this.songInfo[0].songArtist)
        // api来源
        this.$store.commit('setAPI', this.songInfo[0].api)
        // 更新数据
        this.$store.commit('setIsUpdate', isUpdate)
        // 首次加载歌词
        this.$store.commit('setIsFirstTime', isFirstTime)
      } else if (targetType === 10) {
        // "/album?id=80848946"
        const albumID = image.targetId

        api.getAlbum(albumID).then(res => {
          const result = res.data.album
          const songs = res.data.songs

          const albumInfo = {
            name: result.name,
            description: result.description,
            publishTime: result.publishTime,
            trackCount: result.size,
            id: result.id,
            coverImgUrl: result.picUrl,
            shareCount: result.info.shareCount,
            likedCount: result.info.likedCount,
            commentCount: result.info.commentCount,
            nickname: result.artist.name,
            avatarUrl: result.artist.picUrl,
            songs,
            type: 'album'
          }

          this.$store.commit('setSongList', albumInfo)

          this.$router.push({
            name: 'songListDetail',
            params: {
              home: 'home',
              leftTitle: '专辑'
            }
          })
        })
      }
    },
  }
})