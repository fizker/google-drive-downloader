var get = require('../get')
var findItem = require('../drive/find-item')
var listFiles = require('../drive/list-files')

module.exports = function(path, options) {
	return findItem(path)
		.then(file => listFiles(file, options))
		.then(files => files.map(file => {
			var { mimeType, title, modifiedDate } = file
			var path = title
			if(mimeType == 'application/vnd.google-apps.folder') {
				path += '/'
			}
			return {
				path: path,
				mimeType,
				modifiedDate,
			}
		}))
}
