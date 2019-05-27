import uuidv1 from 'uuid/v1';

export function hasLines(item) {
  item.uid = uuidv1();
  item.id = _.toNumber(item.id);
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

export function addonsCleanUp(addon) {
  if (addon.link === '#') { delete addon.link; }
  if (addon.note) {
    addon.notes = addon.note;
    delete addon.note;
  }
  addon.title = addon.title.trim();
  addon.content = addon.content.trim();
  addon.content = _.endsWith(addon.content, '.') ? addon.content : addon.content + '.';
  return addon;
}

export function notesCleanUp(note) {
  if (note.link === '' || note.link === '#') {
    delete note.link;
  }
  note = contentNote(note);
  return note;
}

function contentNote(note) {
  note.content = commaContent(note.content);
  note.title = commaTitle(note.title);
  note.contentLink = note.contentLink.trim();
  if (note.contentLink === '') { delete note.contentLink; }
  note.ccontent = note.ccontent.trim();
  note.content = note.contentLink === '' ? note.content + note.ccontent : note.content + ' ' + note.contentLink + ' ' + note.ccontent;
  delete note.ccontent;
  note.content = _.lowerFirst(note.content);
  note.content = note.content.trim();
  note.content = _.endsWith(note.content, '.') ? note.content : note.content + '.';
  return note;
}

function commaContent(con) {
  const com = con.indexOf(',');
  if (com >= 0 && com <= 4) { con.replace(',', ''); }
  return con;
}

function commaTitle(con) {
  const com = con.indexOf(',');
  if (com >= 0) { con.replace(',', ''); }
  return con.trim();
}
