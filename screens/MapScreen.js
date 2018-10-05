import React from 'react';
import {MapView} from 'expo';
import {StyleSheet, Button, View, Text} from 'react-native';

export default class MapScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 62.240817,
            longitude: 25.759324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Button
          title="Aloita pilkkiminen"
          onPress={() => this.props.navigation.navigate('Game')}
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
});
