import React, { Component } from 'react'
import { connect } from 'react-redux'
import FileSelector from './FileSelector'

import {
  handleSubtitlesFileLoading,
  handleVideoFileLoading,
} from '../actions'

class FileSelectorsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtitleStage: "selection",
      videoStage: "selection"
    }

    this.handleSubtitleSelection = this.handleSubtitleSelection.bind(this)
    this.handleVideoSelection = this.handleVideoSelection.bind(this)
  }

  handleSubtitleSelection(e) {
    this.setState({
      ...this.state,
      subtitleStage: "loading"
    })

    this.props.onSubtitlesSelection(e)

    this.setState({
      ...this.state,
      subtitleStage: "success"
    })
  }

  handleVideoSelection(e) {
    this.setState({
      ...this.state,
      videoStage: "loading"
    })

    this.props.onVideoSelection(e)

    this.setState({
      ...this.state,
      videoStage: "success"
    })
  }

  render() {
    return (
      <div className="file-selectors-panel">
        <FileSelector
          label={"Choose subtitle to load"}
          onFileChange={this.handleSubtitleSelection}
          fileLoadingTitle={`File: ${this.props.subtitleFileName}`}
          stage={this.state.subtitleStage}
          loadProgress={this.props.subtitlesLoadingPercentage}
        />
        <FileSelector
          label={"Choose video to load"}
          onFileChange={this.handleVideoSelection}
          fileLoadingTitle={`File: ${this.props.videoFileName}`}
          stage={this.state.videoStage}
          loadProgress={this.props.videoLoadingPercentage}
        />
      </div>
    )
  }
}

const mapStateToProps = ({subtitleFileName, subtitlesLoadingPercentage, videoFileName, videoLoadingPercentage}) => ({
  subtitlesLoadingPercentage,
  subtitleFileName,
  videoLoadingPercentage,
  videoFileName
})
const mapDispatchToProps = dispatch => {
  return {
    onSubtitlesSelection: e => dispatch(handleSubtitlesFileLoading(e)),
    onVideoSelection: e => dispatch(handleVideoFileLoading(e))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FileSelectorsPanel)
