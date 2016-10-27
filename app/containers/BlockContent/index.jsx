import React from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
import { inject, observer } from 'mobx-react';
// import { Link} from 'react-router';
import remark from "remark";
import remarkReact from "remark-react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, grayscale } from 'react-syntax-highlighter/dist/styles';

const _ = inject(
  'appStore'
)(observer((props) => {
  const content = props.content;
  const renderContent = (inContent) => {
    let result = (<div></div>);
    const { kind, subKind, data } = inContent;
    if (kind === 'text') {
      if (subKind === 'markdown') {
        result = <div>{remark().use(remarkReact).process(data).contents}</div>
      }
    } else if (kind === 'code') {
      if (subKind === 'inline') {
      } else if (subKind === 'gist') {
        //result = (<div><code>{inContent.fetchedData}</code></div>);
        result = (
          <SyntaxHighlighter
            language={inContent.language}
            showLineNumbers
            style={grayscale}
          >
            {inContent.fetchedData}
          </SyntaxHighlighter>
        );
      }
    }

    return result;
  };

  return (
    <div>
      {renderContent(content)}
    </div>
  );
}));

export default _;
