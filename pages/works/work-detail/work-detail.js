// work-detail.js
const util = require('../../../utils/util.js')
const auth = require('../../../utils/auth.js')

Page({
  data: {
    work: null,
    id: null,
    isLoading: true,
    hasUserInfo: false,
    isLiked: false,
    isCollected: false
  },

  onLoad(options) {
    const { id } = options
    this.setData({ id })
    this.fetchWorkDetail(id)
    
    // 检查用户授权状态
    const app = getApp()
    if (app.globalData.hasUserInfo) {
      this.setData({
        hasUserInfo: true
      })
      this.checkInteractionStatus()
    }
  },
  
  onShow() {
    // 每次页面显示时检查授权状态
    const app = getApp()
    if (app.globalData.hasUserInfo && !this.data.hasUserInfo) {
      this.setData({
        hasUserInfo: true
      })
      this.checkInteractionStatus()
    }
  },

  // 获取作品详情
  fetchWorkDetail(id) {
    // 模拟网络请求获取数据
    // 实际应用中应该调用API
    setTimeout(() => {
      // 假设这是从服务器获取的数据
      const workDetail = {
        id: id,
        title: '城市夜景',
        description: '这是一张拍摄于深圳市中心的夜景照片，捕捉了城市灯光与建筑之美。',
        imageUrl: '/images/theme-city.jpg',
        date: '2024-03-15',
        location: '深圳',
        theme: '城市之光',
        camera: 'Canon EOS R5',
        lens: 'RF 24-70mm f/2.8L IS USM',
        settings: 'f/8, 1/15s, ISO 100',
        photographer: '海风摄影师',
        likes: 126,
        collections: 58,
        comments: 12
      }
      
      this.setData({
        work: workDetail,
        isLoading: false
      })
    }, 500)
  },
  
  // 检查用户交互状态（是否已点赞、收藏等）
  checkInteractionStatus() {
    if (!this.data.id) return
    
    // 从本地存储检查是否已点赞
    const likedWorks = wx.getStorageSync('liked_works') || []
    const isLiked = likedWorks.includes(this.data.id)
    
    // 从本地存储检查是否已收藏
    const collectedWorks = wx.getStorageSync('collected_works') || []
    const isCollected = collectedWorks.includes(this.data.id)
    
    this.setData({
      isLiked,
      isCollected
    })
  },
  
  // 点赞操作
  handleLike() {
    if (!this.data.hasUserInfo) {
      this.requireAuth()
      return
    }
    
    // 获取本地存储中的点赞记录
    let likedWorks = wx.getStorageSync('liked_works') || []
    let isLiked = this.data.isLiked
    
    if (isLiked) {
      // 取消点赞
      likedWorks = likedWorks.filter(id => id !== this.data.id)
      this.setData({
        'work.likes': this.data.work.likes - 1,
        isLiked: false
      })
    } else {
      // 添加点赞
      likedWorks.push(this.data.id)
      this.setData({
        'work.likes': this.data.work.likes + 1,
        isLiked: true
      })
    }
    
    // 更新本地存储
    wx.setStorageSync('liked_works', likedWorks)
  },
  
  // 收藏操作
  handleCollect() {
    if (!this.data.hasUserInfo) {
      this.requireAuth()
      return
    }
    
    // 获取本地存储中的收藏记录
    let collectedWorks = wx.getStorageSync('collected_works') || []
    let isCollected = this.data.isCollected
    
    if (isCollected) {
      // 取消收藏
      collectedWorks = collectedWorks.filter(id => id !== this.data.id)
      this.setData({
        'work.collections': this.data.work.collections - 1,
        isCollected: false
      })
    } else {
      // 添加收藏
      collectedWorks.push(this.data.id)
      this.setData({
        'work.collections': this.data.work.collections + 1,
        isCollected: true
      })
    }
    
    // 更新本地存储
    wx.setStorageSync('collected_works', collectedWorks)
  },
  
  // 评论操作
  handleComment() {
    if (!this.data.hasUserInfo) {
      this.requireAuth()
      return
    }
    
    wx.showToast({
      title: '评论功能开发中',
      icon: 'none'
    })
  },
  
  // 分享操作
  handleShare() {
    // 分享不需要授权
  },
  
  // 下载图片为壁纸
  handleDownload() {
    if (!this.data.hasUserInfo) {
      this.requireAuth()
      return
    }
    
    wx.showLoading({
      title: '正在处理...'
    })
    
    // 下载原图并添加水印
    wx.getImageInfo({
      src: this.data.work.imageUrl,
      success: (res) => {
        // 使用工具函数添加水印
        util.addWatermark(res.path, (path) => {
          // 保存到相册
          wx.saveImageToPhotosAlbum({
            filePath: path,
            success: () => {
              wx.hideLoading()
              wx.showToast({
                title: '已保存到相册',
                icon: 'success'
              })
            },
            fail: (err) => {
              wx.hideLoading()
              console.error('保存图片失败', err)
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        })
      },
      fail: (err) => {
        wx.hideLoading()
        console.error('获取图片信息失败', err)
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        })
      }
    })
  },
  
  // 请求授权
  requireAuth() {
    wx.showModal({
      title: '提示',
      content: '需要授权才能继续操作',
      confirmText: '去授权',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/profile/profile?redirect=' + encodeURIComponent('/pages/works/work-detail/work-detail?id=' + this.data.id)
          })
        }
      }
    })
  },
  
  // 用户分享
  onShareAppMessage() {
    const work = this.data.work
    return {
      title: work ? work.title : '海风影像馆作品分享',
      path: `/pages/works/work-detail/work-detail?id=${this.data.id}`,
      imageUrl: work ? work.imageUrl : ''
    }
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    const work = this.data.work
    return {
      title: work ? `海风影像馆 - ${work.title}` : '海风影像馆作品分享',
      imageUrl: work ? work.imageUrl : ''
    }
  }
}) 