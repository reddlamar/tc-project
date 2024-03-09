import {take, put, call, fork} from 'redux-saga/effects';
import {getProductsData} from '../../firebase/firestore.service';
import {getStoreItems, setStoreItems, failure} from '../slices/products.slice';

async function getProducts() {
  const products = await getProductsData();
  return products?.map(p => ({...p.data(), id: p.id}));
}

function* watchGetStoreItems(): Generator<any> {
  while (true) {
    yield take(getStoreItems);

    try {
      const data: any = yield call(getProducts);
      yield put(setStoreItems(data));
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchGetStoreItems);
}
