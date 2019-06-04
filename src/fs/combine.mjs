import * as fs from 'fs';
import { createFile } from './create-json';
import { checkLines, checkVersion, versionToGlobal, globalreduceVersion } from './cabinet';
import _ from 'lodash';

// Cabinet JSON base files
const bc = JSON.parse(fs.readFileSync('src/assets/json/base cabinets.json'))[
  'Base Cabinets'
];
const bcc = JSON.parse(fs.readFileSync('src/assets/json/base channel cabinets.json'))[
  'Base Channel Cabinets'
];
const fvc = JSON.parse(fs.readFileSync('src/assets/json/floating vanity cabinets.json'))[
  'Floating Vanity Cabinets'
];
const fvcc = JSON.parse(fs.readFileSync('src/assets/json/floating vanity channel cabinets.json'))[
  'Floating Vanity Channel Cabinets'
];
const tc = JSON.parse(fs.readFileSync('src/assets/json/tall cabinets.json'))[
  'Tall Cabinets'
];
const tcc = JSON.parse(fs.readFileSync('src/assets/json/tall channel cabinets.json'))[
  'Tall Channel Cabinets'
];
const vc = JSON.parse(fs.readFileSync('src/assets/json/vanity cabinets.json'))[
  'Vanity Cabinets'
];
const vcc = JSON.parse(fs.readFileSync('src/assets/json/vanity channel cabinets.json'))[
  'Vanity Channel Cabinets'
];
const wc = JSON.parse(fs.readFileSync('src/assets/json/wall cabinets.json'))[
  'Wall Cabinets'
];
const wcc = JSON.parse(fs.readFileSync('src/assets/json/wall channel cabinets.json'))[
  'Wall Channel Cabinets'
];
const wrc = JSON.parse(fs.readFileSync('src/assets/json/wardrobe cabinets.json'))[
  'Wardrobe Cabinets'
];

const codes = JSON.parse(fs.readFileSync('src/assets/json/codes.json')).codes;

const cabinets = [
  { title: 'base-cabinets', var: bc },
  { title: 'base-channel-cabinets', var: bcc },
  { title: 'floating-vanity-cabinets', var: fvc },
  { title: 'floating-vanity-channel-cabinets', var: fvcc },
  { title: 'tall-cabinets', var: tc },
  { title: 'tall-channel-cabinets', var: tcc },
  { title: 'vanity-cabinets', var: vc },
  { title: 'vanity-channel-cabinets', var: vcc },
  { title: 'wall-cabinets', var: wc },
  { title: 'wall-channel-cabinets', var: wcc },
  { title: 'wardrobe-cabinets', var: wrc }
];


  cabinets.forEach(section => {
    const newData = {
      [section.title]: section.var.map(cab => {
        cab = { ...cab, ...checkLines(cab) };
        cab['versions'] = cab.attached.map(version =>
          checkVersion(version, cab.code, codes)
        );
        delete cab.attached;
        cab = versionToGlobal(cab);
        cab = globalreduceVersion(cab);
        cab.itemcodes = _.union(cab.csvitems, cab.itemcodes);
        delete cab.csvitems;
        return cab;
      })
    }
  
    // When done with data manipulation, object to be stringified and title of file
    createFile({ [section.title]: newData[section.title] }, section.title);
  });
  
// node --experimental-modules src/fs/combine.mjs
// node --experimental-modules src/fs/cablink.mjs
// node --experimental-modules src/fs/root.mjs
// node --experimental-modules src/fs/helpersoptimizer.mjs
