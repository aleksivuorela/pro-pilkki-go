import React from 'react';
import {Constants} from 'expo';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class GameScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Pilkki peli tässä</Text>
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
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight
  },
});
