var get = require('./get')

module.exports = function(path) {
	var components = path.replace(/\/+/g, '/').replace(/^\/|\/$/g, '').split('/')
	return get('files/root')
		.then(root => components
			.map(nextName => item=>get(`files?q='${item.id}' in parents`)
				.then(res => res.items.find(item => item.title == nextName))
			)
			.reduce((p, fn) => p.then(fn), Promise.resolve(root))
		)
		.then(item => {
			if(item) return item
			throw new Error('404: ' + path)
		})
}
