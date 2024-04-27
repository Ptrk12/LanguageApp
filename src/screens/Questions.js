import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { reactQuestionsLessons } from "../config/question";
import * as Progress from "react-native-progress";
import tw from "twrnc";

const Questions = ({ navigation, route }) => {
  const { lessonNumber } = route.params;
  const lesson = reactQuestionsLessons[lessonNumber];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizProgress, setQuizProgress] = useState(lesson.length);

  const progress = (currentQuestionIndex + 1) / quizProgress;

  const handleNext = () => {
    if (currentQuestionIndex === lesson.length - 1) {
      navigation.navigate("Score", { score: score, lessonNumber: lessonNumber });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const handleOptionPress = (pressedOption) => {
    const isAnswerCorrect = lesson[currentQuestionIndex].correctAnswer === pressedOption;
    setIsCorrect(isAnswerCorrect);
    setSelectedOption(pressedOption);

    console.log('Option Pressed:', pressedOption, 'Correct?', isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 10);
    }
  };

  const getButtonStyle = (option) => {
    return {
      borderWidth: 2,
      padding: 16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 8,
      borderColor: 'purple',
      backgroundColor: selectedOption === option
        ? (isCorrect ? 'green' : 'red')
        : 'transparent'
    };
  };

  return (
    <View style={{ marginTop: 24, padding: 16 }}>
      <ScrollView>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={20}
          color={"rgb(168 85 247)"}
        />
      </View>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        {lesson[currentQuestionIndex].question}
      </Text>
      {lesson[currentQuestionIndex].options.map((option, index) => (
        <Pressable
          key={option}
          style={getButtonStyle(option)}
          onPress={() => handleOptionPress(option)}
          disabled={selectedOption !== null}
        >
          <Text style={{ fontSize: 18 }}>{option}</Text>
        </Pressable>
      ))}
      <Pressable
        style={{ backgroundColor: 'purple', padding: 16, borderRadius: 8, marginTop: 24 }}
        onPress={handleNext}
        disabled={selectedOption === null}  
      >
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>
          {currentQuestionIndex === lesson.length - 1 ? "Finish" : "Next"}
        </Text>
      </Pressable>
      </ScrollView>
    </View>
  );
};

export default Questions;
