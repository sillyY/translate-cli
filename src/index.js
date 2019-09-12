const chalk = require('chalk')
const ora = require('ora')
const isChineseCheck = require('is-chinese')

module.exports = function(word, options) {
    const spinner = ora().start();
    // // say it
    // try {
    //   if (!process.env.CI) {
    //     require('say').speak(word, isChinese(word) ? 'Ting-Ting' : null);
    //   }
    // } catch(e) {
    //   // do nothing
    // }

    word = encodeURIComponent(word)
    console.log(word)

    // 检测是否为中文
    const isChinese = isChineseCheck(word)
    console.log(isChinese)
    spinner.stop()
}