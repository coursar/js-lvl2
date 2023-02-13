// CJS -> module.exports + require()
// destructuring
// import { cashback } from './lib.js';
// with aliasing
// import { cashback as cashbackFromLib } from './lib.js';
// import * as lib from './lib.js';
// import cashback from './lib.js';
// import Bank, {cashback} from './lib.js';
import * as bankLib from './lib.js';

const result = bankLib.cashback(1000);
console.log(result);
