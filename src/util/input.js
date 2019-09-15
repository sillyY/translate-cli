const chalk = require('chalk')
const linebreak = process.platform === 'win32' ? '\n\r' : '\n'
const log = console.log,
  table = console.table

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
    log(chalk.blue('----------------------------------------'))
    log(chalk.red(value.name))
        table(setSynonym(value.data))
    log(chalk.blue('----------------------------------------'))
  }
}

module.exports = {
  input
}
