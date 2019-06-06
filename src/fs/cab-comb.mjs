import * as fs from 'fs';
import { createFile } from './create-json.mjs';
import _ from 'lodash';
import { makeLink } from './utils/links.mjs';

const cabinets = {};

const root = [
  'Base Cabinets',
  'Base Channel Cabinets',
  'Vanity Cabinets',
  'Vanity Channel Cabinets',
  'Floating Vanity Cabinets',
  'Floating Vanity Channel Cabinets',
  'Wall Cabinets',
  'Wall Channel Cabinets',
  'Tall Cabinets',
  'Tall Channel Cabinets',
  'Wardrobe Cabinets',
];

root.forEach(ro => {
    const link = makeLink(ro);
    const line = JSON.parse(fs.readFileSync('src/fs/json/' + link + '.json'))[link];
    line.forEach(cab => {
        cabinets[cab.uid] = { ...cab, category: ro};
    });
});

createFile(cabinets, 'cabinets');
// node --experimental-modules src/fs/cab-comb.mjs
