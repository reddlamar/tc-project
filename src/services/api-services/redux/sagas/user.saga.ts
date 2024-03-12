import {take, put, call, fork, takeEvery} from 'redux-saga/effects';
import {
  login,
  logout,
  failure,
  getNotifications,
  getUnreadNotifications,
} from '../slices/user.slice';
import {signInWithEmailPassword, signOut} from '../../firebase/auth.service';
import {
  getUser,
  sendCustomerNotification,
  getCustomerNotifications,
  getCustomerUnreadNotifications,
  updateNotificationReadStatus,
} from '../../firebase/firestore.service';

async function signInUser(email: string, password: string) {
  const auth = await signInWithEmailPassword(email, password);
  const extraData = await getUser(email);
  return {id: auth?.user.uid, ...extraData};
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

function* watchGetUnreadNotifications(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getUnreadNotifications');

    try {
      const data = yield call(getCustomerUnreadNotifications, payload.email);
      yield put(getUnreadNotifications(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchGetUnreadNotificationsDocumentSnapshot(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getUnreadNotificationsDocumentSnapshot');

    try {
      yield put(getUnreadNotifications(payload));
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
        updateNotificationReadStatus,
        payload.email,
        payload.read,
        payload.notification,
      );
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
  yield fork(watchGetUnreadNotifications);
  yield fork(watchGetUnreadNotificationsDocumentSnapshot);
  yield takeEvery('updateNotifications', watchUpdateNotification);
}
