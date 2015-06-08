var mkdirp = require('mkdirp')
var { findItem, listFiles, downloadFile } = require('../drive')

module.exports = function(path, options) {
	var outputDir = options.outputDir || process.cwd()
	return Promise.all([
		findItem(path)
			.then(file => listFiles(file, options)),
		new Promise((resolve, reject)=>mkdirp(outputDir, err => err ? reject(err) : resolve())),
	])
		.then(x => x[0])
		.then(files => files.filter(file => file.mimeType != 'application/vnd.google-apps.folder'))
		.then(files => Promise.all(
			files.map(file =>
				downloadFile(file, outputDir).then(()=>file.title)
			)
		))
}
