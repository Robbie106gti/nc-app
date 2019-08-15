export interface List {
  title: string;
  items: Array<ListItem>;
}

export interface ListItem {
  title: string;
  text: string;
  icon?: string;
  image?: Image;
}

interface Image {
  image: string;
  title: string;
}
