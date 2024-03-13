import {take, put, call, fork, takeEvery} from 'redux-saga/effects';
import {
  login,
  logout,
  failure,
  getNotifications,
  getDeviceToken,
} from '../slices/user.slice';
import {signInWithEmailPassword, signOut} from '../../firebase/auth.service';
import {
  getCustomer,
  sendCustomerNotification,
  getCustomerNotifications,
  updateNotificationReadState,
} from '../../firebase/firestore.service';

async function signInUser(email: string, password: string) {
  const auth = await signInWithEmailPassword(email, password);

  if (auth) {
    const extraData = await getCustomer(email);
    return {id: auth?.user.uid, ...extraData};
  }
}

function* watchSignIn(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('login');

    try {
      const data: any = yield call(signInUser, payload.email, payload.password);
      yield put(login(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchSignOut(): Generator<any> {
  while (true) {
    yield take('logout');

    try {
      yield call(signOut);
      yield put(logout());
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchSendNotification(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('sendNotification');

    try {
      yield call(
        sendCustomerNotification,
        payload.email,
        payload.text,
        payload.createdAt,
        payload.read,
      );
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetNotifications(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getNotifications');

    try {
      const data = yield call(getCustomerNotifications, payload.email);
      yield put(getNotifications(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetNotificationsDocumentSnapshot(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getNotificationsDocumentSnapshot');

    try {
      yield put(getNotifications(payload));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchUpdateNotification(action: any): Generator<any> {
  while (true) {
    const {payload}: any = action;

    try {
      yield call(
        updateNotificationReadState,
        payload.email,
        payload.read,
        payload.notification,
      );
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetDeviceToken(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getDeviceToken');

    try {
      yield put(getDeviceToken(payload));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchSignIn);
  yield fork(watchSignOut);
  yield fork(watchSendNotification);
  yield fork(watchGetNotifications);
  yield fork(watchGetNotificationsDocumentSnapshot);
  yield fork(watchGetDeviceToken);
  yield takeEvery('updateNotifications', watchUpdateNotification);
}
