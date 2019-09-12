#!/usr/bin/env node
process.env.NODE_PATH = __dirname + '/../node_modules/'
const { resolve } = require('path')
const res = command => resolve(__dirname, '../commands/', command)
const program = require('commander')
const translate = require('../src/index')


program
  .option('-s, --simple', 'simple mode')
  .version(require('../package').version)

program.parse(process.argv);


const simple = program.simple
translate(program.args.join(' '), {
  simple
})

