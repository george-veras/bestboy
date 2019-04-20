import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      fileContents: ""
    }
    this.handleFileSelection = this.handleFileSelection.bind(this)
  }

  handleFileSelection(e) {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const { result } = e.target
      this.setState({
        fileContents: result
      })
      console.log(result)
    }

    reader.readAsText(file)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <input type="file" onChange={this.handleFileSelection} />
          <div>
            {this.state.fileContents}
          </div>
        </header>
      </div>
    )
  }
}

export default App
