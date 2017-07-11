import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

const contextSlugMap = {
  assets: 'BCAsset',
  users: 'BCUser',
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchResults(action) {
  const { rawQuery, contextSlug } = action;

  if (contextSlug !== 'assets') return;

  try {
      const results = yield call(axios.post, 'http://10.10.5.233:8080/api/v1/search', { rawQuery, contextClass: contextSlugMap[contextSlug] });
      const resultsData = results.data;
      const { count, data } = resultsData;
      yield put({type: "SEARCH_FETCH_SUCCEEDED", count, data, contextSlug });
   } catch (e) {
      yield put({type: "SEARCH_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("SEARCH_FETCH_REQUESTED", fetchResults);
}

export default mySaga;
