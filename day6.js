const { readFileSync } = require("fs");

const [timesStr, distancesStr] = readFileSync("./day6.txt")
  .toString()
  .match(/(\d+\s|\d+)*/g)
  .filter((el) => el != "")
  .join("")
  .split("\r");

const times = timesStr.split(" ");
const distances = distancesStr.split(" ");

const getDistance = (holdTime, time) => holdTime * time;

const getOpportunities = (timeAvailable, distanceToBeat) => {
  let opportunities = 0;
  let holdTime = 1;
  do {
    const distance = getDistance(holdTime, timeAvailable - holdTime);
    if (distance > distanceToBeat) opportunities++;
    holdTime++;
  } while (timeAvailable - holdTime > 0);

  return opportunities;
};

const power = times
  .map((time, i) => getOpportunities(time, distances[i]))
  .reduce((acc, curr) => (acc === undefined ? curr : acc * curr));

console.log(power);

const timeAvailable = parseInt(timesStr.replaceAll(" ", ""));
const distanceToBeat = parseInt(distancesStr.replaceAll(" ", ""));

const opportunities = getOpportunities(timeAvailable, distanceToBeat)

console.log(opportunities);
