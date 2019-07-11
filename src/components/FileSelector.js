import React, { Component } from 'react'
import LoadProgress from './LoadProgress'

import checked from '../images/checked.svg'

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
          label={this.props.fileLoadingTitle}
          percentage={this.props.loadProgress}
          onProgressCompletion={this.props.onLoadCompletion}
        />
        break;
      case 'success':
        stage = <>
          <img src={checked} alt="green check"></img>
          <span className="success-msg">uploaded successfully</span>
        </>
        break;
      case 'selection':
      default:
        stage = <>
          <span className="label">{this.props.label}</span>
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
