import { version } from '../../../package.json'

const key = [
  '3d眼镜',
  'EDG',
  'LPL',
  'beluga',
  '不好意思',
  '不服吗',
  '亲亲',
  '伞兵',
  '倚墙笑',
  '值得肯定',
  '偷偷看',
  '傻笑',
  '再见',
  '出家人',
  '击剑',
  '加班',
  '勉强笑',
  '危险',
  '发红包',
  '吃手',
  '吃瓜',
  '吐血',
  '吵架',
  '呦吼',
  '呲牙笑',
  '哈士奇',
  '哈士奇失去意识',
  '哈士奇失望',
  '哭泣',
  '唱歌',
  '喜欢',
  '嘿哈',
  '大笑',
  '失去信号',
  '失望',
  '头秃',
  '奋斗',
  '好奇',
  '好的',
  '害羞',
  '小丑',
  '小偷',
  '尬笑',
  '尴尬',
  '应援',
  '开心',
  '引起不适',
  '微笑',
  '思考',
  '恶心',
  '恶魔',
  '恶魔恐惧',
  '惊吓',
  '惊吓白眼',
  '惊讶',
  '惬意',
  '感动',
  '愤怒',
  '我看好你',
  '手机相机',
  '打咩',
  '打牌',
  '托腮',
  '扶额',
  '抠鼻',
  '抬眼镜',
  '拜托',
  '捂嘴笑',
  '捂脸',
  '擦汗',
  '放鞭炮',
  '敬礼',
  '整理发型',
  '斗鸡眼',
  '智慧的眼神',
  '月饼',
  '有没有搞错',
  '正确',
  '没招',
  '波吉',
  '泪奔',
  '流汗微笑',
  '流鼻涕',
  '深思',
  '滑稽',
  '滑稽吃瓜',
  '滑稽喝水',
  '滑稽奶茶',
  '滑稽柠檬',
  '滑稽狂汗',
  '滑稽被子',
  '烦恼',
  '熊熊',
  '熊猫',
  '熊猫唱歌',
  '熊猫喜欢',
  '熊猫失望',
  '熊猫意外',
  '熬夜',
  '爆炸',
  '牛年进宝',
  '狂热',
  '狗头',
  '狗头围脖',
  '狗头失望',
  '狗头意外',
  '狗头胖次',
  '狗头花',
  '狗头草',
  '猪头',
  '猪头意外',
  '生病',
  '电话',
  '疑问',
  '疼痛',
  '痛哭',
  '看穿一切',
  '眩晕',
  '睡觉',
  '禁言',
  '笑哭',
  '纠结',
  '绿帽',
  '缺牙笑',
  '翻白眼',
  '老虎意外',
  '耍酷',
  '胡子',
  '菜狗',
  '菜狗花',
  '蒙面滑稽',
  '虎年进宝',
  '被打',
  '裂开',
  '警告',
  '读书',
  '财神红包',
  '超爱',
  '这是啥',
  '送福',
  '送花',
  '错误',
  '阴险',
  '难以置信',
  '面具',
  '饥渴',
  '鬼脸',
  '黑线',
  '鼓掌'
]

export default (emotCDN) => {
  emotCDN = (emotCDN || `https://lib.baomitu.com/discuss/${version}`).replace(/\/$/, '') + '/assets/emot/'
  const items = {}
  for (const i of key) items[i] = emotCDN + i + '.png'
  return {
    OwO: {
      type: 'text',
      items: {
        喵星人: '( =•ω•= )m',
        hi: 'Hi~ o(*￣▽￣*)ブ',
        啊啊: 'w(ﾟДﾟ)w',
        擦眼泪: ' (ノへ￣、)',
        不屑: ' (￣_,￣ )',
        好耶: 'ヽ(✿ﾟ▽ﾟ)ノ',
        棒: ' (๑•̀ㅂ•́)و✧',
        抽: '(￣ε(#￣)☆╰╮o(￣皿￣///)',
        亲: '（づ￣3￣）づ╭❤～',
        汗: 'Σ( ° △ °|||)︴',
        笨: '(～￣(OO)￣)ブ',
        擦: '凸(艹皿艹 )',
        啵啵: '(* ￣3)(ε￣ *)',
        挖鼻屎: '(*￣rǒ￣)',
        嗷: '┗|｀O′|┛ 嗷~~',
        飞: '︿(￣︶￣)︿',
        好滴: '(u‿ฺu✿ฺ)',
        啦啦: '♪(^∇^*)',
        拍桌: 'o(*≧▽≦)ツ┏━┓',
        惊喜: '╰(*°▽°*)╯',
        嘟嘴: '（○｀ 3′○）',
        愣住: '(°ー°〃)',
        哼哼: 'o(￣ヘ￣o＃)',
        崩溃: 'o(≧口≦)o',
        不是我: 'ㄟ( ▔, ▔ )ㄏ',
        呃呃呃: '(⊙﹏⊙)',
        切: '(ˉ▽￣～) 切~~',
        拜拜: 'ヾ(￣▽￣)Bye~Bye~',
        斜眼: '( ﹁ ﹁ ) ~→',
        美味: 'Ψ(￣∀￣)Ψ',
        闪: '✧(≖ ◡ ≖✿)',
        淡定: '━(￣ー￣*|||━━',
        太可怕了: 'ヽ(*。>Д<)o゜'
      }
    },
    [`<img src=${items['鼓掌']}>`]: {
      type: 'image',
      items: items
    }
  }
}
