import {createStackNavigator} from 'react-navigation';
import {Animated, Easing} from 'react-native';
import MapScreen from '../screens/MapScreen';
import GameScreen from '../screens/GameScreen';
import FishingScreen from '../screens/FishingScreen';

export default AppNavigator = createStackNavigator(
  {
    Map: MapScreen,
    Game: GameScreen,
    FishingScreen: FishingScreen
  },
  {
    initialRouteName: 'Map',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);
