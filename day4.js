const { readFileSync } = require("fs");

const lines = readFileSync("./day4.txt").toString().split("\r\n");

const getCardWorth = (matches) =>
  matches - 1 < 0 ? 0 : Math.pow(2, matches - 1);

const cardStrings = lines.map((line) => line.split(": ")[1]);

const matches = cardStrings
  .map((cardString) => cardString.split(" | "))
  .map(([winnersString, potentialsString]) => [
    winnersString.match(/(\d+)/g),
    potentialsString.match(/(\d+)/g),
  ])
  .map(
    ([winners, potentials]) =>
      potentials.filter((potential) => winners.includes(potential)).length
  );

const sum = matches
  .map(getCardWorth)
  .reduce((acc, curr) => acc + parseInt(curr), 0);

console.log(sum);

const initialCardCounts = Array(lines.length).fill(1);

matches.forEach((matches, index) => {
  for (let i = 1; i <= matches; i++) {
    initialCardCounts[index + i] += initialCardCounts[index];
  }
});
console.log(initialCardCounts.reduce((acc, curr) => acc + curr, 0));
