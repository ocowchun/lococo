const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('underscore');
var Promise = require('bluebird');
var Locale = require('./locale.js');

// 一個 item 代表所屬的檔案 app.zh-TW ,app.en
// 一個file 代表 檔案 i.e. app.zh-TW

function FileManager(dir, config) {
  this.config = _.extend(getDefaultConfig(), config);
  this.dir = dir;
  this.currentItem;
}


// 顯示 item 的根目錄
FileManager.prototype.openItem = function(file) {
  const config = this.config;
  const dir = this.dir;
  let defaultLocale = config.defaultLocale;

  let item = {};
  console.log('openItem');
  // readFiles
  readDir(dir + '/config/locales').then(function(files) {
    console.log('===files===')
      // [ 'app.en.yml', 'app.zh-TW.yml', 'foo.zh-TW.yml' ]
    console.log(files)
  })

  // select specify files
  // add them to locale
  //
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
        let availableFiles = listAvailableFiles(files, config.defaultLocale);
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
module.exports.buildFileManager = buildFileManager;

function buildFileManager(dir, config) {
  let fileManager = new FileManager(dir, config);

  return fileManager;
}

// [ 'app.zh-TW.yml' ]
