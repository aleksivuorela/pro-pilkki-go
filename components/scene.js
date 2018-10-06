import React from "react";
import { StyleSheet, Button, View, Text, Image, Animated } from "react-native";

export default class Scene extends React.Component {
  render() {
    const { fishReady, animateRod } = this.props;

    console.log(fishReady);
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/bg.jpg")}
          style={styles.backgroundImage}
        />
        <Animated.Image
          source={require("../assets/sprites/kela.png")}
          style={{
            position: "absolute",
            bottom: animateRod ? animateRod : -40,
            right: 20,
            transform: [{ rotate: fishReady ? "-40deg" : "0deg" }]
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  }
});
