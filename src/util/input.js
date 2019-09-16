const chalk = require('chalk')
const linebreak = process.platform === 'win32' ? '\n\r' : '\n'
const log = console.log,
  table = console.table

const WORD = {
  '名词': 'n.',
  '动词': 'v.',
  '形容词': 'adj.',
  '副词': 'adv.'
}

function setSynonym(synonyms) {
  let table = {}

  for(let value of synonyms) {
    table[value.name] = value.meanings.join(',')
  }
  return table
}

function input(result) {
  log(`${chalk.red('译文:')} ${chalk.green(result.name)}`)
  log(`${chalk.red('含义:')} ${chalk.green(result.meaning)}`)

  for (let value of result.data) {
    log('\n')
    log(chalk.green(`${WORD[value.name]}${value.meaning}`))
        // table(setSynonym(value.))
  }
}

module.exports = {
  input
}
