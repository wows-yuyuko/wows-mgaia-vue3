import lodash from 'lodash'
// type
// wows_premium 高级账号
// gold 金币
// signal 旗子
// camouflage 涂装
// coal 煤炭
// free_xp 全局经验
// steel 钢铁
// ship 船
// collection_album 收藏品

export interface ShowPrize {
  type: string
  imgSrc: string
  nationImgSrc?: string
  text: string
  probabilityDisplayed?: number
}
/**
 * 获取开箱内容
 * @param prize
 * @returns
 */
export function getPrize (prize:any, prizeList: ShowPrize[]):ShowPrize {
  if (lodash.isNil(prize.rewards)) {
    // 奖品数组空则为普通
    if (prize.type === 'wows_premium') {
      // 高级账号
      return {
        type: 'wows_premium',
        imgSrc: 'https://wows-static-production.gcdn.co/metashop/1dd97239/assets/images/asset-premium.svg',
        text: `高级账号 ${prize.amount} 天`,
        probabilityDisplayed: prize.probabilityDisplayed
      }
    }
    if (prize.type === 'gold') {
      // 金币
      return {
        type: 'gold',
        imgSrc: 'https://glossary-wows-global.gcdn.co/icons/currencies/icon_gold_25bcad92345c74beb261d28967f32cadfe8ac8d788b1706d68dc0b001ab0c9ff.png',
        text: `金币* ${prize.amount}`,
        probabilityDisplayed: prize.probabilityDisplayed
      }
    }
    if (prize.type === 'signal') {
      // 旗子
      return {
        type: 'signal',
        imgSrc: 'https://wows-static-production.gcdn.co/metashop/1dd97239/assets/images/asset-signal_special.svg',
        text: `${prize.additionalData.title}* ${prize.amount}`,
        probabilityDisplayed: prize.probabilityDisplayed
      }
    }
    if (prize.type === 'camouflage') {
      // 涂装
      return {
        type: 'camouflage',
        imgSrc: prize.additionalData.icons.default,
        text: prize.additionalData.title + '*' + prize.amount,
        probabilityDisplayed: prize.probabilityDisplayed
      }
    }
    if (prize.type === 'coal') {
      // 煤炭
      return {
        type: 'coal',
        imgSrc: 'https://glossary-wows-global.gcdn.co/icons/currencies/icon_coal_77725f14b70df96ca5fbd710be50c3f36b7eef5776e5002e8abd54395b1f2ef0.png',
        text: `煤炭* ${prize.amount}`,
        probabilityDisplayed: prize.probabilityDisplayed
      }
    }
    if (prize.type === 'free_xp') {
      // 全局经验
      return {
        type: 'free_xp',
        imgSrc: 'https://glossary-wows-global.gcdn.co/icons/currencies/icon_freeXP_7eca05d1e294ededa26004af1fbace51acb982c16f3f2ff3b9586d646da5a26a.png',
        text: `全局经验* ${prize.amount}`,
        probabilityDisplayed: prize.probabilityDisplayed
      }
    }
    if (prize.type === 'steel') {
      // 钢铁
      return {
        type: 'steel',
        imgSrc: 'https://glossary-wows-global.gcdn.co/icons/currencies/icon_steel_0ab140da55b4a1f263a02bbee94abb04a74beef50edeead6ad4b37fb3a244179.png',
        text: `钢铁* ${prize.amount}`,
        probabilityDisplayed: prize.probabilityDisplayed
      }
    }
    if (prize.type === 'collection_album') {
      // 收藏品
      return {
        type: 'collection_album',
        imgSrc: '',
        text: '收藏品',
        probabilityDisplayed: prize.probabilityDisplayed
      }
    }
  } else {
    // 否则是船
    let ship = prize.rewards[lodash.floor(Math.random() * prize.rewards.length)].additionalData
    while (prizeList.find(prize => {
      return prize.text === ship.title
    })) {
      ship = prize.rewards[lodash.floor(Math.random() * prize.rewards.length)].additionalData
    }
    return {
      type: 'ship',
      imgSrc: ship.icons.default,
      nationImgSrc: ship.nation.icons.large,
      text: ship.title,
      probabilityDisplayed: prize.probabilityDisplayed
    }
  }
  return {
    type: '',
    imgSrc: '',
    text: ''
  }
}
