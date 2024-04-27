import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import Instructions from "../screens/Instructions";
import Questions from "../screens/Questions";
import Score from "../screens/Score";
import Lessons from "../screens/Lessons";
import Splash from "../screens/Splash";
import Summary from "../screens/Summary";
import Settings from "../screens/Settings";

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Splash" component={Splash} />
      <HomeStack.Screen name="Instructions" component={Instructions} />
      <HomeStack.Screen name="Questions" component={Questions} />
      <HomeStack.Screen name="Score" component={Score} />
      <HomeStack.Screen name="Lesson" component={Lessons} />
      <HomeStack.Screen name="Summary" component={Summary} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === "Settings") {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
