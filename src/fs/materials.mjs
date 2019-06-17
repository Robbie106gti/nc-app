import * as fs from 'fs';
import { createFile } from './utils/create-file';
import { Material } from './material.mjs';
import _ from 'lodash';
import { needsReview } from './utils/error.mjs';
import { Combinematerial } from './material.mjs';

const materials_dump = JSON.parse(
  fs.readFileSync('src/assets/json/materials_dump.json')
);

const key_doors = [
  'af1alu',
  'af1aluacid',
  'af1aluclr',
  'af1ss',
  'af1ssacid',
  'af1ssclr',
  'af2alu',
  'af2aluacid',
  'af2aluclr',
  'af2ss',
  'af2ssacid',
  'af2ssclr',
  'ps_alpha',
  'ps_breton',
  'ps_dorset',
  'ps_zone',
  'ps_aspen',
  'ps_envoy',
  'pa_horizon',
  'pa_salem',
  'pr_brunswick',
  'pr_brunswick2pc',
  'pr_cashmere',
  'pr_cashmererrp',
  'pr_classic',
  'pr_coast',
  'pr_coastwr',
  'pr_cultus',
  'pr_dover',
  'pr_doverwr',
  'pr_farmhouse1pc',
  'pr_farmhousewr1pc',
  'pr_fraserwr',
  'pr_greenwich',
  'pr_greenwichwr',
  'pr_hampshire',
  'pr_hudson',
  'pr_laurentian',
  'pr_meridian',
  'pr_meridianwr',
  'pr_plymouth',
  'pr_plymouth2pc',
  'pr_plymouthwr',
  'pr_plymouthwr2pc',
  'pr_rockford1pc',
  'pr_rockfordwr1pc',
  'pr_shaker',
  'pr_shakerrrp',
  'pr_shakerrrpbe',
  'pr_shakerwr',
  'pr_shakerwrrrp',
  'pr_shakerwrrrpbe',
  'pr_sheridanwr',
  'pr_steveston',
  'pr_verona',
  'pr_yaletown',
  'pr_yaletownrrp',
  'pr_brandon1pc',
  'pr_brandonwr1pc',
  'pr_frontier',
  'pr_frontierwr',
  'pr_harbour',
  'pr_harbourwr',
  'pr_madison1pc',
  'pr_madisonwr1pc',
  'pr_savona',
  'pr_savonawr',
  'pr_victorian',
  'pr_victorianwr',
  'pr_windsor',
  'pr_windsorwr',
  'pa_alpine',
  'pa_cambridge',
  'pa_downton',
  'pa_grantham',
  'pa_huntington',
  'pa_huntingtonwr',
  'pa_sonora',
  'pa_whistler',
  'pa_lexington',
  'pa_lexingtonwr',
  'ws_alphahgm',
  'ws_alphavgm',
  'ws_breton',
  'ws_bretonhgm',
  'ws_bretonvgm',
  'ws_dorset',
  'ws_dorsethgm',
  'ws_dorsetvgm',
  'ws_sierrahgm',
  'ws_sierravgm',
  'ws_contempo',
  'ws_element',
  'wr_brunswick',
  'wr_cashmere',
  'wr_cashmererrp',
  'wr_classic',
  'wr_coast',
  'wr_coastwr',
  'wr_cultus',
  'wr_dover',
  'wr_doverwr',
  'wr_farmhouse5pc',
  'wr_farmhousewr5pc',
  'wr_fraserwr',
  'wr_greenwich',
  'wr_greenwichwr',
  'wr_hampshire',
  'wr_hudson',
  'wr_laurentian',
  'wr_meridian',
  'wr_meridianwr',
  'wr_plymouth',
  'wr_plymouthwr',
  'wr_rockford5pc',
  'wr_rockfordwr5pc',
  'wr_shaker',
  'wr_shakerrrp',
  'wr_shakerrrpbe',
  'wr_shakerwr',
  'wr_shakerwrrrp',
  'wr_shakerwrrrpbe',
  'wr_sheridanwr',
  'wr_steveston',
  'wr_verona',
  'wr_yaletown',
  'wr_yaletownrrp',
  'wr_frontier',
  'wr_frontierwr',
  'wr_savona',
  'wr_savonawr',
  'wr_victorian',
  'wr_victorianwr',
  'wa_cambridge',
  'wa_downton',
  'wa_grantham',
  'wa_huntington',
  'wa_huntingtonwr',
  'wa_sonora',
  'wa_lexington',
  'wa_lexingtonwr',
  'es_alphahgm',
  'es_alphavgm',
  'es_sierrahgm',
  'es_sierravgm',
  'mst_alphavgm',
  'mst_alphahgm',
  'msb_alphavgm',
  'mss_alphavgm',
  'msp_alphavgm',
  'mst_element',
  'eu_plateau',
  'eu_mesawghgm',
  'eu_mesawgvgm',
  'eu_mesaso',
  'eu_mesapa',
  'eu_mesasehgm',
  'eu_mesasevgm',
  'eu_comohgm',
  'eu_comovgm',
  'eu_comosehgm',
  'eu_comosevgm',
  'eu_sohogl1s',
  'eu_sohogl2s',
  'eu_sohowggl1shg',
  'eu_sohowggl1svg',
  'eu_sohowggl2shg',
  'eu_sohowggl2svg',
  'gs_habitatgl1s',
  'gs_habitatgl1sv',
  'gs_habitatgl2s',
  'gs_habitatgl2sv',
  'gs_fluxgl1s',
  'gs_fluxgl1sv',
  'gs_fluxgl2s',
  'gs_fluxgl2sv',
  'pr_eastcoast',
  'pr_eastcoastwr',
  'ps_element',
  'mss_element',
  'msp_element',
  'msb_element',
  'wr_blackcombvgc',
  'eu_brerasehgm',
  'wr_blackcombvgcs',
  'wr_blackcombvgm',
  'wr_blackcombvgms',
  'wr_blackcombvgmwg',
  'pr_form15',
  'wr_form15',
  'pr_form25',
  'wr_form25',
  'ps_radius8',
  'ws_radius8',
  'ps_radius12',
  'ws_radius12',
  'pr_camber',
  'pr_harrison',
  'wr_harrison',
  'pr_fraser',
  'pr_vista',
  'wr_vista',
  'pr_harrisonwr',
  'wr_harrisonwr',
  'pr_vistawr',
  'wr_vistawr',
  'pr_form57',
  'pr_form75',
  'gs_basis1s',
  'gs_basis2s',
  'msb_lineal',
  'mss_lineal',
  'msp_lineal',
  'mst_lineal',
  'ws_lineal',
  'ps_lineal',
  'pa_lancaster',
  'pa_lancasterwr',
  'pa_somerset',
  'pa_somersetwr',
  'pr_aspect57',
  'pr_aspect75',
  'pr_fairview',
  'pr_fairviewwr',
  'pr_granville',
  'pr_granvillewr',
  'pr_horizon',
  'pr_horizonwr',
  'pr_parkside1pc',
  'pr_parksidewr1pc',
  'pr_savannah',
  'pr_savannahwr',
  'pr_studio',
  'pr_studiowr',
  'pr_summit',
  'pr_summitwr',
  'pr_victoria',
  'pr_victoriawr',
  'wa_lancaster',
  'wa_lancasterwr',
  'wa_somerset',
  'wa_somersetwr',
  'wr_fairview',
  'wr_fairviewwr',
  'wr_granville',
  'wr_granvillewr',
  'wr_savannah',
  'wr_savannahwr',
  'wr_summit',
  'wr_summitwr',
  'wr_victoria',
  'wr_victoriawr'
];

const options = {
  vghg: [
    'Engineered',
    'Black Walnut',
    'PS White Oak',
    'RC White Oak',
    'QS White Oak',
    'Fir',
    'EW QC Cherry',
    'EW Fir',
    'EW GM Ebony',
    'EW QC Maple',
    'EW PS Rosewood',
    'EW Sandstone',
    'EW Slate',
    'EW PS Walnut',
    'EW QC Walnut',
    'EW QC Wenge',
    'EW RC White Oak'
  ],
  sub_material: [
    { key: 'MBASE', value: 'Base', parent: 'Melamine', vghg: false },
    { key: 'MSOLID', value: 'Solid', parent: 'Melamine', vghg: false },
    { key: 'MPATTERNED', value: 'Patterned', parent: 'Melamine', vghg: false },
    { key: 'MTM', value: 'Textured', parent: 'Melamine', vghg: true },
    {
      key: 'PLATEAU',
      value: 'Plateau Ultra Matte',
      parent: 'Euro Materials',
      vghg: false
    },
    { key: 'MESA_WG', value: 'Mesa WG', parent: 'Euro Materials', vghg: true },
    {
      key: 'MESA_SOLID',
      value: 'Mesa Solid',
      parent: 'Euro Materials',
      vghg: false
    },
    {
      key: 'MESA_PATTERNED',
      value: 'Mesa Patterned',
      parent: 'Euro Materials',
      vghg: false
    },
    {
      key: 'MESA_SELECT_WG',
      value: 'Mesa Select WG',
      parent: 'Euro Materials',
      vghg: true
    },
    { key: 'COMO', value: 'Como', parent: 'Euro Materials', vghg: true },
    {
      key: 'COMO_SELECT',
      value: 'Como Select',
      parent: 'Euro Materials',
      vghg: true
    },
    {
      key: 'SOHO_SOLID_GLOSS',
      value: 'Soho Solid Gloss',
      other: 'SOHO_SOLID_GLOSS_1S',
      parent: 'Euro Materials',
      vghg: false
    },
    {
      key: 'SOHO_WG_GLOSS',
      value: 'Soho WG Gloss',
      parent: 'Euro Materials',
      vghg: true
    },
    {
      key: 'HABITAT_GLOSS',
      value: 'Habitate Gloss',
      parent: 'Gloss',
      vghg: false
    },
    { key: 'FLUX_GLOSS', value: 'Flux Gloss', parent: 'Gloss', vghg: false }
  ],
  cats2: {
    painted: {
      image: 'https://webquoin.com/catalog/images/Headers/Exterior-Materials/painted-hale%20navy.jpg',
      active: true,
      lines: {
        cornerstone: true,
        custom: true,
        lighthouse: true,
        modal: false,
        modcon: true
      }
    },
    wood: {
      image: 'https://webquoin.com/catalog/images/Headers/Exterior-Materials/White-Oak-PlainSawn.jpg',
      active: true,
      lines: {
        cornerstone: true,
        custom: true,
        lighthouse: true,
        modal: false,
        modcon: true
      }
    },
    engineered: {
      image: 'https://webquoin.com/catalog/images/Headers/Exterior-Materials/EW-PS-Walnut.png',
      active: false,
      lines: {
        cornerstone: true,
        custom: true,
        lighthouse: true,
        modal: false,
        modcon: true
      }
    },
    melamine: {
      image: 'https://webquoin.com/catalog/images/Headers/Exterior-Materials/TM-Monaco.jpg',
      active: true,
      lines: {
        cornerstone: true,
        custom: true,
        lighthouse: true,
        modal: false,
        modcon: true
      }
    },
    euro_materials: {
      image: 'https://webquoin.com/catalog/images/Finishes/Stijle/Grey%20Authentic%20Oak%202.jpg',
      active: true,
      lines: {
        cornerstone: false,
        custom: true,
        lighthouse: false,
        modal: false,
        modcon: true
      }
    },
    gloss: {
      image: 'https://webquoin.com/catalog/images/Headers/Exterior-Materials/Cobolt-Grey.jpg',
      active: true,
      lines: {
        cornerstone: true,
        custom: true,
        lighthouse: false,
        modal: false,
        modcon: true
      }
    },
    special_request: {
      image: 'https://webquoin.com/catalog/build/assets/samples/distance.jpg',
      active: true,
      lines: {
        cornerstone: false,
        custom: true,
        lighthouse: false,
        modal: false,
        modcon: false
      }
    }
  }
};

const materials = materials_dump.map(
  mat => new Material(mat, key_doors, options)
);

let categories = new Array();
materials.forEach(mat => categories.push(trimReplace(mat.material)));
categories = _.uniq(categories);

function trimReplace(str) {
  return str
    .replace(' ...', '')
    .trim()
    .toLowerCase();
}

const file = new Object();
categories.forEach(
  cat =>
    (file[cat.replace(' ', '_')] = {
      title: _.startCase(cat),
      uid: cat.replace(' ', '_'),
      sub: new Array()
    })
);

const sections = new Array();
materials.forEach(mat => (mat.image ? '' : sections.push(mat)));
const array = Object.values(file);
array.forEach(arr => {
  file[arr.uid]['sub'] = materials.filter(
    mat => mat.material.toLowerCase() === arr.title.toLowerCase()
  );
  file[arr.uid].sub = file[arr.uid].sub.filter(mat => mat.image !== null);
  file[arr.uid]['sub_materials'] = options.sub_material.filter(
    sub => sub.parent === file[arr.uid].title
  );
  const item = materials.filter(
    mat => trimReplace(mat.item_name.toLowerCase()) === arr.title.toLowerCase()
  )[0];
  let doors = new Array();
  if (file[arr.uid].sub.length !== 0) {
    doors = file[arr.uid].sub[0].doors;
    file[arr.uid].sub.forEach(i => (doors = _.intersection(doors, i.doors)));
    file[arr.uid].sub = file[arr.uid].sub.map(i => {
      i.doors = _.without(i.doors, ...doors);
      return i;
    });
  }

  file[arr.uid] = {
    ...file[arr.uid],
    ...options.cats2[arr.uid],
    description: item.description,
    tags: item.tags,
    item_name: item.item_name,
    mat_name: item.mat_name,
    doors
  };
});
let mat = new Object();
array.forEach(arr => {
  file[arr.uid].sub = new Combinematerial(file[arr.uid].sub);
  mat = { ...mat, ...file[arr.uid].sub };
});

function hgVGstring(str) {
  return str.replace(' HG', '').replace(' VG', '');
}

// needsReview(file);

createFile(file, 'mat-sections');
createFile(mat, 'materials');
// node --experimental-modules src/fs/materials.mjs
