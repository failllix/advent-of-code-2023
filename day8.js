const { readFileSync } = require("fs");

const [leftRightStr, mapStr] = readFileSync("./day8.txt")
  .toString()
  .split("\r\n\r\n");

const map = mapStr.split("\r\n").reduce((acc, curr) => {
  const [key, left, right] = curr.match(/((\d|[A-Z])+)/g);
  acc[key] = { left, right };
  return acc;
}, {});

const leftRight = leftRightStr.split("");

const getSteps = (startLocations, targetCondition) => {
  return startLocations.map((location) => {
    let steps = 0;
    let leftRightIndex = 0;
    do {
      const direction = leftRight[leftRightIndex];
      location = direction === "L" ? map[location].left : map[location].right;
      leftRightIndex =
        leftRightIndex == leftRight.length - 1 ? 0 : leftRightIndex + 1;
      steps++;
    } while (targetCondition(location));

    return steps;
  });
};

console.log(getSteps(["AAA"], (location) => location !== "ZZZ"));

const steps = getSteps(
  Object.keys(map).filter((a) => a.endsWith("A")),
  (location) => !location.endsWith("Z")
);

const gcd = (a, b) => {
  for (let temp = b; b !== 0; ) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
};

const lcm = (a, b) => {
  const gcdValue = gcd(a, b);
  return (a * b) / gcdValue;
};

console.log(steps.reduce(lcm));
