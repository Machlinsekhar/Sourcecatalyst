import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
    ScrollView,
    Animated,
    Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';

export default function Program() {
    const navigation = useNavigation();
    const [isTabOpen, setIsTabOpen] = useState(false);
    const slideAnimation = useState(new Animated.Value(0))[0];

    const toggleTab = () => {
        const toValue = isTabOpen ? 0 : 1;
        const animationDuration = 300;

        Animated.timing(slideAnimation, {
            toValue,
            duration: animationDuration,
            useNativeDriver: false,
        }).start();

        setIsTabOpen(!isTabOpen);
    };

    const tabHeight = slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200], // Adjust the desired maximum height
    });
    function onSubmit() {
        navigation.navigate('Home');
    }

    function handlePressDoc(){
        navigation.navigate('Documents');
    }

    function handlePressVid(){
        navigation.navigate('Videos');
    }

    function handlePressSubmit(){
        navigation.navigate('Submissions');
    }
    const handleSearch = (text) => {
        // Handle search functionality here

    };

    const separate = () => {
        return <View style={styles.separate} />;
    };

    return (
        <SafeAreaView style={styles.sectionContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onSubmit}>
                    <Image source={require('../assets/arrow.png')} style={{ marginTop: 5 }} />
                </TouchableOpacity >
                <Text style={styles.subhead}>PROGRAM</Text>
            </View>
            <View style={styles.days}>
                <Text style={styles.day}>Day 22</Text>
                <Text style={styles.taskno}>TASK III</Text>
            </View>

            <ProgressBar style={styles.progress} progress={0.5} color="#449237" />

            <View style={styles.task}>
                <Text style={styles.day}>Task Title</Text>
                <TouchableOpacity onPress={toggleTab}>
                    <Image style={styles.down} source={require('../assets/ellipse.png')} />
                </TouchableOpacity >
            </View>
            <Animated.View style={[styles.description, { maxHeight: tabHeight }]}>
                <Text style={styles.destext}>A task detail typically includes a brief description or summary of the task at hand, along with relevant info. </Text>
            </Animated.View>
            <View style={styles.button}>
                <View style={{ paddingHorizontal: 10 }}>
                <Button style={styles.doc} onPress={handlePressDoc} title='Documents' color={'#AA4EC3'} /></View>
                <Button style={styles.vid} onPress={handlePressVid} title='Videos' />
            </View>

            <View style={styles.submissions}>
                <Text style={styles.head}>SUBMISSIONS</Text>

                <View style={styles.tasksub}>
                    <Text style={styles.taskno}>Task II</Text>
                    <View style={styles.subContainer}>
                        <Text style={styles.sub}>SUBMITTED</Text>
                    </View>
                </View>

                <View style={styles.tasksub}>
                    <Text style={styles.taskno}>Task I</Text>
                    <View style={styles.subContainer}>
                        <Text style={styles.sub}>SUBMITTED</Text>
                    </View>
                </View>
               
            </View>
            <View style={styles.button}>
                    <Button title='READY TO SUBMIT?' color={'#EAA236'} onPress={handlePressSubmit} />
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    sectionContainer: {
        flex: 1,
        backgroundColor: '#F2F1F7',
        padding: 20,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: 10,
    },
    head: {
        fontWeight: '900',
        color: '#525252',
        fontSize: 17,
        padding: 10,
        marginTop: 10
      },
    subhead: {
        fontWeight: "900",
        color: "#525252",
        fontSize: 19,
        paddingHorizontal: 20,
    },
    days: {
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
        marginVertical: 20,
        marginRight: 215,
        padding: 10,
        borderRadius: 10,
    },
    day: {
        fontWeight: "400",
        fontSize: 19,
    },
    taskno: {
        padding: 6,
    },
    progress: {
        height: 15,
        width: '100%',
        marginRight: 15,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
    },
    task: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tasksub: {
        backgroundColor: '#FFFFFF',
        flex: 0.12,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row'
    },
    description: {
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    destext: {
        fontSize: 19,
    },
    down: {
        margin: 5,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
      },
    doc: {
        borderRadius: 10,
        marginRight: 5,
    },
    vid: {
        borderRadius: 10,
    },
    submissions: {
        flex: 19,
    },
    
    subContainer: {
        marginLeft: 'auto',
    },
    sub: {
        backgroundColor: '#059B2F',
        borderRadius: 20,
        color: '#FFFFFF',
        paddingHorizontal: 15,
        fontWeight: "500",
        fontSize: 12,
        paddingVertical: 5,
    },
    


});