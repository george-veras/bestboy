import React, {Component} from 'react'

import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class Remote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      connection: {}
    }
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(this.props.location.search)
    const candidate = JSON.parse(urlSearchParams.get("c"))
    console.log('\x1b[36m%s\x1b[0m', "received Candidate:")
    console.log(candidate)
    //offer.sdp = decodeURI(offer.sdp)

    const connection = new RTCPeerConnection()
    connection.ondatachannel = this.receiveChannelCallback
    connection.onicecandidate = e => {
      console.log('\x1b[36m%s\x1b[0m', "onIceCandidate")
      console.log(e.candidate)
      //!e.candidate || this.localConnection.addIceCandidate(e.candidate)
    }
    const iceCandidateObj = new RTCIceCandidate(candidate)
    connection.addIceCandidate(iceCandidateObj)

    this.setState({
      connection
    })

    // this.state.connection.setRemoteDescription(offer)
    //   .then(() => this.state.connection.createAnswer())
    //   .then(answer => {
    //     this.localConnection.setLocalDescription(answer)
    //     console.log("remoteDescription:")
    //     console.log(this.localConnection.remoteDescription.sdp)
    //     console.log("localDescription:")
    //     console.log(this.localConnection.localDescription.sdp)
    //   })
    //   .then(() => {
    //     console.log("candidate:")
    //     console.log(candidate)
    //     this.localConnection.addIceCandidate(candidate)
    //   })
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
    //this.sendData()
    console.log('this.state.conn.send')
    console.log(this.state.conn)
    this.state.conn.send('hi!')
  }

  sendData() {
    const data = "Sample Text"
    this.state.sendChannel.send(data)
    console.log('Sent Data: ' + data)
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

export default Remote
