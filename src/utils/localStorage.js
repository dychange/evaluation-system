import WebStorageCache from 'web-storage-cache'

const localStorage = new WebStorageCache()

const setLocalStorage = function (key, value) {
  return localStorage.set(key, value, {exp: 3 * 24 * 60 * 60 })
}
const getLocalStorage = function (key) {
  return localStorage.get(key)
}
const removeLocalStorage = function (key) {
  return localStorage.delete(key)
}
const clearLocalStorage = function () {
  return localStorage.clear()
}

// 设置一个存贮对象方法
const setUserObj = function (userName, key, value) {
  let user = getLocalStorage(`${userName}-enterprise`)
  if (!user) {
    user = {}
  }
  user[key] = value
  setLocalStorage(`${userName}-enterprise`, user)
}

// 设置一个取对象方法
const getUserObject = function (userName, key) {
  let book = getLocalStorage(`${userName}-enterprise`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}
//  存userId的信息
const saveUserInfo = function (userName, userInfo) {
  return setUserObj(userName, 'userInfo', userInfo)
}

//  取user的信息
const getUserInfoMessage = function (userName) {
  return getUserObject(userName, 'userInfo')
}
export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  saveUserInfo,
  getUserInfoMessage
}