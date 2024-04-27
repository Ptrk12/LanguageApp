import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

const Splash = ({ navigation }) => {
  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/images/wsei.png")}
        style={tw.style(tw`h-3/6 `, { aspectRatio: 1 })}
      />
      <Text style={tw`text-2xl text-center mb-10`}>Aplikacja do nauki języka angielskiego</Text>

      <View style={tw`bg-purple-500 p-2 rounded h-30 justify-center`}>
        <Text style={tw`text-white text-lg`}>
          AUTORZY:
        </Text>
        <Text style={tw`text-white text-lg`}>
          Patryk Bajak nr indeksu 13593
        </Text>
        <Text style={tw`text-white text-lg`}>Michał Pietrasz nr indeksu 696969</Text>
      </View>

      <Pressable
        style={tw`bg-purple-500 mt-10 px-6 py-1 rounded`}
        onPress={() => navigation.navigate("Lesson")}
      >
        <Text style={tw`text-white text-lg`}>Start</Text>
      </Pressable>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
