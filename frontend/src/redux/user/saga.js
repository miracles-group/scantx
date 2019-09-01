import { all, takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getUserIdByID, addUser } from 'services/user';
import actions from './actions';

export function* getUserSagas(data) {
  const { params, success, fail } = data;
  try {
    const res = yield getUserIdByID(params);
    if (res.status === 200) {
      yield success();
      yield put({type: actions.GET_USER_SUCCESS, response: res.data});
    } else {
      yield fail(res.data.message);
    }
  } catch (error) {
    yield fail('Không thể kết nối đến Sever');
  }
}

export function* addUserSagas(data) {
  const { params, success, fail } = data;
  try {
    const res = yield addUser(params);
    if (res.status === 200) {
      yield success();
      yield put({type: actions.ADD_USER_SUCCESS, response: res.data});
    } else {
      yield fail(res.data.message);
    }
  } catch (error) {
    yield fail('Không thể kết nối đến Sever');
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(actions.GET_USER_REQUEST, getUserSagas),
    yield takeLatest(actions.ADD_USER_REQUEST, addUserSagas)
  ]);
}