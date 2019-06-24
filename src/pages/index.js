import React, {Component} from 'react'
import { connect } from 'react-redux'

import FileSelector from '../components/FileSelector'
import VideoPlayer from '../components/VideoPlayer'
import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class Home extends Component {
  render() {
    return (
      <>
        <TitleAndMetaTags title={"Best Boy"} gtagId={gtagId} />
        <div className="App">
          <div className="body-card">
            <span className="bestboy-title">bestboy</span>
            <VideoPlayer />
            <FileSelector />
          </div>
        </div>
      </>
    )
  }
}

export default connect()(Home)