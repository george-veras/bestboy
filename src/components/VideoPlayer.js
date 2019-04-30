import React, { Component } from 'react'

class VideoPlayer extends Component {
  render() {
    return (
      <video controls src="/Spider-Man.mp4" autoplay>
        <track label="English" kind="subtitles" srclang="en" src="/Red.Dragon.srt" default />
      </video>
    )
  }
}

export default VideoPlayer
