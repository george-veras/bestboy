import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      fileContents: "",
      subtitles: [],
    }
    this.handleFileSelection = this.handleFileSelection.bind(this)
    this.addsOneSecond = this.addsOneSecond.bind(this)
    this.printState = this.printState.bind(this)
  }

  handleFileSelection(e) {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const { result } = e.target
      const subtitlesContext = result.split("\n\n")
      const subtitles = subtitlesContext.map(raw => {
        const [ ordinal, timeRange, ...text ] = raw.split("\n")
        const [ start, end ] = timeRange.split(" --> ")

        return {
          ordinal,
          entersAt: start,
          leavesAt: end,
          text,
        }
      })

      this.setState({
        fileContents: result,
        subtitles,
      })
    }

    reader.readAsText(file)
  }

  addsOneSecond(e) {
    console.log(this.state.fileContents)
  }

  printState() {
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <input type="file" onChange={this.handleFileSelection} />
          <input type="button" onClick={this.addsOneSecond} value="+1 second" />
          <input type="button" onClick={this.printState} value="print state" />
          <div>
            {this.state.fileContents}
          </div>
        </header>
      </div>
    )
  }
}

export default App
