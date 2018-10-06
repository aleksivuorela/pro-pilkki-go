import getRandomInt from './randomInt'
import { generateRandomPoint } from './randomGeo'

const RADIUS = 300; // meters

const fishImages = {
  1: require('../assets/sprites/fishes/siika/siika-lepaa.png'),
  2: require('../assets/sprites/fishes/siika/siika-lepaa.png'),
  3: require('../assets/sprites/fishes/siika/siika-lepaa.png'),
  4: require('../assets/sprites/fishes/siika/siika-lepaa.png'),
};

export default function createFish(count, location) {
  let fish = [];

  for (let i=0; i<count; i++) {
    fish.push(Object.assign({
      image: fishImages[getRandomInt(1, 5)]
    },
    generateRandomPoint(location, RADIUS)
    ));
  }

  return fish;
}
