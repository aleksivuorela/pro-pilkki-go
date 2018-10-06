import getRandomInt from './randomInt'
import { generateRandomPoint } from './randomGeo'

const RADIUS = 300; // meters

const fishImages = {
  1: require('../assets/sprites/fishes/siika/siika-up-1.png'),
  2: require('../assets/sprites/fishes/ahven/ahven-up-1.png'),
  3: require('../assets/sprites/fishes/siika/siika-up-2.png'),
  4: require('../assets/sprites/fishes/ahven/ahven-up-2.png'),
  4: require('../assets/sprites/fishes/bulbfish/bulbfish-1.png')
};

const fishLoops = {
  1: require('../assets/sprites/fishes/siika/siika-loop.gif'),
  2: require('../assets/sprites/fishes/ahven/ahven-loop.gif'),
  3: require('../assets/sprites/fishes/siika/siika-loop.gif'),
  4: require('../assets/sprites/fishes/ahven/ahven-loop.gif'),
  5: require('../assets/sprites/fishes/bulbfish/bulbfish-loop.gif')
};

const fishTypes = {
  1: 'Siika',
  2: 'Ahven',
  3: 'Siika',
  4: 'Ahven',
  5: 'Bulbfish'
}

export default function createFish(count, location) {
  let fish = [];
  let random = 0;

  for (let i=0; i<count; i++) {
    random = getRandomInt(1, 5);
    fish.push(Object.assign({
      image: fishImages[random],
      loop: fishLoops[random],
      type: fishTypes[random]
    },
    generateRandomPoint(location, RADIUS)
    ));
  }

  return fish;
}
