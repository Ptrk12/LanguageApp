import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, ScrollView, Animated } from 'react-native';
import { Repository } from '../repository/Repository';
import * as Progress from 'react-native-progress';

const Questions = ({ navigation, route }) => {
    const { lessonNumber } = route.params;
    const [lesson, setLesson] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [buttonScale, setButtonScale] = useState(new Animated.Value(1)); 
    console.log(lessonNumber)
    useEffect(() => {
        const fetchItems = async () => {
            const allItems = await Repository.getLessonById(lessonNumber.toString());
            setLesson(allItems.questions);
        };
        fetchItems();
    }, [lessonNumber]);
    
    const progress = (currentQuestionIndex + 1) / lesson.length;

    const handleOptionPress = (pressedOption) => {
        const isAnswerCorrect = lesson[currentQuestionIndex].correctAnswer === pressedOption;
        setIsCorrect(isAnswerCorrect);
        setSelectedOption(pressedOption);

        if (isAnswerCorrect) {
            setScore(prevScore => prevScore + 10);
        }

        // Trigger animation on selection
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start();
    };

    const handleNext = () => {
        if (currentQuestionIndex === lesson.length - 1) {
            navigation.navigate("Score", { score: score, lessonNumber: lessonNumber });
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        }
    };

    const getButtonStyle = (option) => ({
        borderWidth: 2,
        padding: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
        borderColor: 'purple',
        backgroundColor: selectedOption === option ? (isCorrect ? 'green' : 'red') : 'transparent',
        transform: [{ scale: selectedOption === option ? buttonScale : 1 }]
    });

    if (lesson.length === 0) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ marginTop: 24, padding: 16, flex: 1 }}>
            <ScrollView>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Progress.Bar
                        progress={progress}
                        width={null}
                        height={20}
                        color={"rgb(168 85 247)"}
                        borderWidth={2}
                        borderColor="#ccc"
                        useNativeDriver={true}
                        style={{ flex: 1, marginHorizontal: 10 }} 
                    />
                </View>
                <Text style={{ fontSize: 24, marginBottom: 16 }}>
                    {lesson[currentQuestionIndex].question}
                </Text>
                {lesson[currentQuestionIndex].options.map((option) => (
                    <Pressable
                        key={option}
                        onPress={() => handleOptionPress(option)}
                        disabled={selectedOption !== null}
                    >
                        <Animated.View style={getButtonStyle(option)}>
                            <Text style={{ fontSize: 18 }}>{option}</Text>
                        </Animated.View>
                    </Pressable>
                ))}
                <Pressable
                    style={{ backgroundColor: 'purple', padding: 16, borderRadius: 8, marginTop: 24 }}
                    onPress={handleNext}
                    disabled={selectedOption === null}
                >
                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>
                        {currentQuestionIndex === lesson.length - 1 ? "Finish" : "Next"}
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

export default Questions;
