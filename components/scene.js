import React from 'react';
import {StyleSheet, Button, View, Text, Image, Animated} from 'react-native';

export default class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yPos: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(nextProps) {
    const {accelerometerData} = nextProps;
    console.log(accelerometerData.y);

/*     Animated.timing(
      this.state.yPos,
      { toValue: new Animated.Value(-100) }
    ).start(); */
  }

  render() {
    const {accelerometerData} = this.props;

    return (
      <View style={styles.container}>
        <Image source={require('../assets/bg.jpg')} style={styles.backgroundImage} />
        <Animated.Image
          source={require('../assets/sprites/pokeball.png')}
          style={{
            transform: [
              { translateX: accelerometerData.x },
              { translateY: accelerometerData.y },
            ]
          }}
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  sprite: {
    position: 'absolute',
    bottom: 0,
    left: '40%'
  }
});
