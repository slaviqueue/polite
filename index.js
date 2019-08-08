const run = require('./runner')
const readline = require('readline')
  .createInterface(process.stdin, process.stdout)

const REPL_GREETING = 'polite v 0.1'
const CLOSE_REPL_KEYWORD = 'exit'

const log = console.log
const prompt = readline.prompt.bind(readline)
const setPrompt = readline.setPrompt.bind(readline)
const close = readline.close.bind(readline)

function greet() {
  log(REPL_GREETING)
}

function exitProcess() {
  process.exit(0)
}

function execute(code) {
  log(run(code))
}

function safelyExecute(code) {
  try {
    execute(code)
  } catch (err) {
    log(err)
  }
}

function handleLineEnter(line) {
  if (line === CLOSE_REPL_KEYWORD)
    close()

  safelyExecute(line)
  prompt()
}

function handleClose() {
  exitProcess()
}

greet()
setPrompt('polite> ')
prompt()

readline
  .on('line', handleLineEnter)
  .on('close', handleClose)
