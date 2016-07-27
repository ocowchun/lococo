const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('underscore');
var Promise = require('bluebird');
var Dictionary = require('./dictionary.js');

// 一個 dictionary 代表所屬的檔案 app.zh-TW ,app.en
// 一個file 代表 檔案 i.e. app.zh-TW
// 不同檔案名稱會對應到不同dictionary
// i.e. 如果檔案夾裡面有 app.zh-TW.yml,app.en.yml,foo.zh-TW.yml ，則會有 兩本 dictionary(app,foo)
function FileManager(dir,files, config) {
  this.config = _.extend(getDefaultConfig(), config);
  this.dir = dir;
  this.currentDictionary;
  this.dictionaries = {};

}


FileManager.prototype.openDictionary = function(dicName) {
  var dictionaries = this.dictionaries;
  let config = this.config;
  return new Promise(function(resolve, reject) {
    if (dictionaries[dicName]) {
      resolve(dictionaries[dicName]);
    } else {
      Dictionary.loadDictionary(files, config).then(function(dictionary) {
        resolve(dictionary);
      });
    }
  });
};

function readDir(dir) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dir, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

// list all locales file
FileManager.prototype.getLocales = function() {
  const config = this.config;
  const dir = this.dir;
  return new Promise(function(resolve, reject) {
    fs.readdir(dir + '/config/locales', function(err, files) {
      if (err) {
        reject(err);
      } else {
        let dictionaries = listDictionaries(files, config.defaultLocale);
        resolve(dictionaries);
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


function listDictionaries(files, defaultLocale) {
  let endFileName = defaultLocale + '.yml';
  return _.filter(files, (file) => file.indexOf(endFileName) >= 0);
}



// module.exports = FileManager;
module.exports.buildFileManager = buildFileManager;

function buildFileManager(dir, config) {
  return new Promise(function(resolve, reject) {
    readDir(dir + '/config/locales').then(function(files) {
      let fileManager = new FileManager(dir, files, config);
      resolve(fileManager);
    })
  });

}
