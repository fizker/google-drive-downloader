require("babel/register")

var yargs = require('yargs')

var verifyDate = require('./src/verify-date')

var args = yargs
	.option('modified-after', {
		alias: 'm',
		describe: 'json date, it will only return matches modified after this date',
	})
	.argv

var opts = {
	modifiedAfter: verifyDate(args.modifiedAfter)
}

console.log(opts)
