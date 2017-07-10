import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withState, compose } from 'recompose';

import AceEditor from 'react-ace';

import 'brace/mode/mysql';
import 'brace/theme/github';

import { Button, Switch } from 'react-mdl';

const aceStyles = {
  get(fullSize) {
    return _.assignIn({
      width: '100%',
      border: '1px solid #ccc',
      marginBottom: '0.5em'
    },
    fullSize ? aceStyles.large : aceStyles.small)
  },
  small: { height: '3em', width: '100%' },
  large: { height: '13em', width: '100%' }
}

const AdvancedSearchForm = ({ fullSize, setFullSize }) => {
  return (
    <div className="AdvancedSearchForm">
      <div>
        <Switch onChange={e => setFullSize(e.target.checked)} checked={fullSize}>
          Large Editor
        </Switch>
      </div>
      <div>
        <AceEditor
          mode="mysql"
          theme="github"
          onChange={console.log}
          style={ aceStyles.get(fullSize) }
          editorProps={{$blockScrolling: true}}
          enableBasicAutocompletion={true}
        />
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button primary raised disabled={false}>Seach</Button>
      </div>
    </div>
  );
}

AdvancedSearchForm.propTypes = {};

export default compose(
 withState('fullSize', 'setFullSize', false),
 withState('query', 'setQuery', '')
)(AdvancedSearchForm);
