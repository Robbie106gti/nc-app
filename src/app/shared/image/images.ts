import { ListItem } from '../list/list';

interface Image {
  title: string;
  image: string;
  current?: boolean;
  clicked?: boolean;
  index?: number;
}

export interface Images {
  images: Array<Image>;
}
export interface ImageModal {
  open: boolean;
  imageurl: string;
}

export interface HtmlImagesModal {
  current: Current;
  items?: Array<Image>;
}

interface Current {
  title: string;
  image: string;
  index?: number;
  list?: ListItem;
}
