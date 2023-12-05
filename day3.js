const { readFileSync } = require("fs");

const lines = readFileSync("./day3.txt").toString().split("\r\n");
const maxY = lines.length - 1;
const maxX = lines[0].length - 1;

const matrix = lines.map((line) => line.split(""));

const getNumberLocations = (line) => {
  const nums = line.match(/(\d+)/g);

  const locations = [];
  let nextStart = 0;
  if (nums !== null) {
    nums.forEach((num) => {
      const start = line.indexOf(num, nextStart);
      const end = start + num.length - 1;
      nextStart = end + 1;
      locations.push({ start, end, value: parseInt(num) });
    });
  }

  return locations;
};

const getGearLocations = (line) => {
  const gears = line.match(/(\*)/g);

  const locations = [];
  let nextStart = 0;
  if (gears !== null) {
    gears.forEach((gear) => {
      const index = line.indexOf(gear, nextStart);
      nextStart = index + 1;
      locations.push(index);
    });
  }

  return locations;
};

const numLocations = lines.map(getNumberLocations);
const gearLocations = lines.map(getGearLocations);

const getSurroundingCordsInBounds = (x, y) => {
  return [
    { x: x - 1, y: y - 1 },
    { x: x + 0, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y + 0 },
    { x: x + 1, y: y + 0 },
    { x: x - 1, y: y + 1 },
    { x: x + 0, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ].filter(
    (cord) => cord.x >= 0 && cord.x <= maxX && cord.y >= 0 && cord.y <= maxY
  );
};

const getWholeNumberFromLocation = (x, y) => {
  let line = lines[y];

  let index = x;
  let isNum = null;
  do {
    let char = line[index];
    isNum = char.match(/\d/g) !== null;
    index--;
  } while (isNum && index >= 0);

  return parseInt(line.slice(index + 1, line.length).match(/(\d+)/g)[0]);
};

const getSurroundingNumbers = (x, y) => {
  const surroundingCordsInBounds = getSurroundingCordsInBounds(x, y);

  const surroundingNums = new Set();
  for (let i = 0; i < surroundingCordsInBounds.length; i++) {
    const cord = surroundingCordsInBounds[i];
    const isNum = matrix[cord.y][cord.x].match(/\d/g) !== null;
    if (isNum) {
      surroundingNums.add(getWholeNumberFromLocation(cord.x, cord.y));
    }
  }

  return Array.from(surroundingNums);
};

const isSurroundedByChar = (x, y) => {
  const surroundingCordsInBounds = getSurroundingCordsInBounds(x, y);

  for (let i = 0; i < surroundingCordsInBounds.length; i++) {
    const cord = surroundingCordsInBounds[i];
    const char = matrix[cord.y][cord.x];
    if (char !== "." && char.match(/\d/) === null) {
      return true;
    }
  }

  return false;
};

const isNumberSurroundedByChar = (start, end, y) => {
  for (let i = start; i <= end; i++) {
    if (isSurroundedByChar(i, y)) return true;
  }
  return false;
};

const sum = numLocations.reduce((acc, numLocations, y) => {
  numLocations.forEach((numLocation) => {
    if (isNumberSurroundedByChar(numLocation.start, numLocation.end, y)) {
      acc = acc + numLocation.value;
    }
  });

  return acc;
}, 0);

const gearPowerSum = gearLocations.reduce((acc, gearLocations, y) => {
  gearLocations.forEach((x) => {
    const surroundingNums = getSurroundingNumbers(x, y);
    if (surroundingNums.length === 2) {
      acc += surroundingNums[0] * surroundingNums[1];
    }
  });
  return acc;
}, 0);

console.log(sum);
console.log("\n");
console.log(gearPowerSum);
