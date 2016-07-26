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

function loadLocale(files, config) {
  const defaultLocale = 'zh-TW';
  return new Promise(function(resolve, reject) {
    loadAndSync(files, defaultLocale).then(function(dic) {
      // saveAllFile(dic);
      var localeObject = new Locale(files, dic, config);
      resolve(localeObject);
    });
  });
}

module.exports.loadLocale = loadLocale;

// 一個 locale 會對應到多個語系檔案

// 初始化的時候,以預設語言的檔案為主,檢查其他語言的檔案是否包含預設語言檔案全部的 key,沒有的話,就先以設語言的檔案的key當作資料
function Locale(files, dic, config) {
  this.defaultLocale = 'zh-TW';
  // fileNames
  this.files = files;
  // todo: read data from file to locales
  this.dic = dic;
  this.availableLocales = _.keys(dic);
  let defaultLocale = this.defaultLocale;
  this.otherLocales = _.filter(this.availableLocales, (locale) => locale !== defaultLocale)

}

// module.exports = Locale;


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

function loadAndSync(files, defaultLocal) {
  return loadAllFile(files).then(function(dic) {
    let defaultLocaleObject = dic[defaultLocal];
    return _.reduce(_.keys(dic), function(memo, locale) {
      let localeObject = dic[locale];
      memo[locale] = _.extend({}, defaultLocaleObject, localeObject);
      return memo;
    }, {});
  });
}


function getLocaleFromFileName(fileName) {
  const strs = fileName.split('.')
  return strs[strs.length - 2];
}

function saveAllFile(dic) {
  _.each(_.keys(dic), function(locale) {
    let localeObject = dic[locale];
    let content = {};
    content[locale] = localeObject;
    console.log(localeObject['controller'])
    writeYaml('/Users/ocowchun/projects/github/lococo/config/locales/app.' + locale + '.yml', content)
  });
}


// 列出目前這層的 key(dir 與 value 用不同顏色)
Locale.prototype.listKeys = function(key = "") {
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
        isDir: _.isObject(mainContent[key]),
        key: itemKey
      };
    });
  } else {
    return undefined;
  }
};

// 顯示這個key 的不同語言的值
Locale.prototype.listValueLocales = function(key) {
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

// 新增 key
Locale.prototype.addKey = function(key) {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.dic[defaultLocale];
  let keys = key.split('.');
  let parentKeys = keys.slice(0, keys.length - 1);
  let childrenKey = keys[keys.length - 1]
  mainContent = findObjectByKey(mainContent, parentKeys);
  if (_.isObject(mainContent)) {
    mainContent[childrenKey] = '';
  } else {
    throw "Key's parent must be dir";
  }
};

// 新增 key
Locale.prototype.addValue = function(key, value, locale) {
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
      that.addValue(key, value, locale);
    });
  }
};

// 新增 dir
Locale.prototype.addDir = function(key) {
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

// 修改特定 key ,特定 locale的值,


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

Locale.prototype.findOtherLocaleValues = function(key, defaultValue = "") {
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


function writeYaml(fileName, locale) {
  let content = yaml.safeDump(locale);
  // console.log(content);
  fs.writeFile(fileName, content, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

}


// var a = new Locale();
// a.addDir("guga.bar")
// var result = a.listKeys("")
//   // console.log(result)
// // var result = a.listValueLocales("guga")
// console.log(result)


// var obj = {
//   foo: {
//     bar: 1
//   }
// };

// let r = findObjectByKey(obj, "foo.bar");
// console.log(r)
