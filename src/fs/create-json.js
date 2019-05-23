const fs = require('fs');

const createFile = (data, filename) => {
    const json = JSON.stringify(data);
    // console.log(json,filename);
    fs.writeFile('src/fs/json/' + filename +'.json', json, function(err) {
      if (err) throw err;
      console.log('File is created successfully: ' + filename);
    });
  }

  module.exports = createFile;
