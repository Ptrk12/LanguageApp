import * as React from 'react'
import {View,Text} from "react-native"

export default function Settings({navigation}){
    return(
        <View>
            <Text onPress={()=>navigation.navigate('Splash')}>
                SETTINGS
            </Text>
        </View>
    );
}