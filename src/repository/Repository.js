import AsyncStorage from "@react-native-async-storage/async-storage";
import {reactQuestionsLessons} from "../config/question"

export class Repository {
    static async getLessonById(lessonId) {
        const storageKey = 'reactQuestionsLessons';  
        if (lessonId === undefined) {
            console.log("Lesson ID is undefined.");
            return null;
        }

        try {
            const rawItems = await AsyncStorage.getItem(storageKey);
            if (!rawItems) {
                console.log("No lessons found in storage.");
                return null;
            }

            const lessons = JSON.parse(rawItems);
            if (!Array.isArray(lessons)) {
                console.log("Unexpected data format for lessons:", lessons);
                return null;
            }

            const lesson = lessons.find(item => item.id === parseInt(lessonId, 10));
            if (!lesson) {
                console.log("No lesson found for ID:", lessonId);
                return null;
            }
            return lesson;
        } catch (error) {
            console.error("Error retrieving or parsing item from AsyncStorage:", error);
            return null;
        }
    }

    static async getAllItems() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const list = [];
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                try {
                    const value = await AsyncStorage.getItem(key);
                    if (value !== null) {
                        const item = JSON.parse(value);
                        list.push(item);
                    }
                } catch (e) {
                    console.error(`Error parsing JSON from AsyncStorage at key '${key}':`, e);
                }
            }
            return list;
        } catch (error) {
            console.error("Error retrieving keys from AsyncStorage:", error);
            return [];
        }
    }

    static async InitData() {
        try {
            const storedData = await AsyncStorage.getItem('reactQuestionsLessons');
            if (!storedData) {
                const data = JSON.stringify(reactQuestionsLessons);
                await AsyncStorage.setItem('reactQuestionsLessons', data);
                console.log('Initial data set in AsyncStorage');
            } else {
                console.log('Data already initialized in AsyncStorage');
            }
        } catch (error) {
            console.error('AsyncStorage error:', error);
        }
    }
}
