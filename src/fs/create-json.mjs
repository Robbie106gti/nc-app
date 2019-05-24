import * as fs from 'fs';

export function createFile(data, filename) {
    const json = JSON.stringify(data);
    // console.log(json,filename);
    fs.writeFile('src/fs/json/' + filename + '.json', json, function(err) {
      if (err) { throw err; }
      console.log('File is created successfully: ' + filename);
    });
  }
