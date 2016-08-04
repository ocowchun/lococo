'use strict';
const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('underscore');
var Promise = require('bluebird');

function parseYaml(file) {
  return new Promise(function(resolve, reject) {
    try {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
          reject(err);
        }
        var doc = yaml.safeLoad(data);
        resolve(doc);
      });

    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

function writeYaml(fileName, locale) {
  let content = yaml.safeDump(locale);
  return new Promise(function(resolve, reject) {
    fs.writeFile(fileName, content, function(err) {
      if (err) {
        reject(err);
      }
      resolve("The file was saved!");
    });
  });
}

function loadDictionary(files, config) {
  const defaultLocale = 'zh-TW';
  return new Promise(function(resolve, reject) {
    loadAndSync(files, defaultLocale).then(function(dic) {
      var dictionary = new Dictionary(files, dic, config);
      resolve(dictionary);
    });
  });
}

module.exports.loadDictionary = loadDictionary;

// 一個 dictionary 會對應到多個語系檔案
// 初始化的時候,以預設語言的檔案為主,檢查其他語言的檔案是否包含預設語言檔案全部的 key,沒有的話,就先以設語言的檔案的key當作資料
function Dictionary(files, dic, config) {
  this.defaultLocale = 'zh-TW';

  const dicName = files[0].split('/').slice(-1)[0].split('.')[0];
  //dictionary,i.e. if file is `app.zh-TW.yml`,name will be `app`
  this.name = dicName;

  // 相關的語系檔案
  this.files = files;

  // 實際資料(keys,values...)
  this.dic = dic;
  this.availableLocales = _.keys(dic);
  let defaultLocale = this.defaultLocale;
  this.otherLocales = _.filter(this.availableLocales, (locale) => locale !== defaultLocale)

}

function loadAllFile(files) {
  return Promise.reduce(files, function(memo, fileName) {
    let locale = getLocaleFromFileName(fileName);
    return parseYaml(fileName).then(function(localeObject) {
      memo[locale] = {};
      if (localeObject && localeObject[locale]) {
        memo[locale] = localeObject[locale];
      }
      return memo;
    });
  }, {});
}

function overWrite(defaultObj, obj) {
  if (_.isObject(defaultObj)) {
    return _.reduce(_.keys(defaultObj), function(memo, key) {
      let _obj = obj[key] || {};
      memo[key] = overWrite(defaultObj[key], _obj);
      return memo;
    }, {});
  } else {
    if (obj && !_.isObject(obj)) {
      return obj;
    } else {
      return defaultObj;
    }
  }
}

function loadAndSync(files, defaultLocal) {
  return loadAllFile(files).then(function(dic) {
    let defaultLocaleObject = dic[defaultLocal];

    return _.reduce(_.keys(dic), function(memo, locale) {
      let localeObject = dic[locale];
      memo[locale] = overWrite(defaultLocaleObject, localeObject);
      return memo;
    }, {});
  });
}


function getLocaleFromFileName(fileName) {
  const strs = fileName.split('.')
  return strs[strs.length - 2];
}

function saveAllFile(dic, files) {
  let fileSaves = _.map(files, function(file) {
    let locale = getLocaleFromFileName(file);
    let localeObject = dic[locale];
    let content = {};
    content[locale] = localeObject;
    console.log(file)
    return writeYaml(file, content)
  });
  return Promise.all(fileSaves);
}


Dictionary.prototype.save = function() {
  let dic = this.dic;
  let files = this.files;
  return saveAllFile(dic, files)
};

// 列出目前這層的 key(dir 與 value 用不同顏色)
Dictionary.prototype.listKeys = function(key = "") {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.dic[defaultLocale];
  mainContent = findObjectByKey(mainContent, key);

  if (_.isObject(mainContent)) {
    var childrenkeys = _.keys(mainContent);
    return _.map(childrenkeys, function(childrenkey) {
      let itemKey = childrenkey;
      if (key !== "") {
        itemKey = key + "." + itemKey;
      }

      return {
        name: childrenkey,
        isDir: _.isObject(mainContent[itemKey]),
        key: itemKey
      };
    });
  } else {
    return undefined;
  }
};

// 顯示這個key 的不同語言的值
//  listValueLocales()
Dictionary.prototype.listValueLocales = function(key) {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.dic[defaultLocale];
  mainContent = findObjectByKey(mainContent, key);
  var result = {};
  if (_.isString(mainContent)) {
    result[defaultLocale] = mainContent;
    return _.extend(result, this.findOtherLocaleValues(key, mainContent));
  } else {
    return undefined;
  }
};

// 新增/修改特定 key ,特定 locale的值
Dictionary.prototype.addValue = function(key, value, locale) {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.dic[locale];
  let keys = key.split('.');
  let parentKeys = keys.slice(0, keys.length - 1);
  let childrenKey = keys[keys.length - 1]
  let childrenContent = findObjectByKey(mainContent, parentKeys);
  if (_.isObject(childrenContent)) {
    if (_.isObject(childrenContent[childrenKey])) {
      throw "Key can not be dir";
    } else {
      childrenContent[childrenKey] = value;
    }
  } else {
    throw "Key's parent must be dir";
  }
  if (locale === defaultLocale) {
    let that = this;
    let otherLocales = this.otherLocales;
    _.each(otherLocales, function(locale) {
      that.addValueIfEmpty(key, value, locale);
    });
  }
};

// 新增/修改特定 key ,特定 locale的值,當值不存在或是等於空字串時，才執行
Dictionary.prototype.addValueIfEmpty = function(key, value, locale) {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.dic[locale];
  let keys = key.split('.');
  let parentKeys = keys.slice(0, keys.length - 1);
  let childrenKey = keys[keys.length - 1]
  let childrenContent = findObjectByKey(mainContent, parentKeys);
  if (_.isObject(childrenContent)) {
    if (_.isObject(childrenContent[childrenKey])) {
      throw "Key can not be dir";
    } else {
      if (childrenContent[childrenKey] && childrenContent[childrenKey].length != 0) {} else {
        childrenContent[childrenKey] = value;
      }

    }
  } else {
    throw "Key's parent must be dir";
  }
};

// 新增 dir
Dictionary.prototype.addDir = function(key) {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.dic[defaultLocale];
  let keys = key.split('.');
  let parentKeys = keys.slice(0, keys.length - 1);
  let childrenKey = keys[keys.length - 1]
  let childrenContent = findObjectByKey(mainContent, parentKeys);
  if (_.isObject(childrenContent)) {
    childrenContent[childrenKey] = {};
  } else {
    throw "Key's parent must be dir";
  }
};

function findObjectByKey(object, keys = [""]) {
  if (_.isString(keys)) {
    keys = keys.split('.');
  }
  let key = keys[0];
  if (keys.length === 0 || key === "") {
    return object
  } else {
    let newKeys = keys.slice(1, keys.length);
    if (object[key] !== undefined) {
      return findObjectByKey(object[key], newKeys);
    } else {
      return undefined;
    }
  }
}

Dictionary.prototype.findOtherLocaleValues = function(key, defaultValue = "") {
  const otherLocales = this.otherLocales;
  const localeContents = this.dic;
  return _.reduce(otherLocales, function(memo, locale) {
    let mainContent = localeContents[locale];
    mainContent = findObjectByKey(mainContent, key);
    if (_.isString(mainContent)) {
      memo[locale] = mainContent;
    } else {
      memo[locale] = defaultValue;
    }
    return memo;
  }, {});
}