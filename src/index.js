const chalk = require('chalk')
const ora = require('ora')
const isChineseCheck = require('is-chinese')
const token = require('./token')
const qs = require('querystringify');
const axios = require('axios')

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

    token
  .get(word, {
    tld: 'cn',
    proxy: false
  })
  .then(res => {
    const query = {
      client: 'webapp',
      sl:  'auto', // 源语言代码
      tl: 'zh-CN', // 翻译语音
      hl: 'zh-CN', 
      tk: res.value,
      q: word
    }
    const options = {
      method: 'get',
      url: `/translate_a/single?${qs.stringify(query)}&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=2&ssel=0&tsel=0&kc=1&`,
      baseURL: `https://translate.google.cn`
    }
    return axios(options)
  })
  .then(res => {
      // for (let value of res.data) {
      //     console.log(value)
      //     console.log(typeof value)
          const [meanings, synonym, ...rest] = res.data
        console.log(meanings)
        console.log('--------')
        console.log(synonym)
      // }
  })


    spinner.stop()
}