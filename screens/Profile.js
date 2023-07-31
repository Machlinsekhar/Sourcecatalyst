import React, {useState, useMemo} from 'react';
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
import { ref, get,child } from "firebase/database";
import { useContext } from 'react';
import { AppContext } from '../App';


  export default function Profile () {
    const navigation = useNavigation();
    const {db} = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const options = useMemo(() => countryList().getData(), []);
    // const userInfo = GoogleSignin.signIn();
    
      // const usersRef = ref(db, 'users');
      // const userSnapshot = get(child(usersRef, 'userInfo._j.user.photo'));
      // const userList = [];
    
      // if (userSnapshot.exists()) {
      //   const userData = userSnapshot.val();
      // }
    
    
    function handleUsernameChange(username) {
        setUsername(username);
      }
    
      function handlePhoneChange(phone) {
        setPhone(phone);
      }

      function handleCountryChange(country) {
        setCountry(country);
      }
    return (
      <SafeAreaView style={styles.sectionContainer}>
        
        <Image style={styles.inputimg} source={require('../assets/web.png')}/>
         <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="name?"
            onChangeText={handleUsernameChange}
          />
          
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="contact number"
            onChangeText={handlePhoneChange}
          />

            <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="country"
            onChangeText={handleCountryChange}
          />

<TouchableOpacity onPress={() => {
              navigation.navigate('TabNavigation');
            }} style={styles.button}>
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
            alignItems:'center',
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
        inputimg:{
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
            paddingVertical:10
          }
        });