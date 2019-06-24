import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import './App.css'
import subtitlesReducer from './reducers'
import FileSelector from './components/FileSelector'
import VideoPlayer from './components/VideoPlayer'
import TitleAndMetaTags from './components/TitleAndMetaTags'
import { gtagId } from './app-constants'

let store = createStore(
  subtitlesReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

class App extends Component {
  render() {
    return (
      <>
        <TitleAndMetaTags title={"Best Boy"} gtagId={gtagId} />
        <Provider store={store}>
          <div className="App">
            <div className="body-card">
              <span className="bestboy-title">bestboy</span>
              <VideoPlayer />
              <FileSelector />
            </div>
          </div>
        </Provider>
      </>
    )
  }
}

export default App
