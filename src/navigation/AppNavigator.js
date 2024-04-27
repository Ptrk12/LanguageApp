import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Instructions from "../screens/Instructions";
import Questions from "../screens/Questions";
import Score from "../screens/Score";
import Lessons from "../screens/Lessons";
import Splash from "../screens/Splash";
import Summary from "../screens/Summary";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Instructions" component={Instructions} />
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="Score" component={Score} />
        <Stack.Screen name="Lesson" component={Lessons} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
