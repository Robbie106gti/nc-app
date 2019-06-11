import { needsReview } from './utils/error.mjs';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

export class Material {
  constructor(material, key_doors, options) {
    this.material = material;
    this.material.uid = uuidv1();
    this.material = this.doorCleanUp(material, key_doors);
    this.material = this.lines(this.material);
    this.material = this.setDescription(this.material);
    this.material = this.setSubMaterial(this.material, options);
    this.material = this.setHGnVG(this.material, options);
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
      'us_sup',
      'mat_name_sup',
      'sup_code',
      'sup_name',
      'by_who',
      'id',
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
      'update_dt',
      'cat_name',
      'parent_id'
    ];
    delet.forEach(del => delete mat[del]);
    return { ...mat, ...lines };
  }
  setDescription(mat) {
    mat['title'] = this.hgVGstring(mat.item_name);
    const description = mat.Info_material !== null || mat.Info_material !== '' ? mat.Info_material : mat.gi_mat;
    if (description !== '' || description !== null) {
      mat.url_image === null ? mat['description'] = description : '';
    }
    delete mat.gi_mat;
    delete mat.Info_material;
    mat.material = mat.Material;
    delete mat.Material;
    return mat;
  }
  setSubMaterial(mat, options) {
    const sub = options.sub_material.filter(m => m.key === mat.mat_name)[0] || null;
    if (sub === null) { return mat; }
    mat['sub_material'] = sub.value;
    mat.hg_vg = sub.vghg;
    if (mat.hg_vg === true) {
      mat.tags = [...mat.tags, 'hg', 'vg'];
      mat['grain'] = this.hgvg(mat.item_name);
    }
    return mat;
  }
  setHGnVG(mat, options) {
    if (mat.hg_vg) { return mat; }
    const title = this.hgVGstring(mat.item_name);
    mat.title ? '' : mat['title'] = title;
    options.vghg.includes(title) ? mat.hg_vg = true : mat.hg_vg = false;
    if (mat.hg_vg === true) {
      mat.tags = [...mat.tags, 'hg', 'vg'];
      mat['grain'] = this.hgvg(mat.item_name);
    }
    return mat;
  }

 hgVGstring(str) {
  return str.replace(' HG', '').replace(' VG', '');
}
hgvg(str) {
  let grain = false;
  if (str.includes(' HG')) { grain = 'HG'}
  if (str.includes(' VG')) { grain = 'VG'}
  return grain;
}
}

export class Combinematerial {
  constructor() {

  }
}
