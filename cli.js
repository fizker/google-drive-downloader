require("babel/register")

var verifyDate = require('./src/verify-date')
var gdrive = require('./index')

var yargs = require('yargs')
	.usage('$0 <command>')
	.command('ls', 'List all files within a given folder', listFilesCommand)
	.help('help')
	.required(1, '')

yargs.argv

function listFilesCommand(yargs) {
	var args = yargs
		.usage('$0 ls <path>')
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

	hookUpOutput(gdrive.listFiles(path, opts))
}

function hookUpOutput(promise) {
	promise.then(function(result) {
		console.log(result)
	}, function(e) {
		console.error(e)
	})
}
