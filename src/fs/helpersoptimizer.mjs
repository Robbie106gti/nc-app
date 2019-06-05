import * as fs from 'fs';
import { createFile } from './create-json';
import _ from 'lodash';
import { needsReview } from './utils/error.mjs';

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
        cab.versions.map(version => {
            specifications = _.union(specifications, version.specifications);
            notes = _.union(notes, version.notes);
            options = _.union(options, version.options);
            iwhd = _.union(iwhd, version.iwhd);
        });
        specifications = specifications[0] ? specifications.map(spec => specOut(spec, uid)) : [];
        notes = notes[0] ? notes.map(note => noteOut(note, uid)) : [];
        options = options[0] ? options.map(opt => optionOut(opt, uid)) : [];
        iwhd = iwhd[0] ? iwhd.map(i => iwhdOut(i, uid)) : [];
    });
});
console.log(helpersV2);
function specOut(spec, uid) {
    spec = helpers.specifications.filter(hs => hs.id === _.toNumber(spec));
    if (spec.length >= 2 || !spec[0]) {
        needsReview({spec, uid });
    }
    if (!helpersV2.specifications[spec[0].uid]) {
        helpersV2.specifications[spec[0].uid] = { ...spec[0], cabinets: [uid] };
        //console.log(helpersV2);
    } else {
        helpersV2.specifications[spec[0].uid].cabinets.push(uid);
        return spec;
    }
}

function noteOut(note, uid) {
    note = helpers.notes.filter(hn => hn.id === _.toNumber(note));
    if (note.length >= 2 || !note[0]) {
        needsReview({note, uid });
    }
    if (!helpersV2.notes[note[0].uid]) {
        helpersV2.notes[note[0].uid] = { ...note[0], cabinets: [uid] };
        //console.log(helpersV2);
    } else {
        helpersV2.notes[note[0].uid].cabinets.push(uid);
        return note;
    }
}

function optionOut(opt, uid) {
    console.log(opt)
    opt = helpers.options.filter(ho => ho.id === _.toNumber(opt));
    if (opt.length >= 2 || !opt[0]) {
        needsReview({opt, uid });
    }
    if (!helpersV2.options[opt[0].uid]) {
        helpersV2.options[opt[0].uid] = { ...opt[0], cabinets: [uid] };
        //console.log(helpersV2);
    } else {
        helpersV2.options[opt[0].uid].cabinets.push(uid);
        return opt;
    }
}

function iwhdOut(iwhd, uid) {
    iwhd = helpers.iwhd.filter(hi => hi.id === _.toNumber(iwhd));
    if (iwhd.length >= 2 || !iwhd[0]) {
        needsReview({iwhd, uid });
    }
    if (!helpersV2.iwhd[iwhd[0].uid]) {
        helpersV2.iwhd[iwhd[0].uid] = { ...iwhd[0], cabinets: [uid] };
        //console.log(helpersV2);
    } else {
        helpersV2.iwhd[iwhd[0].uid].cabinets.push(uid);
        return iwhd;
    }
}

// createFile(helpersV2, 'helpers-v2');
