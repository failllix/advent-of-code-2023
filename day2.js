const { readFileSync } = require("fs");

const games = readFileSync("./day2.txt").toString().split("\n");

const getColorsFromDraw = (draw) => {
  const redMatch = draw.match(/(\d+)(?= red)/g);
  const greenMatch = draw.match(/(\d+)(?= green)/g);
  const blueMatch = draw.match(/(\d+)(?= blue)/g);

  const red = redMatch != null ? redMatch[0] : 0;
  const green = greenMatch != null ? greenMatch[0] : 0;
  const blue = blueMatch != null ? blueMatch[0] : 0;

  return { red: parseInt(red), green: parseInt(green), blue: parseInt(blue) };
};

const isGamePossible = (drawString) => {
  const draws = drawString.split("; ");

  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];

    const { red, green, blue } = getColorsFromDraw(draw);

    if (red > 12 || green > 13 || blue > 14) {
      return false;
    }
  }

  return true;
};

const getPowerOfMinColorAmounts = (drawString) => {
  const draws = drawString.split("; ");

  const minRequiredCubes = draws.reduce(
    (acc, curr) => {
      const { red, green, blue } = getColorsFromDraw(curr);

      if (red > acc.red) {
        acc.red = red;
      }

      if (green > acc.green) {
        acc.green = green;
      }

      if (blue > acc.blue) {
        acc.blue = blue;
      }

      return acc;
    },
    { red: 0, green: 0, blue: 0 }
  );

  return minRequiredCubes.red * minRequiredCubes.green * minRequiredCubes.blue;
};

const sum = games
  .filter((game) => isGamePossible(game.match(/(?<=Game \d+: )(.*)/g)[0]))
  .map((game) => game.match(/(?<=Game )(\d+)/g)[0])
  .reduce((acc, curr) => acc + parseInt(curr), 0);
console.log(sum);

const powerSum = games
  .map((game) =>
    getPowerOfMinColorAmounts(game.match(/(?<=Game \d+: )(.*)/g)[0])
  )
  .reduce((acc, curr) => acc + parseInt(curr), 0);
console.log(powerSum);
