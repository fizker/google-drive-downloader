var request = require('request')
var googleauth = require('googleauth')

var cache

module.exports = function() {
	var { GOOGLEAUTH_CLIENT, GOOGLEAUTH_SECRET } = process.env
	if(!GOOGLEAUTH_CLIENT || !GOOGLEAUTH_SECRET) {
		return Promise.reject(new Error('GOOGLEAUTH_CLIENT and GOOGLEAUTH_SECRET must be set'))
	}

	if(cache == null) {
		cache = new Promise(function(resolve, reject) {
			googleauth({
				client_id: process.env.GOOGLEAUTH_CLIENT,
				client_secret: process.env.GOOGLEAUTH_SECRET,
				scope: 'https://www.googleapis.com/auth/drive',
				refresh: true,
				configName: 'update-from-drive'
			}, function(err, data) {
				err ? reject(err) : resolve(data)
			})
		})
			.then(data => request.defaults({
				headers: {
					Authorization: 'Bearer ' + data.access_token,
				},
			}))
	}

	return cache
}
