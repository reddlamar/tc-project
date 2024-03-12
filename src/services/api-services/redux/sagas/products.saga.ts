import {take, put, call, fork} from 'redux-saga/effects';
import {getProductCollection} from '../../firebase/firestore.service';
import {failure, getProducts, success} from '../slices/products.slice';

function* watchGetStoreItems(): Generator<any> {
  while (true) {
    yield take('getProducts');

    try {
      const data: any = yield call(getProductCollection);
      yield put(getProducts(data));
      yield put(success());
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchGetStoreItems);
}
