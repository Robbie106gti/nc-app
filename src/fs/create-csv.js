const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
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
  }