  export function makeLink(title) {
    return title.toLowerCase().replace(/ /g, '-');
  }

  export function imageJpgs(image) {
    return image.toLowerCase().replace(/ /g, '%20') + '.jpg';
  }