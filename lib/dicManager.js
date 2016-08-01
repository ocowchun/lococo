const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('underscore');
var Promise = require('bluebird');
var Dictionary = require('./dictionary.js');

// 一個 dictionary 代表所屬的檔案 app.zh-TW ,app.en
// 一個file 代表 檔案 i.e. app.zh-TW
// 不同檔案名稱會對應到不同dictionary
// i.e. 如果檔案夾裡面有 app.zh-TW.yml,app.en.yml,foo.zh-TW.yml ，則會有 兩本 dictionary(app,foo)
function DicManager(dir, files, config) {
  this.config = _.extend(getDefaultConfig(), config);
  this.dir = dir;
  this.currentDictionary;
  let defaultLocale = 'zh-TW';
  this.dictionaries = listDictionaries(files, defaultLocale, dir).reduce((memo, dic) => {
    memo[dic] = null;
    return memo
  }, {})

  // this.dictionaries = {};


  this.files = files;
}


DicManager.prototype.openDictionary = function(dicName) {
  var dictionaries = this.dictionaries;
  let config = this.config;
  let that = this;
  const files = this.files.filter(file => file.split('/').slice(-1)[0].indexOf(dicName) === 0);
  return new Promise(function(resolve, reject) {
    if (dictionaries[dicName]) {
      that.currentDictionary = dictionaries[dicName];
      resolve(dictionaries[dicName]);
    } else {
      Dictionary.loadDictionary(files, config).then(function(dictionary) {
        dictionaries[dicName] = dictionary;
        that.currentDictionary = dictionary;
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
        let result = files.map(file => `${dir}/${file}`)
        resolve(result);
      }
    });
  });
}

// list all locales file
DicManager.prototype.getDictionaries = function() {
  const config = this.config;
  const dir = this.dir;
  return new Promise(function(resolve, reject) {
    fs.readdir(dir + '/config/locales', function(err, files) {
      if (err) {
        reject(err);
      } else {
        let dictionaries = listDictionaries(files, 'zh-TW', dir);
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


function listDictionaries(files, defaultLocale, dir) {
  let endFileName = defaultLocale + '.yml';
  let items = _.filter(files, (file) => file.indexOf(endFileName) >= 0);
  return _.map(items, (item) => item.replace(`.${endFileName}`, '').replace(`${dir}/config/locales/`, ''));
}



// module.exports = DicManager;
module.exports.buildDicManager = buildDicManager;

function buildDicManager(dir, config) {
  return new Promise(function(resolve, reject) {
    readDir(dir + '/config/locales').then(function(files) {
      let dicManager = new DicManager(dir, files, config);
      resolve(dicManager);
    })
  });

}
