import React, { Component } from 'react'

class LoadProgress extends Component {
  constructor(props) {
    super(props)
    this.handleFillerTransitionEnd = this.handleFillerTransitionEnd.bind(this)
  }

  handleFillerTransitionEnd() {
    if (this.props.percentage === 100)
      this.props.onProgressCompletion()
  }

  render() {
    return (
      <div className="load-progress">
        <div className="labels-container">
          <span>{this.props.label}</span>
          <span>{this.props.percentage}%</span>
        </div>
        <div className="progress-bar">
          <div className="filler" onTransitionEnd={this.handleFillerTransitionEnd} style={{width:`${this.props.percentage}%`}}></div>
        </div>
      </div>
    )
  }
}

export default LoadProgress
