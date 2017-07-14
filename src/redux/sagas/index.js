import _ from 'lodash';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

const contextSlugMap = {
  assets: 'BCAsset',
  auditlogs: 'BCAuditLog',
}

const reverseContextSlugMap = {
  BCAsset: 'assets',
  BCAuditLog: 'auditlogs',
}

const apiBaseUrl = 'http://localhost:8080';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchResults(action) {
  const { rawQuery, contextSlug } = action;
  const contextClass = contextSlugMap[contextSlug];

  if (_.isNil(contextClass)) return;

  try {
      const results = yield call(axios.post, `${apiBaseUrl}/api/v1/search`, { rawQuery, contextClass });
      const resultsData = results.data;
      const { count, data } = resultsData;
      yield put({type: "SEARCH_FETCH_SUCCEEDED", count, data, contextSlug });
   } catch (e) {
      yield put({type: "SEARCH_FETCH_FAILED", message: e.message});
   }
}

function* fetchConfigs(action) {
  try {
      const results = yield call(axios.get, `${apiBaseUrl}/api/v1/configs`);
      const data = {};
      _.keys(results.data).forEach(key => data[reverseContextSlugMap[key]] = results.data[key]);
      yield put({type: "CONFIGS_FETCH_SUCCEEDED", data });
   } catch (e) {
      yield put({type: "CONFIGS_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("SEARCH_FETCH_REQUESTED", fetchResults);
  yield takeEvery("CONFIGS_FETCH_REQUESTED", fetchConfigs);
}

export default mySaga;
