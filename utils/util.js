/**
 * 常用工具函数
 */

// 格式化时间
const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

// 格式化数字
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 格式化日期
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

// 格式化数字，添加千位分隔符
const formatThousands = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 添加水印到图片
const addWatermark = (originalImagePath, callback) => {
  const watermarkText = '海风影像馆'
  
  // 获取图片信息
  wx.getImageInfo({
    src: originalImagePath,
    success: (imgInfo) => {
      const canvasWidth = imgInfo.width
      const canvasHeight = imgInfo.height
      
      // 创建离屏canvas
      const ctx = wx.createCanvasContext('watermarkCanvas')
      
      // 绘制原图
      ctx.drawImage(originalImagePath, 0, 0, canvasWidth, canvasHeight)
      
      // 绘制水印文字
      ctx.save()
      ctx.setGlobalAlpha(0.2) // 透明度
      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(canvasWidth * 0.05)
      ctx.rotate(-Math.PI / 6) // 旋转角度
      
      // 计算水印位置（右下角）
      const text = ctx.measureText(watermarkText)
      const x = canvasWidth * 0.7
      const y = canvasHeight * 0.8
      
      ctx.fillText(watermarkText, x, y)
      ctx.restore()
      
      // 导出图片
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          canvasId: 'watermarkCanvas',
          success: (res) => {
            callback && callback(res.tempFilePath)
          },
          fail: (err) => {
            console.error('添加水印失败', err)
            callback && callback(originalImagePath) // 失败时返回原图
          }
        })
      })
    },
    fail: (err) => {
      console.error('获取图片信息失败', err)
      callback && callback(originalImagePath) // 失败时返回原图
    }
  })
}

// 防抖函数
const debounce = (fn, delay = 500) => {
  let timer = null
  return function() {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

// 设置分享配置
const getShareConfig = (title = '海风影像馆', path = '/pages/index/index', imageUrl = '') => {
  return {
    title,
    path,
    imageUrl,
    success: function() {
      wx.showToast({
        title: '分享成功',
        icon: 'success'
      })
    },
    fail: function() {
      wx.showToast({
        title: '分享失败',
        icon: 'none'
      })
    }
  }
}

module.exports = {
  formatTime,
  formatDate,
  formatThousands,
  addWatermark,
  debounce,
  getShareConfig
} 