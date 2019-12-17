export default function shuffleArray(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    // eslint-disable-next-line
    array[currentIndex] = array[randomIndex];
    // eslint-disable-next-line
    array[randomIndex] = temporaryValue;
  }

  return array;
}
