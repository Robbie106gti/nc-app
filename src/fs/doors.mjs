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

const brunswick = {
  Min_Width: '5 7/8"',
  Min_Height: '5 7/8"',
  Minimum_Drawer_Face_Standard_Rail_Height: '9 7/8"',
  Minimum_Drawer_Face_Narrow_Rail_Height: '5 7/8"',
  All_drawers_under_5_7_8_will_be_Slab: '1',
  Column_3_4: '0',
  Column_5_8: '0',
  Column_13_16: '1',
  Min_drawer_size: '5 7/8 (H) by 7 7/8 (W)"',
  min_door_size: '9 7/8 (H) by 7 7/8 (W)"',
  All_Slab: '1',
  Slab_under_6: '1',
  Slab_under_9_7_8: '1',
  All_Recessed: '1',
  All_Recessed_under_6: '0',
  All_Recessed_under_9_7_8: '0',
  All_Raised: '0',
  small_rail_size: '1 1/2"',
  reg_rail_size: '2 3/4"',
  Small_rail_limit:
    'All drawer fronts under 10\u00a07/8"\u00a0get smaller rails (see drawing above).',
  Double_panels:
    'Doors taller than 47 7/8" will have double panels. Doors wider than 23 7/8" will have double panels.',
  Mullions: '0',
  TopLights: '1',
  Glass_inserts: '1',
  Tip_info: null,
  Finishing: 'Both faces and all edges.',
  Size: 'W x H',
  Pricing: 'sq. ft.',
  Construction:
    '5 piece solid wood M&T frame with a 4 piece applied molding surrounding a recessed composite core center panel.',
  Options: 'N/A',
  Restrictions:
    'Knotty Alder is available but the veneer center panel will be Clear Alder.',
  HGM_VGM: null,
  us_sup: '0',
  door_name_sup: '',
  sup_code: '',
  leadtime: '',
  gi_door: '',
  gi_const: '',
  gi_opt: '',
  gi_restric: '',
  gi_excep: '',
  gen_comm: '',
  update_dt: 'Tuesday 9th of August 2016 10:43:19 PM',
  Note_info: 'HS and CA edges not recommended on drawers with narrow rails.'
};
