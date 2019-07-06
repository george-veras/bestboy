import React, { Component } from 'react'
import LoadProgress from './LoadProgress'

class FileSelector extends Component {
  constructor(props) {
    super(props)
    this.fileInput = React.createRef()
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick() {
    this.fileInput.current.click()
  }

  render() {
    let stage
    switch(this.props.stage) {
      case 'loading':
        stage = <LoadProgress
          label={"File: subtitle_StarWars.srt"}
          percentage={this.props.loadProgress}
        />
        break;
      case 'selection':
      default:
        stage = <>
          <span>{this.props.label}</span>
          <input
            type="button"
            value="+ add file"
            className="button"
            onClick={this.handleButtonClick}
          />
        </>
        break;
    }

    return (
      <div className="file-selector">
        {stage}
        {/* {
          this.props.isLoading ?
            <LoadProgress
              label={"File: subtitle_StarWars.srt"}
              percentage={this.props.loadProgress}
            />
            :
            <>
              <span>{this.props.label}</span>
              <input
                type="button"
                value="+ add file"
                className="button"
                onClick={this.handleButtonClick}
              />
            </>
        } */}
        <input
          id="fileInput"
          type="file"
          className="input-file"
          onChange={this.props.onFileChange}
          ref={this.fileInput}
        />
      </div>
    )
  }
}

export default FileSelector
