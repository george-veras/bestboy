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
            {
              this.props.videoPath && this.props.subtitlesPath ?
                <VideoPlayer /> : <FileSelector />
            }
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    videoPath: state.videoPath,
    subtitlesPath: state.subtitlesPath
  }
}

export default connect(mapStateToProps)(Home)