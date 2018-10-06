import React from 'react';
import {StyleSheet, Button, View, Text, Vibration, Alert, Image} from 'react-native';
import { Constants, DangerZone, platform } from 'expo';
import Scene from '../components/scene';
import backpack from '../components/backpack';

const { DeviceMotion } = DangerZone;

export default class GameScreen extends React.Component {
  state = {
    count: 0,
    fishGot: false,
    movementDetected: false,
  }

  componentDidMount() {
    this.toggleSubscription()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  toggleSubscription = () => {
    if (this.subscription) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  }

  subscribe = () => {
    this.subscription = DeviceMotion.addListener(motionData => {
      this.registerMove(motionData.acceleration.z);
    });
  }

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  }

  registerMove = acceleration => {
    if (!this.state.movementDetected) {
      if (acceleration > 1) this.setState({count: this.state.count + 1});
      if (acceleration < 1 && this.state.count !== 0) this.setState({count: 0});

      if (this.state.count == 4) {
        const fishGot = Boolean(Math.floor(Math.random() * 2));
        this.setState({movementDetected: true, fishGot});

        const fish = this.props.navigation.getParam('fish');
        const weight = this.getRandomWeight(fish.type);

        const alertText = fishGot ? 'Sait kalan!' : 'Kala pääsi karkuun!';
        const subText = fishGot ? (fish.type + ' / Paino: ' + weight) : '';

        Vibration.vibrate(200);
        if (fishGot) {
          this.playVictorySound();
          backpack.catchedFish.push(fish);
        } else {
          this.playDefeatSound();
        }
        Alert.alert(
          alertText,
          subText,
          [{text: 'Takaisin kartalle', onPress: () => this.props.navigation.navigate('Map')}]
        );
      }

      if (!this.state.movementDetected) {
        Vibration.vibrate();
      }
    }
  };

  playVictorySound = async () => {
    const soundObject = new Expo.Audio.Sound();
    const fishType = this.props.navigation.getParam('fish').type;
    try {
      if (fishType === 'Siika') {
        await soundObject.loadAsync(require('../assets/audio/kahenkilonsiika.m4a'));
        await soundObject.playAsync();
      } else {
        await soundObject.loadAsync(require('../assets/audio/motko.m4a'));
        await soundObject.playAsync();
      }
    } catch (error) {
    }
  };

  playDefeatSound = async () => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/audio/eivittu.m4a'));
      await soundObject.playAsync();
    } catch (error) {
    }
  };

  getRandomWeight = fishType => {
    if (fishType === 'Siika') return '2 kg';
    return Math.floor(Math.random() * 500) + 100 + ' grammaa';
  }

  render() {
    const fish = this.props.navigation.getParam('fish');

    return (
      <View style={styles.container}>
        { !this.state.movementDetected
        ? <View>
          <Text style={styles.infoText}>Kala kiinni!</Text>
          <Text style={styles.infoText}>Nosta puhelinta napataksasi kalan!</Text>
        </View> : null }
        { this.state.fishGot
        ? <View style={styles.victoryScreen}>
            <Image source={fish.loop} style={styles.backgroundImage} />
          </View>
        : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoText: {
    fontSize: 30,
    fontFamily: 'pokemon'
  },
  victoryScreen: {
    flex: 1,
    alignItems: 'center'
  }
});
