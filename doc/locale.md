##How to use locale

```js
var locale = require('./lib/locale.js');

var files = ['/Users/ocowchun/projects/github/lococo/config/locales/app.en.yml', '/Users/ocowchun/projects/github/lococo/config/locales/app.zh-TW.yml'];
var _ = require('underscore');

locale.loadLocale(files, {}).then(function(localeObject) {
  var result;
  var result = localeObject.listKeys('controller.home.index');
  result=localeObject.addValue('controller.home.index.header1','hello3','zh-TW');
  localeObject.save()
})```
