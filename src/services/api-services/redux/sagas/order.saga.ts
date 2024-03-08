import {take, put, call, fork} from 'redux-saga/effects';
import {
  addOrder,
  getOrderHistoryCollection,
  getPendingOrderCollection,
  updateOrderStatus,
} from '../../firebase/firestore.service';
import {
  createOrderSuccess,
  failure,
  getOrdersSuccess,
} from '../slices/order.slice';

async function addNewOrder(order: any) {
  await addOrder(order);
}

async function getOrderHistoryData(email: string) {
  return await getOrderHistoryCollection(email);
}

async function getPendingOrders() {
  return await getPendingOrderCollection();
}

async function updateOrderStatusData(order: any, status: string) {
  await updateOrderStatus(order, status);
}

function* watchCreateOrder(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('createOrder');

    try {
      yield call(addNewOrder, payload);
      yield put(createOrderSuccess(payload));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetOrderHistory(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getOrderHistory');

    try {
      const data: any = yield call(getOrderHistoryData, payload.email);
      yield put(getOrdersSuccess(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetPendingOrder(): Generator<any> {
  while (true) {
    yield take('getOrders');

    try {
      const data: any = yield call(getPendingOrders);
      yield put(getOrdersSuccess(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchOrderStatusUpdate(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('updateOrder');

    try {
      yield call(updateOrderStatusData, payload.order, payload.status);
      yield put(getOrdersSuccess(payload));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchCreateOrder);
  yield fork(watchGetOrderHistory);
  yield fork(watchOrderStatusUpdate);
  yield fork(watchGetPendingOrder);
}
