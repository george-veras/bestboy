import React, { Component } from 'react'

class VideoPlayer extends Component {
  render() {
    return (
      <video controls src="/Spider-Man.mp4" autoPlay>
        <track label="English" kind="subtitles" srcLang="en" src="/Red.Dragon.srt" default />
      </video>
    )
  }
}

export default VideoPlayer
