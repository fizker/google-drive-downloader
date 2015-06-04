var get = require('../get')
var findItem = require('../find-item')

module.exports = function(path, options) {
	return findItem(path)
		.then(parent => get(`files?q='${parent.id}' in parents&maxResults=1000`))
		.then(res => res.items)
		.then(options.modifiedAfter && (items => items
			.filter(item => item.modifiedDate > options.modifiedAfter)
		))
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
