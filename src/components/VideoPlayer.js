import React, { Component } from 'react'
import { connect } from 'react-redux'

class VideoPlayer extends Component {
  render() {
    return (
      <video width="800" src={this.props.videoPath} controls>
        <track label="English" kind="subtitles" srcLang="en" src={this.props.subtitlesPath} default />
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
