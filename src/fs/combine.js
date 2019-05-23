const fs = require('fs');
const bc = JSON.parse(fs.readFileSync('src/assets/json/base cabinets.json'));
const codes = JSON.parse(fs.readFileSync('src/assets/json/codes.json'));

const createFile = require('./create-json')

const Cabinet = require('./cabinet');
// console.log(bc);

const newData = bc['Base Cabinets'].map(cab => {
    let cas = new Cabinet();
    cas = cas.checkLines(cab);
    cas = cas.checkVersion(cab);
 return cab;
});

// console.log(newData);
// When done with data manipulation, object to be stringified and title of file
createFile({'base-cabinets': newData}, 'base-cabinets')
