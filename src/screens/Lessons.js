import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from "twrnc";
import { reactQuestionsLessons } from "../config/question"
import { Repository } from '../repository/Repository';
import { useSettings } from '../SettingsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Lessons = ({ navigation }) => {

  const [languageLessons,setLessons] = useState([]);
  const { language } = useSettings();

  async function getLessons() {
    try {
      const lessons = await Repository.getAllItems();
      const languageLessons = lessons.flat().filter(item => item.language === language);
      return languageLessons;
    } catch (error) {
    }
  }

  getLessons().then(x=>{
    setLessons(x);
  }).catch(err =>{
    console.log(err);
  })


  const handlePressLesson = (lessonIndex) => {
    navigation.navigate('Instructions', { lessonNumber: lessonIndex });
  };

  const handlePressSummary = () => {
    navigation.navigate('Summary');
  }

  return (
    <View style={tw`mt--30 flex-1 items-center justify-center`}>
      {languageLessons.map((lesson) => (
        <Pressable
          key={lesson.id}
          onPress={() => handlePressLesson(lesson.id)}
          style={tw`bg-purple-600 mt-8 px-9 py-3 rounded`}>
          <Text style={tw`text-white font-semibold`}>Zacznij lekcję {lesson.language}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={handlePressSummary}
        style={tw`absolute bottom-4 right-4 bg-blue-500 px-6 py-2 rounded-full`}>
        <Text style={tw`text-white text-sm`}>Zobacz swoje wyniki lekcji</Text>
      </Pressable>
    </View>
  );
};

export default Lessons;
