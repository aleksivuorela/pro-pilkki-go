import React from 'react';
import {Accelerometer, AR} from 'expo';
import {StyleSheet, Button, View, Text, Vibration} from 'react-native';
import ARScene from '../components/AR-scene';
import Scene from '../components/scene';

export default class GameScreen extends React.Component {
  state = {
    accelerometerData: {
      x: 0,
      y: 0,
      z: 0
    },
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.registerMove(accelerometerData);
    });
  }

  unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  registerMove = accelerometerData => {
    let { x, y, z } = accelerometerData;

    const diff = this.state.accelerometerData.y - y;
    if (diff > 0.3) {
    }

    // Register move based on Y difference
    // Vibrate after succesful move
    // Vibration.vibrate(1000);

    // Update previous pos
    this.setState({ accelerometerData });
  };

  render() {
    let { x, y, z } = this.state.accelerometerData;

    return (
      <View style={styles.container}>
        <View style={styles.sensor}>
          <Text>Accelerometer:</Text>
          <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
        </View>
        <Button
          title="Takaisin kartalle"
          onPress={() => this.props.navigation.navigate('Map')}
        />
        <Scene accelerometerData={this.state.accelerometerData} />
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
