var Dictionary = require('./lib/dictionary.js');
var files = ['example/config/locales/app.en.yml', 'example/config/locales/app.zh-TW.yml'].map(file => `${__dirname}/${file}`);
var config = {};

// /Users/ocowchun/projects/github/lococo/example/config/locales/app.en.yml

Dictionary.loadDictionary(files, config).then(function(dictionary) {
	var result= dictionary.listKeys('controller.home');
console.log(dictionary.listValueLocales('yoyo'));
	console.log(dictionary.listValueLocales('controller.home.index'));
	console.log(result);
})

// console.log(files)