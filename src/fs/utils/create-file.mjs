import * as fs from 'fs';

export function createFile(data, filename) {
  const json = JSON.stringify(data);
  console.log(json, filename);
  fs.writeFile('src/fs/json/' + filename + '.json', json, function (err) {
    if (err) { throw err; }
    console.log('File is created successfully: ' + filename);
  });
}

export function createHtmFile(data, filename) {
  fs.writeFile('src/fs/html/' + filename + '.html', data, function (err) {
    if (err) { throw err; }
    console.log('File is created successfully: ' + filename);
  });
}


/* const csvWriter = createCsvWriter({
    path: 'src/fs/csv/data.csv',
    header: [
      { id: 'title', title: 'Title' },
      { id: 'itemcode', title: 'Item Code' },
      { id: 'html', title: 'HTML' },
      { id: 'link', title: 'Link' }
    ]
  });

export function createCsv(data) {
    csvWriter
      .writeRecords(data)
      .then(() => console.log('The CSV file was written successfully'));
  } */
