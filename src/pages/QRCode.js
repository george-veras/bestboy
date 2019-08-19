import React, {Component} from 'react'

import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class QRCode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      remotePageLink: "https://app.bestboy.io/remote",
      connection: {},
      dataChannel: {},
      candidates: []
    }

    this.candidatesTextbox = React.createRef()
    this.answerTextbox = React.createRef()
    this.onReadCandidates = this.onReadCandidates.bind(this)
    this.onReadAnswer = this.onReadAnswer.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.onSendChannelStateChange = this.onSendChannelStateChange.bind(this)
    this.onClickCreateOffer = this.onClickCreateOffer.bind(this)
  }

  componentDidMount() {
    const connection = new RTCPeerConnection()
    const dataChannel = connection.createDataChannel('dataChannel')
    console.log('Created the data channel')

    dataChannel.onopen = this.onSendChannelStateChange
    dataChannel.onclose = this.onSendChannelStateChange

    connection.onicecandidate = ({candidate}) => {
      console.log('\x1b[36m%s\x1b[0m', "onIceCandidate:")
      console.log(candidate)
      if (candidate) {
        this.setState({
          candidates: [
            ...this.state.candidates,
            candidate
          ]
        })
      }
    }

    this.setState({
      connection,
      dataChannel
    })
  }

  onSendChannelStateChange() {
    const readyState = this.state.dataChannel.readyState
    console.log('Data channel state is: ' + readyState)
  }

  onClickCreateOffer() {
    this.state.connection.createOffer()
      .then(offer => {
        this.state.connection.setLocalDescription(offer)
        console.log("offer / localDescription:")
        console.log(this.state.connection.localDescription.sdp)
        this.setState({
          remotePageLink: `https://app.bestboy.io/remote?offer=${JSON.stringify(offer)}`
        })
      })
  }

  onReadCandidates(e) {
    console.log('onReadCandidates')
    const candidates = JSON.parse(this.candidatesTextbox.current.value)
    candidates.forEach(candidate => {
      const iceCandidateObj = new RTCIceCandidate(candidate)
      this.state.connection.addIceCandidate(iceCandidateObj)
    })
  }

  onReadAnswer(e) {
    console.log('onReadAnswer')
    const answer = JSON.parse(this.answerTextbox.current.value)
    this.state.connection.setRemoteDescription(answer)
  }

  onSendMessage(e) {
    console.log('onSendMessage')
    this.state.dataChannel.send("HELLO WORLD!")
  }

  render() {
    return (
      <>
        <TitleAndMetaTags title={"Best Boy"} gtagId={gtagId} />
        <div className="App">
          <div className="body-card">
            <span className="bestboy-title">bestboy</span>
            <input type="button" value="create offer" onClick={this.onClickCreateOffer} />
            <a href={this.state.remotePageLink} style={{color:'white'}} target="blank">{this.state.remotePageLink}</a>
            <p>{JSON.stringify(this.state.candidates)}</p>
            <input type="text" ref={this.answerTextbox} />
            <input type="button" value="read answer" onClick={this.onReadAnswer} />
            <input type="text" ref={this.candidatesTextbox} />
            <input type="button" value="read candidates" onClick={this.onReadCandidates} />
            <input type="button" value="send HELLO WORLD!" onClick={this.onSendMessage} />
          </div>
        </div>
      </>
    )
  }
}

export default QRCode
