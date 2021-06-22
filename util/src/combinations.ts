function combinations<T>(a: T[], min?: number, max?: number): T[][] {
  min = min || 1;
  max = max || a.length
  max = max < a.length ? max : a.length - 1;
  var fn = function(n: number, src: T[], got: T[], all: T[][]) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
  var all: T[][] = [];
  for (var i = min; i <= max; i++) {
    fn(i, a, [], all);
  }
  if(a.length == max) all.push(a);
  return all;
}
export default combinations
