import firestore, {firebase} from '@react-native-firebase/firestore';
import products from '../../../data/products.json';
import {message} from '../../../models/types.model';

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
  } catch (error) {
    console.log('Add User Error:', error);
  }
};

export const sendCustomerNotification = async (
  customerEmail: any,
  text: string,
  createdAt: Date,
  read: boolean,
) => {
  try {
    await firestore()
      .collection(`${customerEmail}-Notifications`)
      .add({text, createdAt, read});
  } catch (error) {
    console.log('Send Notification Error:', error);
  }
};

export const getCustomerNotifications = async (customerEmail: string) => {
  try {
    return (
      await firestore()
        .collection(`${customerEmail}-Notifications`)
        .orderBy('createdAt', 'desc')
        .get()
    ).docs.map(n => ({
      id: n.id,
      ...n.data(),
    }));
  } catch (error) {
    console.log('Get Notification Error:', error);
  }
};

export const getCustomerUnreadNotifications = async (customerEmail: string) => {
  try {
    return (
      await firestore()
        .collection(`${customerEmail}-Notifications`)
        .where('read', '==', false)
        .get()
    ).docs.map(n => ({
      id: n.id,
      ...n.data(),
    }));
  } catch (error) {
    console.log('Get Unread Notification Error:', error);
  }
};

export const updateNotificationReadStatus = async (
  customerEmail: string,
  read: string,
  notification: any,
) => {
  try {
    await firestore()
      .collection(`${customerEmail}-Notifications`)
      .doc(notification.id)
      .set({...notification, ['read']: read});
  } catch (error) {
    console.log('Get User Error:', error);
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
    await firestore().collection('Employees').add({
      firstName,
      lastName,
      email,
      phone,
      driverLicense,
      image,
      employeeType,
    });
  } catch (error) {
    console.log('Add Employee Error:', error);
  }
};

export const addProducts = () => {
  products.forEach(async p => {
    try {
      await firestore().collection('Products').add(p);
    } catch (error) {
      console.log('Add Products Error:', error);
    }
  });
};

export const getProductCollection = async () => {
  try {
    const productData = await firestore().collection('Products').get();
    return productData.docs;
  } catch (error) {
    console.log('Get User Error:', error);
  }
};

export const getProductsDataByCategory = async (category: string) => {
  try {
    const productData = await firestore()
      .collection('Products')
      .where('categories', 'array-contains', category)
      .get();

    return productData.docs.map(p => {
      const data = p.data();
      return {id: p.id, ...data};
    });
  } catch (error) {
    console.log('Get User Error:', error);
  }
};

export const addOrder = async (order: any) => {
  try {
    await firestore().collection('Orders').add(order);
    order.cart.forEach(async (ci: any) => {
      const quantity = ci.product.quantity - ci.quantity;
      await updateProductQuantity(ci.product.id, quantity, ci.product);
    });
  } catch (error) {
    console.log('Add Order Error:', error);
  }
};

export const updateProductQuantity = async (
  id: string,
  quantity: number,
  product: any,
) => {
  try {
    await firestore()
      .collection('Products')
      .doc(id)
      .set({...product, ['quantity']: quantity});
  } catch (error) {
    console.log('Get User Error:', error);
  }
};

export const getOrderHistoryCollection = async (email: string) => {
  try {
    const orders = await firestore()
      .collection('Orders')
      .where('customerEmail', '==', email)
      .get();

    return orders.docs.map(o => {
      const data = o.data();
      return {id: o.id, ...data};
    });
  } catch (error) {
    console.log('Get User Error:', error);
  }
};

export const getOrderCollection = async () => {
  try {
    const orders = await firestore()
      .collection('Orders')
      .orderBy('createdAt', 'asc')
      .get();
    return orders.docs.map(o => {
      const data = o.data();
      return {id: o.id, ...data};
    });
  } catch (error) {
    console.log('Get User Error:', error);
  }
};

export const getOrderCollectionByStatus = async (status: string) => {
  try {
    const orders = await firestore()
      .collection('Orders')
      .orderBy('createdAt', 'desc')
      .where('status', '==', status)
      .get();

    return orders.docs.map(o => {
      const data = o.data();
      return {id: o.id, ...data};
    });
  } catch (error) {
    console.log('Get User Error:', error);
  }
};

export const updateOrderStatus = async (order: any, status: string) => {
  try {
    await firestore()
      .collection('Orders')
      .doc(order.id)
      .set({...order, ['status']: status, ['updatedAt']: new Date()});
  } catch (error) {
    console.log('Get User Error:', error);
  }
};

export const sendMessage = async (
  newChat: any,
  customerEmail: string,
  chat: message[],
) => {
  try {
    await firestore()
      .collection('Chat')
      .doc(`${customerEmail}`)
      .set({
        messages: [
          {
            message: newChat.message,
            sender: newChat.sender,
            createdAt: new Date(),
          },
          ...chat,
        ],
      });
  } catch (error) {
    console.log('Send Message Error', error);
  }
};

export const getMessageCollection = async (email: string) => {
  try {
    return (
      await firestore()
        .collection('Chat')
        .where(firebase.firestore.FieldPath.documentId(), '==', email)
        .get()
    ).docs[0].data();
  } catch (error) {
    console.log('Get Messages Error', error);
  }
};
