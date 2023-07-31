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
import { ref, get,getDatabase,child } from "firebase/database";
import { createContext, useContext } from 'react';


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

// Get a list of cities from your database
async function getUsers(db) {
  const usersRef = ref(db, 'users');
  const userSnapshot = await get(child(usersRef, '/'));
  const userList = [];

  if (userSnapshot.exists()) {
    const userData = userSnapshot.val();
    for (const key in userData) {
      userList.push(userData[key]);
    }
  }
  console.log(userList)
  return userList;
}

export const AppContext = createContext();

export default function App() {

  getUsers(db).then((userList) => {
    // console.log(userList)
  })
  return (
    <AppContext.Provider value={{app, db}}>
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
