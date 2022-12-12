import './App.scss';
import DOMPurify from 'dompurify'
import React, {useState} from 'react'
import { marked } from 'marked'

function App() {
  
  const [rawText, setState] = useState(`# Heading\n## Sub heading\nThis is a paragraph\n\n**This is bolded text**\n > Block Quote\n- list item 1\n- list item 2\n- list item 3\n\nLinks: [freeCodeCamp](https://www.freecodecamp.org)\n\nInline code \`<div></div>\`, between 2 backticks\n\n\`\`\`\n\tlet x = 1\n\tlet y = 2\n\tlet z = x + y;\n\n\`\`\`\n![freeCodeCamp](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/230px-React-icon.svg.png)`)
  
  const getMarkdown = () => {
    const htmlMarkup = marked(rawText)
    const cleanMarkup = DOMPurify.sanitize(htmlMarkup)
    return {__html: cleanMarkup}
  }

  const handleChange = event => {
    setState(event.target.value)
  }

  return (
    <div className="App">
      <Editor handleChange={handleChange} rawText={rawText} />
      <Previewer getMarkdown={getMarkdown()} />
    </div>
  );
}

function Editor(props) {
  return (
    <div className="editor-box box">
      <header className="editor-header header">
        Markdown Editor
      </header>
      <div className="editor-container container">
      <textarea 
        id="editor" 
        value={props.rawText}
        spellCheck="false"
        onChange={props.handleChange}
        />
      </div>
    </div>
  )
}

function Previewer(props) {
  return (
    <div className="previewer-box box">
      <header className="previewer-header header">
        Previewer
      </header>
      <div 
        id="preview"
        dangerouslySetInnerHTML={props.getMarkdown}
      ></div>
    </div>
  )
}

export default App;
