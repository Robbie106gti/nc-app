export function unique(array) {
    const seen = new Set();
    return array.filter(function(item) {
      if (!seen.has(item)) {
        seen.add(item);
        return true;
      }
    });
  }
