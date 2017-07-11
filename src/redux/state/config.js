import _ from 'lodash';

import auditlogs from '../../config/Audits'
import groups from '../../config/Groups'
import users from '../../config/Users'

export function selectGridColumns(state, contextSlug) {
  return _.defaultTo(state.config[contextSlug], { grid: { columns: [] }}).grid.columns;
}

const defaultState = {
  assets: {
    grid: { columns: [] },
    bcql: { fields: [] }
  },
  auditlogs,
  groups,
  users,
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'CONFIGS_FETCH_REQUESTED': {
      break;
    }

    case 'CONFIGS_FETCH_SUCCEEDED': {
      state = {
        ...state,
        ...action.data,
      };
      break;
    }

    case 'CONFIGS_FETCH_FAILED': {

      break;
    }

    default:
  }
  return state;
}
