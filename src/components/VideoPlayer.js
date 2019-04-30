import React, { Component } from 'react'

class VideoPlayer extends Component {
  render() {
    return (
      <video src="../SPider-Man.mp4" autoplay>
        Sorry, your browser does not support embeded videos.
      </video>
    )
  }
}

export default VideoPlayer