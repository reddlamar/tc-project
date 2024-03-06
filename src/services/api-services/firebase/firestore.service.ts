import firestore from '@react-native-firebase/firestore';
// import {createEmployeeID} from '../../../utils/index.util';

export const addUser = async (
  firstName: string,
  lastName: string,
  email: string,
  image: string,
  address: object,
  phone: string,
) => {
  try {
    await firestore().collection('Users').add({
      firstName,
      lastName,
      email,
      phone,
      image,
      address,
    });

    // console.log('User added!');
  } catch (error) {
    console.log('Add User Error:', error);
  }
};

export const getUser = async (email: string) => {
  try {
    const userData = await firestore()
      .collection('Users')
      .where('email', '==', email)
      .get();

    if (userData.docs.length > 0) {
      return userData.docs[0].data();
    }

    const employeeData = await firestore()
      .collection('Employees')
      .where('email', '==', email)
      .get();

    if (employeeData) {
      return employeeData.docs[0].data();
    }
  } catch (error) {
    console.log('Get User Error:', error);
  }
};

export const addEmployee = async (
  firstName: string,
  lastName: string,
  phone: string,
  image: object,
  driverLicense: string,
  email: string,
  employeeType: string,
) => {
  try {
    // const employeeID: string = createEmployeeID(firstName, lastName);

    await firestore().collection('Employees').add({
      firstName,
      lastName,
      email,
      phone,
      driverLicense,
      image,
      employeeType,
    });

    // console.log('User added!');
  } catch (error) {
    console.log('Add Employee Error:', error);
  }
};

export const getProductsData = async () => {
  try {
    const productData = await firestore().collection('Products').get();
    console.log('product docs:', productData.docs);
    return productData.docs;
  } catch (error) {
    console.log('Get User Error:', error);
  }
};
