import { needsReview } from './utils/error.mjs';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

export class Material {
  constructor(material, key_doors) {
    this.material = material;
    this.material.uid = uuidv1();
    this.material = this.doorCleanUp(material, key_doors);
    this.material = this.lines(this.material);
    return this.material;
  }
  doorCleanUp(material, key_doors) {
    const doors = new Array();
    key_doors.forEach(door => {
      material[door] === '1' ? doors.push(door) : '';
      delete material[door];
    });
    return { ...material, doors };
  }

  lines(mat) {
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
    lines.lines.custom = mat.visible === '1' ? true : false;
    lines.lines.cornerstone = mat.cornerstone === '1' ? true : false;
    const delet = [
      'visible',
      'cornerstone',
      'parent_id',
      'us_sup',
      'mat_name_sup',
      'sup_code',
      'leadtime',
      'us_sup',
      'mat_name_sup',
      'sup_code',
      'leadtime',
      'gi_const',
      'gi_opt',
      'gi_restric',
      'gi_excep',
      'sup_con',
      'update_dt'
    ];
    delet.forEach(del => delete mat[del]);
    return { ...mat, ...lines };
  }
}

export class Combinematerial {
  constructor() {

  }
}

const frosty = {
  'id': '5',
  'item_name': 'Frosty White',
  'cat_name': 'Material',
  'url_image': 'https://webquoin.com/catalog/images/Headers/Exterior-Materials/painted-frosty%20white.jpg',
  'sup_name': 'Nickels Cabinets',
  'by_who': 'Nickel',
  'Material': 'Painted',
  'mat_name': 'Painted',
  'Info_material': null,
  'gi_mat': 'Painted material is typically either a paint grade solid wood (like poplar or soft maple), MDF (CARB II compliant medium density fiberboard) or a combination of both.</p><p>As well some doors are painted on high-density fiberboard (HDF) which is much stronger and harder because it is made out of exploded wood fibers that have been highly compressed.  HDF differs from particle board in that the bonding of the wood fibers requires no additional materials and unlike particle board, it will not split or crack. This combination of materials provides a smooth and consistent finished surface. Nickels applies paint onto 1-piece HDF and 5-piece MDF/wood doors.</p><p>When a 5-piece door is painted, the joints will inevitably telegraph through the painted finish. On some occasions, the joints will open up, thereby developing hairline cracks on the door face. These cracks are considered normal and acceptable, and are therefore not covered as a warranty issue. When Nickels paints onto 1-piece MDF doors, the issue of the joints as described above is eliminated.',
  'gen_comm': ''
};
