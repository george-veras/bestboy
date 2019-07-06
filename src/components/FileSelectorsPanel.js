import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import FileSelector from './FileSelector'

import {
  handleSubtitlesFileLoading,
  handleSubtitlesShifting,
  handleVideoSelection,
  handleSave
} from '../actions'

class FileSelectorsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtitleStage: "selection",
    }

    this.subtitleInput = React.createRef()
    this.videoInput = React.createRef()
    this.handleSubtitleSelection = this.handleSubtitleSelection.bind(this)
    this.handleAddVideoClick = this.handleAddVideoClick.bind(this)
  }

  handleSubtitleSelection(e) {
    this.setState({
      ...this.state,
      subtitleStage: "loading"
    })

    this.props.onSubtitlesSelection(e)
  }

  handleAddVideoClick() {
    this.videoInput.current.click()
  }

  render() {
    console.log("subtitlesLoadingPercentage: " + this.props.subtitlesLoadingPercentage)
    return (
      <Fragment>
        <FileSelector
          label={"Choose subtitle to load"}
          onFileChange={this.handleSubtitleSelection}
          stage={this.state.subtitleStage}
          loadProgress={this.props.subtitlesLoadingPercentage}
        />
        {/* <span className="button-label">Choose subtitle to load</span>
        <input id="subtitleInput" className="input-file" type="file" onChange={this.props.onSubtitlesSelection} ref={this.subtitleInput} />
        <input type="button" value="+ add file" className="default-button" onClick={this.handleAddSubtitleClick}></input>
        <span className="button-label">Choose video to load</span>
        <input id="videoInput" className="input-file" type="file" onChange={this.props.onVideoSelection} ref={this.videoInput} />
        <input type="button" value="+ add file" className="default-button" onClick={this.handleAddVideoClick}></input> */}
      </Fragment>
    )
  }
}

const mapStateToProps = ({subtitles, subtitlesLoadingPercentage}) => ({
  subtitles,
  subtitlesLoadingPercentage
})
const mapDispatchToProps = dispatch => {
  return {
    onSubtitlesSelection: e => dispatch(handleSubtitlesFileLoading(e)),
    onVideoSelection: e => dispatch(handleVideoSelection(e)),
    onSave: (subtitles) => dispatch(handleSave(subtitles)),
    shiftSubtitles: (milliseconds, subtitles) => dispatch(handleSubtitlesShifting(milliseconds, subtitles))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FileSelectorsPanel)
