import uuidv1 from 'uuid/v1';
import _ from 'lodash';
import { setId } from './utils/setid';
import { trimit } from './utils/trimit';
import { commaContent, commaTitle } from './utils/comma';

export function hasLines(item) {
  item.uid = uuidv1();
  // item.id = setId(item.id);
  const active = item.active === true ? true : false;
  const lines = item.lines
    ? item.lines
    : {
      custom: item.active === true ? true : false,
      lighthouse: item.active === true ? true : false,
      cornerstone: item.active === true ? true : false,
      modal: item.active === true ? true : false,
      modcon: item.active === true ? true : false
    };
  const type = item.type || 'default';
  if (item.lines) {
    lines.custom = item.lines.custom === true ? true : false;
    lines.lighthouse = item.lines.lighthouse === true ? true : false;
    lines.cornerstone = item.lines.cornerstone === true ? true : false;
    lines.modal = item.lines.modal === true ? true : false;
    lines.modcon = item.lines.modcon === true ? true : false;
  }
  return { ...item, active, lines, type };
}

export function changeActive() {
  return {
    active: true,
    lines: {
      custom: true,
      lighthouse: true,
      cornerstone: true,
      modal: true,
      modcon: true
    }
  };
}

export function addonsCleanUp(addon) {
  if (addon.link === '#') { delete addon.link; }
  if (addon.note) {
    addon.notes = addon.note;
    delete addon.note;
  }
  addon.title = trimit(addon.title);
  addon.content = trimit(addon.content);
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
  note.contentLink = trimit(note.contentLink);
  if (note.contentLink === '') { delete note.contentLink; }
  note.ccontent = trimit(note.ccontent);
  note.content = note.contentLink === '' ? note.content + note.ccontent : note.content + ' ' + note.contentLink + ' ' + note.ccontent;
  delete note.ccontent;
  note.content = _.lowerFirst(note.content);
  note.content = trimit(note.content);
  note.content = _.endsWith(note.content, '.') ? note.content : note.content + '.';
  return note;
}
