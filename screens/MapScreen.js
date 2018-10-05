import React from 'react';
import {MapView, Permissions, Location} from 'expo';
import {StyleSheet, Button, View, Text} from 'react-native';

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
      }
    };

    this.locationWatcher = null;
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      this.locationWatcher = Location.watchPositionAsync({
        enableHighAccuracy: true,
        timeInterval: 500,
      }, (location) => {
        this.setState({
          player: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta,
            longitudeDelta
          }
        })
      })
    } else {
      console.warn('PERMISSION DENIED');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.player}
          scrollEnabled={false}
          showsTraffic={false}
          showsIndoors={false}
          showsPointsOfInterest={false}
        >
          <MapView.Marker
            key={'player'}
            image={require('../assets/sprites/player.png')}
            coordinate={this.state.player}
          />
        </MapView>
        <Button
          title="Aloita pilkkiminen"
          onPress={() => this.props.navigation.navigate('Game')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
