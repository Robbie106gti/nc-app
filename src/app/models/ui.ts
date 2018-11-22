// tslint:disable-next-line:class-name
export interface Dashboard {
  icon: string;
  link: string[];
  title: string;
  default_disabled: boolean;
  default_hidden?: boolean;
}

// tslint:disable-next-line:class-name
export interface Slides {
  description: string;
  image: string;
  title: string;
}

// tslint:disable-next-line:class-name
export interface Header {
  icon: string;
  click: string;
  button?: string;
  link?: string;
}

// tslint:disable-next-line:class-name
export interface Categories {
  image: string;
  link: string;
  title: string;
  color: string;
  hidden: boolean;
  catalogues?: Catalogues[];
  icon?: string;
}

// tslint:disable-next-line:class-name
export interface Catalogues {
  active: boolean;
  color: string;
  icon: string;
  param: string;
  title: string;
}

export interface Ui {
  categories: Categories[];
  header: Header[];
  slides: Slides[];
  dashboard: Dashboard[];
}
