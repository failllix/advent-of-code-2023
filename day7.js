const { readFileSync } = require("fs");

const hands = readFileSync("./day7.txt")
  .toString()
  .match(/([A-Z]|\d){5}\s\d+/g)
  .map((hand) => hand.split(" "))
  .map(([cardsStr, bid]) => {
    return { cardsStr, cards: cardsStr.split(""), bid: parseInt(bid) };
  });

const type = {
  5: "FIVE_OF_A_KIND",
  41: "FOUR_OF_A_KIND",
  32: "FULL_HOUSE",
  311: "THREE_OF_A_KIND",
  221: "TWO_PAIR",
  2111: "ONE_PAIR",
  11111: "HIGH_CARD",
};

const typeOrder = [
  "FIVE_OF_A_KIND",
  "FOUR_OF_A_KIND",
  "FULL_HOUSE",
  "THREE_OF_A_KIND",
  "TWO_PAIR",
  "ONE_PAIR",
  "HIGH_CARD",
];

const cardOrder = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const jokerCardOrder = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const mapOccurences = (cards) => {
  const cardsStr = cards.join("");
  return cards.reduce((acc, curr) => {
    acc[curr.toString()] = (cardsStr.match(new RegExp(curr, "g")) || []).length;
    return acc;
  }, {});
};

const getSignature = (cardsStr) => {
  const map = mapOccurences(cardsStr.split(""));
  return Object.values(map)
    .sort((a, b) => b - a)
    .join("");
};

const getSignatureRespectingJokers = (cardsStr) => {
  const jokers = (cardsStr.match(/J/g) || []).length;
  if (jokers === 5) return "5";
  const cardsWithoutJokers = cardsStr.replaceAll("J", "");
  const map = mapOccurences(cardsWithoutJokers.split(""));
  const sortedMap = Object.values(map).sort((a, b) => b - a);
 
  sortedMap[0] += jokers;
  return sortedMap.join("");
};

const getTotalWinnings = (hands, cardOrder) =>
  hands
    .sort((handA, handB) => {
      for (let i = 0; i < 5; i++) {
        const a = handA.cards[i];
        const b = handB.cards[i];
        if (a === b) continue;

        return cardOrder.indexOf(b) - cardOrder.indexOf(a);
      }
      return 0;
    })
    .sort(
      (handA, handB) =>
        typeOrder.indexOf(handB.type) - typeOrder.indexOf(handA.type)
    )
    .map((hand, i) => {
      return { ...hand, multiplier: i + 1 };
    })
    .reduce((acc, curr) => acc + curr.bid * curr.multiplier, 0);

console.log(
  getTotalWinnings(
    hands.map((hand) => {
      return { ...hand, type: type[getSignature(hand.cardsStr)] };
    }),
    cardOrder
  )
);

console.log(
  getTotalWinnings(
    hands.map((hand) => {
      return {
        ...hand,
        type: type[getSignatureRespectingJokers(hand.cardsStr)],
      };
    }),
    jokerCardOrder
  )
);
