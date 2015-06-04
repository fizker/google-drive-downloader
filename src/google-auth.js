var googleauth = require('googleauth')

module.exports = function() {
	var { GOOGLEAUTH_CLIENT, GOOGLEAUTH_SECRET } = process.env
	if(!GOOGLEAUTH_CLIENT || !GOOGLEAUTH_SECRET) {
		return Promise.reject(new Error('GOOGLEAUTH_CLIENT and GOOGLEAUTH_SECRET must be set'))
	}

	return new Promise(function(resolve, reject) {
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
}
