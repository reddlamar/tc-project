import firestore from '@react-native-firebase/firestore';
import products from '../../../data/products.json';

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

export const getProductsData = async () => {
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

export const getPendingOrderCollection = async () => {
  try {
    const orders = await firestore()
      .collection('Orders')
      .where('status', '==', 'pending')
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
