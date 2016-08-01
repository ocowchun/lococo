##How to use dictionary

```js
var Dictionary = require('./lib/dictionary.js');
var files = ['/Users/ocowchun/projects/github/lococo/config/locales/app.en.yml', '/Users/ocowchun/projects/github/lococo/config/locales/app.zh-TW.yml'];
var _ = require('underscore');

Dictionary.loadDictionary(files, {}).then(function(dictionary) {
  var result = dictionary.listKeys('controller.home.index');
  result = dictionary.addValue('controller.home.index.header1', 'hello3', 'zh-TW');
  dictionary.save()
})
```
