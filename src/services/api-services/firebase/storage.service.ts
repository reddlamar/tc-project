import storage from '@react-native-firebase/storage';
// import {utils} from '@react-native-firebase/app';

export const listFilesAndDirectories = (reference: any, pageToken?: any) => {
  return reference.list({pageToken}).then((result: any) => {
    if (result.nextPageToken) {
      return listFilesAndDirectories(reference, result.nextPageToken);
    }

    return Promise.resolve();
  });
};

export const saveFile = async (fileName: string) => {
  const reference = storage().ref(`/images/${fileName}`);
  try {
    // path to existing file on filesystem
    const pathToFile = `${fileName}`;

    // uploads file
    await reference.putString(pathToFile);
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getFile = async (filePath: string) => {
  const reference = storage().ref(filePath);
  try {
    const d = await reference.getDownloadURL();
    return d;
  } catch (error) {
    return console.log('error:', error);
  }
};
