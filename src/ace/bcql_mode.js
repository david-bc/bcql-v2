import ace from 'brace'

ace.define('ace/mode/doc_comment_highlight_rules',
  ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'],
  function(acequire, exports, module) {
    'use strict';

    let oop = acequire('../lib/oop');
    let TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules;

    var DocCommentHighlightRules = function() {
      this.$rules = {
        'start': [{
          token: 'comment.doc.tag',
          regex: '@[\\w\\d_]+' // TODO: fix email addresses
        },
          DocCommentHighlightRules.getTagRule(),
        {
          defaultToken: 'comment.doc',
          caseInsensitive: true
        }]
      };
    };

    oop.inherits(DocCommentHighlightRules, TextHighlightRules);

    DocCommentHighlightRules.getTagRule = function(start) {
      return {
        token: 'comment.doc.tag.storage.type',
        regex: '\\b(?:TODO|FIXME|XXX|HACK)\\b'
      };
    };

    DocCommentHighlightRules.getStartRule = function(start) {
      return {
        token: 'comment.doc', // doc comment
        regex: '\\/\\*(?=\\*)',
        next: start
      };
    };

    DocCommentHighlightRules.getEndRule = function(start) {
      return {
        token: 'comment.doc', // closing comment
        regex: '\\*\\/',
        next: start
      };
    };


    exports.DocCommentHighlightRules = DocCommentHighlightRules;
  });

ace.define('ace/mode/bcql_highlight_rules', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/lib/lang', 'ace/mode/doc_comment_highlight_rules', 'ace/mode/text_highlight_rules'], function(acequire, exports, module) {
  let oop = acequire('../lib/oop');
  let lang = acequire('../lib/lang');
  let DocCommentHighlightRules = acequire('./doc_comment_highlight_rules').DocCommentHighlightRules;
  let TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules;

  let EikelangHighlightRules = function() {
    let builtins = 'Users|Firstname|Assets|Filename|Groups|Name';

    let keywordMapper = this.createKeywordMapper({
      'support.function': builtins
    }, 'identifier', true);


    function string(rule) {
      let start = rule.start;
      let escapeSeq = rule.escape;
      return {
        token: 'string.start',
        regex: start,
        next: [
                {token: 'constant.language.escape', regex: escapeSeq},
                {token: 'string.end', next: 'start', regex: start},
                {defaultToken: 'string'}
        ]
      };
    }

    this.$rules = {
      'start': [{
        token: 'comment', regex: '(?:-- |#).*$'
      },
        string({start: '"', escape: /\\[0'"bnrtZ\\%_]?/}),
        string({start: '\'', escape: /\\[0'"bnrtZ\\%_]?/}),
        DocCommentHighlightRules.getStartRule('doc-start'),
      {
        token: 'comment', // multi line comment
        regex: /\/\*/,
        next: 'comment'
      }, {
        token: 'constant.numeric', // hex
        regex: /0[xX][0-9a-fA-F]+|[xX]'[0-9a-fA-F]+'|0[bB][01]+|[bB]'[01]+'/
      }, {
        token: 'constant.numeric', // float
        regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b'
      }, {
        token: keywordMapper,
        regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b'
      }, {
        token: 'constant.class',
        regex: '@@?[a-zA-Z_$][a-zA-Z0-9_$]*\\b'
      }, {
        token: 'constant.buildin',
        regex: '`[^`]*`'
      }, {
        token: 'keyword.operator',
        regex: '\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|='
      }, {
        token: 'paren.lparen',
        regex: '[\\(]'
      }, {
        token: 'paren.rparen',
        regex: '[\\)]'
      }, {
        token: 'text',
        regex: '\\s+'
      }],
      'comment': [
            {token: 'comment', regex: '\\*\\/', next: 'start'},
            {defaultToken: 'comment'}
      ]
    };

    this.embedRules(DocCommentHighlightRules, 'doc-', [DocCommentHighlightRules.getEndRule('start')]);
    this.normalizeRules();
  };

  oop.inherits(EikelangHighlightRules, TextHighlightRules);

  exports.EikelangHighlightRules = EikelangHighlightRules;
});

ace.define('ace/mode/bcql', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/bcql_highlight_rules'],
  function(acequire, exports, module) {
    let oop = acequire('../lib/oop');
    let TextMode = acequire('../mode/text').Mode;
    let EikelangHighlightRules = acequire('./bcql_highlight_rules').EikelangHighlightRules;

    let Mode = function() {
      this.HighlightRules = EikelangHighlightRules;
      this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);

    (function() {
      this.lineCommentStart = ['--', '#']; // todo space
      this.blockComment = {start: '/*', end: '*/'};

      this.$id = 'ace/mode/bcql';
    }).call(Mode.prototype);

    exports.Mode = Mode;
  });
