// profile.js
const util = require('../../utils/util.js')
const auth = require('../../utils/auth.js')

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    
    // 统计数据
    statistics: {
      likes: 0,
      collections: 0,
      shares: 0,
      comments: 0
    },
    
    // 用户操作列表
    actionsList: [
      {
        icon: '/images/icon-like.png',
        text: '我的点赞',
        path: '/pages/profile/likes/likes'
      },
      {
        icon: '/images/icon-collection.png',
        text: '我的收藏',
        path: '/pages/profile/collections/collections'
      },
      {
        icon: '/images/icon-share.png',
        text: '我的分享',
        path: '/pages/profile/shares/shares'
      },
      {
        icon: '/images/icon-comment.png',
        text: '我的评论',
        path: '/pages/profile/comments/comments'
      }
    ],
    
    // 设置列表
    settingsList: [
      {
        icon: '/images/icon-setting.png',
        text: '隐私设置',
        path: '/pages/profile/settings/privacy'
      },
      {
        icon: '/images/icon-customer-service.png',
        text: '联系客服',
        path: '/pages/profile/contact/contact'
      },
      {
        icon: '/images/icon-about.png',
        text: '关于我们',
        path: '/pages/profile/about/about'
      }
    ],
    
    // 跳转页面参数
    redirectUrl: ''
  },

  onLoad(options) {
    // 获取页面跳转参数
    if (options.redirect) {
      this.setData({
        redirectUrl: decodeURIComponent(options.redirect)
      })
    }
    
    // 检查是否支持新版获取用户信息接口
    const app = getApp()
    this.setData({
      canIUseGetUserProfile: app.globalData.canIUseGetUserProfile
    })
    
    // 检查是否已有用户信息
    if (app.globalData.hasUserInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.loadUserStatistics()
    }
  },
  
  onShow() {
    // 每次页面显示时检查授权状态
    const app = getApp()
    if (app.globalData.hasUserInfo && !this.data.hasUserInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.loadUserStatistics()
    }
  },
  
  // 获取用户信息（新接口）
  getUserProfile() {
    auth.getUserProfile().then(res => {
      this.handleUserInfo(res.userInfo)
    }).catch(err => {
      console.error('获取用户信息失败', err)
    })
  },
  
  // 获取用户信息（旧接口）
  getUserInfo(e) {
    if (e.detail.userInfo) {
      this.handleUserInfo(e.detail.userInfo)
    }
  },
  
  // 处理用户信息
  handleUserInfo(userInfo) {
    const app = getApp()
    app.globalData.userInfo = userInfo
    app.globalData.hasUserInfo = true
    
    this.setData({
      userInfo,
      hasUserInfo: true
    })
    
    // 保存用户信息
    auth.saveUserInfo(userInfo)
    
    // 加载用户统计数据
    this.loadUserStatistics()
    
    // 如果有跳转参数，则跳转到指定页面
    if (this.data.redirectUrl) {
      wx.navigateTo({
        url: this.data.redirectUrl
      })
    }
  },
  
  // 加载用户统计数据
  loadUserStatistics() {
    // 模拟从服务器获取数据
    // 实际应用中应该调用API请求
    setTimeout(() => {
      this.setData({
        'statistics.likes': Math.floor(Math.random() * 50),
        'statistics.collections': Math.floor(Math.random() * 30),
        'statistics.shares': Math.floor(Math.random() * 20),
        'statistics.comments': Math.floor(Math.random() * 15)
      })
    }, 500)
  },
  
  // 导航到指定页面
  navigateTo(e) {
    const { path } = e.currentTarget.dataset
    if (this.data.hasUserInfo) {
      wx.navigateTo({
        url: path
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  
  // 联系客服
  contactCustomerService() {
    wx.previewImage({
      urls: ['/images/customer-service-qr.jpg']
    })
  }
}) 