const { readFileSync } = require("fs");

const input = readFileSync("./day5.txt").toString();

const getMapInformation = (input) => {
  const information = input.split(" ");
  return {
    destination: parseInt(information[0]),
    source: parseInt(information[1]),
    range: parseInt(information[2]),
  };
};

const mapValue = (value, maps) => {
  for (let i = 0; i < maps.length; i++) {
    const { source, destination, range } = maps[i];
    if (value < source || value > source + range) {
      continue;
    }
    return value - source + destination;
  }
  return value;
};

const seedsInput = input.match(/(?<=seeds: )(\d+ |\d+\r\n)*/gs)[0];

const seeds = seedsInput
  .split(" ")
  .map((seed) => seed.replace("\r\n", ""))
  .map((seed) => parseInt(seed));

const seedToSoil = input
  .match(/(?<=seed-to-soil map:\r\n)(\d+ |\d+\r\n)*/gs)[0]
  .split("\r\n")
  .filter((el) => el !== "")
  .map(getMapInformation);

const soilToFertilizer = input
  .match(/(?<=soil-to-fertilizer map:\r\n)(\d+ |\d+\r\n)*/gs)[0]
  .split("\r\n")
  .filter((el) => el !== "")
  .map(getMapInformation);

const fertilizerToWater = input
  .match(/(?<=fertilizer-to-water map:\r\n)(\d+ |\d+\r\n)*/gs)[0]
  .split("\r\n")
  .filter((el) => el !== "")
  .map(getMapInformation);

const waterToLight = input
  .match(/(?<=water-to-light map:\r\n)(\d+ |\d+\r\n)*/gs)[0]
  .split("\r\n")
  .filter((el) => el !== "")
  .map(getMapInformation);

const lightToTemperature = input
  .match(/(?<=light-to-temperature map:\r\n)(\d+ |\d+\r\n)*/gs)[0]
  .split("\r\n")
  .filter((el) => el !== "")
  .map(getMapInformation);

const temperatureToHumidity = input
  .match(/(?<=temperature-to-humidity map:\r\n)(\d+ |\d+\r\n)*/gs)[0]
  .split("\r\n")
  .filter((el) => el !== "")
  .map(getMapInformation);

const humidityToLocation = input
  .match(/(?<=humidity-to-location map:\r\n)(\d+ |\d+\r\n)*/gs)[0]
  .split("\r\n")
  .filter((el) => el !== "")
  .map(getMapInformation);

const getLocationForSeed = (seed) =>
  [seed]
    .map((seed) => mapValue(seed, seedToSoil))
    .map((soil) => mapValue(soil, soilToFertilizer))
    .map((fertilizer) => mapValue(fertilizer, fertilizerToWater))
    .map((water) => mapValue(water, waterToLight))
    .map((light) => mapValue(light, lightToTemperature))
    .map((temperature) => mapValue(temperature, temperatureToHumidity))
    .map((humidity) => mapValue(humidity, humidityToLocation))[0];

const seedMinimumLocation = seeds
  .map(getLocationForSeed)
  .reduce((acc, curr) => (acc === undefined || curr < acc ? curr : acc));

console.log(seedMinimumLocation);

const seedRanges = seedsInput
  .match(/(\d+ \d+)*/g)
  .filter((el) => el !== "")
  .map((rangeInput) => rangeInput.split(" "))
  .map(([start, range]) => [parseInt(start), parseInt(range)]);

let currentLowest;
for (let i = 0; i < seedRanges.length; i++) {
  const startTime = Date.now();
  console.log("Started search in chunk: ", i + 1, "/", seedRanges.length);
  const [start, range] = seedRanges[i];
  for (let seed = start; seed < start + range; seed++) {
    const location = getLocationForSeed(seed);
    if (currentLowest === undefined || location < currentLowest) {
      currentLowest = location;
    }
  }
  console.log(
    "Searching chunk: ",
    i + 1,
    " took: ",
    (Date.now() - startTime) / 1000 / 60,
    "minutes"
  );
}

console.log(currentLowest);
