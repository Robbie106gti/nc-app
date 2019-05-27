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
  return { ...item, active, lines };
}

function codeCleanUp(code) {
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
  let test = { specifications: {}, options: {}, notes: {}, versions: [], iwhd: {}, widths: {} };
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
  cab.itemcodes = mergeDedupe(itemcodes);
  const desc = Object.values(description);

  // needs tweaking . and spaces can trip this one. //
  cab.description = desc.every(v => v === desc[0]) ? desc[0] : descriptionTweaker(desc, description, cab);


  test = globalReduc(test);
  cab.specifications = test.specifications;
  cab.notes = test.notes;
  cab.options = test.options;
  cab.iwhd = test.iwhd;
  cab.widths = test.widths;
  return cab;
}

function descriptionTweaker(desc, description, cab) {
  desc = _.union(desc);

  const review = {
    lngth: desc.length,
    str1: desc[0].split(''),
    str2: desc[1].split(''),
    xor: '',
    description,
    title: cab.title,
    code: cab.code
  };
  if (desc.length === 2) {
    review.xor = _.xor(review.str1, review.str2);
    switch (review.xor[0]) {
      case '.':
        desc = desc[0].lastIndexOf('.') ? desc[0] : desc[1];
        return;
      default:
        needsReview({ review, hello: 'switch' });
    }
  } else { needsReview(desc) }
  // const dif = desc.length === 2 ? needsReview((_.xor(desc[0].split(), desc[1].split()))) : needsReview(desc);
  needsReview(review);
  return desc;
}

function descriptionCleaner(title, desc) {
  if (title.includes(desc)) {
    return null;
  }
  return desc;
}

export function needsReview(obj) {
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
  const iw = _.intersection(test.iwhd[first], test.iwhd[second]);
  const wi = _.intersection(test.widths[first], test.widths[second]);
  test.specifications = arrayDepulicates(test.specifications, spec, k.st, k.qt);
  test.options = arrayDepulicates(test.options, opt, k.st, k.qt);
  test.notes = arrayDepulicates(test.notes, nt, k.st, k.qt);
  test.iwhd = arrayDepulicates(test.iwhd, iw, k.st, k.qt);
  test.widths = arrayDepulicates(test.widths, wi, k.st, k.qt);
  return test;
}

function arrayDepulicates(obj, arr, i, l) {
  const arrays = Object.values(obj);
  for (i; i < l; i++) {
    arr = _.intersection(arr, arrays[i]);
  }
  return arr;
}

export function globalreduceVersion(cab) {
  cab.versions = cab.versions.map(ver => cleanUpVersion(ver, cab));
  return cab;
}

function cleanUpVersion(ver, cab) {
  ver.specifications = _.without(ver.specifications, ...cab.specifications);
  ver.iwhd = _.without(ver.iwhd, ...cab.iwhd);
  ver.notes = _.without(ver.notes, ...cab.notes);
  ver.options = _.without(ver.options, ...cab.options);
  return ver;
}
