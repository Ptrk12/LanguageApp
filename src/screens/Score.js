import { StyleSheet, Text, View, Image, Pressable, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const Score = ({ navigation }) => {
  const route = useRoute();
  const { lessonNumber, score } = route.params; 

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handleSubmit = async () => { 
    const lessonSummary = {
      lessonNumber: lessonNumber,
      score: score
    };
    await AsyncStorage.setItem(`lesson${lessonNumber}`, JSON.stringify(lessonSummary));
    console.log(lessonSummary);
    navigation.navigate("Lesson");
  };

  return (
    <View style={tw`flex-1 items-center`}>
      <Animated.Image
        source={require("../../assets/images/score.jpg")}
        style={[
          tw.style(tw`h-3/6`, { aspectRatio: 1 }),
          { opacity: fadeAnim }
        ]}
      />
      <Animated.Text style={[
        tw`text-2xl text-center my-4`,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}>
        Gratulacje!! Zdobyłeś {score} punktów.
      </Animated.Text>
      <Pressable 
        style={tw`bg-purple-500 p-2 rounded-md mt-4`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white font-medium`}>Spróbuj ponownie</Text>
      </Pressable>
    </View>
  );
};

export default Score;
