import { needsReview } from './utils/error.mjs';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

export class Edge {
  constructor(edge, helpers) {
    this.edge = this.removeUnnecessary(edge, helpers);
    this.edge.uid = uuidv1();
    return this.edge;
  }
  removeUnnecessary(edge, helpers) {
    const del = ['id', 'sup_name', 'by_who', 'cat_name', 'us_sup', 'sup_code', 'leadtime', 'gi_stain', 'gi_restric', 'gi_opt', 'gi_excep', 'gi_const', 'update_dt', 'sup_con', 'visible', 'parent_id', 'gen_comm', 'url_image', 'item_name', 'descrip_edge', 'gi_edge', 'edge_name_sup'];
    const help = helpers.filter(h => h.title === edge.item_name)[0];
    edge = this.lines(edge);
    edge.image = edge.url_image;
    edge.category = edge.cat_stain;
    edge.title = edge.item_name;
    edge.description = edge.descrip_edge;
    if (help) {
      edge.size = help.size;
      edge.replaces = help.replaces;
      delete edge.detail_size;
    }
    del.forEach(d => delete edge[d]);
    return edge;
  }
  lines(edge) {
    const lines = {
      active: true,
      lines: {
        custom: true,
        cornerstone: true,
        lighthouse: true,
        modcon: false,
        modal: false
      },
      tags: []
    };
    const lh = ['SQ', 'CV6', 'BV5', 'CV11'];
    lines.active = edge.visible === '1' ? true : false;
    lines.lines.custom = edge.visible === '1' ? true : false;
    lines.lines.cornerstone = edge.item_name === 'SQ' ? true : false;
    lines.lines.lighthouse = lh.includes(edge.item_name) ? true : false;
    return { ...edge, ...lines };
  }
}
