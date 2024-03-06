import {take, put, call, fork} from 'redux-saga/effects';
import {success, failure, login} from '../slices/user.slice';
import {signInWithEmailPassword} from '../../firebase/auth.service';

async function signInUser(email: string, password: string) {
  const auth = await signInWithEmailPassword(email, password);
  return auth?.user;
}

function* watchRequest(): Generator<any> {
  while (true) {
    const {payload}: any = yield take(login);

    try {
      const data: any = yield call(signInUser, payload.email, payload.password);
      console.log('Data:', data);
      yield put(success(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
