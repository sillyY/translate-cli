const ora = require('ora')
const isChineseCheck = require('is-chinese')

const { googleTL } = require('./source/google')
const { input } = require('./util/input')



module.exports = async function(word, options) {
  const spinner = ora().start()
  // // say it
  // try {
  //   if (!process.env.CI) {
  //     require('say').speak(word, isChinese(word) ? 'Ting-Ting' : null);
  //   }
  // } catch(e) {
  //   // do nothing
  // }

  word = encodeURIComponent(word)

  // 检测是否为中文
  const isChinese = isChineseCheck(word)

  
  const res = await googleTL(word)
  input(res)

  spinner.stop()
}
