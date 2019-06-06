import _ from 'lodash';

export function setId(id) {
    const nid = _.toNumber(id);
    id = _.isNaN(nid) ? id : nid;
    return id;
  }