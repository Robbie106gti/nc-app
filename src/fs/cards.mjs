export class RootCard {
  constructor(title, image) {
    this.card = {
      active: true,
      lines: {
        custom: true,
        cornerstone: true,
        lighthouse: true,
        modcon: true,
        modal: true
      },
      tags: []
    };
    this.card.title = title;
    this.card.image = '/catalog/build/assets/root/' + this.imageJpgs(image);
    this.card.uid = this.makeLink(title);
    this.card.link = this.makeLink(title);
  }

  makeLink(title) {
    return title.toLowerCase().replace(/ /g, '-');
  }

  imageJpgs(image) {
    return image.toLowerCase().replace(/ /g, '%20') + '.jpg';
  }

  test() {
    console.log(this.card);
  }
}

export class SubCard {
  constructor(title, image) {
    this.card = {
      active: true,
      lines: {
        custom: true,
        cornerstone: true,
        lighthouse: true,
        modcon: true,
        modal: true
      },
      tags: []
    };
    this.card.title = title;
    this.card.image = '/catalog/build/assets/root/' + this.imageJpgs(image);
    this.card.uid = this.makeLink(title);
    this.card.link = this.makeLink(title);
  }

  makeLink(title) {
    return title.toLowerCase().replace(/ /g, '-');
  }

  imageJpgs(image) {
    return image.toLowerCase().replace(/ /g, '%20') + '.jpg';
  }
}
