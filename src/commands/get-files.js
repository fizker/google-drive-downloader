var get = require('../get')
var { findItem, listFiles, downloadFile } = require('../drive')

module.exports = function(path, options) {
	var outputDir = options.outputDir || process.cwd()
	return findItem(path)
		.then(file => listFiles(file, options))
		.then(files => files.filter(file => file.mimeType != 'application/vnd.google-apps.folder'))
		.then(files => Promise.all(
			files.map(file => downloadFile(file, outputDir))
		))
}
