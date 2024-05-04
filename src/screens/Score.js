import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import tw from "twrnc";
import { useSettings } from '../SettingsContext';  // Path to your SettingsContext


const Score = ({ navigation }) => {
  const route = useRoute();
  const { lessonNumber, score } = route.params;
  const { isNotificationsEnabled } = useSettings();  // Using context to get the notification setting
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run animation sequence
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Conditionally trigger a notification if enabled
    if (isNotificationsEnabled) {
      showNotification();
    }
  }, [isNotificationsEnabled]);

  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Congratulations!",
        body: `You scored ${score} points!`,
      },
      trigger: null, // This triggers the notification immediately
    });
  };

  const handleSubmit = async () => {
    const lessonSummary = {
      lessonNumber,
      score,
    };
    await AsyncStorage.setItem(`lesson${lessonNumber}`, JSON.stringify(lessonSummary));
    navigation.navigate("Lesson");
  };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Animated.Image
        source={require("../../assets/images/score.jpg")}
        style={[
          tw.style("h-3/6", { aspectRatio: 1 }),
          { opacity: fadeAnim },
        ]}
      />
      <Animated.Text style={[
        tw`text-2xl text-center my-4`,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}>
        Congratulations!! You scored {score} points.
      </Animated.Text>
      <Pressable
        style={tw`bg-purple-500 p-2 rounded-md mt-4`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-white font-medium`}>Try Again</Text>
      </Pressable>
    </View>
  );
};

export default Score;
