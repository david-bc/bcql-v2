import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withState, compose } from 'recompose';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectBcqlTypeAhead } from '../redux/state/config'

import { Button, Switch } from 'react-mdl';
import AceEditor from 'react-ace';
import ace from 'brace'

import '../ace/bcql_users_mode';
import '../ace/bcql_assets_mode';
import '../ace/bcql_groups_mode';
import '../ace/bcql_auditlogs_mode';
import 'brace/theme/github';
import 'brace/ext/language_tools'
const langTools = ace.acequire('ace/ext/language_tools');

let currContextSlug = 'assets';
let currTypeAheadContext = []

var customCompleter = {
  getCompletions: (editor, session, pos, prefix, callback) => {
    const taVals = currTypeAheadContext.map(({ display, tooltip }) => ({ name: display, value: display, meta: tooltip }));
   return callback(null, taVals);
  }
}
langTools.addCompleter(customCompleter);

const aceStyles = {
  get(fullSize) {
    return _.assignIn({
      width: '100%',
      border: '1px solid #ccc',
      marginBottom: '0.5em',
      height: "100%"
    },
    fullSize ? aceStyles.large : aceStyles.small)
  },
  small: { height: '3em', width: '87%' },
  large: { height: '13em', width: '87%' }
}

let AdvancedSearchForm = ({ fullSize, setFullSize, query, setQuery, collection, submitSearch }) => {
  currContextSlug = collection;
  const mode = "bcql_" + collection
  return (
    <div className="AdvancedSearchForm">
      <div>
        <Switch onChange={e => setFullSize(e.target.checked)} checked={fullSize}>
          Expand Editor
        </Switch>
        <div style={{ float: 'right' }}>
          <Button primary raised disabled={false} onClick={() => submitSearch(query, collection)}>
            <i className="fa fa-search fa-spin"></i> SEARCH
          </Button>
        </div>
      </div>
      <div>
        <AceEditor
          mode={mode}
          theme="github"
          value={query}
          onChange={val => setQuery(val)}
          style={ aceStyles.get(fullSize) }
          editorProps={{$blockScrolling: true}}
          enableBasicAutocompletion={true}
        />

      </div>

    </div>
  );
}

AdvancedSearchForm.propTypes = {};

AdvancedSearchForm = compose(
 withState('fullSize', 'setFullSize', false),
 withState('query', 'setQuery', '')
)(AdvancedSearchForm);

AdvancedSearchForm = connect(
  (state, props) => {
    const collection = props.match.path.substring(1);
    currTypeAheadContext = selectBcqlTypeAhead(state, collection);
    return { collection };
  },
  dispatch => ({
    submitSearch: (rawQuery, contextSlug) => {
      dispatch({ type: 'SEARCH_FETCH_REQUESTED', rawQuery, contextSlug });
    }
  })
)(AdvancedSearchForm);

export default withRouter(AdvancedSearchForm)
