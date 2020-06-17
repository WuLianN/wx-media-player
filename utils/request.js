export function request(obj) {
  return new Promise((resolve, reject) => {

    let {
      path,
      params
    } = obj

    let url = 'http://localhost:3000' + path

    // 基本属性
    const data = {
      url,
      method: 'get',
      data: params,
      timeout: 30000,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    }

    return wx.request(data)
  })
}