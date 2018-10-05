import React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import ExpoTHREE from 'expo-three';

export default class Scene extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
