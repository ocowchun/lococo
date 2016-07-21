const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('underscore');
var Promise = require('bluebird');


function FileManager(config) {
  this.config = _.extend(getDefaultConfig(), config);
}

// list all locales file
FileManager.prototype.getLocales = function(dir) {
  const config=this.config;
  return new Promise(function(resolve, reject) {
    fs.readdir(dir + '/config/locales', function(err, files) {
      if (err) {
        reject(err);
      } else {
        let availableFiles = listAvailableFiles(files,config.defaultLocale);
        console.log(files);
        console.log(availableFiles)
        resolve(availableFiles);
      }
    });
  });
};


function getDefaultConfig() {
  let config = {
    defaultLocale: 'zh-TW'
  };
  return config;
}


function listAvailableFiles(files, defaultLocale) {
  let endFileName = defaultLocale + '.yml';
  return _.filter(files, (file) => file.indexOf(endFileName) >= 0);
}



module.exports = FileManager;

// [ 'app.zh-TW.yml' ]

