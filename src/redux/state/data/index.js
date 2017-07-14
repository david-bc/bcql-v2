import _ from 'lodash';

import AuditsDummyResponse from '../../../service/AuditsDummyResponse'
import GroupsDummyResponse from '../../../service/GroupsDummyResponse'
import UsersDummyResponse from '../../../service/UsersDummyResponse'

export function selectData(state, contextSlug) {
  if (_.isNil(contextSlug)) {
    return _.values(state.data);
  }
  const { count, data } = _.defaultTo(state.data[contextSlug], { count: -1, data: [] });
  return { count, data };
}


const defaultState = {
  assets: {
    initialized: false,
    loading: false,
    count: -1,
    data: [],
  },
  audits: {
    initialized: false,
    loading: false,
    ...AuditsDummyResponse,
  },
  groups: {
    initialized: false,
    loading: false,
    ...GroupsDummyResponse,
  },
  users: {
    initialized: false,
    loading: false,
    ...UsersDummyResponse,
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'SEARCH_FETCH_REQUESTED': {
      const { contextSlug } = action;
      // TODO
      break;
    }

    case 'SEARCH_FETCH_SUCCEEDED': {
      const { contextSlug, count, data } = action;
      state = _.assignIn({}, state, {
        [contextSlug]: {
          count,
          data,
        }
      })
      break;
    }

    case 'SEARCH_FETCH_FAILED': {
      break;
    }
    default:

  }
  return state;
}
