import React, { Component } from 'react';
import { render } from 'react-dom';
import Radium, { Style, StyleRoot } from 'radium';
import { Grid, Cell } from 'radium-grid';
import { inject, observer } from 'mobx-react';
// import { Link} from 'react-router';
import remark from "remark";
import remarkReact from "remark-react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, grayscale } from 'react-syntax-highlighter/dist/styles';

import {Tabs, Tab} from 'material-ui/Tabs';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
};

const CodeBlock = (props) => {
  const { filename, language, s, data } = props;

  return (
    <Tabs>
      <Tab label={filename} >
        <SyntaxHighlighter
         language={language}
         showLineNumbers
         style={[s]}
        >
         {data}
        </SyntaxHighlighter>
      </Tab>
      <Tab label="Item Two" >
        <p>Cool</p>
      </Tab>
    </Tabs>
  );
};


const _ = inject(
  'appStore'
)(observer((props) => {
  const content = props.content;
  const renderContent = (inContent) => {
    let result = (<div></div>);
    const { kind, subKind, data } = inContent;
    if (kind === 'text') {
      if (subKind === 'markdown') {
        result = (
          <div>
            {remark().use(remarkReact).process(data).contents}
          </div>)
      }
    } else if (kind === 'code') {
      if (subKind === 'inline') {
      } else if (subKind === 'gist') {
        //result = (<div><code>{inContent.fetchedData}</code></div>);
        result = (
          <CodeBlock
            filename={inContent.filename}
            language={inContent.language}
            s={grayscale}
            data={inContent.fetchedData}
          />
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
