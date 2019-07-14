import React, {Component} from 'react'
import { connect } from 'react-redux'

import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class Remote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sendChannel: {}
    }

    this.onSendChannelStateChange = this.onSendChannelStateChange.bind(this)
    this.receiveChannelCallback = this.receiveChannelCallback.bind(this)
    this.sendData = this.sendData.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    console.log('Start componentDidMount')

    this.localConnection = new RTCPeerConnection()
    const sChannel = this.localConnection.createDataChannel('sendDataChannel')
    console.log('Created send data channel: ' + sChannel)
    sChannel.onopen = this.onSendChannelStateChange
    sChannel.onclose = this.onSendChannelStateChange
    this.setState({
      sendChannel: sChannel
    })

    this.remoteConnection = new RTCPeerConnection()
    console.log('Created remote peer connection object remoteConnection')
    this.remoteConnection.ondatachannel = this.receiveChannelCallback

    this.localConnection.onicecandidate = e => {
      console.log('\x1b[36m%s\x1b[0m', "onIceCandidate from localConnection")
      console.log(e.candidate)
      !e.candidate || this.remoteConnection.addIceCandidate(e.candidate)
    }
    this.remoteConnection.onicecandidate = e => {
      console.log('\x1b[36m%s\x1b[0m', "onIceCandidate from remoteConnection")
      console.log(e.candidate)
      !e.candidate || this.localConnection.addIceCandidate(e.candidate)
    }

    this.localConnection.createOffer()
      .then(offer => this.localConnection.setLocalDescription(offer))
      .then(() => this.remoteConnection.setRemoteDescription(this.localConnection.localDescription))
      .then(() => this.remoteConnection.createAnswer())
      .then(answer => this.remoteConnection.setLocalDescription(answer))
      .then(() => this.localConnection.setRemoteDescription(this.remoteConnection.localDescription))
  }

  onSendChannelStateChange() {
    const readyState = this.state.sendChannel.readyState
    console.log('Send channel state is: ' + readyState)
  }

  receiveChannelCallback(event) {
    console.log('Receive Channel Callback')
    this.receiveChannel = event.channel
    this.receiveChannel.onmessage = event => {
      console.log('Received Message: ' + event.data)
    }
    this.receiveChannel.onopen = () => {
      const readyState = this.receiveChannel.readyState
      console.log(`Receive channel state is: ${readyState}`)
    }
    this.receiveChannel.onclose = () => {
      const readyState = this.receiveChannel.readyState
      console.log(`Receive channel state is: ${readyState}`)
    }
  }

  onClick(e) {
    this.sendData()
  }

  render() {
    return (
      <>
        <TitleAndMetaTags title={"Best Boy"} gtagId={gtagId} />
        <div className="App">
          <div className="body-card">
            <span className="bestboy-title">bestboy</span>
            <input type="button" value="send message" onClick={this.onClick} />
          </div>
        </div>
      </>
    )
  }
}

export default connect()(Remote)
