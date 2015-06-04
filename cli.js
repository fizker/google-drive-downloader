require("babel/register")

var verifyDate = require('./src/verify-date')

var yargs = require('yargs')
	.usage('$0 <command>')
	.command('list-children', 'List all files within a given folder', listChildrenCommand)
	.help('help')
	.required(1, '')

yargs.argv

function listChildrenCommand(yargs) {
	var args = yargs
		.usage('$0 list-children <path>')
		.required(2, 'The path is required. It is case-sensitive. Use `/` for the root.')
		.option('modified-after', {
			alias: 'm',
			describe: 'json date, it will only return matches modified after this date',
		})
		.help('help')
		.argv

	var path = args._[1]
	var opts = {
		modifiedAfter: verifyDate(args.modifiedAfter),
	}

	console.log(path, opts)
}
