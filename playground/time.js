const moment = require('moment');

var date = moment();
console.log(date.format('LT on Do MMM YYYY'));

// 10:35 am
console.log(date.format('HH:MMa'));

// 6:01 am
date.subtract(8, 'hours');
console.log(date.format('H:MMa'));