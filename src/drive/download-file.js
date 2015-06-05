var auth = require('../google-auth')
var fs = require('fs')
var path = require('path')

module.exports = function(file, outputFolder) {
	var outputFile = path.join(outputFolder, file.title)
	return auth()
		.then(request => new Promise((resolve, reject) => {
			request(file.downloadUrl)
				.pipe(fs.createWriteStream(outputFile))
				.on('error', reject)
				.on('end', resolve)
				.on('complete', resolve)
		}))
		a.catch(err => new Promise((resolve, reject) => {
			fs.unlink(outputFile, deleteErr => {
				reject(err)
			})
		}))
}
