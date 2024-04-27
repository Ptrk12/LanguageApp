import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

const Instructions = ({ navigation, route }) => {
  const { lessonNumber } = route.params;

  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/images/splash.jpg")}
        style={tw.style(tw`h-3/6 `, { aspectRatio: 1 })}
      />
      <Text style={tw`text-2xl text-center mb-10`}>Instrukcja</Text>

      <View style={tw`bg-purple-500 p-2 rounded h-30 justify-center`}>
        <Text style={tw`text-white text-lg`}>
          W każdym pytaniu są 4 opcje do wyboru
        </Text>
        <Text style={tw`text-white text-lg`}>
          Po każdym pytaniu progres zostanie zaaktualizowany
        </Text>
        <Text style={tw`text-white text-lg`}>Wynik wyświetli się na końcu</Text>
      </View>

      <Pressable
        style={tw`bg-purple-500 mt-10 px-6 py-1 rounded`}
        onPress={() => navigation.navigate('Questions', { lessonNumber: lessonNumber })}
      >
        <Text style={tw`text-white text-lg`}>Start</Text>
      </Pressable>
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({});
