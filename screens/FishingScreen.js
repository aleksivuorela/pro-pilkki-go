import React from 'react';
import {Accelerometer, AR} from 'expo';
import {StyleSheet, Button, View, Text, Vibration} from 'react-native';
import ARScene from '../components/AR-scene';
import { Constants, DangerZone } from 'expo';
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
    let fishGot = false;

    if (acceleration > 2) this.setState({count: this.state.count + 1});
    if (acceleration < 2 && this.state.count !== 0) this.setState({count: 0});

    if (this.state.count == 3) {
      this.setState({movementDetected: true, fishGot: Boolean(Math.floor(Math.random() * 2))});
    }

  };

  render() {
    let fishGot = this.state.fishGot;

    return (
      <View style={styles.container}>
        <View style={styles.sensor}>
          <Text></Text>
          <Text></Text>
        </View>
        { !this.state.movementDetected
        ? <View>
          <Text>Kala kiinni!</Text>
          <Text>Nosta puhelinta napataksasi kalan!</Text>
        </View> : null }
        {
          this.state.movementDetected
          ? fishGot ? <Text>Sait kalan</Text> : <Text>Kala pääsi karkuun</Text>
          : null
        }
        { this.state.movementDetected ? <Button title="Takaisin kartalle"onPress={() => this.props.navigation.navigate('Map')}/> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  sensor: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 10
  },
});

const round = n => {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
};
