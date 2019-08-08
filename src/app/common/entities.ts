import * as Link from './link';
import { sortAlfabet } from './sort';

export function makeEntities(items, state) {
  items = sortAlfabet(items);
  if (state.entities.start_item) {
    delete state.entities.start_item;
  }
  return items.reduce(
      (entities: { [id: string]: any }, cat: any) => {
        if (cat.remove === true) { return entities; }
        return { ...entities, [Link.makelink(cat.title)]: { ...cat, link: Link.makelink(cat.title), loaded: false, loading: false } };
      },
      { ...state.entities }
    );
}

export function makeSubEntities(items) {
  items = sortAlfabet(items);
  const entities = {};
  items.forEach(
      (entity) =>  entities[Link.makelink(entity.title)] = { ...entity, link: Link.makelink(entity.title) }
    );
  return entities;
}
