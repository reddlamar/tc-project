import firestore from '@react-native-firebase/firestore';

export const addUser = async (
  firstName: string,
  lastName: string,
  email: string,
) => {
  try {
    await firestore().collection('Users').add({
      firstName,
      lastName,
      email,
    });
    console.log('User added!');
  } catch (error) {
    console.log('Add User Error:', error);
  }
};
