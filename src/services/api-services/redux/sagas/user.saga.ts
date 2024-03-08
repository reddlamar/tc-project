import {take, put, call, fork} from 'redux-saga/effects';
import {loginSuccess, logoutSuccess, failure} from '../slices/user.slice';
import {signInWithEmailPassword, signOut} from '../../firebase/auth.service';
import {getUser} from '../../firebase/firestore.service';

async function signInUser(email: string, password: string) {
  const auth = await signInWithEmailPassword(email, password);
  const extraData = await getUser(email);
  console.log('user', extraData);
  return {id: auth?.user.uid, ...extraData};
}

async function signOutUser() {
  await signOut();
}

function* watchSignIn(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('login');

    try {
      const data: any = yield call(signInUser, payload.email, payload.password);
      yield put(loginSuccess(data));
    } catch (ex) {
      console.log('Ex:', ex);
      yield put(failure(ex));
    }
  }
}

function* watchSignOut(): Generator<any> {
  while (true) {
    yield take('logout');

    try {
      yield call(signOutUser);
      yield put(logoutSuccess());
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchSignIn);
  yield fork(watchSignOut);
}
