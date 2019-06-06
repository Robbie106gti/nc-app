import * as fs from 'fs';
import { createFile } from './create-json';
import _ from 'lodash';
import { needsReview } from './utils/error.mjs';
import { setId } from './utils/setid.mjs';

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
    'Tall Cabinets',
    'Tall Channel Cabinets',
    'Wardrobe Cabinets'
  ];

const helpersV2 = { };

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
        options = options[0] ? options.map(opt => addonsOut(opt, uid)) : [];
        iwhd = iwhd[0] ? iwhd.map(i => iwhdOut(i, uid)) : [];
    });
});

// console.log(helpersV2);

function specOut(spec, uid) {
    spec = helpers.specifications.filter(hs => hs.id === spec);
    if (spec.length >= 2 || !spec[0]) {
        needsReview({spec, uid });
    }
    if (!helpersV2[spec[0].uid]) {
        helpersV2[spec[0].uid] = { ...spec[0], cabinets: [uid] , category: 'specifications'};
    } else {
        helpersV2[spec[0].uid].cabinets.push(uid);
        return spec;
    }
}

function noteOut(note, uid) {
    note = helpers.notes.filter(hn => hn.id === note);
    if (note.length >= 2 || !note[0]) {
        needsReview({note, uid });
    }
    if (!helpersV2[note[0].uid]) {
        helpersV2[note[0].uid] = { ...note[0], cabinets: [uid], category: 'notes' };
    } else {
        helpersV2[note[0].uid].cabinets.push(uid);
        return note;
    }
}

function addonsOut(opt, uid) {
    // console.log(opt);
    opt = helpers.addons.filter(ho => ho.id === opt);
    if (opt.length >= 2 || !opt[0]) {
        needsReview({opt, addon, uid });
    }
    if (!helpersV2[opt[0].uid]) {
        helpersV2[opt[0].uid] = { ...opt[0], cabinets: [uid], category: 'addons' };
    } else {
        helpersV2[opt[0].uid].cabinets.push(uid);
        return opt;
    }
}

function optionsOut(opt, uid) {
    // console.log(opt);
    opt = helpers.options.filter(ho => ho.id === opt);
    if (opt.length >= 2 || !opt[0]) {
        needsReview({opt, addon, uid });
    }
    if (!helpersV2[opt[0].uid]) {
        helpersV2[opt[0].uid] = { ...opt[0], cabinets: [uid], category: 'options' };
    } else {
        helpersV2[opt[0].uid].cabinets.push(uid);
        return opt;
    }
}

function iwhdOut(iwhd, uid) {
    // console.log(iwhd);
    iwhd = helpers.iwhd.filter(hi => hi.id === iwhd);
    if (iwhd.length >= 2 || !iwhd[0]) {
        needsReview({iwhd, uid });
    }
    if (!helpersV2[iwhd[0].uid]) {
        helpersV2[iwhd[0].uid] = { ...iwhd[0], cabinets: [uid], category: 'iwhd' };
    } else {
        helpersV2[iwhd[0].uid].cabinets.push(uid);
        return iwhd;
    }
}

const has = ['addons', 'notes', 'specifications', 'edges', 'iwhd', 'options', 'restrictions'];
has.forEach(a => {
    helpers[a].forEach(h => {
        addMissing(h, a);
    });
});

function addMissing(helper, category) {
    if (helpersV2[helper.uid]) {
        return;
    } else {
        helpersV2[helper.uid] = { ...helper, category, cabinets: []};
    }
}

createFile(helpersV2, 'helpers-v2');
// node --experimental-modules src/fs/helpersoptimizer.mjs
