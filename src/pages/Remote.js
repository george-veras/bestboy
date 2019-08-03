import React, {Component} from 'react'
import { connect } from 'react-redux'
import Peer from 'peerjs'

import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class Remote extends Component {
  constructor(props) {
    super(props)

    const peer = new Peer('esseaquiehopeerdoremote041085', {debug: 3})
    const conn = peer.connect('esseaquiehopeerdoqrcode041085')
    conn.on('open', () => {
      console.log("OPEEEEEEEEEEN")
      this.state.conn.send('hi!')
    })

    this.state = {
      conn
    }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    // this.state.conn.on('open', () => {
    //   console.log("OPEEEEEEEEEEN")
    //   this.state.conn.send('hi!')
    // })


    const urlSearchParams = new URLSearchParams(this.props.location.search)
    const offer = JSON.parse(urlSearchParams.get("q"))
    console.log("offer from quesrystring:")
    console.log(offer)
    const candidate = JSON.parse(urlSearchParams.get("c"))
    //offer.sdp = decodeURI(offer.sdp)

    this.localConnection = new RTCPeerConnection()
    this.localConnection.ondatachannel = this.receiveChannelCallback
    this.localConnection.onicecandidate = e => {
      console.log('\x1b[36m%s\x1b[0m', "onIceCandidate")
      console.log(e.candidate)
      //!e.candidate || this.localConnection.addIceCandidate(e.candidate)
    }

    // this.localConnection.setRemoteDescription(offer)
    //   .then(() => this.localConnection.createAnswer())
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

export default connect()(Remote)
