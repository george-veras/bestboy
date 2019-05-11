import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import logo from './logo.svg'
import './App.css'
import subtitlesReducer from './reducers/subtitles'
import FileSelector from './components/FileSelector'
import VideoPlayer from './components/VideoPlayer'

let store = createStore(
  subtitlesReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <VideoPlayer />
            <FileSelector />
          </header>
        </div>
      </Provider>
    )
  }
}

export default App
