import {take, put, call, fork} from 'redux-saga/effects';
import {
  getMessageCollection,
  sendMessage,
} from '../../firebase/firestore.service';
import {failure, getMessages, successful} from '../slices/chat.slice';

function* watchGetMessages(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('getMessages');

    try {
      const data: any = yield call(getMessageCollection, payload.email);
      yield put(getMessages(data));
      yield put(successful());
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

function* watchSendMessage(): Generator<any> {
  while (true) {
    const {payload}: any = yield take('sendMessage');

    try {
      yield call(sendMessage, payload.newChat, payload.email, payload.messages);
      yield put(successful());
    } catch (ex) {
      yield put(failure(ex));
    }
  }
}

export default function* root() {
  yield fork(watchGetMessages);
  yield fork(watchSendMessage);
}
