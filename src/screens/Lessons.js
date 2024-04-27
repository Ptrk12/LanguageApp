import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from "twrnc";
import {reactQuestionsLessons} from "../config/question"

const Lessons = ({ navigation }) => {
  const handlePressLesson = (lessonIndex) => {
    navigation.navigate('Instructions', { lessonNumber: lessonIndex });
  };

  const handlePressSummary=() =>{
    navigation.navigate('Summary');
  }

  return (
    <View style={tw`mt--50 flex-1 items-center justify-center`}>
      {reactQuestionsLessons.map((lesson, index) => (
        <Pressable 
          key={index} 
          onPress={() => handlePressLesson(index)} 
          style={tw`bg-purple-600 mt-8 px-9 py-3 rounded`}>
          <Text style={tw`text-white font-semibold`}>Zacznij lekcję {index + 1}</Text>
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
