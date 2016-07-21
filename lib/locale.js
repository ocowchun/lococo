const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('underscore');
var Promise = require('bluebird');


function parseYaml() {
  try {
    var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    // console.log(doc['zh-TW']);
  } catch (e) {
    console.log(e);
  }
}

// parseYaml();

let goo = {
  "foo": "bar",
  "guga": {
    "goo": "bar"
  }
};

function Locale(files) {
  this.defaultLocale = 'zh-TW';
  // fileNames
  this.files = files;
  // todo: read data from file to locales
  this.locales = {
    "zh-TW": goo,
    "en": {}
  };
  this.availableLocales = ['zh-TW', 'en'];
  let defaultLocale = this.defaultLocale;
  this.otherLocales = _.filter(this.availableLocales, (locale) => locale !== defaultLocale)

}

module.exports.Locale = Locale;

// 列出目前這層的 key(dir 與 value 用不同顏色)
Locale.prototype.listKeys = function(key = "") {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.locales[defaultLocale];
  mainContent = findObjectByKey(mainContent, key);

  if (_.isObject(mainContent)) {
    var keys = _.keys(mainContent);
    return _.map(keys, function(key) {
      return {
        name: key,
        isDir: _.isObject(mainContent[key])
      };
    });
  } else {
    return undefined;
  }
};

// 顯示這個key 的不同語言的值
Locale.prototype.listValueLocales = function(key) {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.locales[defaultLocale];
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
  let mainContent = this.locales[defaultLocale];
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
Locale.prototype.addValue = function(value, locale) {
  const defaultLocale = this.defaultLocale;

  // body...
};
// 新增 dir
Locale.prototype.addDir = function(key) {
  const defaultLocale = this.defaultLocale;
  let mainContent = this.locales[defaultLocale];
  let keys = key.split('.');
  let parentKeys = keys.slice(0, keys.length - 1);
  let childrenKey = keys[keys.length - 1]
  mainContent = findObjectByKey(mainContent, parentKeys);
  if (_.isObject(mainContent)) {
    mainContent[childrenKey] = {};
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
  const localeContents = this.locales;
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
