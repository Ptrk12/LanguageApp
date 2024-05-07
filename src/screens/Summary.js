import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Summary = () => {
  const [lessons, setLessons] = useState([]);

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const lessonKeys = keys.filter(key => key.startsWith('lesson'));
      const results = await AsyncStorage.multiGet(lessonKeys);

      const lessons = results.map(req => JSON.parse(req[1]));
      setLessons(lessons);
      console.log(lessons); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    importData();
  }, []);

  const getScoreColor = (score) => {
    if (score === 0 || score === 10) return '#ff6347'; 
    if (score === 20) return '#ffd700'; 
    if (score === 30 || score === 40) return '#32cd32'; 
    return '#000'; 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Podsumowanie wyników lekcji</Text>
      {lessons.map((lesson, index) => (
        <View key={index} style={styles.lessonContainer}>
          <Text style={[styles.lessonText, {color: getScoreColor(lesson.score)}]}>
            Lekcja nr {lesson.lessonNumber+1}: {lesson.score} punktów
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  lessonContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  lessonText: {
    fontSize: 18,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Summary;
