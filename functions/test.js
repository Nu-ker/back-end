let tanggal = 'March-24-2018'
const moment = require('moment')
console.log(new Date(tanggal).getTime() - 86400000);
console.log(moment().format('MMMM-DD-YYYY'));
console.log(moment().format('DD-MM-YYYY'));