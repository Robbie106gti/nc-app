import * as fs from 'fs';
import { createFile } from './utils/create-file';
import _ from 'lodash';
import { hasLines, addonsCleanUp, notesCleanUp, changeActive } from './item.mjs';
import { needsReview } from './utils/error.mjs';

const addons = JSON.parse(fs.readFileSync('src/assets/json/addons.json'))[
  'addons'
];
const notes = JSON.parse(fs.readFileSync('src/assets/json/notes.json'))[
  'notes'
];
const specifications = JSON.parse(fs.readFileSync('src/assets/json/specifications.json'))[
  'specifications'
];
const edges = JSON.parse(fs.readFileSync('src/assets/json/edges.json'));
const iwhd = JSON.parse(fs.readFileSync('src/assets/json/iwhd.json'))[
  'iwhd'
];
const options = JSON.parse(fs.readFileSync('src/assets/json/options.json'))[
  'options'
];
const restrictions = JSON.parse(fs.readFileSync('src/assets/json/restrictions.json'))[
  'restrictions'
];


const array = [
  { title: 'addons', var: addons },
  { title: 'notes', var: notes },
  { title: 'specifications', var: specifications },
  { title: 'edges', var: edges },
  { title: 'iwhd', var: iwhd },
  { title: 'options', var: options },
  { title: 'restrictions', var: restrictions }
];

let helpers;

array.forEach(section => {
  helpers = {
    ...helpers,
    [section.title]: section.var.map(item => {
      item = hasLines(item);
      switch (section.title) {
        case 'addons':
          item = addonsCleanUp(item);
          break;
        case 'notes':
          item = notesCleanUp(item);
          item = { ...item, ...changeActive() };
          break;
        case 'specifications':
          item = { ...item, ...changeActive() };
          break;
        case 'edges':
          item = item;
          break;
        case 'iwhd':
          item = { ...item, ...changeActive() };
          break;
        case 'options':
          item = { ...item, ...changeActive() };
          break;
        case 'restrictions':
          item = { ...item, ...changeActive() };
          break;
        default:
          needsReview(section);
      }
      return item;
    })
  };
}
);
// When done with data manipulation, object to be stringified and title of file
createFile(helpers, 'helpers');

// node --experimental-modules src/fs/helpers.mjs
