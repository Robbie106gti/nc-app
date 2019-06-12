import { needsReview } from './utils/error.mjs';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

export class Stain {
  constructor(stain) {
    this.stain = this.removeUnnecessary(stain);
    this.stain['uid'] = uuidv1();
    this.stain.cornerstone_mat = this.csMaterial(this.stain.cornerstone_mat);
    return this.stain;
  }
  removeUnnecessary(stain) {
    const del = ['id', 'sup_name', 'by_who', 'cat_name', 'cat_stain', 'us_sup', 'stain_name_sup', 'sup_code', 'leadtime', 'gi_stain', 'gi_restric', 'gi_opt', 'gi_excep', 'gi_const', 'update_dt', 'sup_con', 'visible', 'cornerstone', 'parent_id', 'gen_comm', 'url_image', 'item_name'];
    stain = this.lines(stain);
    stain.image = stain.url_image;
    stain.category = stain.cat_stain;
    stain.title = stain.item_name;
    del.forEach(d => delete stain[d]);
    return stain;
  }
  lines(stain) {
    const lines = {
      active: true,
      lines: {
        custom: true,
        cornerstone: true,
        lighthouse: true,
        modcon: false,
        modal: false
      },
      tags: []
    };
    lines.active = stain.visible === '1' ? true : false;
    lines.lines.custom = stain.visible === '1' ? true : false;
    lines.lines.cornerstone = stain.cornerstone === '1' ? true : false;
    lines.lines.lighthouse = stain.visible === '1' ? true : false;
    return { ...stain, ...lines };
  }
  csMaterial(mats) {
    mats = _.words(mats);
    if (mats.includes('and')) {
      mats = mats.filter(mat => mat !== 'and');
    }
    return mats;
  }
}

const st = {
  'id': '28',
  'sup_name': 'Nickels Cabinets',
  'by_who': 'Nickel',
  'parent_id': null,
  'item_name': 'Sienna',
  'cat_name': 'Stains',
  'cat_stain': 'Stain',
  'url_image': 'https://webquoin.com/catalog/build/assets/samples/Sienna.jpg',
  'visible': '1',
  'us_sup': '0',
  'stain_name_sup': '',
  'sup_code': '',
  'leadtime': '',
  'gi_stain': '',
  'gi_const': '',
  'gi_opt': '',
  'gi_restric': '',
  'gi_excep': '',
  'gen_comm': '',
  'update_dt': 'Monday 4th of February 2019 11:30:00 AM',
  'sup_con': '',
  'cornerstone': '1',
  'cornerstone_mat': 'Alder'
};
