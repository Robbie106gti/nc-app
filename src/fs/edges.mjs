import * as fs from 'fs';
import { createFile } from './create-json';
import _ from 'lodash';
import { Edge } from './edge.mjs';


const edges_dump = JSON.parse(
  fs.readFileSync('src/assets/json/edges_dump.json')
);

const helpers = JSON.parse(
  fs.readFileSync('src/fs/json/helpers.json')
);

const edges = new Object();
const test = { helpers: [], dump: [] };
helpers.edges.forEach(edge => test.helpers.push(edge.title));
edges_dump.forEach(edge => {
  edge = new Edge(edge, helpers.edges);
  edges[edge.uid] = edge;
  test.dump.push(edge.title);
});
if (test.helpers.length !== test.dump.length) {
  const missing = _.without(test.dump, ...test.helpers);
  missing.forEach(edge => {
    const missedge = helpers.edges.filter(e => e.title === edge)[0];
    delete missedge.type;
    edges[missedge.uid] = missedge;
  });
}

createFile(edges, 'edges');
// node --experimental-modules src/fs/edges.mjs
