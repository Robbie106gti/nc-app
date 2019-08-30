import * as Link from './link';
import { sortAlfabet } from './sort';

export function makeEntities(items, state) {
  items = sortAlfabet(items);
  if (state.entities.start_item) {
    delete state.entities.start_item;
  }
  return items.reduce(
    (entities: { [id: string]: any }, cat: any) => {
      if (cat.remove === true) {
        return entities;
      }
      const link = cat.link ? cat.link : Link.makelink(cat.title);
      return {
        ...entities,
        [link]: {
          ...cat,
          link,
          loaded: false,
          loading: false,
          url: [link]
        }
      };
    },
    { ...state.entities }
  );
}

export function makeSubEntities(items) {
  items = sortAlfabet(items);
  const entities = {};
  items.forEach(entity => {
    const link = entity.link ? entity.link : Link.makelink(entity.title);
    entities[link] = {
      ...entity,
      link,
      url: ['sop', entity.sub, link]
    };
  });
  return entities;
}
