import React, { Component } from 'react'

class LoadProgress extends Component {
  render() {
    return (
      <div className="load-progress">
        <div className="labels-container">
          <span>{this.props.label}</span>
          <span>{this.props.percentage}%</span>
        </div>
        <div className="progress-bar">
          <div className="filler" style={{width:`${this.props.percentage}%`}}></div>
        </div>
      </div>
    )
  }
}

export default LoadProgress
