import { needsReview } from './utils/error.mjs';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

export class Door {
  constructor(door) {
    this.door = door;
    this.door.uid = uuidv1();
    this.door = this.lines(this.door);
    this.door = this.edges(this.door);
    this.door = this.types(this.door);
    this.door = this.images(this.door);
    this.door = this.standards(this.door);
    this.door = this.specifications(this.door);
    return this.door;
  }

  lines(door) {
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
    lines.active = door.visible === '1' ? true : false;
    lines.lines.custom = door.Custom === '1' ? true : false;
    lines.lines.cornerstone = door.Cornerstone === '1' ? true : false;
    lines.lines.lighthouse = door.Lighthouse === '1' ? true : false;
    delete door.visible;
    delete door.Cornerstone;
    delete door.Custom;
    delete door.Lighthouse;
    lines.tags.push(door.material_menu.toLowerCase());
    lines.tags.push(door.doorstyle_menu.toLowerCase());
    return { ...door, ...lines };
  }

  edges(door) {
    const edges = {
      default: door.default_edge === '' || door.default_edge === null ? 'sq' : door.default_edge.toLowerCase(),
      options: []
    };
    delete door.default_edge;
    const arr = [
      'SQ',
      'BV3',
      'BV5',
      'CA',
      'CV6',
      'CV11',
      'HS',
      'OV',
      'RD3',
      'RD6',
      'SC',
      'SH'
    ];
    arr.forEach(edge => {
      if (door[edge]) {
        door[edge] === '1' ? edges.options.push(edge.toLowerCase()) : '';
        delete door[edge];
      }
      if (door[edge] === null) {
        delete door[edge];
      }
    });
    return { ...door, edges };
  }
  types(door) {
    const types = {
      id: door.id,
      parent: door.parent_id,
      order: door.order,
      alt: door.alt_menu,
      cat: door.cat_name,
      material: door.material_menu,
      doorstyle: door.doorstyle_menu,
      menu: door.css_menu,
      aka: this.otherNames(door),
      level: door.level_menu
    };
    door.title = door.item_name;
    delete door.id;
    delete door.parent_id;
    delete door.order;
    delete door.alt_menu;
    delete door.cat_name;
    delete door.item_name;
    delete door.sup_name;
    delete door.by_who;
    delete door.material_menu;
    delete door.doorstyle_menu;
    delete door.css_menu;
    delete door.also_known_as;
    delete door.level_menu;
    delete door.Custom_ref;
    return { ...door, types };
  }
  otherNames(door) {
    const array = new Array();
    door.also_known_as !== '' ? array.push(door.also_known_as) : '';
    door.Custom_ref !== null ? array.push(door.Custom_ref) : '';
    const finarray = new Array();
    array.forEach(arr => {
      const words = new Array();
      arr.toLowerCase();
      if (arr.includes(',')) {
        const lw = _.words(arr);
        lw.forEach(l => words.push(l));
      }
      if (arr.includes('(')) {
        const b = arr.split('(');
        b.forEach(a => {
          a = a.replace(')', '');
          a.trim();
          words.push(a);
        });
      }
      words.forEach(w => finarray.push(w));
    });
    return finarray;
  }

  images(door) {
    const images = {
      mainImage: door.url_image,
      mainSpec: door.ImageURLtechnical,
      items: []
    };
    const array = [
      {
        key: 'ImageURLtechnical',
        title: 'Technical drawing'
      },
      {
        key: 'url_image',
        title: ''
      },
      {
        key: 'ImageURLpreview',
        title: 'Preview'
      },
      {
        key: 'ImageURLextra',
        title: 'Extra'
      },
      {
        key: 'V_Edge_image',
        title: 'V-edge image'
      },
      {
        key: 'ImageURLedge',
        title: 'Close up of edge or rail'
      }
    ];
    array.forEach(image => {
      const nImage = {
        title: image.title,
        image: door[image.key]
      };
      images.items.push(nImage);
      delete door[image.key];
    });
    return { ...door, images };
  }
  standards(door) {
    const standards = {
      min_width: door.Min_Width,
      min_height: door.Min_Height,
      min_dr_face_st_rail_height: door.Minimum_Drawer_Face_Standard_Rail_Height,
      min_dr_face_na_rail_height: door.Minimum_Drawer_Face_Narrow_Rail_Height,
      all_dr_under_5_78_will_be_Slab: door.All_drawers_under_5_7_8_will_be_Slab,
      min_dr_size: door.Min_drawer_size,
      min_door_size: door.min_door_size,
      all_sl: door.All_Slab === '1' ? true : false,
      sl_under_6: door.Slab_under_6 === '1' ? true : false,
      sl_under_9_78: door.Slab_under_9_7_8 === '1' ? true : false,
      all_re: door.All_Recessed === '1' ? true : false,
      all_re_under_6: door.All_Recessed_under_6 === '1' ? true : false,
      all_re_under_9_78: door.All_Recessed_under_9_7_8 === '1' ? true : false,
      all_ra: door.All_Raised === '1' ? true : false,
      sm_rail_size: door.small_rail_size,
      rail_size: door.reg_rail_size,
      sm_rail_limit: door.Small_rail_limit,
      mullions: door.Mullions === '1' ? true : false,
      toplights: door.TopLights === '1' ? true : false,
      glass: door.Glass_inserts === '1' ? true : false,
      thickness: ''
    };
    door.Column_3_4 === '1' ? standards.thickness = '3/4"' : '';
    door.Column_5_8 === '1' ? standards.thickness = '5/8"' : '';
    door.Column_13_16 === '1' ? standards.thickness = '13/16"' : '';
    const array = [
      'Min_Width',
      'Min_Height',
      'Minimum_Drawer_Face_Standard_Rail_Height',
      'Minimum_Drawer_Face_Narrow_Rail_Height',
      'All_drawers_under_5_7_8_will_be_Slab',
      'Min_drawer_size',
      'min_door_size',
      'All_Slab',
      'Slab_under_6',
      'Slab_under_9_7_8',
      'All_Recessed',
      'All_Recessed_under_6',
      'All_Recessed_under_9_7_8',
      'All_Raised',
      'small_rail_size',
      'reg_rail_size',
      'Small_rail_limit',
      'Mullions',
      'TopLights',
      'Glass_inserts',
      'Column_3_4',
      'Column_5_8',
      'Column_13_16',
      'us_sup',
      'update_dt',
      'door_name_sup',
      'sup_code',
      'leadtime',
      'gi_door',
      'gi_const',
      'gi_opt',
      'gi_restric',
      'gi_excep',
      'gen_comm'
    ];
    array.forEach(arr => delete door[arr]);
    return { ...door, standards };
  }
  specifications(door) {
    const specifications = {
      finish: door.Finishing,
      size: door.Size,
      price: door.Pricing,
      construction: door.Construction,
      options: door.Options,
      restrictions: door.Restrictions,
    };
    const notes = {
      tip: door.Tip_info,
      hgvg: door.HGM_VGM === '1' ? true : false,
      note: door.Note_info,
      double_panels: door.Double_panels,
    };
    const array = [
      'Finishing',
      'Size',
      'Pricing',
      'Construction',
      'Options',
      'Restrictions',
      'Double_panels',
      'Tip_info',
      'HGM_VGM',
      'Note_info'];
    array.forEach(arr => delete door[arr]);
    return { ...door, specifications, notes };
  }
}

export class CombinedDoors {
constructor(combined, door) {
  this.door = this.lines({...door, versions: combined, uid: door.title });
  this.door = this.images(this.door);
  this.door = this.types(this.door);
  this.door = this.edges(this.door);
  return this.door;
}

lines(door) {
  door = { ...door,
  active: false,
  lines: {
    custom: false,
    cornerstone: false,
    lighthouse: false,
    modcon: false,
    modal: false
  }
};
  door.versions.forEach(d => {
    d.active ? door.active = true : '';
    d.lines.custom ? door.lines.custom = true : '';
    d.lines.cornerstone ? door.lines.cornerstone = true : '';
    d.lines.lighthouse ? door.lines.lighthouse = true: '';
  })
  return door;
}

images(door) {
  door['images'] = {mainImage: door.versions[0].images.mainImage, all: [] };
  door.versions.forEach(d => {
    if (d.types.material === 'Metal') door['images']['mainImage'] = d.images.mainImage;
    if (d.types.material === 'WOOD') door['images']['mainImage'] = d.images.mainImage;
    if (d.types.material === 'Painted') door['images']['mainImage'] = d.images.mainImage;
    door.images.all = door.images.all.concat(d.images.items);
  });
  door.images.all = _.uniqBy(door.images.all, 'image');
  return door;
}

types(door) {
  door['types'] = {aka: [], materials: []};
  door.versions.forEach(d => {
    door.types.aka.push(d.title);
    door.types.materials.push(d.types.materials)
  });
  door.types.aka = _.uniq(door.types.aka);
  door.types.mateials = _.uniq(door.types.mateials);
  return door;
}

edges(door) {
  door['edges'] = {options: []};
  door.versions.forEach(d => {
    door.edges.options = _.union(door.edges.options, d.edges.options);
  });
  return door;
}
}
