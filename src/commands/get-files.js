'use strict'

const mkdirp = require('mkdirp')
//const { findItem, listFiles, downloadFile } = require('../drive')
const drive = require('../drive')
const findItem = drive.findItem
const listFiles = drive.listFiles
const downloadFile = drive.downloadFile

module.exports = function(path, options) {
	var outputDir = options.outputDir || process.cwd()
	return Promise.all([
		findItem(path)
			.then(file => listFiles(file, options)),
		new Promise((resolve, reject)=>mkdirp(outputDir, err => err ? reject(err) : resolve())),
	])
		.then(x => x[0])
		.then(files => files.filter(file => file.mimeType != 'application/vnd.google-apps.folder'))
		.then(files => {
			let uniqueFiles = {}
			files.forEach(file => {
				let previousFile = uniqueFiles[file.title]
				if(previousFile) {
					if(!previousFile.hasWarned) {
						console.error('Multiple files at path ' + file.title)
					}
					if(previousFile.modifiedDate > file.modifiedDate) {
						file = previousFile
					}
					file.hasWarned = true
				}
				uniqueFiles[file.title] = file
			})
			return Object.keys(uniqueFiles).map(key => uniqueFiles[key])
		})
		.then(files => Promise.all(
			files.map(file =>
				downloadFile(file, outputDir).then(()=>file.title)
			)
		))
}
