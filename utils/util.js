/**
 * @description: 格式化秒数
 * @param {type}
 * @return:
 */
export function formatSec(num) {
  let Tnum = parseInt(num)
  // let H = this.$toZero(Math.floor(num / 3600));
  let M = toZero(Math.floor(Tnum % 3600 / 60))
  let S = toZero(Math.floor(Tnum % 60))
  // return H + ":" + M + ":" + S;
  return M + ':' + S
}

export function toZero(num) {
  if (num <= 9) {
    return '0' + num
  } else {
    return '' + num
  }
}

export function reverseFormatSec(formatSec){
    const h = parseInt(formatSec[0], 10)
    const m = parseInt(formatSec[1], 10)
    const s = parseInt(formatSec[3], 10) * 10 + parseInt(formatSec[4], 10)

    return h * 3600 + m * 60 + s
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  var timeout, result;

  var later = function (context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArguments(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
export function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0),
      rest = Array(length),
      index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
}
