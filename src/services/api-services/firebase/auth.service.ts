import auth from '@react-native-firebase/auth';

export const onAuthStateModified = (onAuthStateChanged: any): any => {
  return auth().onAuthStateChanged(onAuthStateChanged);
};

export const signInWithEmailPassword = async (
  email: string,
  password: string,
) => {
  try {
    const user = await auth().signInWithEmailAndPassword(email, password);
    return user;
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      console.log('That password is invalid!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error: any) {
    console.log('Sign out error:', error.code);
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    // console.log('User account created & signed in!');
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      // console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      // console.log('That email address is invalid!');
    }

    console.error(error);
  }
};
