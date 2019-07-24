import * as fs from 'fs';
import { createFile } from './utils/create-file';
import { Door } from './door.mjs';
import _ from 'lodash';
import { CombinedDoors } from './door.mjs';

const doors_dump = JSON.parse(
  fs.readFileSync('src/assets/json/doors_dump.json')
);
const materials = JSON.parse(fs.readFileSync('src/fs/json/materials.json'));
const stains = JSON.parse(fs.readFileSync('src/fs/json/stains.json'));
const edges = JSON.parse(fs.readFileSync('src/fs/json/edges.json'));
const helpers = JSON.parse(fs.readFileSync('src/fs/json/helpers.json'));

const doors = {};
doors_dump.forEach(item => {
  const door = new Door(item);
  if (door.images.mainImage) {
    doors[door.uid] = door;
  }
});

let organize = [
  { key: 'af1', title: 'Metal Frame 1"', options: ['Aluminum', 'Stainless Steel', 'Clear Glass', 'Acid Etched Glass']},
  { key: 'af2', title: 'Metal Frame 2"', options: ['Aluminum', 'Stainless Steel', 'Clear Glass', 'Acid Etched Glass'] },
  {
    key: 'alpha',
    title: 'Alpha',
    aka: ['como', 'flux', 'habitat', 'mesa', 'plateau', 'soho', 'vivid'],
    ex: 'blackcomb'
  },
  { key: 'alpine', title: 'Alpine' },
  { key: 'aspect', title: 'Aspect' },
  { key: 'aspen', title: 'Aspen' },
  { key: 'blackcomb', title: 'Blackcomb' },
  { key: 'brandon', title: 'Brandon' },
  { key: 'brera', title: 'Brera' },
  { key: 'breton', title: 'Breton' },
  { key: 'brunswick', title: 'Brunswick' },
  { key: 'camber', title: 'Camber' },
  { key: 'cambridge', title: 'Cambridge' },
  { key: 'capilano', title: 'Capilano' },
  { key: 'cashmere', title: 'Cashmere' },
  { key: 'classic', title: 'Classic' },
  { key: 'coast', title: 'Coast', ex: 'eastcoast' },
  { key: 'contempo', title: 'Contempo' },
  { key: 'cultus', title: 'Cultus' },
  { key: 'dorset', title: 'Dorset' },
  { key: 'dover', title: 'Dover' },
  { key: 'downton', title: 'Downton' },
  { key: 'eastcoast', title: 'Eastcoast' },
  { key: 'element', title: 'Element' },
  { key: 'envoy', title: 'Envoy' },
  { key: 'fairview', title: 'Fairview' },
  { key: 'farmhouse', title: 'Farmhouse' },
  { key: 'form', title: 'Form' },
  { key: 'fraser', title: 'Fraser' },
  { key: 'frontier', title: 'Frontier' },
  { key: 'grantham', title: 'Grantham' },
  { key: 'granville', title: 'Granville' },
  { key: 'greenwich', title: 'Greenwich' },
  { key: 'hampshire', title: 'Hampshire' },
  { key: 'harbour', title: 'Harbour' },
  { key: 'harrison', title: 'Harrison' },
  { key: 'horizon', title: 'Horizon' },
  { key: 'hudson', title: 'Hudson' },
  { key: 'huntington', title: 'Huntington' },
  { key: 'kensington', title: 'Kensington' },
  { key: 'lancaster', title: 'Lancaster' },
  { key: 'laurentian', title: 'Laurentian' },
  { key: 'lexington', title: 'Lexington' },
  { key: 'lineal', title: 'Lineal' , aka: ['basis']},
  { key: 'madison', title: 'Madison' },
  { key: 'meridian', title: 'Meridian' },
  { key: 'mission', title: 'Mission' },
  { key: 'parkside', title: 'Parkside' },
  { key: 'plymouth', title: 'Plymouth' },
  { key: 'radius', title: 'Radius' },
  { key: 'rockford', title: 'Rockford' },
  { key: 'salem', title: 'Salem' },
  { key: 'savannah', title: 'Savannah' },
  { key: 'savona', title: 'Savona' },
  { key: 'shaker', title: 'Shaker' },
  { key: 'sheridan', title: 'Sheridan' },
  { key: 'sierra', title: 'Sierra' },
  { key: 'somerset', title: 'Somerset' },
  { key: 'sonora', title: 'Sonora' },
  { key: 'sterling', title: 'Sterling' },
  { key: 'steveston', title: 'Steveston' },
  { key: 'studio', title: 'Studio' },
  { key: 'summit', title: 'Summit' },
  { key: 'verona', title: 'Verona' },
  { key: 'victoria', title: 'Victoria' },
  { key: 'victorian', title: 'Victorian' },
  { key: 'vista', title: 'Vista' },
  { key: 'whistler', title: 'Whistler' },
  { key: 'windsor', title: 'Windsor' },
  { key: 'yaletown', title: 'Yaletown' },
  { key: 'zone', title: 'Zone' }
];

let array = Object.values(doors);
array = array.sort((a, b) => compare(a, b));
organize = organize.sort((a, b) => compare(a, b));

function compare( a, b ) {
  if ( a.title < b.title ) {
    return -1;
  }
  if (a.title > b.title ) {
    return 1;
  }
  return 0;
}
// const alpha = array.filter(arr => arr.title.includes('Alpha'));
// const coast = array.filter(arr => arr.title.includes('Coast'));
const doors_reduced = new Object();
organize.forEach(door => {
  const combined = array.filter(d => {
    const title = d.title.toLowerCase();
    if (title.includes(door.key)) {
      if (!title.includes(door.ex)) return d;
    }
    if (door.aka) {
      let bool = false;
      door.aka.forEach(t => {
        title.includes(t) ? bool = true : ''
      });
      if (bool === true) {
        if (!title.includes(door.ex)) return d;
      }
    }
  });
   door = new CombinedDoors(combined, door);
   doors_reduced[door.uid] = door;
});


// door dump address = https://webquoin.com/catalog/doorstyler/json/get_doors.php
createFile(doors_reduced, 'doors');
// createFile(alpha, 'alpha');
// createFile(coast, 'coast');
// node --experimental-modules src/fs/doors.mjs
