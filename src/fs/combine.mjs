import * as fs from 'fs';
import { createFile } from './create-json';
import { checkLines, checkVersion } from './cabinet';

const bc = JSON.parse(fs.readFileSync('src/assets/json/base cabinets.json'));
const codes = JSON.parse(fs.readFileSync('src/assets/json/codes.json'));
// console.log(bc);

const newData = bc['Base Cabinets'].map(cab => {
    cab = {...cab, ...checkLines(cab)};
    cab['versions'] = cab.attached.map(version => checkVersion(version, cab.code));
    delete cab.attached;

 return cab;
});

// console.log(newData);
// When done with data manipulation, object to be stringified and title of file
createFile({'base-cabinets': newData}, 'base-cabinets')

// node --experimental-modules src/fs/combine.js
