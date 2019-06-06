import { trimit } from './trimit';

export function commaContent(con) {
    const com = con.indexOf(',');
    if (com >= 0 && com <= 4) { con.replace(',', ''); }
    return con;
  }

  export function commaTitle(con) {
    const com = con.indexOf(',');
    if (com >= 0) { con.replace(',', ''); }
    return trimit(con);
  }
