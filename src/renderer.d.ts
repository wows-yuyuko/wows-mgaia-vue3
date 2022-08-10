// electron windeow接口扩展
export interface IElectronAPI {
  getTempArenaInfoJson: (string) => Promise<any>
  getDirectoryPath: () => Promise<string[] | undefined>
  checkForUpdates: () => void
  shouldUpdateHandleCounter: (callback: any) => void
  electronUpdateNow: () => void
  electronMessage: (callback: any) => void
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
