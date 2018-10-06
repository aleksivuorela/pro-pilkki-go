import React from 'react';
import {MapView, Permissions, Location} from 'expo';
import {StyleSheet, Button, View, Text, Image} from 'react-native';
import generateRandomFish from '../utils/randomFish';
import mapStyle from '../mapStyle';
import geolib from 'geolib'

const latitudeDelta = 0.0100;
const longitudeDelta = 0.0080;
const INTERVAL = 4000;

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
      },
      fish: []
      //sound: New Expo.Audio.Sound
    };

    this.locationWatcher = null;
    this.spawnInterval = null;
    this.spawnFish = this.spawnFish.bind(this);
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  componentWillUnmount() {
    this.locationWatcher && this.locationWatcher.remove()
    this.spawnInterval && clearInterval(this.spawnInterval)
  }

  spawnFish() {
    const location = this.state.player;

    let newFish = generateRandomFish(3, location);

    if (this.state.fish.length) {
      newFish = newFish.concat(this.state.fish.slice(0, 3));
    }

    this.setState({
      fish: newFish
    });
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
      this.spawnInterval = setInterval(this.spawnFish, INTERVAL);

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
          zoomEnabled={false}
          zoomControlEnabled={false}
          customMapStyle={mapStyle}
          provider={MapView.PROVIDER_GOOGLE}
        >
          <MapView.Marker
            key={'player'}
            coordinate={this.state.player}
          >
            <Image
              source={require('../assets/sprites/player-icefisher.png')}
              style={{width: 80, height: 80}}
            />
          </MapView.Marker>

          {this.state.fish.map(f =>
            <MapView.Marker
              image={require('../assets/sprites/fishes/siika/siika-lepaa.png')}
              key={`${f.latitude}::${f.longitude}`}
              coordinate={f}
              onPress={() => {
                if (geolib.getDistance({latitude: f.latitude, longitude: f.longitude},{latitude: this.state.player.latitude, longitude: this.state.player.longitude})<=150){
                  this.props.navigation.navigate('Game', { fish: f })
                }}
              }>
            </MapView.Marker>
          )}
        </MapView>
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
