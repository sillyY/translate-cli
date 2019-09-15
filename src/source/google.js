const qs = require('querystringify')
const axios = require('axios')

const token = require('./token')

function googleTL(word) {
  return new Promise((resolve, reject) => {
    // 获取Google TK
    token
      .get(word, {
        tld: 'cn',
        proxy: false
      })
      .then(res => {
        const query = {
          client: 'webapp',
          sl: 'auto', // 源语言代码
          tl: 'zh-CN', // 翻译语音
          hl: 'zh-CN',
          tk: res.value,
          q: word
        }
        const options = {
          method: 'get',
          url: `/translate_a/single?${qs.stringify(
            query
          )}&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=2&ssel=0&tsel=0&kc=1&`,
          baseURL: `https://translate.google.cn`
        }
        return axios(options)
      })
      .then(res => {
        // for (let value of res.data) {
        //     console.log(value)
        //     console.log(typeof value)
        const [meanings, synonyms] = res.data
  
        let obj = {
          data: []
        }
  
        if (meanings && meanings.length) {
          obj.name = meanings[0][1]
          obj.meaning = meanings[0][0]
        }
        if (synonyms && synonyms.length) {
          let i = 0,
            len = synonyms.length
          for (; i < len; i++) {
            let opt = {
              name: '',
              data: []
            }
            opt.name = synonyms[i][0]
            synonyms[i][2].map((v, idx) => {
              opt.data.push({
                name: v[0],
                meanings: v[1]
              })
            })
            obj.data.push(opt)
          }
        }
        resolve(obj)
      })

  })
}
module.exports = {
  googleTL
}
