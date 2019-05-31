import * as fs from 'fs';
import { createFile } from './create-json';
import _ from 'lodash';

const helpers = JSON.parse(
    fs.readFileSync('src/fs/json/helpers.json')
  );

const cabinets = [
    'Base Cabinets',
    'Base Channel Cabinets',
    'Vanity Cabinets',
    'Vanity Channel Cabinets',
    'Floating Vanity Cabinets',
    'Floating Vanity Channel Cabinets',
    'Wall Cabinets',
    'Wall Channel Cabinets',
    'Tall Cabinet',
    'Tall Channel Cabinets',
    'Wardrobe Cabinets'
  ];

const helpersV2 = { addons: {}, specifications: {}, notes: {}, options: {}, edges: {}, iwhd: {}, restrictions: {}};
cabinets.forEach(line => {
    const file = line.toLocaleLowerCase().replace(/ /g, '-');
    const itemsJSON = JSON.parse(
      fs.readFileSync('src/fs/json/' + file + '.json')
    )[file];
    const newfile = itemsJSON.map(cab => {
        const uid = cab.uid;
        let { specifications, notes, options, iwhd } = cab;
        versions.map(version => {
            specifications = _.union(specifications, version.specifications);
            notes = _.union(notes, version.notes);
            options = _.union(options, version.options);
            iwhd = _.union(iwhd, version.iwhd);
        });
        specifications = specifications.map(spec => specOut(spec, uid));
        notes = notes.map(note => noteOut(note, uid));
        options = options.map(opt => optionOut(opt, uid));
        iwhd = iwhd.map(i => iwhdOut(i, uid));
    });
});

function specOut(spec, uid) {
    spec = helpers.specifications.filter(hs => hs.id === _.toNumber(spec));
    if(!helpersV2.specifications[spec.uid]) {
        helpersV2.specifications[spec.uid] = { ...spec, }
    }
    return spec;
}

createFile(helpersV2, 'helpers-v2');
