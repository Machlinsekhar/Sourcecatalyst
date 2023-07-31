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
import { CheckBox } from 'react-native-elements';
import { ProgressBar, TextInput } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

export default function Submissions() {
   const navigation = useNavigation();
  const [isTabOpen, setIsTabOpen] = useState(false);
  const slideAnimation = useState(new Animated.Value(0))[0];
  const handleRatingChange = (rating) => {
    // Handle the rating change event here
    console.log('Selected rating:', rating);
  };

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  
  const tabHeight = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust the desired maximum height
  });
  function onSubmit() {
    navigation.navigate('Program');
  }
  const handleSearch = (text) => {
    // Handle search functionality here
  };

  seperate = () => {
    return <View style={styles.seperate} />;
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.header}>
      <TouchableOpacity onPress={onSubmit}>
                    <Image source={require('../assets/arrow.png')} style={{ marginTop: 5 }} />
                </TouchableOpacity >
        <Text style={styles.subhead}>SUBMISSIONS</Text>
      </View>
      <View style={styles.checklist}>
        <Text style={styles.head}>CHECKLIST</Text>

        <View style={styles.tasksub}>
          <Text style={styles.taskno}>Task Outcome Achieved</Text>
          <View style={styles.container}>
          <CheckBox
        checked={checked1}
        onPress={() => setChecked1(!checked1)}
        // containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedColor="#449237" // Set the desired background color when checked
        size={20} // Set the size of the checkbox
        checkedIcon="square" // Use a square icon when checked
        uncheckedIcon="square" // Use a square icon when unchecked
      />
    </View>
        </View>

        <View style={styles.tasksub}>
          <Text style={styles.taskno}>Mentor Approval</Text>
          <View style={styles.container}>
          <CheckBox
        checked={checked2}
        onPress={() => setChecked2(!checked2)}
        // containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedColor="#449237" // Set the desired background color when checked
        size={20} // Set the size of the checkbox
        checkedIcon="square" // Use a square icon when checked
        uncheckedIcon="square" // Use a square icon when unchecked
      />
    </View>
        </View>

        <View style={styles.tasksub}>
          <Text style={styles.taskno}>Files Checked and Uploaded</Text>
          <View style={styles.container}>
          <CheckBox
        checked={checked3}
        onPress={() => setChecked3(!checked3)}
        // containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedColor="#449237" // Set the desired background color when checked
        size={20} // Set the size of the checkbox
        checkedIcon="square" // Use a square icon when checked
        uncheckedIcon="square" // Use a square icon when unchecked
      />
    </View>
        </View>
      </View>

      <View style={styles.github}>
        <Text style={styles.head}>GITHUB LINK</Text>
        <TextInput style={styles.input} placeholder="www.github.com/repo" />
        <Text style={styles.head}>RATE TASK</Text>
        <Rating
        style={{alignItems: 'flex-start'}}
          type="star"
          ratingCount={5}
          imageSize={30}
          fractions={0}
          tintColor='#F2F1F7'
          unfilledColor="#C9C9C9"
          onFinishRating={handleRatingChange}
        />
         
      </View>
      <View style={styles.button}>
        <Button title="SUBMIT" color={'#08A82B'} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#F2F1F7',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'column',
    paddingTop: 60,
  },
  profileContainer: {
    margin: 8,
    marginTop: 40,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 20,
  },
  searchBarContainer: {
    backgroundColor: '#F2F1F7',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    width: 300,
    paddingTop: 40,
  },
  searchInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 4.5,
  },
  searchInput: {
    color: 'black',
  },
  program: {
    paddingBottom: 20,
    backgroundColor: '#F2F1F7',
  },
  upskillprogram: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  seperate: {
    padding: 5,
    backgroundColor: '#F2F1F7',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    // paddingHorizontal: 10,
    flexWrap: 'wrap',
    // alignItems: 'flex-start'
  },
  head: {
    fontWeight: '900',
    color: '#525252',
    fontSize: 17,
    padding: 10,
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    flex: 0.06,
    // margin: 10,
    padding: 10,
  },
  subhead: {
    fontWeight: '900',
    color: '#525252',
    fontSize: 19,
    paddingRight: 6,
    paddingHorizontal: 20,
  },
  days: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
    marginRight: 215,
    padding: 10,
    borderRadius: 10,
  },
  day: {
    fontWeight: '600',
    fontSize: 19,
  },
  taskno: {
    padding: 13,
    fontWeight: '600',
    alignSelf: 'center'
  },
  item: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
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
    flex: 0.5,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  description: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  destext: {
    fontSize: 19,
  },
  down: {
    margin: 5,
    justifyContent: 'flex-end',
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
  sub: {
    backgroundColor: '#059B2F',
    borderRadius: 20,
    color: '#FFFFFF',
    paddingHorizontal: 15,
    fontWeight: '500',
    fontSize: 12,
    paddingVertical: 5,
  },
  tasksub: {
    backgroundColor: '#FFFFFF',
    flex: .5,
    
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    
  },
  checklist: {
    flex: 0.5,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  github: {
    flex:.8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end', // Align the checkbox to the right
  },
  checkboxContainer: {
    backgroundColor: '#EAEAEA', // Set the desired background color
    borderWidth: 0, // Optional: Remove the border
  },
  
});
