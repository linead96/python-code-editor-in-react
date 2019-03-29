import React from 'react';
import Editor from 'react-simple-code-editor';
import Script from 'react-load-script';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import './App.css';
import './css/prism.css';

const code = `function add(a, b) {
  return a + b;
}
`;

const styles = {
  textarea: {
    height: '300px',
    width: '300px',
  }
}
 
class App extends React.Component {
  state = {
    code,
    output: "",
  };
 
render() {
  return (
    <div>
      <Script src="./utils/brython.js" />
      
      <Editor
        className="language-python"
        value={this.state.code}
        onValueChange={code => this.setState({ code })}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <button>Run</button>
      <textarea style={styles.textarea}>
        {this.state.output}
      </textarea>
      
      <iframe
        title="python-code-editor"
        src="https://trinket.io/embed/python3/e3366b7a37"
        width="100%" height="356"
        frameborder="0"
        marginwidth="0"
        marginheight="0"
        allowfullscreen>
      </iframe>

      <iframe
        title="python-console"
        src="http://brython.info/console.html"
        width="800"
        height="400"
      ></iframe>

    </div>
    
      
    );
  }
}



export default App;
