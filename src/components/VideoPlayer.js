import React, { Component } from 'react'

class VideoPlayer extends Component {
  render() {
    return (
      <video controls src="/Avengers.mp4" width="800">
        <track label="English" kind="subtitles" srcLang="en" src="Avengers.vtt" default />
        <div id="video-controls" class="controls" data-state="hidden">
          <button id="playpause" type="button" data-state="play">Play/Pause</button>
          <button id="stop" type="button" data-state="stop">Stop</button>
          <div class="progress">
              <progress id="progress" value="0" min="0">
                <span id="progress-bar"></span>
              </progress>
          </div>
          <button id="mute" type="button" data-state="mute">Mute/Unmute</button>
          <button id="volinc" type="button" data-state="volup">Vol+</button>
          <button id="voldec" type="button" data-state="voldown">Vol-</button>
          <button id="fs" type="button" data-state="go-fullscreen">Fullscreen</button>
          <button id="subtitles" type="button" data-state="subtitles">CC</button>
        </div>
        Your browser doesn't support HTML5 videos.
      </video>
    )
  }
}

export default VideoPlayer
