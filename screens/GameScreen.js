import React from 'react';
import {Accelerometer} from 'expo';
import {StyleSheet, Button, View, Text, Vibration} from 'react-native';

export default class GameScreen extends React.Component {
  state = {
    accelerometerData: {
      x: 0,
      y: 0,
      z: 0
    },
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.registerMove(accelerometerData);
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  registerMove = accelerometerData => {
    let { x, y, z } = accelerometerData;
    console.log(y); // Current pos
    console.log(this.state.accelerometerData.y); // Previous pos

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
