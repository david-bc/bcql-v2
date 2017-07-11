import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withState, compose } from 'recompose';
import { withRouter } from 'react-router-dom'

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

var customCompleter = {
  getCompletions: (editor, session, pos, prefix, callback) => {
    console.log({ editor, session, pos, prefix, callback });
  //  return callback(null, [{name: 'Testing', value: 'testing', score: 1, meta: 'meta???'}]);
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

let AdvancedSearchForm = ({ fullSize, setFullSize, query, setQuery, match }) => {
  const collection = match.path.substring(1)
  const mode = "bcql_" + collection
  return (
    <div className="AdvancedSearchForm">
      <div>
        <Switch onChange={e => setFullSize(e.target.checked)} checked={fullSize}>
          Expand Editor
        </Switch>
        <div style={{ float: 'right' }}>
          <Button primary raised disabled={false}><i className="fa fa-search fa-spin"></i> SEARCH</Button>
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

export default withRouter(AdvancedSearchForm)
