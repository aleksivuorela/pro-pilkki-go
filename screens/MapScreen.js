import React from 'react';
import {MapView, Permissions, Location} from 'expo';
import {StyleSheet, Button, View, Text, Image, TouchableOpacity} from 'react-native';
import generateRandomFish from '../utils/randomFish';
import mapStyle from '../mapStyle';
import geolib from 'geolib'
import { Overlay } from 'react-native-maps';
import {getCatchedFish} from '../components/backpack';

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
      fish: [],
      backPackOpen: false
    };

    this.locationWatcher = null;
    this.spawnInterval = null;
    this.spawnFish = this.spawnFish.bind(this);
  }

  playBubbleSound = async () => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sounds/bubble.m4a'));
      await soundObject.playAsync();
    } catch (error) {
    }
  };

  playIceSound = async () => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sounds/ice.m4a'));
      await soundObject.playAsync();
    } catch (error) {
    }
  };

  playWindSound = async () => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sounds/wind.wav'));
      await soundObject.playAsync();
    } catch (error) {
    }
  };

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
      this.playIceSound();
      this.playWindSound();

    } else {
      console.warn('PERMISSION DENIED');
    }
  };

  render() {
    console.log(getCatchedFish());
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
          {
            return (
            <MapView.Marker
              image={f.image}
              key={`${f.latitude}::${f.longitude}`}
              coordinate={f}
              onPress={() => {
                if (geolib.getDistance({latitude: f.latitude, longitude: f.longitude},{latitude: this.state.player.latitude, longitude: this.state.player.longitude})<=150){
                  this.props.navigation.navigate('Game', { fish: f })
                  this.playBubbleSound();
                }}
              }>
            </MapView.Marker>);
          }
          )}
        </MapView>
        <TouchableOpacity
        style={styles.backPack}
        onPress={() => {this.setState({backPackOpen: !this.state.backPackOpen})}}>
          <Image
              source={require('../assets/sprites/lidl-bag.png')}
              style={{width: 80, height: 80}}
            />
        </TouchableOpacity>
        { this.state.backPackOpen
        ? <View style={styles.inventory}>
            <Text style={styles.inventoryText}>
                Sinun kalasi
            </Text>
            <Text> </Text>
            <Text> </Text>
            {
              Object.keys(getCatchedFish()).length
              ? <View>
              {
                'Ahven' in getCatchedFish()
                ? <View style={styles.inventoryView}><Image
                    source={require('../assets/sprites/fishes/ahven/ahven-lepaa.png')}
                    style={{
                      resizeMode: 'stretch',
                      width: 100,
                      height: 50
                    }}
                  />
                  <Text style={styles.inventoryText2}>X {getCatchedFish().Ahven}</Text>
                  </View>
                : null
              }
              {
                'Siika' in getCatchedFish()
                ? <View style={styles.inventoryView}><Image
                    source={require('../assets/sprites/fishes/siika/siika-lepaa.png')}
                    style={{
                      resizeMode: 'stretch',
                      width: 100,
                      height: 50
                    }}
                  />
                  <Text style={styles.inventoryText2}>X {getCatchedFish().Siika}</Text>
                  </View>
                : null
              }
              {
                'Bulbfish' in getCatchedFish()
                ? <View style={styles.inventoryView}><Image
                    source={require('../assets/sprites/fishes/bulbfish/bulbfish-1.png')}
                    style={{
                      resizeMode: 'stretch',
                      width: 50,
                      height: 50
                    }}
                  />
                  <Text style={styles.inventoryText2}>X {getCatchedFish().Bulbfish}</Text>
                  </View>
                : null
              }
              </View>
              : <View><Text style={styles.inventoryText2}>Sinulla ei ole kaloja</Text></View>
            }
        </View>
        : null }
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
  backPack: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  inventory: {
    position: 'absolute',
    top: 100,
    left: 0,
    backgroundColor: '#fff',
    width: 500,
    height: 400,
  },
  inventoryText: {
    paddingTop: 30,
    paddingLeft: 80,
    fontFamily: "pokemon",
    fontSize: 22,
  },
  inventoryText2: {
    paddingTop: 10,
    paddingLeft: 5,
    fontFamily: "pokemon",
    fontSize: 15,
  },
  inventoryView: {
    paddingLeft: 30,
    paddingTop: 30
  }
});
