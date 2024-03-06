import {fork} from 'redux-saga/effects';

import userSaga from './user.saga';
import productsSaga from './products.saga';
// import cartSaga from

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(productsSaga);
  // yield fork()
}
