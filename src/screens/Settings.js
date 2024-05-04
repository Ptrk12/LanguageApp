import * as React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSettings } from '../SettingsContext';
import { Picker } from '@react-native-picker/picker';

export default function Settings({ navigation }) {
    
    const [selectedOption, setSelectedOption] = React.useState("A1");
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const { isNotificationsEnabled, setIsNotificationsEnabled } = useSettings();
    

    return (
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate('Splash')} style={styles.header}>
                SETTINGS
            </Text>
            <Text style={styles.subHeader}>Choose Option:</Text>
            <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
                style={styles.picker}>
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(option => (
                    <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>
            <View style={styles.switchContainer}>
                <Text>Dark Mode:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={() => setIsDarkMode(previousState => !previousState)}
                    value={isDarkMode}
                />
            </View>
            <View style={styles.switchContainer}>
                <Text>Enable Notifications:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={setIsNotificationsEnabled}
                    value={isNotificationsEnabled}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        width: 200,
        height: 44,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '80%',
        justifyContent: 'space-between',
    },
});
