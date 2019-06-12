import * as fs from 'fs';
import { createFile } from './create-json';
import _ from 'lodash';
import { needsReview } from './utils/error.mjs';
import { Stain } from './stain.mjs';


const stains_dump = JSON.parse(
  fs.readFileSync('src/assets/json/stains_dump.json')
);
const stains = new Object();

stains_dump.forEach(stain => {
  stain = new Stain(stain);
  stain.image ? stains[stain.uid] = stain : '';
});

createFile(stains, 'stains');
// node --experimental-modules src/fs/stains.mjs
