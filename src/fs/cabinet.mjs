import uuidv1 from 'uuid/v1';
import { mergeDedupe } from './utils/arrayUnique';
import _ from 'lodash';

export function checkVersion(version, root, codes) {
  // tslint:disable-next-line: max-line-length
  const code = getCode(codes, root, version);
  const {
    description,
    specifications,
    iwhd,
    images,
    notes,
    widths,
    options,
    csvitems,
    itemcodes
  } = codeCleanUp(code);
  version = {
    ...version,
    description,
    specifications,
    iwhd,
    images,
    notes,
    widths,
    options,
    csvitems,
    itemcodes: mergeDedupe([version.itemcodes, itemcodes])
  };
  version = checkLines(version);
  version.root = root;
  delete version.link;
  version.version = version.height;
  delete version.height;
  return version;
}

export function checkLines(item) {
  // console.log({'active':item.active, 'lines':item.lines, item: 'old'});
  item.uid = uuidv1();
  item.template = 'cabinet';
  const active = item.active ? true : false;
  const lines = item.lines
    ? item.lines
    : {
        custom: true,
        lighthouse: true,
        cornerstone: true,
        modal: true,
        modcon: true
      };
  lines.custom = lines.custom ? true : false;
  lines.lighthouse = lines.lighthouse ? true : false;
  lines.cornerstone = lines.cornerstone ? true : false;
  lines.modal = lines.modal ? true : false;
  lines.modcon = lines.modcon ? true : false;
  // console.log({'active':active, 'lines':lines, item: 'new'});
  return { ...item, active, lines };
}

function codeCleanUp(code) {
  // console.log(code);
  const {
    description,
    specifications,
    iwhd,
    images,
    notes,
    widths,
    options,
    csvitems,
    itemcodes
  } = {
    description: code.description || 'No description',
    specifications: code.specifications || [],
    iwhd: code.iwhd || [],
    images: code.images || [],
    notes: code.notes || [],
    widths: code.widths || [],
    options: code.options || [],
    csvitems: code.csvitems || [],
    itemcodes: code.itemcodes || []
  };
  code = {
    ...code,
    description,
    specifications,
    iwhd,
    images,
    notes,
    widths,
    options,
    csvitems,
    itemcodes
  };
  return code;
}

function getCode(codes, root, version) {
  const code = codes.filter(
    item => item.code.toUpperCase() === (root + version.height).toUpperCase()
  )[0];
  if (code === undefined) {
    console.log(root + version.height, version);
    code.description = 'No description';
    code.specifications = [];
    code.iwhd = [];
    code.images = [];
    code.notes = [];
    code.widths = [];
    code.options = [];
    code.csvitems = [];
    code.itemcodes = [];
  }
  return code;
}

export function versionToGlobal(cab) {
    const itemcodes = new Array();
    const description = new Object();
    let test = { specifications: {}, options: {}, notes: {}, versions: [], iwhd: {}, widths: {}};
    cab.csvitems = new Array();
    cab.versions = cab.versions.map(version => {
        test.versions.push(version.version);
        itemcodes.push(version.itemcodes);
        const dsc = descriptionCleaner(cab.title, version.description);
        if (dsc !== null) { description[version.version] = dsc; }
        if (version.specifications) { test.specifications[version.version] = version.specifications; }
        if (version.options) { test.options[version.version] = version.options; }
        if (version.notes) { test.notes[version.version] = version.notes; }
        if (version.iwhd) { test.iwhd[version.version] = version.iwhd; }
        if (version.widths) { test.widths[version.version] = version.widths; }
        version.csvitems.map(csv => cab.csvitems.push(csv.itemcode));
        delete version.csvitems;
        return version;
    });
    delete cab.versions;
    cab.itemcodes = mergeDedupe(itemcodes);
    const desc = Object.values(description);
    cab.description = desc.every(v => v === desc[0]) ? desc[0] : needsReview({description, cab});
    test = globalReduc(test);
    console.log(test);
    throw new Error('please stop here');
    return cab;
}


function descriptionCleaner(title, desc) {
    if (title.includes(desc)) {
        return null;
    }
    return desc;
}

function needsReview(obj) {
    console.log(obj);
    throw new Error('please stop here and review object');
}

function globalReduc(test) {
    const first = test.versions[0]
    const second = test.versions[1];
    const k = { qt: test.versions.length, st: 2 }
    const spec = _.intersection(test.specifications[first], test.specifications[second]);
    const opt = _.intersection(test.options[first], test.options[second]);
    const nt = _.intersection(test.notes[first], test.notes[second]);
    const iw =  _.intersection(test.iwhd[first], test.iwhd[second]);
    const wi = _.intersection(test.widths[first], test.widths[second]);
    test.specifications = arrayDepulicates(test.specifications, spec, k.st, k.qt);
    test.options = arrayDepulicates(test.options, opt, k.st, k.qt);
    test.notes = arrayDepulicates(test.notes, nt, k.st, k.qt);
    test.iwhd = arrayDepulicates(test.iwhd, iw, k.st, k.qt);
    test.widths = arrayDepulicates(test.widths, wi, k.st, k.qt);
    // needsReview({options: test.options, opt});
    return test;
}

function arrayDepulicates(obj, arr, i, l) {
    const arrays = Object.values(obj);
    for (i; i < l; i++) {
        arr = _.intersection(arr, arrays[i]);
    }
    return arr;
}
