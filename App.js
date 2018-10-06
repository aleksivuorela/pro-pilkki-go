import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Font } from 'expo';

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'pokemon': require('./assets/fonts/pokemon.ttf'),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
