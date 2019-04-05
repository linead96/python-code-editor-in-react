import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import "./Styles/App.css";

import CodeEditor from "./Components/CodeEditor";

import "brace/mode/python";
import "brace/theme/monokai";

let logs = [];

/* eslint-disable */
console.oldLog = console.log;

console.log = function (value) {
  if (value !== "using indexedDB for stdlib modules cache") {
    console.oldLog(value);
    logs.push(`${value}`);
  }
};
/* eslint-disable */

const Scripts = props => {
  const { code } = props;
  return <script type="text/python">{code}</script>;
}

const output = arr => {
  let out = "";
  for (let i = 0; i < arr.length; i += 1) {
    if (i !== arr.length - 1) {
      out = out.concat(`${arr[i]}\n`);
    } else {
      out = out.concat(arr[i]);
    }
  }
  return out;
};

class App extends React.Component {
  state = {
    code: "",
    outputArr: [],
  };

  run(callback) {
    try {
      window.brython([1]);
    } catch (error) {
      console.oldLog(error);
    }

    //added setTimeout because console where being updated after 100 ms
    setTimeout(
      function () {
        this.setState({
          outputArr: logs
        }),
          console.oldLog("logsgasga", logs)
      }
        .bind(this),
      100
    )
  }

  clearLogs() {
    logs = [];
    this.setState({
      outputArr: logs
    });
  }

  render() {
    const { code, outputArr } = this.state;
    return (
      <div id="python-editor-container">
        <Helmet>
          <script
            type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.7.1/brython.min.js"
          />
          <script
            type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.7.1/brython_stdlib.js"
          />
        </Helmet>
        <Scripts code={code} />
        <div id="python-editor-input">
          <button type="button" onClick={() => this.run()}>
            Run
          </button>
          <CodeEditor
            id="python-code-editor"
            value={code}
            mode="python"
            theme="monokai"
            onChange={text => this.setState({ code: text })}
            width={`${(window.innerWidth / 2)}px`}
            height={`${window.innerHeight}px`}
            fontSize={"1rem"}
          />
        </div>
        <div id="python-editor-output">
          <button type="button" onClick={() => this.clearLogs()}>
            Clear
          </button>
          <textarea
            id="python-output"
            readOnly
            value={output(outputArr)}
            placeholder="> output goes here..."
          />
        </div>
      </div>
    );
  }
}

Scripts.propTypes = {
  code: PropTypes.string.isRequired
};

export default App;
