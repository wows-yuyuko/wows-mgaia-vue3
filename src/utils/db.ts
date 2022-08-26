import Dexie, { Table } from 'dexie'

export interface EncyclopediaShipAvgHistoryData {
  id?: string;
  day: string;
  data: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  encyclopediaShipAvgHistoryData!: Table<EncyclopediaShipAvgHistoryData>

  constructor () {
    super('myDatabase')
    this.version(1).stores({
      encyclopediaShipAvgHistoryData: '&id, day, data' // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()
