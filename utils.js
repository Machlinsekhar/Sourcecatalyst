import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, get } from '@firebase/database';

export const getSessionData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Session data retrieved successfully:', value);
        return value;
      } 
    } catch (error) {
      console.log('Error retrieving session data:', error);
    }
  };

export async function getUser(db, userId) {
  const usersRef = ref(db, 'users/' + userId);
  const userSnapshot = await get(usersRef);
  const userList = [];

  if (userSnapshot.exists()) {
    const userData = userSnapshot.val();
    return userData;
  }
}

export async function getTask(db) {
  const courseRef = ref(db, 'course', 'python');
  const courseSnapshot = await get(courseRef);
  const courseList = [];

  if (courseSnapshot.exists()) {
    const courseData = courseSnapshot.val();
    console.log(userData)
    for (const key in userData) {
      userList.push({...userData[key], userId: key});
    }
  }

  return userList;
}
