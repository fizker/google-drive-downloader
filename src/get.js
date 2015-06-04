var request = require('request')
var auth = require('./google-auth')
var authedRequest

var baseUrl = 'https://www.googleapis.com/drive/v2/'

module.exports = function(url, opts = {}) {
	var hasAuthedRequest
	if(authedRequest) {
		hasAuthedRequest = Promise.resolve()
	} else {
		hasAuthedRequest = auth().then(authData => {
			authedRequest = request.defaults({
				headers: {
					Authorization: 'Bearer ' + authData.access_token,
				},
			})
		})
	}

	return hasAuthedRequest
		.then(() => new Promise((resolve, reject) => {
			authedRequest.get(baseUrl + url, opts, function(err, res) {
				err ? reject(err) : resolve(res)
			})
		}))
		.then(res => {
			if(res.statusCode >= 300) throw new Error('Bad status: ' + res.statusCode)
			return JSON.parse(res.body)
		})
}
