import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import AppNavigator from './src/navigation/AppNavigator';
import { SettingsProvider } from './src/SettingsContext';

export default function App() {

  
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  }).then(() => {
    console.log('Notification channel set');
  }).catch(error => {
    console.error("Failed to set notification channel", error);
  });
  

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  
  Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return (
    <SettingsProvider>
    <View style={styles.container}>
       <StatusBar style="auto" />
      <AppNavigator />
    </View>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
