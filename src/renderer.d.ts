// electron windeow接口扩展
export interface IElectronAPI {
  getTempArenaInfoJson: (string) => Promise<any>
  getDirectoryPath: () => Promise<string[] | undefined>
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
