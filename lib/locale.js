const fs = require('fs');

// list all locales file
export function getLocales(dir) {
  fs.readdir(dir + '/config/locales', function(err, files) {
    console.log(files);
  });
}

// parse all locale file
