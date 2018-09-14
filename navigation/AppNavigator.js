import {createStackNavigator} from 'react-navigation';
import MapScreen from '../screens/MapScreen';
import GameScreen from '../screens/GameScreen';

export default AppNavigator = createStackNavigator(
  {
    Map: MapScreen,
    Game: GameScreen,
  },
  {
    initialRouteName: 'Map',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);
