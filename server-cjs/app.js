// CJS -> module.exports + require()
// destructuring
const { cashback } = require('./lib'); // .js didn't required
const result = cashback(1000);
console.log(result);
