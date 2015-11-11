const get = require('../get')
const findItem = require('../drive/find-item')
const listFiles = require('../drive/list-files')

module.exports = function(path, options) {
	return findItem(path)
		.then(file => listFiles(file, options))
		.then(files => files.map(file => {
			//const { mimeType, title, modifiedDate } = file
			const mimeType = file.mimeType
			const title = file.title
			const modifiedDate = file.modifiedDate

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
