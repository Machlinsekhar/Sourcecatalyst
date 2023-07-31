import React, { useEffect, useState, setState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { ref, set } from "firebase/database";
import { useContext } from 'react';
import { AppContext } from '../App';

GoogleSignin.configure();

export default function Login() {
  const navigation = useNavigation();
  const userInfo = GoogleSignin.signIn();
  const {db} = useContext(AppContext);

  const handleSignUp = async () => {
    console.log(userInfo)
    try {
      await GoogleSignin.hasPlayServices();
      set(ref(db, 'users/' + userInfo._j.user.id), {
        email: userInfo._j.user.email,
        name: userInfo._j.user.name,
        photo: userInfo._j.user.photo,
      });
      navigation.navigate('Complete Profile');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Cancelled")
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("In progress")
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services outdated")
        // play services not available or outdated
      } else {
        console.log("Pata nahi bhai")
        console.log(error)
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.sectionContainer}>
        <View style={styles.box}>
          
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Image
            style={styles.icon}
            source={require('../assets/google.png')}
          />
          <Text style={styles.butxt}>CONTINUE WITH GOOGLE</Text>

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#F2F1F7'
  },
  box: {
    flex: 12,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginTop: 40,
    marginBottom: 10
  },
  button: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  butxt: {
    fontWeight: "900",
    color: "#525252",
    fontSize: 17,
  },
  icon: {
    height: 20,
    width: 19,
    marginRight: 7
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
});