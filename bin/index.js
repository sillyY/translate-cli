#!/usr/bin/env node
process.env.NODE_PATH = __dirname + '/../node_modules/'
const { resolve } = require('path')
const res = command => resolve(__dirname, '../commands/', command)
const program = require('commander')

program.version(require('../package').version)

program.usage('<command>')

program
  .command('chinese [args...]')
  .description('中译英')
  .alias('ce')
  .action((dir, names) => {
    require(res('chinese'))
  })
program
  .command('english [args...]')
  .description('英译中')
  .alias('ec')
  .action((dir, names) => {
    require(res('english'))
  })
program
  .command('set')
  .description('设置来源')
  .alias('s')
  .action((dir, names) => {
    require(res('set-source'))
  })
program.parse(process.argv)
