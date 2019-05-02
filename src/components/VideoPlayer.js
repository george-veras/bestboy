import React, { Component } from 'react'

class VideoPlayer extends Component {
  render() {
    return (
      <video controls src="/Spider-Man.mp4" width="800">
        <track label="English" kind="subtitles" srcLang="en" src="Red.Dragon.srt" default />
        Your browser doesn't support HTML5 videos.
      </video>
    )
  }
}

export default VideoPlayer
