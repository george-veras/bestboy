import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import {
  handleSubtitlesFileLoading,
  handleSubtitlesShifting,
  handleVideoSelection,
  handleSave
} from './../actions'

class FileSelector extends Component {
  constructor(props) {
    super(props)
    this.subtitleInput = React.createRef()
    this.videoInput = React.createRef()
    this.handleAddSubtitleClick = this.handleAddSubtitleClick.bind(this)
    this.handleAddVideoClick = this.handleAddVideoClick.bind(this)
  }

  handleAddSubtitleClick() {
    this.subtitleInput.current.click()
  }

  handleAddVideoClick() {
    this.videoInput.current.click()
  }

  render() {
    return (
      <Fragment>
        <span className="button-label">Choose subtitle to load</span>
        <input id="subtitleInput" className="input-file" type="file" onChange={this.props.onSubtitlesSelection} ref={this.subtitleInput} />
        <input type="button" value="+ add file" className="default-button" onClick={this.handleAddSubtitleClick}></input>
        <span className="button-label">Choose video to load</span>
        <input id="videoInput" className="input-file" type="file" onChange={this.props.onVideoSelection} ref={this.videoInput} />
        <input type="button" value="+ add file" className="default-button" onClick={this.handleAddVideoClick}></input>
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
    onSubtitlesSelection: e => dispatch(handleSubtitlesFileLoading(e)),
    onVideoSelection: e => dispatch(handleVideoSelection(e)),
    onSave: (subtitles) => dispatch(handleSave(subtitles)),
    shiftSubtitles: (milliseconds, subtitles) => dispatch(handleSubtitlesShifting(milliseconds, subtitles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector)
