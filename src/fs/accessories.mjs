import * as fs from 'fs';
import { createFile } from './create-json';
import _ from 'lodash';
import { prependOnceListener } from 'cluster';

const legs = JSON.parse(fs.readFileSync('src/assets/json/legs.json'))[
  'legs'
];
const led = JSON.parse(fs.readFileSync('src/assets/json/loox.json'));
const col = JSON.parse(fs.readFileSync('src/assets/json/columns.json'));
const css = JSON.parse(fs.readFileSync('src/assets/json/legs.json'))[
  'sub-cats'
];
const hfu = JSON.parse(fs.readFileSync('src/assets/json/hfu.json'));
const mc = JSON.parse(fs.readFileSync('src/assets/json/mc.json'));
const msc = JSON.parse(fs.readFileSync('src/assets/json/msc.json'));
const panels = JSON.parse(fs.readFileSync('src/assets/json/panels.json'));
const pod = JSON.parse(fs.readFileSync('src/assets/json/pod.json'));
const shelves = JSON.parse(fs.readFileSync('src/assets/json/shelves.json'));
const sor = JSON.parse(fs.readFileSync('src/assets/json/sor.json'));
const tpod = JSON.parse(fs.readFileSync('src/assets/json/tpod.json'));
const trim = JSON.parse(fs.readFileSync('src/assets/json/trims molding.json'))['Trims Moldings'];


const array = [
  { title: 'legs', var: legs },
  { title: 'led', var: led },
  { title: 'Cabinet storage', var: css, sub: true },
  { title: 'columns', var: col, special: true },
  { title: 'hfu', var: hfu, special: true },
  { title: 'mc', var: mc, special: true },
  { title: 'msc', var: msc, special: true },
  { title: 'panels', var: panels, special: true },
  { title: 'recycle bins', var: pod, special: true },
  { title: 'shelves', var: shelves, special: true },
  { title: 'sor', var: sor, special: true },
  { title: 'tpod', var: tpod, special: true },
  { title: 'trims molding', var: trim, special: true },
];
