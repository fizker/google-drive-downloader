var get = require('../get')

module.exports = function(path) {
	var components = path.replace(/\/+/g, '/').replace(/^\/|\/$/g, '').split('/')
	return get('files/root')
		.then(root => components
			.map((nextName, i) => item=>get(`files?q='${item.id}' in parents`)
				.then(res => {
					const nextItem = res.items.find(item => item.title == nextName)
					if(!nextItem) {
						throw new Error(`${components.slice(0, i + 1).join('/')} not found. Folders on this level: ${res.items.map(x=>x.title).join(', ')}`)
					}
					return nextItem
				})
			)
			.reduce((p, fn) => p.then(fn), Promise.resolve(root))
		)
		.then(item => {
			if(item) return item
			throw new Error('404: ' + path)
		})
}
