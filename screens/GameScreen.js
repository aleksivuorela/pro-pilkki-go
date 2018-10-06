import React from "react";
import { Accelerometer, AR, DangerZone } from "expo";
import { StyleSheet, Button, View, Text, Vibration } from "react-native";
import ARScene from "../components/AR-scene";
import Scene from "../components/scene";

const { DeviceMotion } = DangerZone;

export default class GameScreen extends React.Component {
  state = {
    accelerometerData: {
      x: 0,
      y: 0,
      z: 0
    },
    accelerationData: {
      x: 0,
      y: 0,
      z: 0
    },
    requiredStrokes: 7,
    succesfulStrokes: 0,
    count: 0
  };

  componentDidMount() {
    this.subscribe();

    this.setState({
      requiredStrokes: Math.floor(Math.random() * 5 + 5)
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe = () => {
    /*
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.registerMove(accelerometerData);
    });
    Accelerometer.setUpdateInterval(100);
    */

    this._subscription = DeviceMotion.addListener(data => {
      this.registerMove(data.acceleration);
    });
  };

  unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  registerMove = motionData => {
    let { x, y, z } = motionData;

    if (z > 1.5 && z < 20) {
      this.setState(prevState => ({
        count: this.state.count + 1
      }));
    } else {
      this.setState(prevState => ({ count: 0 }));
    }

    if (this.state.count > 1) {
      Vibration.vibrate(50);
      this.setState({
        count: 0,
        succesfulStrokes: this.state.succesfulStrokes + 1
      });
    }

    if (this.state.succesfulStrokes === this.state.requiredStrokes) {
      this.unsubscribe();
      this.playAudio();
      this.props.navigation.navigate("FishingScreen", { fish: this.props.navigation.getParam('fish') });
    }

    // Update previous pos
    this.setState({ accelerationData: motionData });
  };

  playAudio = async () => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/audio/otasiikapois.m4a'));
      await soundObject.playAsync();
    } catch (error) {
    }
  };

  render() {
    let { x, y, z } = this.state.accelerationData;

    return (
      <View style={styles.container}>
        <Scene />
        <Text style={styles.infoText}>Pilki liikuttamalla puhelinta ylös alas</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'pokemon',
    padding: 20
  }
});
