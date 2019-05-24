import uuidv1 from 'uuid/v1';

export function checkVersion(version, root) {
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