import * as Link from './link';

export function makeEntities(items, state) {
  if (state.entities.start_item) {
    delete state.entities.start_item;
  }
    return items.reduce(
        (entities: { [id: string]: any }, cat: any) => {
          if (cat.remove === true) { return entities; }
          return { ...entities, [Link.makelink(cat.title)]: { ...cat, link: Link.makelink(cat.title) } };
        },
        { ...state.entities }
      );
}
