import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { handleFileLoading, handleSubtitlesShifting } from './../actions'

class FileSelector extends Component {
  render() {
    return (
      <Fragment>
        <input type="file" onChange={this.props.onFileSelection} />
        {/* <div>
          {
            JSON.stringify(this.props.subtitles)
          }
        </div> */}
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
    shiftSubtitles: (milliseconds, subtitles) => dispatch(handleSubtitlesShifting(milliseconds, subtitles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector)
