import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

     
        <Stack.Screen
        name="Splash"
          component={Splash}
          options={{headerShown: false,}}/>

        <Stack.Screen
        name="Login"
          component={Login}
          options={{headerShown: false}}/>
        
        <Stack.Screen
        name="Complete Profile"
          component={Profile}
          options={{headerShadowVisible: false,}}
          />

<Stack.Screen
        name="Home"
          component={Home}
          options={{headerShown: false,}}
          />

        </Stack.Navigator>
    </NavigationContainer>
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
