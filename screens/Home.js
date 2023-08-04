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
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';
import { ref, get, child, update } from "firebase/database";
import { useContext } from 'react';
import { AppContext } from '../App';
import { getSessionData, getUser, getUserList } from '../utils';

export default function Home() {

  const { db } = useContext(AppContext);
  const {user} = useContext(AppContext)
  
  useEffect(() => {

    const fetchImg = async () => {
        if (user && user.photo) {
          setImageSource(user.photo)
          // Now you can use the 'user.photo' in your component's state or UI
        } else {
          console.log('User not found or photo not available');
        }
    };

    fetchImg();

  }, [])

  const navigation = useNavigation();
  function onSubmit() {
    navigation.navigate('Program');
  }
  const handleSearch = (text) => {
    // Handle search functionality here

  };
  const [imageSource, setImageSource] = useState('..assets/user.png');
  const domains = [{ id: 'python', title: 'Python', image: require('../assets/python.png') },
  { id: 'web', title: 'Web', image: require('../assets/web.png') },
  { id: 'ia', title: 'Industrial\nAutomation', image: require('../assets/industrial-automation.png') },
  { id: 'iot', title: 'IOT', image: require('../assets/iot.png') }];
  

  const oneDomain = ({ item }) => (
    <TouchableOpacity
      onPress={ () => {
        
    Alert.alert(
      'Selected Course ' + item.title, // Title of the alert dialog
      'Are you sure you want to continue?', // Message of the alert dialog
      [
        { text: 'Confirm', onPress: async() => 
        
        {const today = new Date();
        const date = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const formattedDate = `${date}/${month}/${year}`;
        const courseId = item.id;
        const userRef = ref(db, `users/${user.id}/current`);
        update(userRef, {
          courseId: courseId,
          startDate: formattedDate
    });
        navigation.navigate('Program')} } // Button with callback function
      ]
    );
      }}
    >


      <View style={styles.item}>
        <View>
          <Image source={item.image} style={styles.img} />
        </View>
        <Text style={styles.title}>{item.title} </Text>
      </View>
    </TouchableOpacity>

  )

  headerComponent = () => {
    return <Text style={styles.head}>DOMAINS</Text>
  }

  seperate = () => {
    return <View style={styles.seperate} />
  }
  const KeyExtractor = (item) => item.id.toString();

  const handlePress = ({ item }) => {
    // Handle onPress action here, for example, navigate to a new screen
    console.log(`Pressed: ${item.id}`);
  };
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={{ flexDirection: 'row' }}>
        <SearchBar
          placeholder="search here"
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          onChangeText={handleSearch}
        />

        <View style={styles.profileContainer}>
          <Image source={{ uri: imageSource }} style={styles.profileImage} />
        </View>
      </View>
      <View style={styles.program}>
        <Text style={styles.head}>PROGRAM</Text>
        <View style={styles.upskillprogram}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.subhead}>Upskill Program</Text>
            <Text style={styles.days}>15/30 days</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <ProgressBar style={styles.progress} progress={0.5} color="#449237" />
            <TouchableOpacity onPress={onSubmit}>
              <Image source={require('../assets/subtract.png')} />
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <FlatList
        style={styles.list}
        ListHeaderComponent={headerComponent}
        numColumns={2}
        columnWrapperStyle={{ flexWrap: 'wrap' }}
        data={domains}
        keyExtractor={KeyExtractor}
        ItemSeparatorComponent={seperate}
        renderItem={oneDomain}
      />

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
  },
  profileContainer: {
    margin: 8,
    marginTop: 40
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
    paddingVertical: 4.5
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
    fontWeight: "900",
    color: "#525252",
    fontSize: 17,
    padding: 10,
  },
  subhead: {
    fontWeight: "900",
    color: "#525252",
    fontSize: 19,
    paddingRight: 6,
    paddingHorizontal: 10,
  },
  days: {
    paddingTop: 6,
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
    fontWeight: "500",
  },
  progress: {
    height: 15,
    width: 280,
    margin: 10,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },

});