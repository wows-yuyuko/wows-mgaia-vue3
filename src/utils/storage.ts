import lodash from 'lodash'

const sysName = window.location.hostname + window.location.pathname
// 获取LocalStorage中的值
export function getLocalStorage (name: string) {
  if (lodash.isNil(localStorage.getItem(sysName))) {
    return
  }
  const storageJson = JSON.parse(localStorage.getItem(sysName) as string)
  if (name == null) {
    return storageJson
  } else {
    return storageJson[name]
  }
}

// 设置LocalStorage中的值
export function setLocalStorage (name: string, value: any) {
  const info = !lodash.isNil(localStorage.getItem(sysName))
    ? JSON.parse(localStorage.getItem(sysName) as string)
    : {}
  info[name] = value
  localStorage.setItem(sysName, JSON.stringify(info))
}

// 清空LocalStorage
export function removeLocalStorage () {
  return localStorage.removeItem(sysName)
}
