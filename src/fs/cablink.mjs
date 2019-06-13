import * as fs from 'fs';
import { createFile } from './utils/create-file';


  const cabinets = [
    {
      title: 'Base Cabinets',
      items: []
    },
    {
      title: 'Base Channel Cabinets',
      items: []
    },
    {
      title: 'Vanity Cabinets',
      items: []
    },
    {
      title: 'Vanity Channel Cabinets',
      items: []
    },
    {
      title: 'Floating Vanity Cabinets',
      items: []
    },
    {
      title: 'Floating Vanity Channel Cabinets',
      items: []
    },
    {
      title: 'Wall Cabinets',
      items: []
    },
    {
      title: 'Wall Channel Cabinets',
      items: []
    },
    {
      title: 'Tall Cabinets',
      items: []
    },
    {
      title: 'Tall Channel Cabinets',
      items: []
    },
    {
      title: 'Wardrobe Cabinets',
      items: []
    }
  ];

  const filecabinets = cabinets.map(cab => {
    cab.file = cab.title.toLocaleLowerCase().replace(/ /g, '-');
    const itemsJSON = JSON.parse(
      fs.readFileSync('src/fs/json/' + cab.file + '.json')
    )[cab.file];
    const items = itemsJSON.map(item => {
      const title = item.title.replace(item.code + ' : ', '');
      const { image, uid } = item;
      return {
        title,
        image,
        uid,
        active: item.active,
        lines: item.lines,
        tags: item.tags,
        itemcodes: item.itemcodes
      };
    });
    return { ...cab, items };
  });
  createFile(filecabinets, 'structure');
  // node --experimental-modules src/fs/cablink.mjs
