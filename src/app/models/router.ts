import { RouterState, State } from '../store/reducers';

export interface RouterCancel {
  event: EventCancel;
  routerState: RouterState;
  storeState: State;
}

export interface RouterNav {
  event: EventNav;
  routerState: RouterState;
}

export interface EventCancel {
  id: number;
  url: string;
  reason: string;
}

export interface EventNav {
  id: number;
  url: string;
  urlAfterRedirects: string;
  state: RouterState;
}
