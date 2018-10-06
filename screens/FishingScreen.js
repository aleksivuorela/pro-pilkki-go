import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Vibration,
  Alert,
  Image,
  Animated
} from "react-native";
import { Constants, DangerZone, platform } from "expo";
import Scene from "../components/scene";

const { DeviceMotion } = DangerZone;

export default class GameScreen extends React.Component {
  state = {
    count: 0,
    fishGot: false,
    movementDetected: false,
    pullAnimationFish: new Animated.Value(-350),
    pullAnimationRod: new Animated.Value(-40)
  };

  componentDidMount() {
    this.toggleSubscription();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toggleSubscription = () => {
    if (this.subscription) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  };

  subscribe = () => {
    this.subscription = DeviceMotion.addListener(motionData => {
      this.registerMove(motionData.acceleration.z);
    });
  };

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  };

  registerMove = acceleration => {
    if (!this.state.movementDetected) {
      if (acceleration > 1) this.setState({ count: this.state.count + 1 });
      if (acceleration < 1 && this.state.count !== 0)
        this.setState({ count: 0 });

      if (this.state.count == 4) {
        const fishGot = Boolean(Math.floor(Math.random() * 2));
        const fish = this.props.navigation.getParam("fish").type;
        const subtext = fishGot
          ? fish + " - paino: " + this.getRandomWeight(fish)
          : "";

        this.setState({ movementDetected: true, fishGot });
        const alertText = fishGot ? "Sait kalan!" : "Kala pääsi karkuun!";
        Vibration.vibrate(200);
        if (fishGot) {
          this.playVictorySound();
          Animated.timing(this.state.pullAnimationFish, {
            toValue: 200,
            duration: 1000
          }).start();
          Animated.timing(this.state.pullAnimationRod, {
            toValue: 350,
            duration: 1000
          }).start();
        } else {
          this.playDefeatSound();
        }
        setTimeout(() => {
          Alert.alert(alertText, subtext, [
            {
              text: "Takaisin kartalle",
              onPress: () => this.props.navigation.navigate("Map")
            }
          ]);
        }, fishGot ? 2000 : 0);
      }

      if (!this.state.movementDetected) {
        Vibration.vibrate();
      }
    }
  };

  playVictorySound = async () => {
    const soundObject = new Expo.Audio.Sound();
    const fishType = this.props.navigation.getParam("fish").type;
    try {
      if (fishType === "Siika") {
        await soundObject.loadAsync(
          require("../assets/audio/kahenkilonsiika.m4a")
        );
        await soundObject.playAsync();
      } else {
        await soundObject.loadAsync(require("../assets/audio/motko.m4a"));
        await soundObject.playAsync();
      }
    } catch (error) {}
  };

  playDefeatSound = async () => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require("../assets/audio/eivittu.m4a"));
      await soundObject.playAsync();
    } catch (error) {}
  };

  getRandomWeight = fishType => {
    if (fishType === "Siika") return "2 kg";
    else if (fishType === "Bulbfish") return Math.floor(Math.random() * 10) + 2 + " kg";
    return Math.floor(Math.random() * 500) + 100 + " grammaa";
  };

  render() {
    const fish = this.props.navigation.getParam("fish");

    return (
      <View style={styles.container}>
        {!this.state.movementDetected ? (
          <View style={styles.textContainer}>
            <Text style={styles.infoText}>Kala kiinni!</Text>
            <Text style={styles.infoText}>
              Nosta puhelinta napataksasi kalan!
            </Text>
          </View>
        ) : null}
        {this.state.fishGot ? (
          <Animated.Image
            source={this.props.navigation.getParam("fish").loop}
            style={{
              position: "absolute",
              zIndex: 20,
              right: 220,
              bottom: this.state.pullAnimationFish
            }}
          />
        ) : null}
        <Scene fishReady={true} animateRod={this.state.pullAnimationRod} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 20
  },
  infoText: {
    fontSize: 22,
    fontFamily: "pokemon"
  },
  victoryScreen: {
    flex: 1,
    alignItems: "center"
  }
});
