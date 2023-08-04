import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Program from './screens/Program';
import Videos from './screens/Videos';
import Documents from './screens/Documents';
import TabNavigation from './screens/TabNavigation';
import Submissions from './screens/Submission';

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { ref, get, getDatabase, child } from "firebase/database";
import { createContext, useContext, useEffect } from 'react';
import { getSessionData, getUser } from './utils';
import { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const firebaseConfig = {
  apiKey: "AIzaSyBdWin1i9Z40vlNR5Ox1aWktQ4TMbfVCWo",
  authDomain: "sourcecatalyst-c3bc6.firebaseapp.com",
  databaseURL: "https://sourcecatalyst-c3bc6-default-rtdb.firebaseio.com/",
  projectId: "sourcecatalyst-c3bc6",
  storageBucket: "sourcecatalyst-c3bc6.appspot.com",
  messagingSenderId: "486349858970",
  appId: "1:486349858970:web:4e84b4f835faf2f4675723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export const AppContext = createContext();

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const loginSilently = async () => {
      const userInfo = await GoogleSignin.signInSilently();
      return userInfo;
    }

    const fetchUser = async (userId) => {
      // Find the user with the matching userId
      const user = await getUser(db, userId);
      if (!user) {
        console.error('User not found');
        return;
      }
      setUser(() => ({
        ...user,
        id: userId
      }));
    }
    loginSilently().then((userInfo) => {
      fetchUser(userInfo.user.id);
    }).catch((error) => {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.error("User must sign in")
      } else {
        console.error(error)
      }
    })
  }, [])
  return (
    <AppContext.Provider value={{ app, db, user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false, }} />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Complete Profile"
            component={Profile}
            options={{ headerShadowVisible: false, }}
          />

          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{ headerShown: false, }}
          />

          <Stack.Screen
            name="Program"
            component={Program}
            options={{ headerShown: false, }}
          />

          <Stack.Screen
            name="Submissions"
            component={Submissions}
            options={{ headerShown: false, }}
          />

          <Stack.Screen
            name="Videos"
            component={Videos}
            options={{ headerShown: false, }}
          />

          <Stack.Screen
            name="Documents"
            component={Documents}
            options={{ headerShown: false, }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
