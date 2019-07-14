import React, {Component} from 'react'
import { connect } from 'react-redux'

import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class Remote extends Component {
  constructor(props) {
    super(props)

    this.gotDescription1 = this.gotDescription1.bind(this)
    this.gotDescription2 = this.gotDescription2.bind(this)
    //this.onIceCandidate = this.onIceCandidate.bind(this)
  }

  componentDidMount() {
    this.localConnection = new RTCPeerConnection()
    this.sendChannel = this.localConnection.createDataChannel('sendDataChannel')
    console.log('Created send data channel')

    this.sendChannel.onopen = this.onSendChannelStateChange

    // this.localConnection.onicecandidate = e => {
    //   onIceCandidate(this.localConnection, e)
    // }

    this.remoteConnection = new RTCPeerConnection()
    console.log('Created remote peer connection object remoteConnection')

    this.localConnection.createOffer().then(
      this.gotDescription1,
      this.onCreateSessionDescriptionError
    )
  }

  onSendChannelStateChange() {
    const readyState = this.sendChannel.readyState
    console.log('Send channel state is: ' + readyState)
    if (readyState === 'open') {
      dataChannelSend.disabled = false;
      dataChannelSend.focus();
      sendButton.disabled = false;
      closeButton.disabled = false;
    } else {
      dataChannelSend.disabled = true;
      sendButton.disabled = true;
      closeButton.disabled = true;
    }
  }

  sendData() {
    const data = "Sample text to be sent"
    this.sendChannel.send(data)
    console.log('Sent Data: ' + data)
  }

  // onIceCandidate(pc, event) {
  //   getOtherPc(pc)
  //     .addIceCandidate(event.candidate)
  //     .then(
  //       () => onAddIceCandidateSuccess(pc),
  //       err => onAddIceCandidateError(pc, err)
  //     )
  //   console.log(`${getName(pc)} ICE candidate: ${event.candidate ? event.candidate.candidate : '(null)'}`);
  // }

  gotDescription1(desc) {
    this.localConnection.setLocalDescription(desc)
    console.log(`Offer from localConnection\n${desc.sdp}`)
    this.remoteConnection.setRemoteDescription(desc)
    this.remoteConnection.createAnswer().then(
      this.gotDescription2,
      this.onCreateSessionDescriptionError
    )
  }

  gotDescription2(desc) {
    this.remoteConnection.setLocalDescription(desc)
    console.log(`Answer from remoteConnection\n${desc.sdp}`)
    this.localConnection.setRemoteDescription(desc)
  }

  onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
  }

  render() {
    return (
      <>
        <TitleAndMetaTags title={"Best Boy"} gtagId={gtagId} />
        <div className="App">
          <div className="body-card">
            <span className="bestboy-title">bestboy</span>
          </div>
        </div>
      </>
    )
  }
}

export default connect()(Remote)
