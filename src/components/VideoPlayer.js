import React, { Component } from 'react'
import { connect } from 'react-redux'

class VideoPlayer extends Component {
  render() {
    return (
      <video width="800" src={this.props.videoPath} controls>
        <track label="English" kind="subtitles" srcLang="en" src={this.props.subtitlesPath} default />
        <div id="video-controls" className="controls" data-state="hidden">
          <button id="playpause" type="button" data-state="play">Play/Pause</button>
          <button id="stop" type="button" data-state="stop">Stop</button>
          <div className="progress">
              <progress id="progress" value="0" min="0">
                <span id="progress-bar"></span>
              </progress>
          </div>
          <button id="mute" type="button" data-state="mute">Mute/Unmute</button>
        </div>
        Your browser doesn't support HTML5 videos.
      </video>
    )
  }
}

const mapStateToProps = state => {
  return {
    videoPath: state.videoPath,
    subtitlesPath: state.subtitlesPath
  }
}

export default connect(mapStateToProps)(VideoPlayer)
