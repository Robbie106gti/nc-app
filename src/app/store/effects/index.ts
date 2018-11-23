import { RouterEffects } from './router.effects';
import { UserEffects } from './user.effects';
import { SearchEffects } from './search.effects';
import { UiEffects } from './ui.effects';

export const Effects: any[] = [
  RouterEffects,
  UserEffects,
  SearchEffects,
  UiEffects
];

export * from './router.effects';
export * from './user.effects';
export * from './search.effects';
export * from './ui.effects';
