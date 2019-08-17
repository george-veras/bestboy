import React, {Component} from 'react'

import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class Remote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      connection: {},
      candidates: [],
      answer: {},
      messages: ""
    }

    this.candidatesTextbox = React.createRef()
    this.onReadCandidates = this.onReadCandidates.bind(this)
    this.receiveChannelCallback = this.receiveChannelCallback.bind(this)
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(this.props.location.search)
    const offer = JSON.parse(urlSearchParams.get("offer"))
    console.log('\x1b[36m%s\x1b[0m', "received offer:")
    console.log(offer)

    const connection = new RTCPeerConnection()
    connection.ondatachannel = this.receiveChannelCallback
    connection.onicecandidate = ({candidate}) => {
      console.log('\x1b[36m%s\x1b[0m', "onIceCandidate")
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
      connection
    })

    connection.setRemoteDescription(offer)
      .then(() => this.state.connection.createAnswer())
      .then(answer => {
        this.state.connection.setLocalDescription(answer)
        console.log("remoteDescription:")
        console.log(this.state.connection.remoteDescription.sdp)
        console.log("localDescription:")
        console.log(this.state.connection.localDescription.sdp)
        this.setState({
          answer
        })
      })
  }

  receiveChannelCallback(event) {
    console.log('Receive Channel Callback')
    this.receiveChannel = event.channel
    this.receiveChannel.onmessage = event => {
      const messages = `${this.state.messages}\n${event.data}`
      this.setState({
        messages
      })
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

  onReadCandidates(e) {
    console.log('onReadCandidates')
    const candidates = JSON.parse(this.candidatesTextbox.current.value)
    candidates.forEach(candidate => {
      const iceCandidateObj = new RTCIceCandidate(candidate)
      this.state.connection.addIceCandidate(iceCandidateObj)
    })
  }

  render() {
    return (
      <>
        <TitleAndMetaTags title={"Best Boy"} gtagId={gtagId} />
        <div className="App">
          <div className="body-card">
            <span className="bestboy-title">bestboy</span>
            {/* <input type="button" value="send message" onClick={this.onClick} /> */}
            <p>Answer:</p>
            <p>{JSON.stringify(this.state.answer)}</p>
            <p>Candidates:</p>
            <p>{JSON.stringify(this.state.candidates)}</p>
            <input
              type="text"
              ref={this.candidatesTextbox}
            />
            <input type="button" value="read candidates" onClick={this.onReadCandidates} />
            <p>{JSON.stringify(this.state.messages)}</p>
          </div>
        </div>
      </>
    )
  }
}

export default Remote
