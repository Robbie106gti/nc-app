import * as fs from 'fs';
import { createFile } from './create-json';
import { Door } from './door.mjs';
import _ from 'lodash';

const doors_dump = JSON.parse(
  fs.readFileSync('src/assets/json/doors_dump.json')
);
const edges_dump = JSON.parse(
  fs.readFileSync('src/assets/json/edges_dump.json')
);
const materials_dump = JSON.parse(
  fs.readFileSync('src/assets/json/materials_dump.json')
);
const stains_dump = JSON.parse(
  fs.readFileSync('src/assets/json/stains_dump.json')
);

const doors = {};
doors_dump.forEach(item => {
  const door = new Door(item)
  doors[door.uid] = door;
});

createFile(doors, 'doors');
// node --experimental-modules src/fs/doors.mjs
