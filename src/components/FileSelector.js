import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  handleFileLoading,
  handleSubtitlesShifting,
  handleVideoSelection
} from './../actions'

class FileSelector extends Component {
  render() {
    return (
      <Fragment>
        <label for="subtitleInput">Choose subtitle to load</label>
        <input id="subtitleInput" name="subtitleInput" type="file" onChange={this.props.onFileSelection} />
        <label for="videoInput">Choose video to load</label>
        <input id="videoInput" name="videoInput" type="file" onChange={this.props.onVideoSelection} />
        <input type="button" onClick={() => this.props.shiftSubtitles(1000, this.props.subtitles)} value="+1 second" />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    subtitles: state.subtitles,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFileSelection: (e) => dispatch(handleFileLoading(e)),
    onVideoSelection: (e) => dispatch(handleVideoSelection(e)),
    shiftSubtitles: (milliseconds, subtitles) => dispatch(handleSubtitlesShifting(milliseconds, subtitles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector)
