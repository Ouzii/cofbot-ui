import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [summoned, setSummoned] = useState(false)

  return (
    <View style={styles.container}>
      {summoned ?
      <Button title="Cancel" color="red" onPress={() => setSummoned(!summoned)}></Button>
      :
      <Button title="Summon" onPress={() => setSummoned(!summoned)}></Button>
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
