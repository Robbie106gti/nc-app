interface Image {
  title: string;
  image: string;
}

export interface Images {
  images: Array<Image>;
}
export interface ImageModal {
  open: boolean;
  imageurl: string;
}
