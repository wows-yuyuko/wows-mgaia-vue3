import lodash from 'lodash'

// const sysName = window.location.hostname + window.location.pathname
const sysName = window.location.hostname

/**
 * 获取LocalStorage中的值
 * @param name
 * @returns
 */
export function getLocalStorage (name?: string): string | any {
  if (lodash.isNil(localStorage.getItem(sysName))) {
    return null
  }
  const storageJson = JSON.parse(localStorage.getItem(sysName) as string)
  if (name === null || name === undefined) {
    return storageJson
  } else {
    return storageJson[name]
  }
}

/**
 * 设置LocalStorage中的值
 * @param name
 * @param value
 */
export function setLocalStorage (name: string, value: unknown): void {
  const info = !lodash.isNil(localStorage.getItem(sysName))
    ? JSON.parse(localStorage.getItem(sysName) as string)
    : {}
  info[name] = value
  localStorage.setItem(sysName, JSON.stringify(info))
}

/**
 * 清空LocalStorage
 * @returns
 */
export function removeLocalStorage (): void {
  return localStorage.removeItem(sysName)
}
