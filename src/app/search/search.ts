export interface Search {
  loading: boolean;
  loaded: boolean;
  results: Array<Result>;
}

export interface Result {
  title: string;
  image: string;
  url?: string;
  sub?: string;
  id?: string;
  idCat?: string;
  idSub?: string;
}
