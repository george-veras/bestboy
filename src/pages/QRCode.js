import React, {Component} from 'react'
//import QRCodeComponent from 'qrcode.react'

import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class QRCode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      remotePageLink: "http://192.168.2.4:3000/remote",
      connection: {},
      dataChannel: {}
    }

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
          remotePageLink: `http://192.168.2.4:3000/remote?c=${JSON.stringify(candidate)}`
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
        console.log("connection:")
        console.log(this.state.connection)
        console.log("offer / localDescription:")
        console.log(this.state.connection.localDescription.sdp)
      })
  }

  render() {
    return (
      <>
        <TitleAndMetaTags title={"Best Boy"} gtagId={gtagId} />
        <div className="App">
          <div className="body-card">
            <span className="bestboy-title">bestboy</span>
            {/* <QRCodeComponent
              value={`http://192.168.2.4:3000/remote?q=${this.state.qrcode}&c=${this.state.candidateQRCode}`}
              includeMargin={true}
              level={"L"}
              size={256}
            /> */}
            <input type="button" value="create offer" onClick={this.onClickCreateOffer} />
            <a href={this.state.remotePageLink} style={{color:'white'}} target="blank">{this.state.remotePageLink}</a>
          </div>
        </div>
      </>
    )
  }
}

export default QRCode
