import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const players = [
  { id: '1', name: 'Matthew One', ranking: 1, points: 1000 },
  { id: '2', name: 'Jack Two', ranking: 2, points: 950 },
  { id: '3', name: 'Jessie Three', ranking: 3, points: 900 },
  { id: '4', name: 'Natalie Four', ranking: 4, points: 850 },
  { id: '5', name: 'Kevin Five', ranking: 5, points: 800 },
];
const App = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.ranking}>{item.ranking}</Text>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.points}>{item.points} points</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Ranking</Text>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '90%',
  },
  ranking: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    width: 50,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
  },
  points: {
    fontSize: 16,
    color: '#555',
  },
});

export default App;
