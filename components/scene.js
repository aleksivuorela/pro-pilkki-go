import React from 'react';
import {StyleSheet, Button, View, Text, Image, Animated} from 'react-native';
import backpack from '../components/backpack';

export default class Scene extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/bg.jpg')} style={styles.backgroundImage} />
        <Animated.Image
          source={require('../assets/sprites/kela.png')}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        />
        {backpack.catchedFish.map((f, index) =>
          <Image
            source={f.image}
            style={{position: 'absolute', top: 0, right: 0}}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
});
