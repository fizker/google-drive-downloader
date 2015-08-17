var verifyDate = require('./lib/verify-date')
var gdrive = require('./lib/commands')

var yargs = require('yargs')
	.usage('$0 <command>')
	.command('ls', 'List all files within a given folder', listFilesCommand)
	.command('get-all', 'Download all files within a given folder', downloadFilesCommand)
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

function downloadFilesCommand(yargs) {
	var args = yargs
		.usage('$0 get-all <path>')
		.required(2, 'The path is required. It is case-sensitive. Use `/` for the root.')
		.option('modified-after', {
			alias: 'm',
			describe: 'json date, it will only return matches modified after this date',
		})
		.option('output-dir', {
			alias: 'o',
			describe: 'The folder to download to. The default is the current folder',
		})
		.help('help')
		.argv

	var path = args._[1]
	var opts = {
		modifiedAfter: verifyDate(args.modifiedAfter),
		outputDir: args.outputDir,
	}

	hookUpOutput(gdrive.getFiles(path, opts))
}

function hookUpOutput(promise) {
	promise.then(function(result) {
		console.log(result)
	}, function(e) {
		console.error(e)
	})
}
