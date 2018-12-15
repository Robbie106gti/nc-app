import * as Link from './link';

export function makeEntities(items, state) {
    return items.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: any }, cat: any) => {
          return { ...entities, [Link.makelink(cat.title)]: { ...cat, link: Link.makelink(cat.title) } };
        },
        { ...state.entities }
      );
}
