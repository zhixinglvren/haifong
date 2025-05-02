/**
 * 用户授权相关工具函数
 */

// 检查是否已授权获取用户信息
const checkAuthStatus = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 通过新接口获取用户信息
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善用户个人资料',
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 通过旧接口获取用户信息
const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 保存用户信息到本地和全局数据
const saveUserInfo = (userInfo) => {
  const app = getApp()
  app.globalData.userInfo = userInfo
  app.globalData.hasUserInfo = true
  wx.setStorageSync('userInfo', userInfo)
}

// 判断是否需要登录，如果需要则弹出授权窗口
const checkAndNavigate = (url, needAuth = true) => {
  if (needAuth) {
    const app = getApp()
    if (app.globalData.hasUserInfo) {
      wx.navigateTo({
        url
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '需要授权才能继续操作',
        confirmText: '去授权',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/profile/profile?redirect=' + encodeURIComponent(url)
            })
          }
        }
      })
    }
  } else {
    wx.navigateTo({
      url
    })
  }
}

module.exports = {
  checkAuthStatus,
  getUserProfile,
  getUserInfo,
  saveUserInfo,
  checkAndNavigate
} 