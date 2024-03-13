import {take, put, call, fork} from 'redux-saga/effects';
import {
  addOrder,
  getOrderHistoryCollection,
  updateOrder,
  getOrderCollection,
} from '../../firebase/firestore.service';
import {createOrder, failure, getOrders} from '../slices/order.slice';

async function addNewOrder(order: any) {
  await addOrder(order);
}

function* watchCreateOrder(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('createOrder');

    try {
      yield call(addNewOrder, payload);
      yield put(createOrder(payload));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetOrderHistory(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getOrderHistory');

    try {
      const data: any = yield call(getOrderHistoryCollection, payload.email);
      yield put(getOrders(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetOrders(): Generator<any> {
  while (true) {
    yield take('getOrders');

    try {
      const data: any = yield call(getOrderCollection);
      yield put(getOrders(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchOrderStatusUpdate(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('updateOrder');

    try {
      yield call(updateOrder, payload.order, payload.status, payload.email);
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchCreateOrder);
  yield fork(watchGetOrders);
  yield fork(watchGetOrderHistory);
  yield fork(watchOrderStatusUpdate);
}
