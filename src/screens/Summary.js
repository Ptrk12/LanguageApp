import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
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

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Summary</Text>
      {lessons.map((lesson, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>Lesson {lesson.lessonNumber + 1}: {lesson.score} points</Text>
        </View>
      ))}
    </View>
  );
}

export default Summary;
