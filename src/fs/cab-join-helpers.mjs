import * as fs from 'fs';
import { createFile } from './utils/create-file';
import _ from 'lodash';

const helpersv2 = JSON.parse(fs.readFileSync('src/fs/json/helpers-v2.json'));
const cabinets = JSON.parse(fs.readFileSync('src/fs/json/cabinets.json'));
const harray = Object.values(helpersv2);
const carray = Object.values(cabinets);

const cabinetsv2 = {};

harray.forEach(helper => {
  helper.cabinets.forEach(cuid => HelpersIntoCabinet(helper, cuid));
});

function HelpersIntoCabinet(helper, cuid) {
  let cab = cabinetsv2[cuid] ? cabinetsv2[cuid] : cabinets[cuid];
  delete helper.cabinets;
  cab.helpers ? cab.helpers.push(helper) : (cab['helpers'] = [helper]);
  cab = correctHelperUids(cab, helper);
  cabinetsv2[cab.uid] = cab;
}

function correctHelperUids(cab, helper) {
  cab = DeleteOptions(cab);
  cab.title = cab.title.replace(cab.code + ' : ', '');
  if (cab.versions.length === 1) {
    cab.versions[0] = DeleteOptions(cab.versions[0]);
    cab[helper.category] = _.union(cab[helper.category], cab.versions[0][helper.category]);
    cab.versions[0][helper.category] = [];
  }
  if (cab[helper.category] !== undefined) {
    cab[helper.category] = idToUid(cab[helper.category], helper.id, helper.uid);
  }
  if (cab.versions.length !== 1) {
    cab.versions = cab.versions.map(v => {
      // console.log(v, helper.id, helper.category, cab.uid);
      v = DeleteOptions(v);
      if (v[helper.category]) {
        v[helper.category] = idToUid(v[helper.category], helper.id, helper.uid);
      }
      return v;
    });
  }
  return cab;
}

function DeleteOptions(cab) {
  if (!cab.options) {
    return cab;
  }
  cab['addons'] = cab.options;
  delete cab.options;
  return cab;
}

function idToUid(arr, id, uid) {
  if (arr.includes(id)) {
    arr = _.without(arr, id);
    arr.push(uid);
  }
  return arr;
}

createFile(cabinetsv2, 'cabinets-v2');

// node --experimental-modules src/fs/cab-join-helpers.mjs
