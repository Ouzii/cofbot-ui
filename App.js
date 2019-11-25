import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-material-ui'

export default function App() {
  const [summoned, setSummoned] = useState(false)

  return (
    <View style={styles.container}>
      {summoned ?
      <Button text={`ETA\n<1min\nCancel`} style={{container: {backgroundColor: '#1CC8FF', borderRadius: 100, width: 200, height: 200}, text: {textAlign: 'center'}}} onPress={() => setSummoned(!summoned)}></Button>
      :
      <Button text="Summon" style={{container: {backgroundColor: '#6CFF38', borderRadius: 100, width: 200, height: 200}}} onPress={() => setSummoned(!summoned)}></Button>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
