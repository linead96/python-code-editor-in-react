import React from 'react';
import Editor from 'react-simple-code-editor';
import Helmet from 'react-helmet';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import './App.css';
import './css/prism.css';

console.oldLog = console.log;

console.log = function (value) {
  console.oldLog(value);
  window.$log = value;
};

const Scripts = (props) => {
  return (
    <script type="text/python">
      {props.code}
    </script>
  )
}

class App extends React.Component {
  state = {
    code: "",
    output: "",
  };

  run() {
    window.brython()
    this.setState({
      output: window.$log
    })
  }

  render() {

    return (
      <div id="python-editor-container">
        <Helmet>
          <script src="brython.js"></script>
        </Helmet>
        <Scripts code={this.state.code} />
        <div id="python-editor-input">
          <Editor
            id="python-code-editor"
            className="language-python"
            value={this.state.code}
            onValueChange={code => this.setState({ code })}
            highlight={code => highlight(code, languages.py)}
            padding={20}
            placeholder="enter code here..."
          />
          <button onClick={() => this.run()}>Click Here to Run</button>
        </div>
        <div id="python-editor-output">
          <textarea id="python-output" readOnly={true} value={this.state.output} placeholder="> output goes here..." />
        </div>
      </div>
    );
  }
}
export default App;
