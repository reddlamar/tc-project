import {take, put, call, fork} from 'redux-saga/effects';
import {
  addOrder,
  getOrderHistoryCollection,
  getOrderCollectionByStatus,
  updateOrderStatus,
  getOrderCollection,
} from '../../firebase/firestore.service';
import {
  createOrder,
  failure,
  getOrders,
  getCancelledOrders,
  getInProgressOrders,
  getPendingOrders,
  getRejectedOrders,
} from '../slices/order.slice';

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

function* watchGetPendingOrders(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getPendingOrders');

    try {
      const data: any = yield call(getOrderCollectionByStatus, payload.status);
      yield put(getPendingOrders(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetInProgressOrders(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getInProgressOrders');

    try {
      const data: any = yield call(getOrderCollectionByStatus, payload.status);
      yield put(getInProgressOrders(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetRejectedOrders(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getOrders');

    try {
      const data: any = yield call(getOrderCollectionByStatus, payload.status);
      yield put(getRejectedOrders(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetCancelledOrders(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getOrders');

    try {
      const data: any = yield call(getOrderCollectionByStatus, payload.status);
      yield put(getCancelledOrders(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchOrderStatusUpdate(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('updateOrder');

    try {
      yield call(updateOrderStatus, payload.order, payload.status);
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
  yield fork(watchGetPendingOrders);
  yield fork(watchGetInProgressOrders);
  yield fork(watchGetCancelledOrders);
  yield fork(watchGetRejectedOrders);
}
