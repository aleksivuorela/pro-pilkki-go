import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  Animated,
  Dimensions
} from "react-native";
import backpack from "../components/backpack";

const windowWidth = Dimensions.get("window").width;

export default class Scene extends React.Component {
  render() {
    const { fishReady, animateRod } = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/bg.png")}
          style={styles.backgroundImage}
        />
        {/*fishReady && (
          <Image
            source={require("../assets/bg-lowerpart.png")}
            style={styles.lowerBackgroundImage}
          />
        )*/}
        <Animated.Image
          source={require("../assets/sprites/kela.png")}
          style={{
            position: "absolute",
            bottom: animateRod ? animateRod : -40,
            right: fishReady ? -50 : 0,
            zIndex: 30,
            transform: [{ rotate: fishReady ? "-40deg" : "-20deg" }]
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
    width: windowWidth
  }
});
