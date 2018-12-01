import { of } from 'rxjs';
import { base64Decode, base64Encode } from '@firebase/util';

export interface Cookie {
  email: string;
  expires: string;
  class: string;
  username: string;
}
const outdated = 'Thu, 01 Jan 1970 00:00:01 GMT';
const now = new Date();
const Path = '/';
const name = 'nc-app';

let cookie: Cookie;
let encodedCookie: string;
let date: string;

function expCookie(days) {
  if (days !== outdated) {
    now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000);
    date = now.toUTCString();
  }
  const expires = 'Expires=' + days === outdated ? days : date;
  return expires;
}

function encodeCookie(obj) {
  return (encodedCookie = base64Encode(JSON.stringify(obj)));
}

function decodeCookie(obj) {
  return (cookie = JSON.parse(base64Decode(obj)));
}

function writeCookie(nameCK, ck, path, days) {
  document.cookie = `${nameCK}=${encodeCookie(ck)};;Path=${path};${expCookie(
    days
  )}`;
}

export function setCookie(data, exdays) {
  writeCookie(name, data, Path, exdays);
}

function getCookie() {
  const ca = document.cookie.split(';');
  const cname = name + '=';
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return '';
}

export function parseCookie() {
  const ck = getCookie();
  if (ck === '') {
    return of(null);
  } else {
    cookie = decodeCookie(ck);
    return cookie.expires === outdated ? of(null) : of(cookie);
  }
}

export function resetCookie() {
  writeCookie(name, { expires: outdated }, Path, outdated);
}
