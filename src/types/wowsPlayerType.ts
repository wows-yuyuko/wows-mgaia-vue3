/**
 * 用户基础信息
 */
export interface Account {
  accountId: number
  userName: string
  server: string
}

interface UserInfo {
  server: string // 服务器
  serverCn: string // 服务器中文
  clanInfo: {
    clanId: number // 舰队 id
    tag: string
    name: string
    description: string // 舰队说明
    color: string // 舰队等级颜色
    activeLevel: number // 工会更新等级？
  }
  accountId: number // 玩家id
  userName: string // 用户名
  accountCreateTime: number // 十位时间戳 账号注册时间
}
interface DwpData {
  damage: number // 对比上次记录场均变化
  wins: number // 对比上次记录胜率变化
  pr: number // 对比上次记录pr变化
}

/**
 * 玩家战绩信息
 */
export interface PlayerInfo {
  userInfo: UserInfo
  dwpData: DwpData
  prInfo: {
    code: number // pr颜色
    value: number // pr值
    nextValue: number // 距下一阶段数值
    name: '非常好'
    englishName: 'Great'
    color: '#02C9B3'
    details: {
      pr: 1886
      originalServer: {
        shipId: 0
        damage: 178292115.6435693
        frags: 1977.3794031417783
        wins: 1406.6351673123468
      }
      user: {
        shipId: 0
        damage: 238138561
        frags: 3231
        wins: 1780
      }
      userServer: {
        shipId: 0
        damage: 178292115.6435693
        frags: 1977.3794031417783
        wins: 1406.6351673123468
      }
      two: {
        shipId: 0
        damage: 1.3356651254061738
        frags: 1.633980810595273
        wins: 1.2654311802832572
      }
      three: {
        shipId: 0
        damage: 1.5594418756769564
        frags: 1.7044231228836364
        wins: 1.8847706009441905
      }
    }
  }
  battleTypeInfo: {
    PVP: {
      type: 'PVP'
      battle: true
      prInfo: {
        code: 6
        value: 1867
        nextValue: 233
        name: '非常好'
        englishName: 'Great'
        color: '#02C9B3'
        details: {
          pr: 1867
          originalServer: {
            shipId: 0
            damage: 195813813.74499592
            frags: 2306.400268738697
            wins: 1625.8415109647267
          }
          user: {
            shipId: 0
            damage: 260275629
            frags: 3709
            wins: 2049
          }
          userServer: {
            shipId: 0
            damage: 195813813.74499592
            frags: 2306.400268738697
            wins: 1625.8415109647267
          }
          two: {
            shipId: 0
            damage: 1.3291995289921237
            frags: 1.608133700933162
            wins: 1.260270442218063
          }
          three: {
            shipId: 0
            damage: 1.5486658816535395
            frags: 1.6757041121479577
            wins: 1.8675681407268767
          }
        }
      }
      shipInfo: {
        battleInfo: {
          battle: number // 总场次
          wins: number // 胜场
          losses: number // 败场
          survived: number // 存活场次
          winAndSurvived: number // 胜利并且存活场次
        }
        avgInfo: {
          damage: number // 场均伤害
          damageData: {
            code: 3
            value: 83000
            color: '#02C9B3'
          }
          scoutingDamage: 26578
          win: 63.18
          winsData: {
            code: 6
            value: 65
            color: '#673ab7'
          }
          kd: 2.54
          frags: 1.14
          shipsSpotted: 1
          planesKilled: 3
          artAgro: 928920
          tpdAgro: 74575
          xp: 2137
          basicXp: 0
        }
        fragsInfo: {
          frags: 3709
          fragsByMain: 2857
          fragsByAtba: 60
          fragsByPlanes: 143
          fragsByTpd: 237
          fragsByRam: 24
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 4276041424
            value: 8
          }
          maxFragsByMain: {
            shipId: 4276041424
            value: 7
          }
          maxFragsByTpd: {
            shipId: 4078352176
            value: 3
          }
          maxFragsByDbomb: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByRam: {
            shipId: 3764336624
            value: 1
          }
          maxFragsByAtba: {
            shipId: 3751753712
            value: 2
          }
          maxDamageDealtToBuildings: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 4183799600
            value: 4
          }
          maxDamageDealt: {
            shipId: 4276041424
            value: 306947
          }
          maxScoutingDamage: {
            shipId: 4179605200
            value: 228267
          }
          maxPlanesKilled: {
            shipId: 4179539792
            value: 82
          }
          maxShipsSpotted: {
            shipId: 4179605200
            value: 12
          }
          maxTotalAgro: {
            shipId: 4276041424
            value: 4121100
          }
          maxSuppressionsCount: {
            shipId: 4180588496
            value: 0
          }
          maxXp: {
            shipId: 4276041424
            value: 5718
          }
          maxBasicXp: {
            shipId: 4180588496
            value: 0
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 930.49
          gameContributionToDefense: 100
        }
        hitRatioInfo: {
          ratioMain: 34.81
          ratioAtba: 17.01
          ratioTpd: 7.42
          ratioTbomb: 0
        }
        lastBattleTime: 1553929148
        recordTime: 1700615462183
      }
    }
    PVP_DIV3: {
      type: 'PVP_DIV3'
      battle: true
      prInfo: {
        code: 6
        value: 1842
        nextValue: 258
        name: '非常好'
        englishName: 'Great'
        color: '#02C9B3'
        details: {
          pr: 1842
          originalServer: {
            shipId: 0
            damage: 89813871.35725729
            frags: 1026.9443137908806
            wins: 723.609542644844
          }
          user: {
            shipId: 0
            damage: 114563065
            frags: 1624
            wins: 979
          }
          userServer: {
            shipId: 0
            damage: 89813871.35725729
            frags: 1026.9443137908806
            wins: 723.609542644844
          }
          two: {
            shipId: 0
            damage: 1.2755609269340653
            frags: 1.5813905176660819
            wins: 1.3529395928385435
          }
          three: {
            shipId: 0
            damage: 1.4592682115567754
            frags: 1.645989464073424
            wins: 2.1764653094618116
          }
        }
      }
      shipInfo: {
        battleInfo: {
          battle: 1441
          wins: 979
          losses: 462
          survived: 825
          winAndSurvived: 738
        }
        avgInfo: {
          damage: 79502
          damageData: {
            code: 3
            value: 83000
            color: '#02C9B3'
          }
          scoutingDamage: 28720
          win: 67.94
          winsData: {
            code: 6
            value: 65
            color: '#673ab7'
          }
          kd: 2.64
          frags: 1.13
          shipsSpotted: 1
          planesKilled: 3
          artAgro: 975752
          tpdAgro: 78544
          xp: 2197
          basicXp: 0
        }
        fragsInfo: {
          frags: 1624
          fragsByMain: 1319
          fragsByAtba: 25
          fragsByPlanes: 27
          fragsByTpd: 98
          fragsByRam: 8
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 4180555728
            value: 6
          }
          maxFragsByMain: {
            shipId: 3763255024
            value: 5
          }
          maxFragsByTpd: {
            shipId: 4180555728
            value: 3
          }
          maxFragsByDbomb: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByRam: {
            shipId: 3764336624
            value: 1
          }
          maxFragsByAtba: {
            shipId: 4180588496
            value: 1
          }
          maxDamageDealtToBuildings: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 4179605200
            value: 3
          }
          maxDamageDealt: {
            shipId: 3761190608
            value: 289284
          }
          maxScoutingDamage: {
            shipId: 4074649296
            value: 212680
          }
          maxPlanesKilled: {
            shipId: 4277090288
            value: 46
          }
          maxShipsSpotted: {
            shipId: 4179605200
            value: 11
          }
          maxTotalAgro: {
            shipId: 4276041424
            value: 4121100
          }
          maxSuppressionsCount: {
            shipId: 4180588496
            value: 0
          }
          maxXp: {
            shipId: 4276041424
            value: 4754
          }
          maxBasicXp: {
            shipId: 4180588496
            value: 0
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 895.7
          gameContributionToDefense: 100
        }
        hitRatioInfo: {
          ratioMain: 34.24
          ratioAtba: 16.09
          ratioTpd: 6.72
          ratioTbomb: 0
        }
        lastBattleTime: 1553929148
        recordTime: 1700615462183
      }
    }
    PVP_SOLO: {
      type: 'PVP_SOLO'
      battle: true
      prInfo: {
        code: 6
        value: 1836
        nextValue: 264
        name: '非常好'
        englishName: 'Great'
        color: '#02C9B3'
        details: {
          pr: 1836
          originalServer: {
            shipId: 0
            damage: 54395780.24368934
            frags: 646.8827159301946
            wins: 457.6616403695212
          }
          user: {
            shipId: 0
            damage: 74120654
            frags: 1025
            wins: 520
          }
          userServer: {
            shipId: 0
            damage: 54395780.24368934
            frags: 646.8827159301946
            wins: 457.6616403695212
          }
          two: {
            shipId: 0
            damage: 1.362617719020567
            frags: 1.5845221626088524
            wins: 1.1362105847021526
          }
          three: {
            shipId: 0
            damage: 1.6043628650342785
            frags: 1.6494690695653913
            wins: 1.4540352823405087
          }
        }
      }
      shipInfo: {
        battleInfo: {
          battle: 919
          wins: 520
          losses: 397
          survived: 482
          winAndSurvived: 385
        }
        avgInfo: {
          damage: 80654
          damageData: {
            code: 3
            value: 83000
            color: '#02C9B3'
          }
          scoutingDamage: 24817
          win: 56.58
          winsData: {
            code: 5
            value: 60
            color: '#9c27b0'
          }
          kd: 2.35
          frags: 1.12
          shipsSpotted: 1
          planesKilled: 3
          artAgro: 856201
          tpdAgro: 68792
          xp: 2048
          basicXp: 0
        }
        fragsInfo: {
          frags: 1025
          fragsByMain: 706
          fragsByAtba: 14
          fragsByPlanes: 102
          fragsByTpd: 75
          fragsByRam: 6
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 4276041424
            value: 6
          }
          maxFragsByMain: {
            shipId: 4276041424
            value: 6
          }
          maxFragsByTpd: {
            shipId: 4078352176
            value: 3
          }
          maxFragsByDbomb: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByRam: {
            shipId: 3743364816
            value: 1
          }
          maxFragsByAtba: {
            shipId: 4180587984
            value: 1
          }
          maxDamageDealtToBuildings: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 4183799600
            value: 4
          }
          maxDamageDealt: {
            shipId: 4179605200
            value: 295626
          }
          maxScoutingDamage: {
            shipId: 4179605200
            value: 228267
          }
          maxPlanesKilled: {
            shipId: 4179539792
            value: 82
          }
          maxShipsSpotted: {
            shipId: 4179605200
            value: 12
          }
          maxTotalAgro: {
            shipId: 3760142032
            value: 3459003
          }
          maxSuppressionsCount: {
            shipId: 4180588496
            value: 0
          }
          maxXp: {
            shipId: 4179605200
            value: 4965
          }
          maxBasicXp: {
            shipId: 4180588496
            value: 0
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 1108.08
          gameContributionToDefense: 100
        }
        hitRatioInfo: {
          ratioMain: 35.33
          ratioAtba: 17.58
          ratioTpd: 8.61
          ratioTbomb: 0
        }
        lastBattleTime: 1553929148
        recordTime: 1700615462183
      }
    }
    RANK_SOLO: {
      type: 'RANK_SOLO'
      battle: true
      prInfo: {
        code: 4
        value: 1540
        nextValue: 10
        name: '好'
        englishName: 'Good'
        color: '#44B300'
        details: {
          pr: 1540
          originalServer: {
            shipId: 0
            damage: 16288311.028280973
            frags: 183.6507766620336
            wins: 130.0195495136542
          }
          user: {
            shipId: 0
            damage: 20622883
            frags: 217
            wins: 135
          }
          userServer: {
            shipId: 0
            damage: 16288311.028280973
            frags: 183.6507766620336
            wins: 130.0195495136542
          }
          two: {
            shipId: 0
            damage: 1.2661154962103205
            frags: 1.1815904290965122
            wins: 1.0383053971881573
          }
          three: {
            shipId: 0
            damage: 1.443525827017201
            frags: 1.201767143440569
            wins: 1.1276846572938577
          }
        }
      }
      shipInfo: {
        battleInfo: {
          battle: 258
          wins: 135
          losses: 123
          survived: 115
          winAndSurvived: 92
        }
        avgInfo: {
          damage: 79934
          damageData: {
            code: 3
            value: 83000
            color: '#02C9B3'
          }
          scoutingDamage: 14308
          win: 52.33
          winsData: {
            code: 4
            value: 55
            color: '#00bcd4'
          }
          kd: 1.52
          frags: 0.84
          shipsSpotted: 1
          planesKilled: 1
          artAgro: 1021735
          tpdAgro: 96596
          xp: 1950
          basicXp: 0
        }
        fragsInfo: {
          frags: 217
          fragsByMain: 160
          fragsByAtba: 16
          fragsByPlanes: 1
          fragsByTpd: 25
          fragsByRam: 8
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 3763287856
            value: 5
          }
          maxFragsByMain: {
            shipId: 3760142032
            value: 4
          }
          maxFragsByTpd: {
            shipId: 4183701296
            value: 2
          }
          maxFragsByDbomb: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByRam: {
            shipId: 4180621104
            value: 1
          }
          maxFragsByAtba: {
            shipId: 4075763504
            value: 2
          }
          maxDamageDealtToBuildings: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 4183799600
            value: 1
          }
          maxDamageDealt: {
            shipId: 4075763504
            value: 214838
          }
          maxScoutingDamage: {
            shipId: 4276041424
            value: 101887
          }
          maxPlanesKilled: {
            shipId: 4074649296
            value: 29
          }
          maxShipsSpotted: {
            shipId: 4183799600
            value: 6
          }
          maxTotalAgro: {
            shipId: 4276041424
            value: 3472300
          }
          maxSuppressionsCount: {
            shipId: 4180588496
            value: 0
          }
          maxXp: {
            shipId: 3760142032
            value: 4167
          }
          maxBasicXp: {
            shipId: 4180588496
            value: 0
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 0
          gameContributionToDefense: 100
        }
        hitRatioInfo: {
          ratioMain: 40.94
          ratioAtba: 26.83
          ratioTpd: 7.94
          ratioTbomb: 0
        }
        lastBattleTime: 1553929148
        recordTime: 1700615462183
      }
    }
    PVP_DIV2: {
      type: 'PVP_DIV2'
      battle: true
      prInfo: {
        code: 6
        value: 1946
        nextValue: 154
        name: '非常好'
        englishName: 'Great'
        color: '#02C9B3'
        details: {
          pr: 1946
          originalServer: {
            shipId: 0
            damage: 51604162.1440493
            frags: 632.5732390176216
            wins: 444.5703279503601
          }
          user: {
            shipId: 0
            damage: 71591910
            frags: 1060
            wins: 550
          }
          userServer: {
            shipId: 0
            damage: 51604162.1440493
            frags: 632.5732390176216
            wins: 444.5703279503601
          }
          two: {
            shipId: 0
            damage: 1.3873282120181767
            frags: 1.6756952944234043
            wins: 1.2371495923619356
          }
          three: {
            shipId: 0
            damage: 1.6455470200302944
            frags: 1.750772549359338
            wins: 1.7904986412064516
          }
        }
      }
      shipInfo: {
        battleInfo: {
          battle: 883
          wins: 550
          losses: 332
          survived: 473
          winAndSurvived: 391
        }
        avgInfo: {
          damage: 81078
          damageData: {
            code: 3
            value: 83000
            color: '#02C9B3'
          }
          scoutingDamage: 24916
          win: 62.29
          winsData: {
            code: 6
            value: 65
            color: '#673ab7'
          }
          kd: 2.59
          frags: 1.2
          shipsSpotted: 1
          planesKilled: 3
          artAgro: 928178
          tpdAgro: 74117
          xp: 2133
          basicXp: 0
        }
        fragsInfo: {
          frags: 1060
          fragsByMain: 832
          fragsByAtba: 21
          fragsByPlanes: 14
          fragsByTpd: 64
          fragsByRam: 10
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 4276041424
            value: 8
          }
          maxFragsByMain: {
            shipId: 4276041424
            value: 7
          }
          maxFragsByTpd: {
            shipId: 4078352176
            value: 3
          }
          maxFragsByDbomb: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByRam: {
            shipId: 3751753712
            value: 1
          }
          maxFragsByAtba: {
            shipId: 3751753712
            value: 2
          }
          maxDamageDealtToBuildings: {
            shipId: 4180588496
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 3655317296
            value: 2
          }
          maxDamageDealt: {
            shipId: 4276041424
            value: 306947
          }
          maxScoutingDamage: {
            shipId: 3865982416
            value: 167638
          }
          maxPlanesKilled: {
            shipId: 3751753712
            value: 49
          }
          maxShipsSpotted: {
            shipId: 4181702352
            value: 11
          }
          maxTotalAgro: {
            shipId: 3760142032
            value: 3536001
          }
          maxSuppressionsCount: {
            shipId: 4180588496
            value: 0
          }
          maxXp: {
            shipId: 4276041424
            value: 5718
          }
          maxBasicXp: {
            shipId: 4180588496
            value: 0
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 852.13
          gameContributionToDefense: 100
        }
        hitRatioInfo: {
          ratioMain: 35.17
          ratioAtba: 17.68
          ratioTpd: 7.28
          ratioTbomb: 0
        }
        lastBattleTime: 1553929148
        recordTime: 1700615462183
      }
    }
  }
  shipTypeInfo: {
    Cruiser: {
      PVP: {
        type: 'PVP'
        battle: true
        prInfo: {
          code: 6
          value: 1950
          nextValue: 150
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 1950
            originalServer: {
              shipId: 0
              damage: 73079956.55756874
              frags: 828.2764237756616
              wins: 624.1202734565553
            }
            user: {
              shipId: 0
              damage: 99594746
              frags: 1432
              wins: 791
            }
            userServer: {
              shipId: 0
              damage: 73079956.55756874
              frags: 828.2764237756616
              wins: 624.1202734565553
            }
            two: {
              shipId: 0
              damage: 1.3628188998928075
              frags: 1.7288914170371905
              wins: 1.2673839220431302
            }
            three: {
              shipId: 0
              damage: 1.6046981664880124
              frags: 1.8098793522635448
              wins: 1.8912797401437673
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 1252
            wins: 791
            losses: 459
            survived: 676
            winAndSurvived: 572
          }
          avgInfo: {
            damage: 79549
            damageData: {
              code: 3
              value: 83000
              color: '#02C9B3'
            }
            scoutingDamage: 22578
            win: 63.18
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.49
            frags: 1.14
            shipsSpotted: 0
            planesKilled: 3
            artAgro: 922501
            tpdAgro: 65132
            xp: 2142
            basicXp: 0
          }
          fragsInfo: {
            frags: 1432
            fragsByMain: 1171
            fragsByAtba: 12
            fragsByPlanes: 1
            fragsByTpd: 22
            fragsByRam: 5
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 3655251408
              value: 5
            }
            maxFragsByMain: {
              shipId: 4180588336
              value: 5
            }
            maxFragsByTpd: {
              shipId: 3762206512
              value: 2
            }
            maxFragsByDbomb: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByRam: {
              shipId: 4179539408
              value: 1
            }
            maxFragsByAtba: {
              shipId: 4178491216
              value: 1
            }
            maxDamageDealtToBuildings: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 3760109552
              value: 1
            }
            maxDamageDealt: {
              shipId: 3655251952
              value: 237145
            }
            maxScoutingDamage: {
              shipId: 4273911792
              value: 149915
            }
            maxPlanesKilled: {
              shipId: 4179539792
              value: 82
            }
            maxShipsSpotted: {
              shipId: 3658397424
              value: 6
            }
            maxTotalAgro: {
              shipId: 3760109552
              value: 3438300
            }
            maxSuppressionsCount: {
              shipId: 3655251408
              value: 0
            }
            maxXp: {
              shipId: 3749623504
              value: 4850
            }
            maxBasicXp: {
              shipId: 3655251408
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 1465.15
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 34.57
            ratioAtba: 13.87
            ratioTpd: 4.58
            ratioTbomb: 0
          }
          lastBattleTime: 1671682401
          recordTime: 1700615462182
        }
      }
      PVP_DIV3: {
        type: 'PVP_DIV3'
        battle: true
        prInfo: {
          code: 6
          value: 1867
          nextValue: 233
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 1867
            originalServer: {
              shipId: 0
              damage: 31582018.563181557
              frags: 348.7844536407405
              wins: 262.8775473603704
            }
            user: {
              shipId: 0
              damage: 39970474
              frags: 584
              wins: 359
            }
            userServer: {
              shipId: 0
              damage: 31582018.563181557
              frags: 348.7844536407405
              wins: 262.8775473603704
            }
            two: {
              shipId: 0
              damage: 1.2656085905350503
              frags: 1.6743865556620803
              wins: 1.3656548594766766
            }
            three: {
              shipId: 0
              damage: 1.4426809842250838
              frags: 1.749318395180089
              wins: 2.218849531588922
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 526
            wins: 359
            losses: 167
            survived: 295
            winAndSurvived: 257
          }
          avgInfo: {
            damage: 75989
            damageData: {
              code: 3
              value: 83000
              color: '#02C9B3'
            }
            scoutingDamage: 25360
            win: 68.25
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.53
            frags: 1.11
            shipsSpotted: 0
            planesKilled: 4
            artAgro: 932322
            tpdAgro: 65587
            xp: 2161
            basicXp: 0
          }
          fragsInfo: {
            frags: 584
            fragsByMain: 490
            fragsByAtba: 4
            fragsByPlanes: 1
            fragsByTpd: 8
            fragsByRam: 2
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4180588336
              value: 5
            }
            maxFragsByMain: {
              shipId: 4180588336
              value: 5
            }
            maxFragsByTpd: {
              shipId: 3762206512
              value: 2
            }
            maxFragsByDbomb: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByRam: {
              shipId: 3969824208
              value: 1
            }
            maxFragsByAtba: {
              shipId: 4178491216
              value: 1
            }
            maxDamageDealtToBuildings: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 3760109552
              value: 1
            }
            maxDamageDealt: {
              shipId: 4259231440
              value: 200566
            }
            maxScoutingDamage: {
              shipId: 4273911792
              value: 149915
            }
            maxPlanesKilled: {
              shipId: 4179539920
              value: 44
            }
            maxShipsSpotted: {
              shipId: 4180587984
              value: 5
            }
            maxTotalAgro: {
              shipId: 3760109552
              value: 3438300
            }
            maxSuppressionsCount: {
              shipId: 3655251408
              value: 0
            }
            maxXp: {
              shipId: 4273911792
              value: 4261
            }
            maxBasicXp: {
              shipId: 3655251408
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 1510.91
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 34.21
            ratioAtba: 12.41
            ratioTpd: 3.8
            ratioTbomb: 0
          }
          lastBattleTime: 1671682401
          recordTime: 1700615462182
        }
      }
      PVP_SOLO: {
        type: 'PVP_SOLO'
        battle: true
        prInfo: {
          code: 6
          value: 1971
          nextValue: 129
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 1971
            originalServer: {
              shipId: 0
              damage: 21871390.402183004
              frags: 242.57482432796436
              wins: 181.49358541060863
            }
            user: {
              shipId: 0
              damage: 31373989
              frags: 408
              wins: 213
            }
            userServer: {
              shipId: 0
              damage: 21871390.402183004
              frags: 242.57482432796436
              wins: 181.49358541060863
            }
            two: {
              shipId: 0
              damage: 1.4344762003273708
              frags: 1.6819552529011774
              wins: 1.1735951963156808
            }
            three: {
              shipId: 0
              damage: 1.7241270005456182
              frags: 1.7577280587790858
              wins: 1.5786506543856025
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 366
            wins: 213
            losses: 151
            survived: 183
            winAndSurvived: 152
          }
          avgInfo: {
            damage: 85721
            damageData: {
              code: 4
              value: 95000
              color: '#A00DC5'
            }
            scoutingDamage: 20127
            win: 58.2
            winsData: {
              code: 5
              value: 60
              color: '#9c27b0'
            }
            kd: 2.23
            frags: 1.11
            shipsSpotted: 0
            planesKilled: 3
            artAgro: 941676
            tpdAgro: 66518
            xp: 2133
            basicXp: 0
          }
          fragsInfo: {
            frags: 408
            fragsByMain: 336
            fragsByAtba: 3
            fragsByPlanes: 0
            fragsByTpd: 8
            fragsByRam: 1
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4180588272
              value: 5
            }
            maxFragsByMain: {
              shipId: 4180588272
              value: 5
            }
            maxFragsByTpd: {
              shipId: 3655251408
              value: 1
            }
            maxFragsByDbomb: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByRam: {
              shipId: 4179539408
              value: 1
            }
            maxFragsByAtba: {
              shipId: 4180587984
              value: 1
            }
            maxDamageDealtToBuildings: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 3655251408
              value: 0
            }
            maxDamageDealt: {
              shipId: 3969824208
              value: 235485
            }
            maxScoutingDamage: {
              shipId: 4259231440
              value: 138035
            }
            maxPlanesKilled: {
              shipId: 4179539792
              value: 82
            }
            maxShipsSpotted: {
              shipId: 4074681808
              value: 5
            }
            maxTotalAgro: {
              shipId: 4179539408
              value: 3092050
            }
            maxSuppressionsCount: {
              shipId: 3655251408
              value: 0
            }
            maxXp: {
              shipId: 3749623504
              value: 4850
            }
            maxBasicXp: {
              shipId: 3655251408
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 1648.42
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 35.01
            ratioAtba: 13.78
            ratioTpd: 5.07
            ratioTbomb: 0
          }
          lastBattleTime: 1671682401
          recordTime: 1700615462182
        }
      }
      RANK_SOLO: {
        type: 'RANK_SOLO'
        battle: true
        prInfo: {
          code: 3
          value: 1342
          nextValue: 8
          name: '平均水平'
          englishName: 'Average'
          color: '#FFC71F'
          details: {
            pr: 1342
            originalServer: {
              shipId: 0
              damage: 1597746.0097874904
              frags: 17.19456693406589
              wins: 12.839104177128831
            }
            user: {
              shipId: 0
              damage: 1965369
              frags: 21
              wins: 7
            }
            userServer: {
              shipId: 0
              damage: 1597746.0097874904
              frags: 17.19456693406589
              wins: 12.839104177128831
            }
            two: {
              shipId: 0
              damage: 1.23008850465626
              frags: 1.2213160168864028
              wins: 0.5452093778060915
            }
            three: {
              shipId: 0
              damage: 1.3834808410937667
              frags: 1.2459066854293364
              wins: 0
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 25
            wins: 7
            losses: 18
            survived: 10
            winAndSurvived: 6
          }
          avgInfo: {
            damage: 78615
            damageData: {
              code: 3
              value: 83000
              color: '#02C9B3'
            }
            scoutingDamage: 10652
            win: 28
            winsData: {
              code: 1
              value: 40
              color: '#f44336'
            }
            kd: 1.4
            frags: 0.84
            shipsSpotted: 1
            planesKilled: 1
            artAgro: 1219054
            tpdAgro: 44351
            xp: 1829
            basicXp: 0
          }
          fragsInfo: {
            frags: 21
            fragsByMain: 20
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 3655251952
              value: 3
            }
            maxFragsByMain: {
              shipId: 3655251952
              value: 3
            }
            maxFragsByTpd: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByRam: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByAtba: {
              shipId: 3655251408
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 3655251408
              value: 0
            }
            maxDamageDealt: {
              shipId: 3760109008
              value: 168231
            }
            maxScoutingDamage: {
              shipId: 3760109552
              value: 61110
            }
            maxPlanesKilled: {
              shipId: 4273911792
              value: 21
            }
            maxShipsSpotted: {
              shipId: 3655251952
              value: 3
            }
            maxTotalAgro: {
              shipId: 3655251952
              value: 2481900
            }
            maxSuppressionsCount: {
              shipId: 3655251408
              value: 0
            }
            maxXp: {
              shipId: 3760109008
              value: 3266
            }
            maxBasicXp: {
              shipId: 3655251408
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 41.18
            ratioAtba: 16.46
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 1671682401
          recordTime: 1700615462182
        }
      }
      PVP_DIV2: {
        type: 'PVP_DIV2'
        battle: true
        prInfo: {
          code: 6
          value: 2058
          nextValue: 42
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 2058
            originalServer: {
              shipId: 0
              damage: 19626547.592204157
              frags: 236.91714580695674
              wins: 179.74914068557675
            }
            user: {
              shipId: 0
              damage: 28250283
              frags: 440
              wins: 219
            }
            userServer: {
              shipId: 0
              damage: 19626547.592204157
              frags: 236.91714580695674
              wins: 179.74914068557675
            }
            two: {
              shipId: 0
              damage: 1.4393913584282785
              frags: 1.857189349894152
              wins: 1.2183646562354487
            }
            three: {
              shipId: 0
              damage: 1.7323189307137974
              frags: 1.9524326109935022
              wins: 1.7278821874514954
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 360
            wins: 219
            losses: 141
            survived: 198
            winAndSurvived: 163
          }
          avgInfo: {
            damage: 78473
            damageData: {
              code: 3
              value: 83000
              color: '#02C9B3'
            }
            scoutingDamage: 21004
            win: 60.83
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.72
            frags: 1.22
            shipsSpotted: 0
            planesKilled: 4
            artAgro: 888657
            tpdAgro: 63059
            xp: 2122
            basicXp: 0
          }
          fragsInfo: {
            frags: 440
            fragsByMain: 345
            fragsByAtba: 5
            fragsByPlanes: 0
            fragsByTpd: 6
            fragsByRam: 2
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 3655251408
              value: 5
            }
            maxFragsByMain: {
              shipId: 3655251408
              value: 4
            }
            maxFragsByTpd: {
              shipId: 4182685648
              value: 1
            }
            maxFragsByDbomb: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByRam: {
              shipId: 4273911792
              value: 1
            }
            maxFragsByAtba: {
              shipId: 4180588496
              value: 1
            }
            maxDamageDealtToBuildings: {
              shipId: 3655251408
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 3655251408
              value: 0
            }
            maxDamageDealt: {
              shipId: 3655251952
              value: 237145
            }
            maxScoutingDamage: {
              shipId: 3655251952
              value: 125146
            }
            maxPlanesKilled: {
              shipId: 3749623504
              value: 41
            }
            maxShipsSpotted: {
              shipId: 3658397424
              value: 6
            }
            maxTotalAgro: {
              shipId: 3655251952
              value: 3313350
            }
            maxSuppressionsCount: {
              shipId: 3655251408
              value: 0
            }
            maxXp: {
              shipId: 4077828080
              value: 4226
            }
            maxBasicXp: {
              shipId: 3655251408
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 1261.85
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 34.58
            ratioAtba: 15.96
            ratioTpd: 5.03
            ratioTbomb: 0
          }
          lastBattleTime: 1671682401
          recordTime: 1700615462182
        }
      }
    }
    Auxiliary: {
      PVP: {
        type: 'PVP'
        battle: false
        prInfo: {
          code: 0
          value: 0
          nextValue: 0
          name: '暂无数据'
          englishName: 'No Rating'
          color: '#828282'
          details: {
            pr: 0
            originalServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            user: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            userServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            two: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            three: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 0
            wins: 0
            losses: 0
            survived: 0
            winAndSurvived: 0
          }
          avgInfo: {
            damage: 0
            damageData: {
              code: 0
              value: 0
              color: '#FE7903'
            }
            scoutingDamage: 0
            win: 0
            winsData: {
              code: 1
              value: 40
              color: '#f44336'
            }
            kd: 0
            frags: 0
            shipsSpotted: 0
            planesKilled: 0
            artAgro: 0
            tpdAgro: 0
            xp: 0
            basicXp: 0
          }
          fragsInfo: {
            frags: 0
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 0
              value: 0
            }
            maxFragsByMain: {
              shipId: 0
              value: 0
            }
            maxFragsByTpd: {
              shipId: 0
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 0
              value: 0
            }
            maxFragsByRam: {
              shipId: 0
              value: 0
            }
            maxFragsByAtba: {
              shipId: 0
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 0
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 0
              value: 0
            }
            maxDamageDealt: {
              shipId: 0
              value: 0
            }
            maxScoutingDamage: {
              shipId: 0
              value: 0
            }
            maxPlanesKilled: {
              shipId: 0
              value: 0
            }
            maxShipsSpotted: {
              shipId: 0
              value: 0
            }
            maxTotalAgro: {
              shipId: 0
              value: 0
            }
            maxSuppressionsCount: {
              shipId: 0
              value: 0
            }
            maxXp: {
              shipId: 0
              value: 0
            }
            maxBasicXp: {
              shipId: 0
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 0
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 0
          recordTime: 0
        }
      }
      PVP_SOLO: {
        type: 'PVP_SOLO'
        battle: false
        prInfo: {
          code: 0
          value: 0
          nextValue: 0
          name: '暂无数据'
          englishName: 'No Rating'
          color: '#828282'
          details: {
            pr: 0
            originalServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            user: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            userServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            two: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            three: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 0
            wins: 0
            losses: 0
            survived: 0
            winAndSurvived: 0
          }
          avgInfo: {
            damage: 0
            damageData: {
              code: 0
              value: 0
              color: '#FE7903'
            }
            scoutingDamage: 0
            win: 0
            winsData: {
              code: 1
              value: 40
              color: '#f44336'
            }
            kd: 0
            frags: 0
            shipsSpotted: 0
            planesKilled: 0
            artAgro: 0
            tpdAgro: 0
            xp: 0
            basicXp: 0
          }
          fragsInfo: {
            frags: 0
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 0
              value: 0
            }
            maxFragsByMain: {
              shipId: 0
              value: 0
            }
            maxFragsByTpd: {
              shipId: 0
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 0
              value: 0
            }
            maxFragsByRam: {
              shipId: 0
              value: 0
            }
            maxFragsByAtba: {
              shipId: 0
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 0
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 0
              value: 0
            }
            maxDamageDealt: {
              shipId: 0
              value: 0
            }
            maxScoutingDamage: {
              shipId: 0
              value: 0
            }
            maxPlanesKilled: {
              shipId: 0
              value: 0
            }
            maxShipsSpotted: {
              shipId: 0
              value: 0
            }
            maxTotalAgro: {
              shipId: 0
              value: 0
            }
            maxSuppressionsCount: {
              shipId: 0
              value: 0
            }
            maxXp: {
              shipId: 0
              value: 0
            }
            maxBasicXp: {
              shipId: 0
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 0
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 0
          recordTime: 0
        }
      }
      PVP_DIV2: {
        type: 'PVP_DIV2'
        battle: false
        prInfo: {
          code: 0
          value: 0
          nextValue: 0
          name: '暂无数据'
          englishName: 'No Rating'
          color: '#828282'
          details: {
            pr: 0
            originalServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            user: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            userServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            two: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            three: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 0
            wins: 0
            losses: 0
            survived: 0
            winAndSurvived: 0
          }
          avgInfo: {
            damage: 0
            damageData: {
              code: 0
              value: 0
              color: '#FE7903'
            }
            scoutingDamage: 0
            win: 0
            winsData: {
              code: 1
              value: 40
              color: '#f44336'
            }
            kd: 0
            frags: 0
            shipsSpotted: 0
            planesKilled: 0
            artAgro: 0
            tpdAgro: 0
            xp: 0
            basicXp: 0
          }
          fragsInfo: {
            frags: 0
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 0
              value: 0
            }
            maxFragsByMain: {
              shipId: 0
              value: 0
            }
            maxFragsByTpd: {
              shipId: 0
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 0
              value: 0
            }
            maxFragsByRam: {
              shipId: 0
              value: 0
            }
            maxFragsByAtba: {
              shipId: 0
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 0
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 0
              value: 0
            }
            maxDamageDealt: {
              shipId: 0
              value: 0
            }
            maxScoutingDamage: {
              shipId: 0
              value: 0
            }
            maxPlanesKilled: {
              shipId: 0
              value: 0
            }
            maxShipsSpotted: {
              shipId: 0
              value: 0
            }
            maxTotalAgro: {
              shipId: 0
              value: 0
            }
            maxSuppressionsCount: {
              shipId: 0
              value: 0
            }
            maxXp: {
              shipId: 0
              value: 0
            }
            maxBasicXp: {
              shipId: 0
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 0
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 0
          recordTime: 0
        }
      }
      PVP_DIV3: {
        type: 'PVP_DIV3'
        battle: false
        prInfo: {
          code: 0
          value: 0
          nextValue: 0
          name: '暂无数据'
          englishName: 'No Rating'
          color: '#828282'
          details: {
            pr: 0
            originalServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            user: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            userServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            two: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            three: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 0
            wins: 0
            losses: 0
            survived: 0
            winAndSurvived: 0
          }
          avgInfo: {
            damage: 0
            damageData: {
              code: 0
              value: 0
              color: '#FE7903'
            }
            scoutingDamage: 0
            win: 0
            winsData: {
              code: 1
              value: 40
              color: '#f44336'
            }
            kd: 0
            frags: 0
            shipsSpotted: 0
            planesKilled: 0
            artAgro: 0
            tpdAgro: 0
            xp: 0
            basicXp: 0
          }
          fragsInfo: {
            frags: 0
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 0
              value: 0
            }
            maxFragsByMain: {
              shipId: 0
              value: 0
            }
            maxFragsByTpd: {
              shipId: 0
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 0
              value: 0
            }
            maxFragsByRam: {
              shipId: 0
              value: 0
            }
            maxFragsByAtba: {
              shipId: 0
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 0
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 0
              value: 0
            }
            maxDamageDealt: {
              shipId: 0
              value: 0
            }
            maxScoutingDamage: {
              shipId: 0
              value: 0
            }
            maxPlanesKilled: {
              shipId: 0
              value: 0
            }
            maxShipsSpotted: {
              shipId: 0
              value: 0
            }
            maxTotalAgro: {
              shipId: 0
              value: 0
            }
            maxSuppressionsCount: {
              shipId: 0
              value: 0
            }
            maxXp: {
              shipId: 0
              value: 0
            }
            maxBasicXp: {
              shipId: 0
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 0
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 0
          recordTime: 0
        }
      }
      RANK_SOLO: {
        type: 'RANK_SOLO'
        battle: false
        prInfo: {
          code: 0
          value: 0
          nextValue: 0
          name: '暂无数据'
          englishName: 'No Rating'
          color: '#828282'
          details: {
            pr: 0
            originalServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            user: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            userServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            two: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            three: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 0
            wins: 0
            losses: 0
            survived: 0
            winAndSurvived: 0
          }
          avgInfo: {
            damage: 0
            damageData: {
              code: 0
              value: 0
              color: '#FE7903'
            }
            scoutingDamage: 0
            win: 0
            winsData: {
              code: 1
              value: 40
              color: '#f44336'
            }
            kd: 0
            frags: 0
            shipsSpotted: 0
            planesKilled: 0
            artAgro: 0
            tpdAgro: 0
            xp: 0
            basicXp: 0
          }
          fragsInfo: {
            frags: 0
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 0
              value: 0
            }
            maxFragsByMain: {
              shipId: 0
              value: 0
            }
            maxFragsByTpd: {
              shipId: 0
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 0
              value: 0
            }
            maxFragsByRam: {
              shipId: 0
              value: 0
            }
            maxFragsByAtba: {
              shipId: 0
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 0
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 0
              value: 0
            }
            maxDamageDealt: {
              shipId: 0
              value: 0
            }
            maxScoutingDamage: {
              shipId: 0
              value: 0
            }
            maxPlanesKilled: {
              shipId: 0
              value: 0
            }
            maxShipsSpotted: {
              shipId: 0
              value: 0
            }
            maxTotalAgro: {
              shipId: 0
              value: 0
            }
            maxSuppressionsCount: {
              shipId: 0
              value: 0
            }
            maxXp: {
              shipId: 0
              value: 0
            }
            maxBasicXp: {
              shipId: 0
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 0
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 0
          recordTime: 0
        }
      }
    }
    Submarine: {
      PVP: {
        type: 'PVP'
        battle: true
        prInfo: {
          code: 5
          value: 1672
          nextValue: 78
          name: '很好'
          englishName: 'Very Good'
          color: '#318000'
          details: {
            pr: 1672
            originalServer: {
              shipId: 0
              damage: 732726.0693975904
              frags: 17.422522891565393
              wins: 16.069544325300686
            }
            user: {
              shipId: 0
              damage: 885001
              frags: 24
              wins: 21
            }
            userServer: {
              shipId: 0
              damage: 732726.0693975904
              frags: 17.422522891565393
              wins: 16.069544325300686
            }
            two: {
              shipId: 0
              damage: 1.2078197254911405
              frags: 1.377527247309223
              wins: 1.3068198808186837
            }
            three: {
              shipId: 0
              damage: 1.3463662091519009
              frags: 1.41947471923247
              wins: 2.0227329360622788
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 31
            wins: 21
            losses: 10
            survived: 18
            winAndSurvived: 17
          }
          avgInfo: {
            damage: 28548
            damageData: {
              code: 1
              value: 70000
              color: '#FE7903'
            }
            scoutingDamage: 23958
            win: 67.74
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 1.85
            frags: 0.77
            shipsSpotted: 2
            planesKilled: 0
            artAgro: 102692
            tpdAgro: 51871
            xp: 1694
            basicXp: 0
          }
          fragsInfo: {
            frags: 24
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 22
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4078352176
              value: 3
            }
            maxFragsByMain: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4078352176
              value: 3
            }
            maxFragsByDbomb: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181112624
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4181112624
              value: 0
            }
            maxDamageDealt: {
              shipId: 4078352176
              value: 73930
            }
            maxScoutingDamage: {
              shipId: 4078352176
              value: 105333
            }
            maxPlanesKilled: {
              shipId: 4181112624
              value: 0
            }
            maxShipsSpotted: {
              shipId: 4078352176
              value: 5
            }
            maxTotalAgro: {
              shipId: 4078352176
              value: 614167
            }
            maxSuppressionsCount: {
              shipId: 4181112624
              value: 0
            }
            maxXp: {
              shipId: 4078352176
              value: 2843
            }
            maxBasicXp: {
              shipId: 4181112624
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 603.27
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 20.93
            ratioTpd: 20.07
            ratioTbomb: 0
          }
          lastBattleTime: 1629037825
          recordTime: 1700615462182
        }
      }
      PVP_DIV3: {
        type: 'PVP_DIV3'
        battle: true
        prInfo: {
          code: 6
          value: 1920
          nextValue: 180
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 1920
            originalServer: {
              shipId: 0
              damage: 70908.97445783133
              frags: 1.686050602409554
              wins: 1.5551171927710343
            }
            user: {
              shipId: 0
              damage: 107681
              frags: 0
              wins: 3
            }
            userServer: {
              shipId: 0
              damage: 70908.97445783133
              frags: 1.686050602409554
              wins: 1.5551171927710343
            }
            two: {
              shipId: 0
              damage: 1.5185806990345987
              frags: 0
              wins: 1.929115062160914
            }
            three: {
              shipId: 0
              damage: 1.8643011650576646
              frags: 0
              wins: 4.097050207203046
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 3
            wins: 3
            losses: 0
            survived: 3
            winAndSurvived: 3
          }
          avgInfo: {
            damage: 35894
            damageData: {
              code: 1
              value: 70000
              color: '#FE7903'
            }
            scoutingDamage: 38941
            win: 100
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 0
            frags: 0
            shipsSpotted: 1
            planesKilled: 0
            artAgro: 131933
            tpdAgro: 0
            xp: 1966
            basicXp: 0
          }
          fragsInfo: {
            frags: 0
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByMain: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181112624
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4181112624
              value: 0
            }
            maxDamageDealt: {
              shipId: 4078352176
              value: 61394
            }
            maxScoutingDamage: {
              shipId: 4078352176
              value: 48395
            }
            maxPlanesKilled: {
              shipId: 4181112624
              value: 0
            }
            maxShipsSpotted: {
              shipId: 4078352176
              value: 3
            }
            maxTotalAgro: {
              shipId: 4078352176
              value: 376800
            }
            maxSuppressionsCount: {
              shipId: 4181112624
              value: 0
            }
            maxXp: {
              shipId: 4078352176
              value: 2243
            }
            maxBasicXp: {
              shipId: 4181112624
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 376.25
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 24.69
            ratioTbomb: 0
          }
          lastBattleTime: 1629037825
          recordTime: 1700615462182
        }
      }
      PVP_SOLO: {
        type: 'PVP_SOLO'
        battle: true
        prInfo: {
          code: 6
          value: 1756
          nextValue: 344
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 1756
            originalServer: {
              shipId: 0
              damage: 496362.8212048193
              frags: 11.802354216866878
              wins: 10.88582034939724
            }
            user: {
              shipId: 0
              damage: 631047
              frags: 17
              wins: 14
            }
            userServer: {
              shipId: 0
              damage: 496362.8212048193
              frags: 11.802354216866878
              wins: 10.88582034939724
            }
            two: {
              shipId: 0
              damage: 1.2713421977662678
              frags: 1.4403905939126203
              wins: 1.286076708107276
            }
            three: {
              shipId: 0
              damage: 1.452236996277113
              frags: 1.4893228821251334
              wins: 1.9535890270242529
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 21
            wins: 14
            losses: 7
            survived: 11
            winAndSurvived: 10
          }
          avgInfo: {
            damage: 30050
            damageData: {
              code: 1
              value: 70000
              color: '#FE7903'
            }
            scoutingDamage: 24812
            win: 66.67
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 1.7
            frags: 0.81
            shipsSpotted: 2
            planesKilled: 0
            artAgro: 87119
            tpdAgro: 59129
            xp: 1721
            basicXp: 0
          }
          fragsInfo: {
            frags: 17
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 16
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4078352176
              value: 3
            }
            maxFragsByMain: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4078352176
              value: 3
            }
            maxFragsByDbomb: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181112624
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4181112624
              value: 0
            }
            maxDamageDealt: {
              shipId: 4078352176
              value: 73930
            }
            maxScoutingDamage: {
              shipId: 4078352176
              value: 105333
            }
            maxPlanesKilled: {
              shipId: 4181112624
              value: 0
            }
            maxShipsSpotted: {
              shipId: 4078352176
              value: 5
            }
            maxTotalAgro: {
              shipId: 4078352176
              value: 509664
            }
            maxSuppressionsCount: {
              shipId: 4181112624
              value: 0
            }
            maxXp: {
              shipId: 4078352176
              value: 2843
            }
            maxBasicXp: {
              shipId: 4181112624
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 693.3
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 21.95
            ratioTpd: 19.85
            ratioTbomb: 0
          }
          lastBattleTime: 1629037825
          recordTime: 1700615462182
        }
      }
      RANK_SOLO: {
        type: 'RANK_SOLO'
        battle: false
        prInfo: {
          code: 0
          value: 0
          nextValue: 0
          name: '暂无数据'
          englishName: 'No Rating'
          color: '#828282'
          details: {
            pr: 0
            originalServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            user: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            userServer: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            two: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
            three: {
              shipId: 0
              damage: 0
              frags: 0
              wins: 0
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 0
            wins: 0
            losses: 0
            survived: 0
            winAndSurvived: 0
          }
          avgInfo: {
            damage: 0
            damageData: {
              code: 0
              value: 0
              color: '#FE7903'
            }
            scoutingDamage: 0
            win: 0
            winsData: {
              code: 1
              value: 40
              color: '#f44336'
            }
            kd: 0
            frags: 0
            shipsSpotted: 0
            planesKilled: 0
            artAgro: 0
            tpdAgro: 0
            xp: 0
            basicXp: 0
          }
          fragsInfo: {
            frags: 0
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 0
              value: 0
            }
            maxFragsByMain: {
              shipId: 0
              value: 0
            }
            maxFragsByTpd: {
              shipId: 0
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 0
              value: 0
            }
            maxFragsByRam: {
              shipId: 0
              value: 0
            }
            maxFragsByAtba: {
              shipId: 0
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 0
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 0
              value: 0
            }
            maxDamageDealt: {
              shipId: 0
              value: 0
            }
            maxScoutingDamage: {
              shipId: 0
              value: 0
            }
            maxPlanesKilled: {
              shipId: 0
              value: 0
            }
            maxShipsSpotted: {
              shipId: 0
              value: 0
            }
            maxTotalAgro: {
              shipId: 0
              value: 0
            }
            maxSuppressionsCount: {
              shipId: 0
              value: 0
            }
            maxXp: {
              shipId: 0
              value: 0
            }
            maxBasicXp: {
              shipId: 0
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 0
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 0
          recordTime: 0
        }
      }
      PVP_DIV2: {
        type: 'PVP_DIV2'
        battle: true
        prInfo: {
          code: 3
          value: 1326
          nextValue: 24
          name: '平均水平'
          englishName: 'Average'
          color: '#FFC71F'
          details: {
            pr: 1326
            originalServer: {
              shipId: 0
              damage: 165454.27373493978
              frags: 3.9341180722889595
              wins: 3.6286067831324136
            }
            user: {
              shipId: 0
              damage: 146273
              frags: 7
              wins: 4
            }
            userServer: {
              shipId: 0
              damage: 165454.27373493978
              frags: 3.9341180722889595
              wins: 3.6286067831324136
            }
            two: {
              shipId: 0
              damage: 0.8840690342899908
              frags: 1.779306027774413
              wins: 1.1023514640919507
            }
            three: {
              shipId: 0
              damage: 0.8067817238166514
              frags: 1.8658955864160143
              wins: 1.341171546973169
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 7
            wins: 4
            losses: 3
            survived: 4
            winAndSurvived: 4
          }
          avgInfo: {
            damage: 20896
            damageData: {
              code: 1
              value: 70000
              color: '#FE7903'
            }
            scoutingDamage: 14976
            win: 57.14
            winsData: {
              code: 5
              value: 60
              color: '#9c27b0'
            }
            kd: 2.33
            frags: 1
            shipsSpotted: 2
            planesKilled: 0
            artAgro: 136879
            tpdAgro: 52328
            xp: 1498
            basicXp: 0
          }
          fragsInfo: {
            frags: 7
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 6
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4078352176
              value: 3
            }
            maxFragsByMain: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4078352176
              value: 3
            }
            maxFragsByDbomb: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181112624
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4181112624
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4181112624
              value: 0
            }
            maxDamageDealt: {
              shipId: 4078352176
              value: 45787
            }
            maxScoutingDamage: {
              shipId: 4078352176
              value: 32407
            }
            maxPlanesKilled: {
              shipId: 4181112624
              value: 0
            }
            maxShipsSpotted: {
              shipId: 4078352176
              value: 3
            }
            maxTotalAgro: {
              shipId: 4078352176
              value: 614167
            }
            maxSuppressionsCount: {
              shipId: 4181112624
              value: 0
            }
            maxXp: {
              shipId: 4078352176
              value: 2339
            }
            maxBasicXp: {
              shipId: 4181112624
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 522.41
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 18.63
            ratioTbomb: 0
          }
          lastBattleTime: 1629037825
          recordTime: 1700615462182
        }
      }
    }
    Destroyer: {
      PVP: {
        type: 'PVP'
        battle: true
        prInfo: {
          code: 4
          value: 1534
          nextValue: 16
          name: '好'
          englishName: 'Good'
          color: '#44B300'
          details: {
            pr: 1534
            originalServer: {
              shipId: 0
              damage: 20368013.532997973
              frags: 419.6584989504295
              wins: 288.5853051619048
            }
            user: {
              shipId: 0
              damage: 22569968
              frags: 584
              wins: 362
            }
            userServer: {
              shipId: 0
              damage: 20368013.532997973
              frags: 419.6584989504295
              wins: 288.5853051619048
            }
            two: {
              shipId: 0
              damage: 1.1081084546332742
              frags: 1.3916077035508405
              wins: 1.2543951252019137
            }
            three: {
              shipId: 0
              damage: 1.1801807577221237
              frags: 1.4351196706120448
              wins: 1.8479837506730454
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 563
            wins: 362
            losses: 200
            survived: 278
            winAndSurvived: 248
          }
          avgInfo: {
            damage: 40089
            damageData: {
              code: 3
              value: 55000
              color: '#02C9B3'
            }
            scoutingDamage: 39404
            win: 64.3
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.05
            frags: 1.04
            shipsSpotted: 2
            planesKilled: 1
            artAgro: 449289
            tpdAgro: 78936
            xp: 1951
            basicXp: 0
          }
          fragsInfo: {
            frags: 584
            fragsByMain: 311
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 192
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4180555728
              value: 6
            }
            maxFragsByMain: {
              shipId: 3865982416
              value: 5
            }
            maxFragsByTpd: {
              shipId: 4180555728
              value: 3
            }
            maxFragsByDbomb: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByRam: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealt: {
              shipId: 3751687888
              value: 208955
            }
            maxScoutingDamage: {
              shipId: 4074649296
              value: 212680
            }
            maxPlanesKilled: {
              shipId: 4075697968
              value: 23
            }
            maxShipsSpotted: {
              shipId: 4286461936
              value: 9
            }
            maxTotalAgro: {
              shipId: 3865982416
              value: 2509200
            }
            maxSuppressionsCount: {
              shipId: 4074649296
              value: 0
            }
            maxXp: {
              shipId: 4180555728
              value: 4422
            }
            maxBasicXp: {
              shipId: 4074649296
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 281.2
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 43.34
            ratioAtba: 0
            ratioTpd: 7.23
            ratioTbomb: 0
          }
          lastBattleTime: 1671425350
          recordTime: 1700615462183
        }
      }
      PVP_DIV3: {
        type: 'PVP_DIV3'
        battle: true
        prInfo: {
          code: 4
          value: 1527
          nextValue: 23
          name: '好'
          englishName: 'Good'
          color: '#44B300'
          details: {
            pr: 1527
            originalServer: {
              shipId: 0
              damage: 10090237.740936318
              frags: 198.92512088365766
              wins: 135.74325217988604
            }
            user: {
              shipId: 0
              damage: 10472951
              frags: 285
              wins: 187
            }
            userServer: {
              shipId: 0
              damage: 10090237.740936318
              frags: 198.92512088365766
              wins: 135.74325217988604
            }
            two: {
              shipId: 0
              damage: 1.0379290626137583
              frags: 1.4326998959909325
              wins: 1.3776007057219233
            }
            three: {
              shipId: 0
              damage: 1.0632151043562639
              frags: 1.4807776622121471
              wins: 2.2586690190730776
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 263
            wins: 187
            losses: 76
            survived: 145
            winAndSurvived: 134
          }
          avgInfo: {
            damage: 39821
            damageData: {
              code: 2
              value: 40000
              color: '#44B300'
            }
            scoutingDamage: 44326
            win: 71.1
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.42
            frags: 1.08
            shipsSpotted: 2
            planesKilled: 1
            artAgro: 450011
            tpdAgro: 85327
            xp: 2091
            basicXp: 0
          }
          fragsInfo: {
            frags: 285
            fragsByMain: 163
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 89
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4180555728
              value: 6
            }
            maxFragsByMain: {
              shipId: 3865982416
              value: 5
            }
            maxFragsByTpd: {
              shipId: 4180555728
              value: 3
            }
            maxFragsByDbomb: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByRam: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealt: {
              shipId: 3751687888
              value: 208955
            }
            maxScoutingDamage: {
              shipId: 4074649296
              value: 212680
            }
            maxPlanesKilled: {
              shipId: 4075697968
              value: 23
            }
            maxShipsSpotted: {
              shipId: 4179507152
              value: 8
            }
            maxTotalAgro: {
              shipId: 4074649424
              value: 1848849
            }
            maxSuppressionsCount: {
              shipId: 4074649296
              value: 0
            }
            maxXp: {
              shipId: 4272830448
              value: 4394
            }
            maxBasicXp: {
              shipId: 4074649296
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 275.04
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 42.29
            ratioAtba: 0
            ratioTpd: 6.95
            ratioTbomb: 0
          }
          lastBattleTime: 1671425350
          recordTime: 1700615462183
        }
      }
      PVP_SOLO: {
        type: 'PVP_SOLO'
        battle: true
        prInfo: {
          code: 5
          value: 1601
          nextValue: 149
          name: '很好'
          englishName: 'Very Good'
          color: '#318000'
          details: {
            pr: 1601
            originalServer: {
              shipId: 0
              damage: 4555093.126324799
              frags: 104.61865349762948
              wins: 73.25770500248349
            }
            user: {
              shipId: 0
              damage: 5795624
              frags: 147
              wins: 73
            }
            userServer: {
              shipId: 0
              damage: 4555093.126324799
              frags: 104.61865349762948
              wins: 73.25770500248349
            }
            two: {
              shipId: 0
              damage: 1.2723393000476595
              frags: 1.405103154031043
              wins: 0.9964822129975986
            }
            three: {
              shipId: 0
              damage: 1.4538988334127658
              frags: 1.4501146155900477
              wins: 0.9882740433253289
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 145
            wins: 73
            losses: 72
            survived: 59
            winAndSurvived: 49
          }
          avgInfo: {
            damage: 39970
            damageData: {
              code: 2
              value: 40000
              color: '#44B300'
            }
            scoutingDamage: 29435
            win: 50.34
            winsData: {
              code: 4
              value: 55
              color: '#00bcd4'
            }
            kd: 1.71
            frags: 1.01
            shipsSpotted: 2
            planesKilled: 1
            artAgro: 435546
            tpdAgro: 65511
            xp: 1664
            basicXp: 0
          }
          fragsInfo: {
            frags: 147
            fragsByMain: 71
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 51
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4180555728
              value: 5
            }
            maxFragsByMain: {
              shipId: 4180555728
              value: 4
            }
            maxFragsByTpd: {
              shipId: 4180555728
              value: 3
            }
            maxFragsByDbomb: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByRam: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealt: {
              shipId: 4180555728
              value: 154241
            }
            maxScoutingDamage: {
              shipId: 4180555728
              value: 155836
            }
            maxPlanesKilled: {
              shipId: 4074649424
              value: 20
            }
            maxShipsSpotted: {
              shipId: 4074649296
              value: 7
            }
            maxTotalAgro: {
              shipId: 3865982416
              value: 2509200
            }
            maxSuppressionsCount: {
              shipId: 4074649296
              value: 0
            }
            maxXp: {
              shipId: 4180555728
              value: 4422
            }
            maxBasicXp: {
              shipId: 4074649296
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 283.34
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 42.99
            ratioAtba: 0
            ratioTpd: 7.72
            ratioTbomb: 0
          }
          lastBattleTime: 1671425350
          recordTime: 1700615462183
        }
      }
      RANK_SOLO: {
        type: 'RANK_SOLO'
        battle: true
        prInfo: {
          code: 5
          value: 1617
          nextValue: 133
          name: '很好'
          englishName: 'Very Good'
          color: '#318000'
          details: {
            pr: 1617
            originalServer: {
              shipId: 0
              damage: 1390270.0371198086
              frags: 30.17040194339793
              wins: 22.18302804153401
            }
            user: {
              shipId: 0
              damage: 1792652
              frags: 30
              wins: 28
            }
            userServer: {
              shipId: 0
              damage: 1390270.0371198086
              frags: 30.17040194339793
              wins: 22.18302804153401
            }
            two: {
              shipId: 0
              damage: 1.2894271991316142
              frags: 0.9943520161343021
              wins: 1.2622262365433017
            }
            three: {
              shipId: 0
              damage: 1.482378665219357
              frags: 0.9937244623714468
              wins: 1.8740874551443387
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 43
            wins: 28
            losses: 15
            survived: 21
            winAndSurvived: 19
          }
          avgInfo: {
            damage: 41690
            damageData: {
              code: 3
              value: 55000
              color: '#02C9B3'
            }
            scoutingDamage: 17732
            win: 65.12
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 1.36
            frags: 0.7
            shipsSpotted: 2
            planesKilled: 2
            artAgro: 367342
            tpdAgro: 48627
            xp: 2015
            basicXp: 0
          }
          fragsInfo: {
            frags: 30
            fragsByMain: 12
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 15
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4075697872
              value: 3
            }
            maxFragsByMain: {
              shipId: 4182652720
              value: 2
            }
            maxFragsByTpd: {
              shipId: 4075697872
              value: 2
            }
            maxFragsByDbomb: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByRam: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealt: {
              shipId: 4074649296
              value: 154541
            }
            maxScoutingDamage: {
              shipId: 4183701296
              value: 59153
            }
            maxPlanesKilled: {
              shipId: 4074649296
              value: 29
            }
            maxShipsSpotted: {
              shipId: 4077795120
              value: 4
            }
            maxTotalAgro: {
              shipId: 3865982416
              value: 1182000
            }
            maxSuppressionsCount: {
              shipId: 4074649296
              value: 0
            }
            maxXp: {
              shipId: 4075697872
              value: 3667
            }
            maxBasicXp: {
              shipId: 4074649296
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 47.42
            ratioAtba: 0
            ratioTpd: 8.13
            ratioTbomb: 0
          }
          lastBattleTime: 1671425350
          recordTime: 1700615462183
        }
      }
      PVP_DIV2: {
        type: 'PVP_DIV2'
        battle: true
        prInfo: {
          code: 4
          value: 1512
          nextValue: 38
          name: '好'
          englishName: 'Good'
          color: '#44B300'
          details: {
            pr: 1512
            originalServer: {
              shipId: 0
              damage: 5722682.665736856
              frags: 116.11472456914235
              wins: 79.58434797953522
            }
            user: {
              shipId: 0
              damage: 6301393
              frags: 152
              wins: 102
            }
            userServer: {
              shipId: 0
              damage: 5722682.665736856
              frags: 116.11472456914235
              wins: 79.58434797953522
            }
            two: {
              shipId: 0
              damage: 1.1011257076559615
              frags: 1.3090501705448148
              wins: 1.281659052182332
            }
            three: {
              shipId: 0
              damage: 1.1685428460932692
              frags: 1.3433890783831275
              wins: 1.9388635072744396
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 155
            wins: 102
            losses: 52
            survived: 74
            winAndSurvived: 65
          }
          avgInfo: {
            damage: 40654
            damageData: {
              code: 3
              value: 55000
              color: '#02C9B3'
            }
            scoutingDamage: 40379
            win: 65.81
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 1.88
            frags: 0.98
            shipsSpotted: 2
            planesKilled: 1
            artAgro: 460919
            tpdAgro: 80651
            xp: 1983
            basicXp: 0
          }
          fragsInfo: {
            frags: 152
            fragsByMain: 77
            fragsByAtba: 0
            fragsByPlanes: 0
            fragsByTpd: 52
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4185798480
              value: 4
            }
            maxFragsByMain: {
              shipId: 4185798480
              value: 3
            }
            maxFragsByTpd: {
              shipId: 3751687888
              value: 3
            }
            maxFragsByDbomb: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByRam: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4074649296
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4074649296
              value: 0
            }
            maxDamageDealt: {
              shipId: 3761125360
              value: 130264
            }
            maxScoutingDamage: {
              shipId: 3865982416
              value: 167638
            }
            maxPlanesKilled: {
              shipId: 4181603632
              value: 17
            }
            maxShipsSpotted: {
              shipId: 4286461936
              value: 9
            }
            maxTotalAgro: {
              shipId: 4074649296
              value: 1617105
            }
            maxSuppressionsCount: {
              shipId: 4074649296
              value: 0
            }
            maxXp: {
              shipId: 3751687888
              value: 3583
            }
            maxBasicXp: {
              shipId: 4074649296
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 290.35
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 45.47
            ratioAtba: 0
            ratioTpd: 7.28
            ratioTbomb: 0
          }
          lastBattleTime: 1671425350
          recordTime: 1700615462183
        }
      }
    }
    Battleship: {
      PVP: {
        type: 'PVP'
        battle: true
        prInfo: {
          code: 6
          value: 1950
          nextValue: 150
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 1950
            originalServer: {
              shipId: 0
              damage: 91199186.74544258
              frags: 911.6298911821286
              wins: 613.0774216696032
            }
            user: {
              shipId: 0
              damage: 125644498
              frags: 1503
              wins: 788
            }
            userServer: {
              shipId: 0
              damage: 91199186.74544258
              frags: 911.6298911821286
              wins: 613.0774216696032
            }
            two: {
              shipId: 0
              damage: 1.3776931843778608
              frags: 1.6486953911208746
              wins: 1.2853189045096907
            }
            three: {
              shipId: 0
              damage: 1.629488640629768
              frags: 1.7207726568009716
              wins: 1.951063015032302
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 1223
            wins: 788
            losses: 435
            survived: 685
            winAndSurvived: 595
          }
          avgInfo: {
            damage: 102735
            damageData: {
              code: 4
              value: 108000
              color: '#A00DC5'
            }
            scoutingDamage: 21096
            win: 64.43
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.79
            frags: 1.23
            shipsSpotted: 0
            planesKilled: 3
            artAgro: 1277350
            tpdAgro: 91228
            xp: 2270
            basicXp: 0
          }
          fragsInfo: {
            frags: 1503
            fragsByMain: 1375
            fragsByAtba: 47
            fragsByPlanes: 6
            fragsByTpd: 1
            fragsByRam: 19
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4276041424
              value: 8
            }
            maxFragsByMain: {
              shipId: 4276041424
              value: 7
            }
            maxFragsByTpd: {
              shipId: 3763287856
              value: 1
            }
            maxFragsByDbomb: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByRam: {
              shipId: 3751753712
              value: 1
            }
            maxFragsByAtba: {
              shipId: 3751753712
              value: 2
            }
            maxDamageDealtToBuildings: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4286527472
              value: 1
            }
            maxDamageDealt: {
              shipId: 4276041424
              value: 306947
            }
            maxScoutingDamage: {
              shipId: 4276041424
              value: 124045
            }
            maxPlanesKilled: {
              shipId: 3751753712
              value: 49
            }
            maxShipsSpotted: {
              shipId: 3765384944
              value: 5
            }
            maxTotalAgro: {
              shipId: 4276041424
              value: 4121100
            }
            maxSuppressionsCount: {
              shipId: 4183766864
              value: 0
            }
            maxXp: {
              shipId: 4276041424
              value: 5718
            }
            maxBasicXp: {
              shipId: 4183766864
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 2572.85
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 31.78
            ratioAtba: 17.72
            ratioTpd: 8.33
            ratioTbomb: 0
          }
          lastBattleTime: 1582001088
          recordTime: 1700615462182
        }
      }
      PVP_DIV3: {
        type: 'PVP_DIV3'
        battle: true
        prInfo: {
          code: 6
          value: 1927
          nextValue: 173
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 1927
            originalServer: {
              shipId: 0
              damage: 46026152.33159746
              frags: 455.71105278834233
              wins: 309.6077954954666
            }
            user: {
              shipId: 0
              damage: 61952871
              frags: 729
              wins: 417
            }
            userServer: {
              shipId: 0
              damage: 46026152.33159746
              frags: 455.71105278834233
              wins: 309.6077954954666
            }
            two: {
              shipId: 0
              damage: 1.3460362828866899
              frags: 1.599697868944575
              wins: 1.3468653117492513
            }
            three: {
              shipId: 0
              damage: 1.5767271381444832
              frags: 1.6663309654939722
              wins: 2.1562177058308376
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 620
            wins: 417
            losses: 203
            survived: 364
            winAndSurvived: 332
          }
          avgInfo: {
            damage: 99924
            damageData: {
              code: 4
              value: 108000
              color: '#A00DC5'
            }
            scoutingDamage: 22734
            win: 67.26
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.85
            frags: 1.18
            shipsSpotted: 0
            planesKilled: 3
            artAgro: 1267977
            tpdAgro: 89894
            xp: 2291
            basicXp: 0
          }
          fragsInfo: {
            frags: 729
            fragsByMain: 666
            fragsByAtba: 21
            fragsByPlanes: 5
            fragsByTpd: 1
            fragsByRam: 6
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4276041424
              value: 5
            }
            maxFragsByMain: {
              shipId: 4276041424
              value: 5
            }
            maxFragsByTpd: {
              shipId: 3763287856
              value: 1
            }
            maxFragsByDbomb: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByRam: {
              shipId: 3751753552
              value: 1
            }
            maxFragsByAtba: {
              shipId: 4276041424
              value: 1
            }
            maxDamageDealtToBuildings: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4286527472
              value: 1
            }
            maxDamageDealt: {
              shipId: 3761190608
              value: 289284
            }
            maxScoutingDamage: {
              shipId: 4276041424
              value: 124045
            }
            maxPlanesKilled: {
              shipId: 4277090288
              value: 46
            }
            maxShipsSpotted: {
              shipId: 3765384944
              value: 5
            }
            maxTotalAgro: {
              shipId: 4276041424
              value: 4121100
            }
            maxSuppressionsCount: {
              shipId: 4183766864
              value: 0
            }
            maxXp: {
              shipId: 4276041424
              value: 4754
            }
            maxBasicXp: {
              shipId: 4183766864
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 2480.65
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 31.11
            ratioAtba: 16.99
            ratioTpd: 13.79
            ratioTbomb: 0
          }
          lastBattleTime: 1582001088
          recordTime: 1700615462182
        }
      }
      PVP_SOLO: {
        type: 'PVP_SOLO'
        battle: true
        prInfo: {
          code: 6
          value: 1903
          nextValue: 197
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 1903
            originalServer: {
              shipId: 0
              damage: 20556462.97726255
              frags: 198.44270385180585
              wins: 133.45099927897263
            }
            user: {
              shipId: 0
              damage: 28268752
              frags: 327
              wins: 160
            }
            userServer: {
              shipId: 0
              damage: 20556462.97726255
              frags: 198.44270385180585
              wins: 133.45099927897263
            }
            two: {
              shipId: 0
              damage: 1.375175876865003
              frags: 1.647830802810462
              wins: 1.1989419402212793
            }
            three: {
              shipId: 0
              damage: 1.6252931281083385
              frags: 1.7198120031227355
              wins: 1.6631398007375977
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 266
            wins: 160
            losses: 106
            survived: 142
            winAndSurvived: 116
          }
          avgInfo: {
            damage: 106274
            damageData: {
              code: 4
              value: 108000
              color: '#A00DC5'
            }
            scoutingDamage: 19026
            win: 60.15
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.64
            frags: 1.23
            shipsSpotted: 0
            planesKilled: 3
            artAgro: 1328895
            tpdAgro: 98637
            xp: 2249
            basicXp: 0
          }
          fragsInfo: {
            frags: 327
            fragsByMain: 299
            fragsByAtba: 10
            fragsByPlanes: 0
            fragsByTpd: 0
            fragsByRam: 5
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4276041424
              value: 6
            }
            maxFragsByMain: {
              shipId: 4276041424
              value: 6
            }
            maxFragsByTpd: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181669328
              value: 1
            }
            maxFragsByAtba: {
              shipId: 4276041424
              value: 1
            }
            maxDamageDealtToBuildings: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4183766864
              value: 0
            }
            maxDamageDealt: {
              shipId: 4276041424
              value: 270192
            }
            maxScoutingDamage: {
              shipId: 4181669328
              value: 109328
            }
            maxPlanesKilled: {
              shipId: 4181669328
              value: 29
            }
            maxShipsSpotted: {
              shipId: 4181669680
              value: 2
            }
            maxTotalAgro: {
              shipId: 3760142032
              value: 3459003
            }
            maxSuppressionsCount: {
              shipId: 4183766864
              value: 0
            }
            maxXp: {
              shipId: 4276041424
              value: 4950
            }
            maxBasicXp: {
              shipId: 4183766864
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 3313.25
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 32.6
            ratioAtba: 18.34
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 1582001088
          recordTime: 1700615462182
        }
      }
      RANK_SOLO: {
        type: 'RANK_SOLO'
        battle: true
        prInfo: {
          code: 5
          value: 1562
          nextValue: 188
          name: '很好'
          englishName: 'Very Good'
          color: '#318000'
          details: {
            pr: 1562
            originalServer: {
              shipId: 0
              damage: 13262819.502423426
              frags: 135.62047335774272
              wins: 94.49374427694873
            }
            user: {
              shipId: 0
              damage: 16849777
              frags: 165
              wins: 99
            }
            userServer: {
              shipId: 0
              damage: 13262819.502423426
              frags: 135.62047335774272
              wins: 94.49374427694873
            }
            two: {
              shipId: 0
              damage: 1.2704521083862412
              frags: 1.216630468209319
              wins: 1.047688402629533
            }
            three: {
              shipId: 0
              damage: 1.4507535139770686
              frags: 1.2407005202325765
              wins: 1.1589613420984433
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 189
            wins: 99
            losses: 90
            survived: 84
            winAndSurvived: 67
          }
          avgInfo: {
            damage: 89152
            damageData: {
              code: 3
              value: 97000
              color: '#02C9B3'
            }
            scoutingDamage: 13761
            win: 52.38
            winsData: {
              code: 4
              value: 55
              color: '#00bcd4'
            }
            kd: 1.57
            frags: 0.87
            shipsSpotted: 0
            planesKilled: 1
            artAgro: 1148802
            tpdAgro: 114322
            xp: 1952
            basicXp: 0
          }
          fragsInfo: {
            frags: 165
            fragsByMain: 128
            fragsByAtba: 16
            fragsByPlanes: 0
            fragsByTpd: 10
            fragsByRam: 8
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 3763287856
              value: 5
            }
            maxFragsByMain: {
              shipId: 3760142032
              value: 4
            }
            maxFragsByTpd: {
              shipId: 3763287856
              value: 1
            }
            maxFragsByDbomb: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByRam: {
              shipId: 4276041424
              value: 1
            }
            maxFragsByAtba: {
              shipId: 4075763504
              value: 2
            }
            maxDamageDealtToBuildings: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4183766864
              value: 0
            }
            maxDamageDealt: {
              shipId: 4075763504
              value: 214838
            }
            maxScoutingDamage: {
              shipId: 4276041424
              value: 101887
            }
            maxPlanesKilled: {
              shipId: 4182718288
              value: 26
            }
            maxShipsSpotted: {
              shipId: 4180621104
              value: 3
            }
            maxTotalAgro: {
              shipId: 4276041424
              value: 3472300
            }
            maxSuppressionsCount: {
              shipId: 4183766864
              value: 0
            }
            maxXp: {
              shipId: 3760142032
              value: 4167
            }
            maxBasicXp: {
              shipId: 4183766864
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 38.85
            ratioAtba: 27
            ratioTpd: 7.57
            ratioTbomb: 0
          }
          lastBattleTime: 1582001088
          recordTime: 1700615462182
        }
      }
      PVP_DIV2: {
        type: 'PVP_DIV2'
        battle: true
        prInfo: {
          code: 6
          value: 2028
          nextValue: 72
          name: '非常好'
          englishName: 'Great'
          color: '#02C9B3'
          details: {
            pr: 2028
            originalServer: {
              shipId: 0
              damage: 24616571.436582558
              frags: 257.47613454197995
              wins: 170.01862689516392
            }
            user: {
              shipId: 0
              damage: 35422875
              frags: 447
              wins: 211
            }
            userServer: {
              shipId: 0
              damage: 24616571.436582558
              frags: 257.47613454197995
              wins: 170.01862689516392
            }
            two: {
              shipId: 0
              damage: 1.4389849167767632
              frags: 1.736083232704891
              wins: 1.2410404898170706
            }
            three: {
              shipId: 0
              damage: 1.7316415279612718
              frags: 1.8178702585609898
              wins: 1.8034682993902351
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 337
            wins: 211
            losses: 126
            survived: 179
            winAndSurvived: 147
          }
          avgInfo: {
            damage: 105112
            damageData: {
              code: 4
              value: 108000
              color: '#A00DC5'
            }
            scoutingDamage: 19716
            win: 62.61
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 2.83
            frags: 1.33
            shipsSpotted: 0
            planesKilled: 3
            artAgro: 1253910
            tpdAgro: 87833
            xp: 2248
            basicXp: 0
          }
          fragsInfo: {
            frags: 447
            fragsByMain: 410
            fragsByAtba: 16
            fragsByPlanes: 1
            fragsByTpd: 0
            fragsByRam: 8
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4276041424
              value: 8
            }
            maxFragsByMain: {
              shipId: 4276041424
              value: 7
            }
            maxFragsByTpd: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByRam: {
              shipId: 3751753712
              value: 1
            }
            maxFragsByAtba: {
              shipId: 3751753712
              value: 2
            }
            maxDamageDealtToBuildings: {
              shipId: 4183766864
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 3743364816
              value: 1
            }
            maxDamageDealt: {
              shipId: 4276041424
              value: 306947
            }
            maxScoutingDamage: {
              shipId: 3751753168
              value: 98160
            }
            maxPlanesKilled: {
              shipId: 3751753712
              value: 49
            }
            maxShipsSpotted: {
              shipId: 3751753552
              value: 4
            }
            maxTotalAgro: {
              shipId: 3760142032
              value: 3536001
            }
            maxSuppressionsCount: {
              shipId: 4183766864
              value: 0
            }
            maxXp: {
              shipId: 4276041424
              value: 5718
            }
            maxBasicXp: {
              shipId: 4183766864
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 2315.17
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 32.39
            ratioAtba: 18.1
            ratioTpd: 14.29
            ratioTbomb: 0
          }
          lastBattleTime: 1582001088
          recordTime: 1700615462182
        }
      }
    }
    AirCarrier: {
      PVP: {
        type: 'PVP'
        battle: true
        prInfo: {
          code: 4
          value: 1390
          nextValue: 160
          name: '好'
          englishName: 'Good'
          color: '#44B300'
          details: {
            pr: 1390
            originalServer: {
              shipId: 0
              damage: 10433930.839589056
              frags: 129.41293193891224
              wins: 83.98896635136171
            }
            user: {
              shipId: 0
              damage: 11581416
              frags: 166
              wins: 87
            }
            userServer: {
              shipId: 0
              damage: 10433930.839589056
              frags: 129.41293193891224
              wins: 83.98896635136171
            }
            two: {
              shipId: 0
              damage: 1.1099763050045421
              frags: 1.282715703237125
              wins: 1.0358503477235552
            }
            three: {
              shipId: 0
              damage: 1.183293841674237
              frags: 1.314128559152361
              wins: 1.1195011590785173
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 174
            wins: 87
            losses: 87
            survived: 123
            winAndSurvived: 82
          }
          avgInfo: {
            damage: 66560
            damageData: {
              code: 2
              value: 71000
              color: '#FE7903'
            }
            scoutingDamage: 52863
            win: 50
            winsData: {
              code: 4
              value: 55
              color: '#00bcd4'
            }
            kd: 3.25
            frags: 0.95
            shipsSpotted: 7
            planesKilled: 6
            artAgro: 225195
            tpdAgro: 15412
            xp: 1859
            basicXp: 0
          }
          fragsInfo: {
            frags: 166
            fragsByMain: 0
            fragsByAtba: 1
            fragsByPlanes: 136
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4183799600
              value: 4
            }
            maxFragsByMain: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181702640
              value: 1
            }
            maxDamageDealtToBuildings: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4183799600
              value: 4
            }
            maxDamageDealt: {
              shipId: 4179605200
              value: 295626
            }
            maxScoutingDamage: {
              shipId: 4179605200
              value: 228267
            }
            maxPlanesKilled: {
              shipId: 4179605200
              value: 61
            }
            maxShipsSpotted: {
              shipId: 4179605200
              value: 12
            }
            maxTotalAgro: {
              shipId: 4179605200
              value: 2029910
            }
            maxSuppressionsCount: {
              shipId: 4181702448
              value: 0
            }
            maxXp: {
              shipId: 4179605200
              value: 4965
            }
            maxBasicXp: {
              shipId: 4181702448
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 10992.49
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 17.75
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 1654913451
          recordTime: 1700615462183
        }
      }
      PVP_DIV3: {
        type: 'PVP_DIV3'
        battle: true
        prInfo: {
          code: 3
          value: 1192
          nextValue: 158
          name: '平均水平'
          englishName: 'Average'
          color: '#FFC71F'
          details: {
            pr: 1192
            originalServer: {
              shipId: 0
              damage: 2044553.7470840951
              frags: 21.83763587573047
              wins: 13.82583041635048
            }
            user: {
              shipId: 0
              damage: 2059088
              frags: 26
              wins: 13
            }
            userServer: {
              shipId: 0
              damage: 2044553.7470840951
              frags: 21.83763587573047
              wins: 13.82583041635048
            }
            two: {
              shipId: 0
              damage: 1.0071087653903124
              frags: 1.190605070436925
              wins: 0.9402690188233577
            }
            three: {
              shipId: 0
              damage: 1.0118479423171873
              frags: 1.2117834115965833
              wins: 0.8008967294111923
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 29
            wins: 13
            losses: 16
            survived: 18
            winAndSurvived: 12
          }
          avgInfo: {
            damage: 71003
            damageData: {
              code: 3
              value: 84000
              color: '#02C9B3'
            }
            scoutingDamage: 75068
            win: 44.83
            winsData: {
              code: 2
              value: 45
              color: '#ff9800'
            }
            kd: 2.36
            frags: 0.9
            shipsSpotted: 8
            planesKilled: 7
            artAgro: 371112
            tpdAgro: 17538
            xp: 1852
            basicXp: 0
          }
          fragsInfo: {
            frags: 26
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 21
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4179605200
              value: 4
            }
            maxFragsByMain: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181702448
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4179605200
              value: 3
            }
            maxDamageDealt: {
              shipId: 4179605200
              value: 189066
            }
            maxScoutingDamage: {
              shipId: 4179605488
              value: 193837
            }
            maxPlanesKilled: {
              shipId: 4185896752
              value: 26
            }
            maxShipsSpotted: {
              shipId: 3655317296
              value: 11
            }
            maxTotalAgro: {
              shipId: 4179605200
              value: 2029910
            }
            maxSuppressionsCount: {
              shipId: 4181702448
              value: 0
            }
            maxXp: {
              shipId: 4179605200
              value: 4254
            }
            maxBasicXp: {
              shipId: 4181702448
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 11980
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 9.55
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 1654913451
          recordTime: 1700615462183
        }
      }
      PVP_SOLO: {
        type: 'PVP_SOLO'
        battle: true
        prInfo: {
          code: 4
          value: 1490
          nextValue: 60
          name: '好'
          englishName: 'Good'
          color: '#44B300'
          details: {
            pr: 1490
            originalServer: {
              shipId: 0
              damage: 6916470.916714157
              frags: 89.44418003592823
              wins: 58.57353032805935
            }
            user: {
              shipId: 0
              damage: 8051242
              frags: 126
              wins: 60
            }
            userServer: {
              shipId: 0
              damage: 6916470.916714157
              frags: 89.44418003592823
              wins: 58.57353032805935
            }
            two: {
              shipId: 0
              damage: 1.164067932468795
              frags: 1.4086998164596949
              wins: 1.0243534863606694
            }
            three: {
              shipId: 0
              damage: 1.2734465541146585
              frags: 1.4541109071774387
              wins: 1.0811782878688978
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 121
            wins: 60
            losses: 61
            survived: 87
            winAndSurvived: 58
          }
          avgInfo: {
            damage: 66539
            damageData: {
              code: 2
              value: 71000
              color: '#FE7903'
            }
            scoutingDamage: 46198
            win: 49.59
            winsData: {
              code: 3
              value: 50
              color: '#8bc34a'
            }
            kd: 3.71
            frags: 1.04
            shipsSpotted: 6
            planesKilled: 6
            artAgro: 196079
            tpdAgro: 15669
            xp: 1863
            basicXp: 0
          }
          fragsInfo: {
            frags: 126
            fragsByMain: 0
            fragsByAtba: 1
            fragsByPlanes: 102
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4183799600
              value: 4
            }
            maxFragsByMain: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181702640
              value: 1
            }
            maxDamageDealtToBuildings: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4183799600
              value: 4
            }
            maxDamageDealt: {
              shipId: 4179605200
              value: 295626
            }
            maxScoutingDamage: {
              shipId: 4179605200
              value: 228267
            }
            maxPlanesKilled: {
              shipId: 4179605200
              value: 61
            }
            maxShipsSpotted: {
              shipId: 4179605200
              value: 12
            }
            maxTotalAgro: {
              shipId: 4179605200
              value: 1267101
            }
            maxSuppressionsCount: {
              shipId: 4181702448
              value: 0
            }
            maxXp: {
              shipId: 4179605200
              value: 4965
            }
            maxBasicXp: {
              shipId: 4181702448
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 8839.86
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 19.8
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 1654913451
          recordTime: 1700615462183
        }
      }
      RANK_SOLO: {
        type: 'RANK_SOLO'
        battle: true
        prInfo: {
          code: 3
          value: 1113
          nextValue: 237
          name: '平均水平'
          englishName: 'Average'
          color: '#FFC71F'
          details: {
            pr: 1113
            originalServer: {
              shipId: 0
              damage: 37475.47895024603
              frags: 0.6653344268270548
              wins: 0.5036730180426341
            }
            user: {
              shipId: 0
              damage: 15085
              frags: 1
              wins: 1
            }
            userServer: {
              shipId: 0
              damage: 37475.47895024603
              frags: 0.6653344268270548
              wins: 0.5036730180426341
            }
            two: {
              shipId: 0
              damage: 0.4025298788049502
              frags: 1.503003541796188
              wins: 1.9854150692570027
            }
            three: {
              shipId: 0
              damage: 0.004216464674917006
              frags: 1.5588928242179865
              wins: 4.284716897523342
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 1
            wins: 1
            losses: 0
            survived: 0
            winAndSurvived: 0
          }
          avgInfo: {
            damage: 15085
            damageData: {
              code: 1
              value: 60000
              color: '#FE7903'
            }
            scoutingDamage: 61929
            win: 100
            winsData: {
              code: 6
              value: 65
              color: '#673ab7'
            }
            kd: 1
            frags: 1
            shipsSpotted: 6
            planesKilled: 0
            artAgro: 212000
            tpdAgro: 115200
            xp: 1764
            basicXp: 0
          }
          fragsInfo: {
            frags: 1
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 1
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 4183799600
              value: 1
            }
            maxFragsByMain: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181702448
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 4183799600
              value: 1
            }
            maxDamageDealt: {
              shipId: 4183799600
              value: 15085
            }
            maxScoutingDamage: {
              shipId: 4183799600
              value: 61929
            }
            maxPlanesKilled: {
              shipId: 4181702448
              value: 0
            }
            maxShipsSpotted: {
              shipId: 4183799600
              value: 6
            }
            maxTotalAgro: {
              shipId: 4183799600
              value: 327200
            }
            maxSuppressionsCount: {
              shipId: 4181702448
              value: 0
            }
            maxXp: {
              shipId: 4183799600
              value: 1764
            }
            maxBasicXp: {
              shipId: 4181702448
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 4.41
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 1654913451
          recordTime: 1700615462183
        }
      }
      PVP_DIV2: {
        type: 'PVP_DIV2'
        battle: true
        prInfo: {
          code: 3
          value: 1177
          nextValue: 173
          name: '平均水平'
          englishName: 'Average'
          color: '#FFC71F'
          details: {
            pr: 1177
            originalServer: {
              shipId: 0
              damage: 1472906.1757908016
              frags: 18.131116027253547
              wins: 11.589605606951885
            }
            user: {
              shipId: 0
              damage: 1471086
              frags: 14
              wins: 14
            }
            userServer: {
              shipId: 0
              damage: 1472906.1757908016
              frags: 18.131116027253547
              wins: 11.589605606951885
            }
            two: {
              shipId: 0
              damage: 0.9987642282850607
              frags: 0.7721532408129805
              wins: 1.2079789834782875
            }
            three: {
              shipId: 0
              damage: 0.9979403804751013
              frags: 0.7468369342366451
              wins: 1.6932632782609582
            }
          }
        }
        shipInfo: {
          battleInfo: {
            battle: 24
            wins: 14
            losses: 10
            survived: 18
            winAndSurvived: 12
          }
          avgInfo: {
            damage: 61295
            damageData: {
              code: 2
              value: 71000
              color: '#FE7903'
            }
            scoutingDamage: 59631
            win: 58.33
            winsData: {
              code: 5
              value: 60
              color: '#9c27b0'
            }
            kd: 2.33
            frags: 0.58
            shipsSpotted: 7
            planesKilled: 6
            artAgro: 195673
            tpdAgro: 11551
            xp: 1845
            basicXp: 0
          }
          fragsInfo: {
            frags: 14
            fragsByMain: 0
            fragsByAtba: 0
            fragsByPlanes: 13
            fragsByTpd: 0
            fragsByRam: 0
            fragsByDbomb: 0
          }
          maxInfo: {
            maxFrags: {
              shipId: 3655317296
              value: 2
            }
            maxFragsByMain: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByTpd: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByDbomb: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByRam: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByAtba: {
              shipId: 4181702448
              value: 0
            }
            maxDamageDealtToBuildings: {
              shipId: 4181702448
              value: 0
            }
            maxFragsByPlanes: {
              shipId: 3655317296
              value: 2
            }
            maxDamageDealt: {
              shipId: 3655317296
              value: 189900
            }
            maxScoutingDamage: {
              shipId: 4179605200
              value: 139208
            }
            maxPlanesKilled: {
              shipId: 4181702352
              value: 20
            }
            maxShipsSpotted: {
              shipId: 4181702352
              value: 11
            }
            maxTotalAgro: {
              shipId: 3655317296
              value: 1045800
            }
            maxSuppressionsCount: {
              shipId: 4181702448
              value: 0
            }
            maxXp: {
              shipId: 3655317296
              value: 3061
            }
            maxBasicXp: {
              shipId: 4181702448
              value: 0
            }
          }
          controlCapturedAndDroppedPointsInfo: {
            gameContributionToCapture: 0
            gameContributionToDefense: 100
          }
          hitRatioInfo: {
            ratioMain: 0
            ratioAtba: 0
            ratioTpd: 0
            ratioTbomb: 0
          }
          lastBattleTime: 1654913451
          recordTime: 1700615462183
        }
      }
    }
  }
  battleCount: {
    Cruiser: {
      [key: string]: number
      '1': 3
      '2': 2
      '3': 14
      '4': 9
      '5': 32
      '6': 53
      '7': 122
      '8': 141
      '9': 245
      '10': 622
      '11': 9
    }
    Auxiliary: {
      [key: string]: number
      '1': 0
      '2': 0
      '3': 0
      '4': 0
      '5': 0
      '6': 0
      '7': 0
      '8': 0
      '9': 0
      '10': 0
      '11': 0
    }
    Submarine: {
      [key: string]: number
      '1': 0
      '2': 0
      '3': 0
      '4': 0
      '5': 0
      '6': 31
      '7': 0
      '8': 0
      '9': 0
      '10': 0
      '11': 0
    }
    Destroyer: {
      [key: string]: number
      '1': 0
      '2': 5
      '3': 11
      '4': 16
      '5': 34
      '6': 29
      '7': 31
      '8': 181
      '9': 223
      '10': 33
      '11': 0
    }
    Battleship: {
      [key: string]: number
      '1': 0
      '2': 0
      '3': 6
      '4': 13
      '5': 22
      '6': 36
      '7': 99
      '8': 227
      '9': 300
      '10': 517
      '11': 3
    }
    AirCarrier: {
      [key: string]: number
      '1': 0
      '2': 0
      '3': 0
      '4': 16
      '5': 0
      '6': 22
      '7': 0
      '8': 80
      '9': 0
      '10': 56
      '11': 0
    }
  }
  battleCountAll: {
    [key: string]: number
    '1': 3
    '2': 7
    '3': 31
    '4': 54
    '5': 88
    '6': 171
    '7': 252
    '8': 629
    '9': 768
    '10': 1228
    '11': 12
  }
  lastBattleTime: 1699704944
  recordTime: 1700615462183
}

/**
 * 玩家舰船列表信息
 */
export interface PlayerShipList {
  userInfo: {
    server: 'asia'
    serverCn: '亚服'
    clanInfo: {
      clanId: 2000022706
      tag: 'YU_RI'
      name: '纷飞而下的洁白之雪'
      description: '真っ白な雪(Yuki)が降り(fuRi)しきる,\nYU_RI公式Discordチャンネル:https://discord.gg/QUqbsSunYV\nQQグループ:912806416\nギルドを申し込む前に、まずグループに加入してください。'
      color: '#b3b3b3'
      activeLevel: -1
    }
    accountId: 2022515210
    userName: 'JustOneSummer'
    accountCreateTime: 0
  }
  shipInfo: [
    {
      rank: 0
      shipInfo: {
        shipId: number
        nameCn: string
        nameEnglish: string
        nameNumbers: string
        level: number
        shipType: string
        country: string
        imgSmall: 'https://glossary-wows-global.gcdn.co/icons//vehicle/small/PGSC518_51a77b095f1a3be3c3ffa5851e974a84d82cb59c7b904974994398d59e7ead94.png'
        imgLarge: 'https://glossary-wows-global.gcdn.co/icons//vehicle/large/PGSC518_2e25f5cda7495d10e863392a05ba4b42a61b60941f57630325a7bd32497eae76.png'
        imgMedium: 'https://glossary-wows-global.gcdn.co/icons//vehicle/medium/PGSC518_8d0f8768b6877daabca08e8aee5510ed9d6cdd8dfbb3aac314e3f76fb749bf65.png'
        shipIndex: 'PGSC518'
        groupType: 'special'
      }
      typeInfo: {
        PVP_DIV2: {
          battle: true
          prInfo: {
            code: 5
            value: 1610
            nextValue: 140
            name: '很好'
            englishName: 'Very Good'
            color: '#318000'
            details: {
              pr: 1610
              originalServer: {
                shipId: 3751720752
                damage: 54392.09304891504
                frags: 0.6838249356381099
                wins: 52.21556638469984
              }
              user: {
                shipId: 3751720752
                damage: 557869
                frags: 6
                wins: 5
              }
              userServer: {
                shipId: 3751720752
                damage: 435136.74439132033
                frags: 5.470599485104879
                wins: 4.177245310775987
              }
              two: {
                shipId: 3751720752
                damage: 1.2820544511366432
                frags: 1.0967719381279055
                wins: 1.1969610659688965
              }
              three: {
                shipId: 3751720752
                damage: 1.4700907518944053
                frags: 1.1075243756976727
                wins: 1.6565368865629884
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 8
              wins: 5
              losses: 3
              survived: 6
              winAndSurvived: 5
            }
            avgInfo: {
              damage: 69734
              damageData: {
                code: 3
                value: 83000
                color: '#02C9B3'
              }
              scoutingDamage: 9394
              win: 62.5
              winsData: {
                code: 6
                value: 65
                color: '#673ab7'
              }
              kd: 3
              frags: 0.75
              shipsSpotted: 0
              planesKilled: 4
              artAgro: 613431
              tpdAgro: 13846
              xp: 1838
              basicXp: 0
            }
            fragsInfo: {
              frags: 6
              fragsByMain: 4
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 3751720752
                value: 2
              }
              maxFragsByMain: {
                shipId: 3751720752
                value: 2
              }
              maxFragsByTpd: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByRam: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByAtba: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealt: {
                shipId: 3751720752
                value: 120437
              }
              maxScoutingDamage: {
                shipId: 3751720752
                value: 28154
              }
              maxPlanesKilled: {
                shipId: 3751720752
                value: 11
              }
              maxShipsSpotted: {
                shipId: 3751720752
                value: 1
              }
              maxTotalAgro: {
                shipId: 3751720752
                value: 1347600
              }
              maxSuppressionsCount: {
                shipId: 3751720752
                value: 0
              }
              maxXp: {
                shipId: 3751720752
                value: 2669
              }
              maxBasicXp: {
                shipId: 3751720752
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 100
            }
            hitRatioInfo: {
              ratioMain: 27.09
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 1694876113
            recordTime: 1701395742203
          }
        }
        RANK_SOLO: {
          battle: true
          prInfo: {
            code: 4
            value: 1463
            nextValue: 87
            name: '好'
            englishName: 'Good'
            color: '#44B300'
            details: {
              pr: 1463
              originalServer: {
                shipId: 3751720752
                damage: 54392.09304891504
                frags: 0.6838249356381099
                wins: 52.21556638469984
              }
              user: {
                shipId: 3751720752
                damage: 61660
                frags: 0
                wins: 1
              }
              userServer: {
                shipId: 3751720752
                damage: 54392.09304891504
                frags: 0.6838249356381099
                wins: 0.5221556638469984
              }
              two: {
                shipId: 3751720752
                damage: 1.133620652261881
                frags: 0
                wins: 1.9151377055502343
              }
              three: {
                shipId: 3751720752
                damage: 1.222701087103135
                frags: 0
                wins: 4.0504590185007805
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 1
              wins: 1
              losses: 0
              survived: 1
              winAndSurvived: 1
            }
            avgInfo: {
              damage: 61660
              damageData: {
                code: 3
                value: 83000
                color: '#02C9B3'
              }
              scoutingDamage: 0
              win: 100
              winsData: {
                code: 6
                value: 65
                color: '#673ab7'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 4
              artAgro: 435400
              tpdAgro: 0
              xp: 2101
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByMain: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByTpd: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByRam: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByAtba: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealt: {
                shipId: 3751720752
                value: 61660
              }
              maxScoutingDamage: {
                shipId: 3751720752
                value: 0
              }
              maxPlanesKilled: {
                shipId: 3751720752
                value: 4
              }
              maxShipsSpotted: {
                shipId: 3751720752
                value: 0
              }
              maxTotalAgro: {
                shipId: 3751720752
                value: 435400
              }
              maxSuppressionsCount: {
                shipId: 3751720752
                value: 0
              }
              maxXp: {
                shipId: 3751720752
                value: 2101
              }
              maxBasicXp: {
                shipId: 3751720752
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 100
            }
            hitRatioInfo: {
              ratioMain: 30.12
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 1694876113
            recordTime: 1701395742203
          }
        }
        PVP_SOLO: {
          battle: true
          prInfo: {
            code: 6
            value: 1818
            nextValue: 282
            name: '非常好'
            englishName: 'Great'
            color: '#02C9B3'
            details: {
              pr: 1818
              originalServer: {
                shipId: 3751720752
                damage: 54392.09304891504
                frags: 0.6838249356381099
                wins: 52.21556638469984
              }
              user: {
                shipId: 3751720752
                damage: 807820
                frags: 12
                wins: 3
              }
              userServer: {
                shipId: 3751720752
                damage: 543920.9304891505
                frags: 6.838249356381098
                wins: 5.221556638469984
              }
              two: {
                shipId: 3751720752
                damage: 1.4851791036493558
                frags: 1.754835101004649
                wins: 0.5745413116650703
              }
              three: {
                shipId: 3751720752
                damage: 1.8086318394155931
                frags: 1.8387056677829432
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 10
              wins: 3
              losses: 7
              survived: 3
              winAndSurvived: 1
            }
            avgInfo: {
              damage: 80782
              damageData: {
                code: 3
                value: 83000
                color: '#02C9B3'
              }
              scoutingDamage: 14799
              win: 30
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 1.71
              frags: 1.2
              shipsSpotted: 0
              planesKilled: 5
              artAgro: 1048020
              tpdAgro: 57567
              xp: 1778
              basicXp: 0
            }
            fragsInfo: {
              frags: 12
              fragsByMain: 11
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 3751720752
                value: 4
              }
              maxFragsByMain: {
                shipId: 3751720752
                value: 3
              }
              maxFragsByTpd: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByRam: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByAtba: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealt: {
                shipId: 3751720752
                value: 138078
              }
              maxScoutingDamage: {
                shipId: 3751720752
                value: 37634
              }
              maxPlanesKilled: {
                shipId: 3751720752
                value: 10
              }
              maxShipsSpotted: {
                shipId: 3751720752
                value: 2
              }
              maxTotalAgro: {
                shipId: 3751720752
                value: 1805350
              }
              maxSuppressionsCount: {
                shipId: 3751720752
                value: 0
              }
              maxXp: {
                shipId: 3751720752
                value: 3228
              }
              maxBasicXp: {
                shipId: 3751720752
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 100
            }
            hitRatioInfo: {
              ratioMain: 28.63
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 1694876113
            recordTime: 1701395742203
          }
        }
        PVP_DIV3: {
          battle: true
          prInfo: {
            code: 7
            value: 2142
            nextValue: 308
            name: '大佬水平'
            englishName: 'Unicum'
            color: '#D042F3'
            details: {
              pr: 2142
              originalServer: {
                shipId: 3751720752
                damage: 54392.09304891504
                frags: 0.6838249356381099
                wins: 52.21556638469984
              }
              user: {
                shipId: 3751720752
                damage: 1497274
                frags: 23
                wins: 11
              }
              userServer: {
                shipId: 3751720752
                damage: 979057.6748804707
                frags: 12.308848841485977
                wins: 9.398801949245971
              }
              two: {
                shipId: 3751720752
                damage: 1.529301121287667
                frags: 1.868574413106802
                wins: 1.1703619311695876
              }
              three: {
                shipId: 3751720752
                damage: 1.8821685354794448
                frags: 1.96508268122978
                wins: 1.5678731038986253
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 18
              wins: 11
              losses: 7
              survived: 11
              winAndSurvived: 9
            }
            avgInfo: {
              damage: 83182
              damageData: {
                code: 4
                value: 95000
                color: '#A00DC5'
              }
              scoutingDamage: 12158
              win: 61.11
              winsData: {
                code: 6
                value: 65
                color: '#673ab7'
              }
              kd: 3.29
              frags: 1.28
              shipsSpotted: 0
              planesKilled: 9
              artAgro: 782283
              tpdAgro: 64393
              xp: 2339
              basicXp: 0
            }
            fragsInfo: {
              frags: 23
              fragsByMain: 20
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 1
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 3751720752
                value: 4
              }
              maxFragsByMain: {
                shipId: 3751720752
                value: 3
              }
              maxFragsByTpd: {
                shipId: 3751720752
                value: 1
              }
              maxFragsByDbomb: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByRam: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByAtba: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealt: {
                shipId: 3751720752
                value: 208289
              }
              maxScoutingDamage: {
                shipId: 3751720752
                value: 51228
              }
              maxPlanesKilled: {
                shipId: 3751720752
                value: 45
              }
              maxShipsSpotted: {
                shipId: 3751720752
                value: 1
              }
              maxTotalAgro: {
                shipId: 3751720752
                value: 2004567
              }
              maxSuppressionsCount: {
                shipId: 3751720752
                value: 0
              }
              maxXp: {
                shipId: 3751720752
                value: 4639
              }
              maxBasicXp: {
                shipId: 3751720752
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 1667.72
              gameContributionToDefense: 100
            }
            hitRatioInfo: {
              ratioMain: 29.85
              ratioAtba: 10.78
              ratioTpd: 13.89
              ratioTbomb: 0
            }
            lastBattleTime: 1694876113
            recordTime: 1701395742203
          }
        }
        PVP: {
          battle: true
          prInfo: {
            code: 6
            value: 1916
            nextValue: 184
            name: '非常好'
            englishName: 'Great'
            color: '#02C9B3'
            details: {
              pr: 1916
              originalServer: {
                shipId: 3751720752
                damage: 54392.09304891504
                frags: 0.6838249356381099
                wins: 52.21556638469984
              }
              user: {
                shipId: 3751720752
                damage: 2862963
                frags: 41
                wins: 19
              }
              userServer: {
                shipId: 3751720752
                damage: 1958115.3497609415
                frags: 24.617697682971954
                wins: 18.797603898491943
              }
              two: {
                shipId: 3751720752
                damage: 1.4621013007990198
                frags: 1.6654684986386714
                wins: 1.010767122373735
              }
              three: {
                shipId: 3751720752
                damage: 1.7701688346650328
                frags: 1.739409442931857
                wins: 1.0358904079124496
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 36
              wins: 19
              losses: 17
              survived: 20
              winAndSurvived: 15
            }
            avgInfo: {
              damage: 79527
              damageData: {
                code: 3
                value: 83000
                color: '#02C9B3'
              }
              scoutingDamage: 12277
              win: 52.78
              winsData: {
                code: 4
                value: 55
                color: '#00bcd4'
              }
              kd: 2.56
              frags: 1.14
              shipsSpotted: 0
              planesKilled: 7
              artAgro: 818576
              tpdAgro: 51264
              xp: 2072
              basicXp: 0
            }
            fragsInfo: {
              frags: 41
              fragsByMain: 35
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 1
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 3751720752
                value: 4
              }
              maxFragsByMain: {
                shipId: 3751720752
                value: 3
              }
              maxFragsByTpd: {
                shipId: 3751720752
                value: 1
              }
              maxFragsByDbomb: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByRam: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByAtba: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 3751720752
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 3751720752
                value: 0
              }
              maxDamageDealt: {
                shipId: 3751720752
                value: 208289
              }
              maxScoutingDamage: {
                shipId: 3751720752
                value: 51228
              }
              maxPlanesKilled: {
                shipId: 3751720752
                value: 45
              }
              maxShipsSpotted: {
                shipId: 3751720752
                value: 2
              }
              maxTotalAgro: {
                shipId: 3751720752
                value: 2004567
              }
              maxSuppressionsCount: {
                shipId: 3751720752
                value: 0
              }
              maxXp: {
                shipId: 3751720752
                value: 4639
              }
              maxBasicXp: {
                shipId: 3751720752
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 2839.87
              gameContributionToDefense: 100
            }
            hitRatioInfo: {
              ratioMain: 28.86
              ratioAtba: 10.78
              ratioTpd: 10.42
              ratioTbomb: 0
            }
            lastBattleTime: 1694876113
            recordTime: 1701395742203
          }
        }
      }
    }
  ]
}

/**
 * Recentinfo  近期数据
 */
export interface Recentinfo {
  userInfo: UserInfo
  battleTypeInfo: {
    PVP_DIV2: {
      battle: true
      prInfo: {
        code: 1
        value: 265
        nextValue: 485
        name: '还需努力'
        englishName: 'Bad'
        color: '#FE0E00'
        details: {
          pr: 265
          originalServer: {
            shipId: 0
            damage: 79975.53816793892
            frags: 0.605869188063794
            wins: 0.4629255031228405
          }
          user: {
            shipId: 0
            damage: 50172
            frags: 0
            wins: 0
          }
          userServer: {
            shipId: 0
            damage: 79975.53816793892
            frags: 0.605869188063794
            wins: 0.4629255031228405
          }
          two: {
            shipId: 0
            damage: 0.6273418241293343
            frags: 0
            wins: 0
          }
          three: {
            shipId: 0
            damage: 0.3789030402155571
            frags: 0
            wins: 0
          }
        }
      }
      battleInfo: {
        battleInfo: {
          battle: 1
          wins: 0
          losses: 1
          survived: 0
          winAndSurvived: 0
        }
        avgInfo: {
          damage: 50172
          damageData: {
            code: 1
            value: 64000
            color: '#FE7903'
          }
          scoutingDamage: 11939
          win: 0
          winsData: {
            code: 1
            value: 40
            color: '#f44336'
          }
          kd: 0
          frags: 0
          shipsSpotted: 0
          planesKilled: 0
          artAgro: 1482750
          tpdAgro: 0
          xp: 1126
          basicXp: 0
        }
        fragsInfo: {
          frags: 0
          fragsByMain: 0
          fragsByAtba: 0
          fragsByPlanes: 0
          fragsByTpd: 0
          fragsByRam: 0
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 4276041424
            value: 8
          }
          maxFragsByMain: {
            shipId: 4276041424
            value: 7
          }
          maxFragsByTpd: {
            shipId: 4276041424
            value: 0
          }
          maxFragsByDbomb: {
            shipId: 4276041424
            value: 0
          }
          maxFragsByRam: {
            shipId: 4276041424
            value: 0
          }
          maxFragsByAtba: {
            shipId: 4276041424
            value: 1
          }
          maxDamageDealtToBuildings: {
            shipId: 4276041424
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 4276041424
            value: 0
          }
          maxDamageDealt: {
            shipId: 4276041424
            value: 306947
          }
          maxScoutingDamage: {
            shipId: 4276041424
            value: 56275
          }
          maxPlanesKilled: {
            shipId: 4276041424
            value: 23
          }
          maxShipsSpotted: {
            shipId: 4276041424
            value: 1
          }
          maxTotalAgro: {
            shipId: 4276041424
            value: 3094600
          }
          maxSuppressionsCount: {
            shipId: 4276041424
            value: 0
          }
          maxXp: {
            shipId: 4276041424
            value: 5718
          }
          maxBasicXp: {
            shipId: 4276041424
            value: 3465
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 0
          gameContributionToDefense: 100
        }
        hitRatioInfo: {
          ratioMain: 18.42
          ratioAtba: 0
          ratioTpd: 0
          ratioTbomb: 0
        }
        lastBattleTime: 1699704944
        recordTime: 1701306618315
      }
    }
    PVP_SOLO: {
      battle: false
      prInfo: {
        code: 0
        value: 0
        nextValue: 0
        name: '暂无数据'
        englishName: 'No Rating'
        color: '#828282'
        details: {
          pr: 0
          originalServer: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          user: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          userServer: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          two: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          three: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
        }
      }
      battleInfo: {
        battleInfo: {
          battle: 0
          wins: 0
          losses: 0
          survived: 0
          winAndSurvived: 0
        }
        avgInfo: {
          damage: 0
          damageData: {
            code: 0
            value: 0
            color: '#FE7903'
          }
          scoutingDamage: 0
          win: 0
          winsData: {
            code: 1
            value: 40
            color: '#f44336'
          }
          kd: 0
          frags: 0
          shipsSpotted: 0
          planesKilled: 0
          artAgro: 0
          tpdAgro: 0
          xp: 0
          basicXp: 0
        }
        fragsInfo: {
          frags: 0
          fragsByMain: 0
          fragsByAtba: 0
          fragsByPlanes: 0
          fragsByTpd: 0
          fragsByRam: 0
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 0
            value: 0
          }
          maxFragsByMain: {
            shipId: 0
            value: 0
          }
          maxFragsByTpd: {
            shipId: 0
            value: 0
          }
          maxFragsByDbomb: {
            shipId: 0
            value: 0
          }
          maxFragsByRam: {
            shipId: 0
            value: 0
          }
          maxFragsByAtba: {
            shipId: 0
            value: 0
          }
          maxDamageDealtToBuildings: {
            shipId: 0
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 0
            value: 0
          }
          maxDamageDealt: {
            shipId: 0
            value: 0
          }
          maxScoutingDamage: {
            shipId: 0
            value: 0
          }
          maxPlanesKilled: {
            shipId: 0
            value: 0
          }
          maxShipsSpotted: {
            shipId: 0
            value: 0
          }
          maxTotalAgro: {
            shipId: 0
            value: 0
          }
          maxSuppressionsCount: {
            shipId: 0
            value: 0
          }
          maxXp: {
            shipId: 0
            value: 0
          }
          maxBasicXp: {
            shipId: 0
            value: 0
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 0
          gameContributionToDefense: 0
        }
        hitRatioInfo: {
          ratioMain: 0
          ratioAtba: 0
          ratioTpd: 0
          ratioTbomb: 0
        }
        lastBattleTime: 0
        recordTime: 0
      }
    }
    PVP_DIV3: {
      battle: false
      prInfo: {
        code: 0
        value: 0
        nextValue: 0
        name: '暂无数据'
        englishName: 'No Rating'
        color: '#828282'
        details: {
          pr: 0
          originalServer: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          user: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          userServer: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          two: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          three: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
        }
      }
      battleInfo: {
        battleInfo: {
          battle: 0
          wins: 0
          losses: 0
          survived: 0
          winAndSurvived: 0
        }
        avgInfo: {
          damage: 0
          damageData: {
            code: 0
            value: 0
            color: '#FE7903'
          }
          scoutingDamage: 0
          win: 0
          winsData: {
            code: 1
            value: 40
            color: '#f44336'
          }
          kd: 0
          frags: 0
          shipsSpotted: 0
          planesKilled: 0
          artAgro: 0
          tpdAgro: 0
          xp: 0
          basicXp: 0
        }
        fragsInfo: {
          frags: 0
          fragsByMain: 0
          fragsByAtba: 0
          fragsByPlanes: 0
          fragsByTpd: 0
          fragsByRam: 0
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 0
            value: 0
          }
          maxFragsByMain: {
            shipId: 0
            value: 0
          }
          maxFragsByTpd: {
            shipId: 0
            value: 0
          }
          maxFragsByDbomb: {
            shipId: 0
            value: 0
          }
          maxFragsByRam: {
            shipId: 0
            value: 0
          }
          maxFragsByAtba: {
            shipId: 0
            value: 0
          }
          maxDamageDealtToBuildings: {
            shipId: 0
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 0
            value: 0
          }
          maxDamageDealt: {
            shipId: 0
            value: 0
          }
          maxScoutingDamage: {
            shipId: 0
            value: 0
          }
          maxPlanesKilled: {
            shipId: 0
            value: 0
          }
          maxShipsSpotted: {
            shipId: 0
            value: 0
          }
          maxTotalAgro: {
            shipId: 0
            value: 0
          }
          maxSuppressionsCount: {
            shipId: 0
            value: 0
          }
          maxXp: {
            shipId: 0
            value: 0
          }
          maxBasicXp: {
            shipId: 0
            value: 0
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 0
          gameContributionToDefense: 0
        }
        hitRatioInfo: {
          ratioMain: 0
          ratioAtba: 0
          ratioTpd: 0
          ratioTbomb: 0
        }
        lastBattleTime: 0
        recordTime: 0
      }
    }
    PVP: {
      battle: true
      prInfo: {
        code: 1
        value: 265
        nextValue: 485
        name: '还需努力'
        englishName: 'Bad'
        color: '#FE0E00'
        details: {
          pr: 265
          originalServer: {
            shipId: 0
            damage: 79975.53816793892
            frags: 0.605869188063794
            wins: 0.4629255031228405
          }
          user: {
            shipId: 0
            damage: 50172
            frags: 0
            wins: 0
          }
          userServer: {
            shipId: 0
            damage: 79975.53816793892
            frags: 0.605869188063794
            wins: 0.4629255031228405
          }
          two: {
            shipId: 0
            damage: 0.6273418241293343
            frags: 0
            wins: 0
          }
          three: {
            shipId: 0
            damage: 0.3789030402155571
            frags: 0
            wins: 0
          }
        }
      }
      battleInfo: {
        battleInfo: {
          battle: 1
          wins: 0
          losses: 1
          survived: 0
          winAndSurvived: 0
        }
        avgInfo: {
          damage: 50172
          damageData: {
            code: 1
            value: 64000
            color: '#FE7903'
          }
          scoutingDamage: 11939
          win: 0
          winsData: {
            code: 1
            value: 40
            color: '#f44336'
          }
          kd: 0
          frags: 0
          shipsSpotted: 0
          planesKilled: 0
          artAgro: 1482750
          tpdAgro: 0
          xp: 1126
          basicXp: 0
        }
        fragsInfo: {
          frags: 0
          fragsByMain: 0
          fragsByAtba: 0
          fragsByPlanes: 0
          fragsByTpd: 0
          fragsByRam: 0
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 4276041424
            value: 8
          }
          maxFragsByMain: {
            shipId: 4276041424
            value: 7
          }
          maxFragsByTpd: {
            shipId: 4276041424
            value: 0
          }
          maxFragsByDbomb: {
            shipId: 4276041424
            value: 0
          }
          maxFragsByRam: {
            shipId: 4276041424
            value: 0
          }
          maxFragsByAtba: {
            shipId: 4276041424
            value: 1
          }
          maxDamageDealtToBuildings: {
            shipId: 4276041424
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 4276041424
            value: 0
          }
          maxDamageDealt: {
            shipId: 4276041424
            value: 306947
          }
          maxScoutingDamage: {
            shipId: 4276041424
            value: 124045
          }
          maxPlanesKilled: {
            shipId: 4276041424
            value: 23
          }
          maxShipsSpotted: {
            shipId: 4276041424
            value: 4
          }
          maxTotalAgro: {
            shipId: 4276041424
            value: 4121100
          }
          maxSuppressionsCount: {
            shipId: 4276041424
            value: 0
          }
          maxXp: {
            shipId: 4276041424
            value: 5718
          }
          maxBasicXp: {
            shipId: 4276041424
            value: 3465
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 0
          gameContributionToDefense: 100
        }
        hitRatioInfo: {
          ratioMain: 18.42
          ratioAtba: 0
          ratioTpd: 0
          ratioTbomb: 0
        }
        lastBattleTime: 1699704944
        recordTime: 1701306618315
      }
    }
    RANK_SOLO: {
      battle: false
      prInfo: {
        code: 0
        value: 0
        nextValue: 0
        name: '暂无数据'
        englishName: 'No Rating'
        color: '#828282'
        details: {
          pr: 0
          originalServer: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          user: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          userServer: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          two: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
          three: {
            shipId: 0
            damage: 0
            frags: 0
            wins: 0
          }
        }
      }
      battleInfo: {
        battleInfo: {
          battle: 0
          wins: 0
          losses: 0
          survived: 0
          winAndSurvived: 0
        }
        avgInfo: {
          damage: 0
          damageData: {
            code: 0
            value: 0
            color: '#FE7903'
          }
          scoutingDamage: 0
          win: 0
          winsData: {
            code: 1
            value: 40
            color: '#f44336'
          }
          kd: 0
          frags: 0
          shipsSpotted: 0
          planesKilled: 0
          artAgro: 0
          tpdAgro: 0
          xp: 0
          basicXp: 0
        }
        fragsInfo: {
          frags: 0
          fragsByMain: 0
          fragsByAtba: 0
          fragsByPlanes: 0
          fragsByTpd: 0
          fragsByRam: 0
          fragsByDbomb: 0
        }
        maxInfo: {
          maxFrags: {
            shipId: 0
            value: 0
          }
          maxFragsByMain: {
            shipId: 0
            value: 0
          }
          maxFragsByTpd: {
            shipId: 0
            value: 0
          }
          maxFragsByDbomb: {
            shipId: 0
            value: 0
          }
          maxFragsByRam: {
            shipId: 0
            value: 0
          }
          maxFragsByAtba: {
            shipId: 0
            value: 0
          }
          maxDamageDealtToBuildings: {
            shipId: 0
            value: 0
          }
          maxFragsByPlanes: {
            shipId: 0
            value: 0
          }
          maxDamageDealt: {
            shipId: 0
            value: 0
          }
          maxScoutingDamage: {
            shipId: 0
            value: 0
          }
          maxPlanesKilled: {
            shipId: 0
            value: 0
          }
          maxShipsSpotted: {
            shipId: 0
            value: 0
          }
          maxTotalAgro: {
            shipId: 0
            value: 0
          }
          maxSuppressionsCount: {
            shipId: 0
            value: 0
          }
          maxXp: {
            shipId: 0
            value: 0
          }
          maxBasicXp: {
            shipId: 0
            value: 0
          }
        }
        controlCapturedAndDroppedPointsInfo: {
          gameContributionToCapture: 0
          gameContributionToDefense: 0
        }
        hitRatioInfo: {
          ratioMain: 0
          ratioAtba: 0
          ratioTpd: 0
          ratioTbomb: 0
        }
        lastBattleTime: 0
        recordTime: 0
      }
    }
  }
  shipInfoBattleList: [
    {
      rank: 0
      shipInfo: {
        shipId: 3655251664
        nameCn: '北上'
        nameEnglish: 'Kitakami'
        nameNumbers: 'Kitakami'
        level: 10
        shipType: 'Cruiser'
        country: 'Japan'
        imgSmall: 'https://glossary-wows-global.gcdn.co/icons//vehicle/small/PJSC610_adecd618e72e636b2ed30e1568e898373f690d9c2b9107cada0bde5662e4bc94.png'
        imgLarge: 'https://glossary-wows-global.gcdn.co/icons//vehicle/large/PJSC610_65c363c028e451773226d045d76c65cdf10852b5b61bddac998ca9a256513c74.png'
        imgMedium: 'https://glossary-wows-global.gcdn.co/icons//vehicle/medium/PJSC610_addd679fc6bff4c2d60498d3f39159d52486ed830ccc34c1239bc4bb82ea8b59.png'
        shipIndex: 'PJSC610'
        groupType: 'demoWithoutStatsPrem'
      }
      typeInfo: {
        PVP_DIV2: {
          battle: false
          prInfo: {
            code: 0
            value: 0
            nextValue: 0
            name: '暂无数据'
            englishName: 'No Rating'
            color: '#828282'
            details: {
              pr: 0
              originalServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              user: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              two: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              three: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 0
              wins: 0
              losses: 0
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 0
              damageData: {
                code: 0
                value: 0
                color: '#FE7903'
              }
              scoutingDamage: 0
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 0
              tpdAgro: 0
              xp: 0
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 0
                value: 0
              }
              maxFragsByMain: {
                shipId: 0
                value: 0
              }
              maxFragsByTpd: {
                shipId: 0
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 0
                value: 0
              }
              maxFragsByRam: {
                shipId: 0
                value: 0
              }
              maxFragsByAtba: {
                shipId: 0
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 0
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 0
                value: 0
              }
              maxDamageDealt: {
                shipId: 0
                value: 0
              }
              maxScoutingDamage: {
                shipId: 0
                value: 0
              }
              maxPlanesKilled: {
                shipId: 0
                value: 0
              }
              maxShipsSpotted: {
                shipId: 0
                value: 0
              }
              maxTotalAgro: {
                shipId: 0
                value: 0
              }
              maxSuppressionsCount: {
                shipId: 0
                value: 0
              }
              maxXp: {
                shipId: 0
                value: 0
              }
              maxBasicXp: {
                shipId: 0
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 0
            }
            hitRatioInfo: {
              ratioMain: 0
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 0
            recordTime: 0
          }
        }
        PVP_SOLO: {
          battle: false
          prInfo: {
            code: 0
            value: 0
            nextValue: 0
            name: '暂无数据'
            englishName: 'No Rating'
            color: '#828282'
            details: {
              pr: 0
              originalServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              user: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              two: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              three: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 0
              wins: 0
              losses: 0
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 0
              damageData: {
                code: 0
                value: 0
                color: '#FE7903'
              }
              scoutingDamage: 0
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 0
              tpdAgro: 0
              xp: 0
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 0
                value: 0
              }
              maxFragsByMain: {
                shipId: 0
                value: 0
              }
              maxFragsByTpd: {
                shipId: 0
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 0
                value: 0
              }
              maxFragsByRam: {
                shipId: 0
                value: 0
              }
              maxFragsByAtba: {
                shipId: 0
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 0
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 0
                value: 0
              }
              maxDamageDealt: {
                shipId: 0
                value: 0
              }
              maxScoutingDamage: {
                shipId: 0
                value: 0
              }
              maxPlanesKilled: {
                shipId: 0
                value: 0
              }
              maxShipsSpotted: {
                shipId: 0
                value: 0
              }
              maxTotalAgro: {
                shipId: 0
                value: 0
              }
              maxSuppressionsCount: {
                shipId: 0
                value: 0
              }
              maxXp: {
                shipId: 0
                value: 0
              }
              maxBasicXp: {
                shipId: 0
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 0
            }
            hitRatioInfo: {
              ratioMain: 0
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 0
            recordTime: 0
          }
        }
        PVP_DIV3: {
          battle: false
          prInfo: {
            code: 0
            value: 0
            nextValue: 0
            name: '暂无数据'
            englishName: 'No Rating'
            color: '#828282'
            details: {
              pr: 0
              originalServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              user: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              two: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              three: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 0
              wins: 0
              losses: 0
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 0
              damageData: {
                code: 0
                value: 0
                color: '#FE7903'
              }
              scoutingDamage: 0
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 0
              tpdAgro: 0
              xp: 0
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 0
                value: 0
              }
              maxFragsByMain: {
                shipId: 0
                value: 0
              }
              maxFragsByTpd: {
                shipId: 0
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 0
                value: 0
              }
              maxFragsByRam: {
                shipId: 0
                value: 0
              }
              maxFragsByAtba: {
                shipId: 0
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 0
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 0
                value: 0
              }
              maxDamageDealt: {
                shipId: 0
                value: 0
              }
              maxScoutingDamage: {
                shipId: 0
                value: 0
              }
              maxPlanesKilled: {
                shipId: 0
                value: 0
              }
              maxShipsSpotted: {
                shipId: 0
                value: 0
              }
              maxTotalAgro: {
                shipId: 0
                value: 0
              }
              maxSuppressionsCount: {
                shipId: 0
                value: 0
              }
              maxXp: {
                shipId: 0
                value: 0
              }
              maxBasicXp: {
                shipId: 0
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 0
            }
            hitRatioInfo: {
              ratioMain: 0
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 0
            recordTime: 0
          }
        }
        PVP: {
          battle: false
          prInfo: {
            code: 0
            value: 0
            nextValue: 0
            name: '暂无数据'
            englishName: 'No Rating'
            color: '#828282'
            details: {
              pr: 0
              originalServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              user: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              two: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              three: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 0
              wins: 0
              losses: 0
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 0
              damageData: {
                code: 0
                value: 0
                color: '#FE7903'
              }
              scoutingDamage: 0
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 0
              tpdAgro: 0
              xp: 0
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 0
                value: 0
              }
              maxFragsByMain: {
                shipId: 0
                value: 0
              }
              maxFragsByTpd: {
                shipId: 0
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 0
                value: 0
              }
              maxFragsByRam: {
                shipId: 0
                value: 0
              }
              maxFragsByAtba: {
                shipId: 0
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 0
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 0
                value: 0
              }
              maxDamageDealt: {
                shipId: 0
                value: 0
              }
              maxScoutingDamage: {
                shipId: 0
                value: 0
              }
              maxPlanesKilled: {
                shipId: 0
                value: 0
              }
              maxShipsSpotted: {
                shipId: 0
                value: 0
              }
              maxTotalAgro: {
                shipId: 0
                value: 0
              }
              maxSuppressionsCount: {
                shipId: 0
                value: 0
              }
              maxXp: {
                shipId: 0
                value: 0
              }
              maxBasicXp: {
                shipId: 0
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 0
            }
            hitRatioInfo: {
              ratioMain: 0
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 0
            recordTime: 0
          }
        }
        RANK_SOLO: {
          battle: false
          prInfo: {
            code: 0
            value: 0
            nextValue: 0
            name: '暂无数据'
            englishName: 'No Rating'
            color: '#828282'
            details: {
              pr: 0
              originalServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              user: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              two: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              three: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 0
              wins: 0
              losses: 0
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 0
              damageData: {
                code: 0
                value: 0
                color: '#FE7903'
              }
              scoutingDamage: 0
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 0
              tpdAgro: 0
              xp: 0
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 0
                value: 0
              }
              maxFragsByMain: {
                shipId: 0
                value: 0
              }
              maxFragsByTpd: {
                shipId: 0
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 0
                value: 0
              }
              maxFragsByRam: {
                shipId: 0
                value: 0
              }
              maxFragsByAtba: {
                shipId: 0
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 0
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 0
                value: 0
              }
              maxDamageDealt: {
                shipId: 0
                value: 0
              }
              maxScoutingDamage: {
                shipId: 0
                value: 0
              }
              maxPlanesKilled: {
                shipId: 0
                value: 0
              }
              maxShipsSpotted: {
                shipId: 0
                value: 0
              }
              maxTotalAgro: {
                shipId: 0
                value: 0
              }
              maxSuppressionsCount: {
                shipId: 0
                value: 0
              }
              maxXp: {
                shipId: 0
                value: 0
              }
              maxBasicXp: {
                shipId: 0
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 0
            }
            hitRatioInfo: {
              ratioMain: 0
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 0
            recordTime: 0
          }
        }
      }
    },
    {
      rank: 0
      shipInfo: {
        shipId: 4276041424
        nameCn: '大和'
        nameEnglish: 'Yamato'
        nameNumbers: 'Yamato'
        level: 10
        shipType: 'Battleship'
        country: 'Japan'
        imgSmall: 'https://glossary-wows-global.gcdn.co/icons//vehicle/small/PJSB018_bb608ae8c89cac27791627deb721463af6cb68edcf370154c3081db0d386d9db.png'
        imgLarge: 'https://glossary-wows-global.gcdn.co/icons//vehicle/large/PJSB018_a2537f6f5dd5c080d6b8ab041247a37b884fcf801483af87bf544ff0c764d23c.png'
        imgMedium: 'https://glossary-wows-global.gcdn.co/icons//vehicle/medium/PJSB018_857679f9c34121af5fcdd61ce12aeda73db5fceab711e5f96c6710e9d99c3550.png'
        shipIndex: 'PJSB018'
        groupType: 'upgradeable'
      }
      typeInfo: {
        PVP_DIV2: {
          battle: true
          prInfo: {
            code: 1
            value: 265
            nextValue: 485
            name: '还需努力'
            englishName: 'Bad'
            color: '#FE0E00'
            details: {
              pr: 265
              originalServer: {
                shipId: 4276041424
                damage: 79975.53816793892
                frags: 0.605869188063794
                wins: 46.29255031228405
              }
              user: {
                shipId: 4276041424
                damage: 50172
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 4276041424
                damage: 79975.53816793892
                frags: 0.605869188063794
                wins: 0.4629255031228405
              }
              two: {
                shipId: 4276041424
                damage: 0.6273418241293343
                frags: 0
                wins: 0
              }
              three: {
                shipId: 4276041424
                damage: 0.3789030402155571
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 1
              wins: 0
              losses: 1
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 50172
              damageData: {
                code: 1
                value: 64000
                color: '#FE7903'
              }
              scoutingDamage: 11939
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 1482750
              tpdAgro: 0
              xp: 1126
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 4276041424
                value: 8
              }
              maxFragsByMain: {
                shipId: 4276041424
                value: 7
              }
              maxFragsByTpd: {
                shipId: 4276041424
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 4276041424
                value: 0
              }
              maxFragsByRam: {
                shipId: 4276041424
                value: 0
              }
              maxFragsByAtba: {
                shipId: 4276041424
                value: 1
              }
              maxDamageDealtToBuildings: {
                shipId: 4276041424
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 4276041424
                value: 0
              }
              maxDamageDealt: {
                shipId: 4276041424
                value: 306947
              }
              maxScoutingDamage: {
                shipId: 4276041424
                value: 56275
              }
              maxPlanesKilled: {
                shipId: 4276041424
                value: 23
              }
              maxShipsSpotted: {
                shipId: 4276041424
                value: 1
              }
              maxTotalAgro: {
                shipId: 4276041424
                value: 3094600
              }
              maxSuppressionsCount: {
                shipId: 4276041424
                value: 0
              }
              maxXp: {
                shipId: 4276041424
                value: 5718
              }
              maxBasicXp: {
                shipId: 4276041424
                value: 3465
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 100
            }
            hitRatioInfo: {
              ratioMain: 18.42
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 1699704944
            recordTime: 1694301385347
          }
        }
        PVP_SOLO: {
          battle: false
          prInfo: {
            code: 0
            value: 0
            nextValue: 0
            name: '暂无数据'
            englishName: 'No Rating'
            color: '#828282'
            details: {
              pr: 0
              originalServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              user: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              two: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              three: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 0
              wins: 0
              losses: 0
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 0
              damageData: {
                code: 0
                value: 0
                color: '#FE7903'
              }
              scoutingDamage: 0
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 0
              tpdAgro: 0
              xp: 0
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 0
                value: 0
              }
              maxFragsByMain: {
                shipId: 0
                value: 0
              }
              maxFragsByTpd: {
                shipId: 0
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 0
                value: 0
              }
              maxFragsByRam: {
                shipId: 0
                value: 0
              }
              maxFragsByAtba: {
                shipId: 0
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 0
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 0
                value: 0
              }
              maxDamageDealt: {
                shipId: 0
                value: 0
              }
              maxScoutingDamage: {
                shipId: 0
                value: 0
              }
              maxPlanesKilled: {
                shipId: 0
                value: 0
              }
              maxShipsSpotted: {
                shipId: 0
                value: 0
              }
              maxTotalAgro: {
                shipId: 0
                value: 0
              }
              maxSuppressionsCount: {
                shipId: 0
                value: 0
              }
              maxXp: {
                shipId: 0
                value: 0
              }
              maxBasicXp: {
                shipId: 0
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 0
            }
            hitRatioInfo: {
              ratioMain: 0
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 0
            recordTime: 0
          }
        }
        PVP_DIV3: {
          battle: false
          prInfo: {
            code: 0
            value: 0
            nextValue: 0
            name: '暂无数据'
            englishName: 'No Rating'
            color: '#828282'
            details: {
              pr: 0
              originalServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              user: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              two: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              three: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 0
              wins: 0
              losses: 0
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 0
              damageData: {
                code: 0
                value: 0
                color: '#FE7903'
              }
              scoutingDamage: 0
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 0
              tpdAgro: 0
              xp: 0
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 0
                value: 0
              }
              maxFragsByMain: {
                shipId: 0
                value: 0
              }
              maxFragsByTpd: {
                shipId: 0
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 0
                value: 0
              }
              maxFragsByRam: {
                shipId: 0
                value: 0
              }
              maxFragsByAtba: {
                shipId: 0
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 0
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 0
                value: 0
              }
              maxDamageDealt: {
                shipId: 0
                value: 0
              }
              maxScoutingDamage: {
                shipId: 0
                value: 0
              }
              maxPlanesKilled: {
                shipId: 0
                value: 0
              }
              maxShipsSpotted: {
                shipId: 0
                value: 0
              }
              maxTotalAgro: {
                shipId: 0
                value: 0
              }
              maxSuppressionsCount: {
                shipId: 0
                value: 0
              }
              maxXp: {
                shipId: 0
                value: 0
              }
              maxBasicXp: {
                shipId: 0
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 0
            }
            hitRatioInfo: {
              ratioMain: 0
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 0
            recordTime: 0
          }
        }
        PVP: {
          battle: true
          prInfo: {
            code: 1
            value: 265
            nextValue: 485
            name: '还需努力'
            englishName: 'Bad'
            color: '#FE0E00'
            details: {
              pr: 265
              originalServer: {
                shipId: 4276041424
                damage: 79975.53816793892
                frags: 0.605869188063794
                wins: 46.29255031228405
              }
              user: {
                shipId: 4276041424
                damage: 50172
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 4276041424
                damage: 79975.53816793892
                frags: 0.605869188063794
                wins: 0.4629255031228405
              }
              two: {
                shipId: 4276041424
                damage: 0.6273418241293343
                frags: 0
                wins: 0
              }
              three: {
                shipId: 4276041424
                damage: 0.3789030402155571
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 1
              wins: 0
              losses: 1
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 50172
              damageData: {
                code: 1
                value: 64000
                color: '#FE7903'
              }
              scoutingDamage: 11939
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 1482750
              tpdAgro: 0
              xp: 1126
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 4276041424
                value: 8
              }
              maxFragsByMain: {
                shipId: 4276041424
                value: 7
              }
              maxFragsByTpd: {
                shipId: 4276041424
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 4276041424
                value: 0
              }
              maxFragsByRam: {
                shipId: 4276041424
                value: 0
              }
              maxFragsByAtba: {
                shipId: 4276041424
                value: 1
              }
              maxDamageDealtToBuildings: {
                shipId: 4276041424
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 4276041424
                value: 0
              }
              maxDamageDealt: {
                shipId: 4276041424
                value: 306947
              }
              maxScoutingDamage: {
                shipId: 4276041424
                value: 124045
              }
              maxPlanesKilled: {
                shipId: 4276041424
                value: 23
              }
              maxShipsSpotted: {
                shipId: 4276041424
                value: 4
              }
              maxTotalAgro: {
                shipId: 4276041424
                value: 4121100
              }
              maxSuppressionsCount: {
                shipId: 4276041424
                value: 0
              }
              maxXp: {
                shipId: 4276041424
                value: 5718
              }
              maxBasicXp: {
                shipId: 4276041424
                value: 3465
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 100
            }
            hitRatioInfo: {
              ratioMain: 18.42
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 1699704944
            recordTime: 1694301385527
          }
        }
        RANK_SOLO: {
          battle: false
          prInfo: {
            code: 0
            value: 0
            nextValue: 0
            name: '暂无数据'
            englishName: 'No Rating'
            color: '#828282'
            details: {
              pr: 0
              originalServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              user: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              userServer: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              two: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
              three: {
                shipId: 0
                damage: 0
                frags: 0
                wins: 0
              }
            }
          }
          battleInfo: {
            battleInfo: {
              battle: 0
              wins: 0
              losses: 0
              survived: 0
              winAndSurvived: 0
            }
            avgInfo: {
              damage: 0
              damageData: {
                code: 0
                value: 0
                color: '#FE7903'
              }
              scoutingDamage: 0
              win: 0
              winsData: {
                code: 1
                value: 40
                color: '#f44336'
              }
              kd: 0
              frags: 0
              shipsSpotted: 0
              planesKilled: 0
              artAgro: 0
              tpdAgro: 0
              xp: 0
              basicXp: 0
            }
            fragsInfo: {
              frags: 0
              fragsByMain: 0
              fragsByAtba: 0
              fragsByPlanes: 0
              fragsByTpd: 0
              fragsByRam: 0
              fragsByDbomb: 0
            }
            maxInfo: {
              maxFrags: {
                shipId: 0
                value: 0
              }
              maxFragsByMain: {
                shipId: 0
                value: 0
              }
              maxFragsByTpd: {
                shipId: 0
                value: 0
              }
              maxFragsByDbomb: {
                shipId: 0
                value: 0
              }
              maxFragsByRam: {
                shipId: 0
                value: 0
              }
              maxFragsByAtba: {
                shipId: 0
                value: 0
              }
              maxDamageDealtToBuildings: {
                shipId: 0
                value: 0
              }
              maxFragsByPlanes: {
                shipId: 0
                value: 0
              }
              maxDamageDealt: {
                shipId: 0
                value: 0
              }
              maxScoutingDamage: {
                shipId: 0
                value: 0
              }
              maxPlanesKilled: {
                shipId: 0
                value: 0
              }
              maxShipsSpotted: {
                shipId: 0
                value: 0
              }
              maxTotalAgro: {
                shipId: 0
                value: 0
              }
              maxSuppressionsCount: {
                shipId: 0
                value: 0
              }
              maxXp: {
                shipId: 0
                value: 0
              }
              maxBasicXp: {
                shipId: 0
                value: 0
              }
            }
            controlCapturedAndDroppedPointsInfo: {
              gameContributionToCapture: 0
              gameContributionToDefense: 0
            }
            hitRatioInfo: {
              ratioMain: 0
              ratioAtba: 0
              ratioTpd: 0
              ratioTbomb: 0
            }
            lastBattleTime: 0
            recordTime: 0
          }
        }
      }
    }
  ]
  recordTime: 1694301385347
}
