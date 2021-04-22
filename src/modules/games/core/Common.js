export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export const randomIntegerArray = (length, max = 9) =>
  Array.from({ length }, () => Math.floor(Math.random() * (max + 1)));

export function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const insertArray = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];
