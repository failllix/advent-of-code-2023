const { readFileSync } = require("fs");

const lines = readFileSync("./day1.txt").toString().split("\n");

const getNumFromIndex = (index) => Math.floor(index / 2) + 1;

const allIndexOf = (line, strToFind) => {
  let start = 0;
  let indices = [];
  let indexOf = line.indexOf(strToFind);
  while (indexOf > -1) {
    indices.push(indexOf);
    start = indexOf + 1;
    indexOf = line.indexOf(strToFind, start);
  }
  return indices;
};

const findLowest = (arr) => {
  return arr.reduce((acc, curr) => {
    if (acc === undefined || curr < acc) return curr;

    return acc;
  }, undefined);
};

const findHighest = (arr) => {
  return arr.reduce((acc, curr) => {
    if (acc === undefined || curr > acc) return curr;

    return acc;
  }, undefined);
};

const numsToFind = [
  "1",
  "one",
  "2",
  "two",
  "3",
  "three",
  "4",
  "four",
  "5",
  "five",
  "6",
  "six",
  "7",
  "seven",
  "8",
  "eight",
  "9",
  "nine",
];

const sum = lines
  .map((line) => {
    const allIndices = numsToFind.map((strToFind) =>
      allIndexOf(line, strToFind)
    );

    const lowest = allIndices.map((indicesOf) => findLowest(indicesOf));
    const firstNum = getNumFromIndex(lowest.indexOf(findLowest(lowest)));

    const highest = allIndices.map((indicesOf) => findHighest(indicesOf));
    const lastNum = getNumFromIndex(highest.indexOf(findHighest(highest)));

    return `${firstNum}${lastNum}`;
  })
  .reduce((acc, curr) => acc + parseInt(curr), 0);

console.log(sum);
