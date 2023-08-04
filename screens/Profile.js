import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { ref, get, child, update } from "firebase/database";
import { useContext } from 'react';
import { AppContext } from '../App';
import { getSessionData, getUser } from '../utils';

export default function Profile() {
  const { db, user } = useContext(AppContext);

  useEffect(() => {
    console.log('user with id is ',user)
    if (user?.name && user?.phone) {
      navigation.navigate('TabNavigation')
    }
  }, [user])

  useEffect(() => {
    setImageSource(user?.photo)
  }, [user])

  const navigation = useNavigation();

  const [username, setUsername] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [imageSource, setImageSource] = useState('..assets/user.png');


  function handleUsernameChange(username) {
    setUsername(username);
  }

  function handlePhoneChange(phone) {
    setPhone(phone);
  }
  

  const onSubmit = async () => {
    try {
      // Update the user object with the new name and phone
      const userRef = ref(db, `users/${user.id}`);
      update(userRef, {
        name: username,
        phone: phone,
      });

      // Navigate to the next screen (TabNavigation) after the update
      navigation.navigate('TabNavigation');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }
 

  return (
    <SafeAreaView style={styles.sectionContainer}>

      <Image style={styles.inputimg} source={{ uri: imageSource }} />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="name?"
          value={username}
          onChangeText={handleUsernameChange}
        />

        <TextInput
          style={styles.input}
          value={phone}
          placeholder="contact number"
          onChangeText={handlePhoneChange}
        />


        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text  >CONTINUE</Text>

        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 30
  },
  form: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    width: 360,
    marginBottom: 17,
    fontSize: 17,
    paddingHorizontal: 20,
    height: 50,
  },
  inputimg: {
    // backgroundColor: '#F2F2F2',
    borderRadius: 90,
    width: 160,
    marginBottom: 25,
    // paddingHorizontal: 30,
    height: 150,
  },
  label: {
    color: '#0F2F5B',
    fontWeight: '600',
    fontSize: 20,
  },
  button: {

    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 90,
    paddingVertical: 10
  }
});