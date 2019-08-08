const operations = {
  'sum': (a, b) => a + b,
  'subtract': (a, b) => a - b,
  'multiply': (a, b) => a * b,
  'divide': (a, b) => a / b,
  'pow': (a, b) => a ** b,
  'log': console.log,
}

function id(a) {
  return a
}

function push(stack, token) {
  return [...stack, token]
}

function isNumber(token) {
  return !isNaN(Number(token))
}

function throwNoOp(op) {
  throw new Error(`unknown operation "${ op }"`)
}

function getOp(operation, operations) {
  return operations[operation] || throwNoOp(operation)
}

function performOp(stack, token) {
  return getOp(token, operations)(...stack)
}

function step(stack = [], token) {
  return isNumber(token)
    ? push(stack, Number(token))
    : push([], performOp(stack, token))
}

function tokenize(str) {
  return str.split(/[\n ]+/).filter(id)
}

function interpret(tokens) {
  return tokens.reduce(step, [])
}

module.exports = function run(code) {
  return interpret(tokenize(code))
}
