import { needsReview } from './utils/error.mjs';
import uuidv1 from 'uuid/v1';

export class Door {
  constructor(door) {
    this.door = door;
    this.door.uid = uuidv1();
    this.door = this.lines(this.door);
    this.door = this.edges(this.door);
    this.door = this.types(this.door);
    this.door = this.images(this.door);
    return this.door;
  }

  fixDoor(door) {
      return door;
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
    lines.tags.push(door.material_menu);
    lines.tags.push(door.doorstyle_menu);
    return { ...door, ...lines };
  }

  edges(door) {
    const edges = {
      default: door.default_edge === '' ? 'sq' : door.default_edge,
      options: []
    };
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
      aka: door.also_know_as,
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
    return { ...door, types };
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
}
