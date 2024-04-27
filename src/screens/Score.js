import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const Score = ({ navigation }) => {
  const route = useRoute();
  const { lessonNumber, score } = route.params; 

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
      <Image
        source={require("../../assets/images/score.jpg")}
        style={tw.style(tw`h-3/6`, { aspectRatio: 1 })}
      />
      <Text style={tw`text-2xl text-center my-4`}>Gratulacje!! Zdobyłeś {score} punktów.</Text>
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

const styles = StyleSheet.create({});
