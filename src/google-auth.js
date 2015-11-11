'use strict'

const request = require('request')
const googleauth = require('googleauth')

var cache

module.exports = function() {
	//const { GOOGLEAUTH_CLIENT, GOOGLEAUTH_SECRET } = process.env
	let GOOGLEAUTH_CLIENT = process.env.GOOGLEAUTH_CLIENT
	let GOOGLEAUTH_SECRET = process.env.GOOGLEAUTH_SECRET

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
