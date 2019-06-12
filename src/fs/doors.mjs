import * as fs from 'fs';
import { createFile } from './create-json';
import { Door } from './door.mjs';
import _ from 'lodash';

const doors_dump = JSON.parse(
  fs.readFileSync('src/assets/json/doors_dump.json')
);
const materials = JSON.parse(
  fs.readFileSync('src/fs/json/materials.json')
);
const stains = JSON.parse(
  fs.readFileSync('src/fs/json/stains.json')
);
const edges = JSON.parse(
  fs.readFileSync('src/fs/json/edges.json')
);
const helpers = JSON.parse(
  fs.readFileSync('src/fs/json/helpers.json')
);

const doors = {};
doors_dump.forEach(item => {
  const door = new Door(item)
  doors[door.uid] = door;
});

createFile(doors, 'doors');
// node --experimental-modules src/fs/doors.mjs
