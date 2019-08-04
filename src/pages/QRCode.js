import React, {Component} from 'react'
import { connect } from 'react-redux'
import QRCodeComponent from 'qrcode.react'
import Peer from 'peerjs'

import TitleAndMetaTags from '../components/TitleAndMetaTags'
import { gtagId } from '../app-constants'

class QRCode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      qrcode: "",
      localConnection: {},
      dataChannel: {},
      candidateQRCode: {},
      peer
    }
  }

  connection(conn) {
    console.log('CONNECTION OPEN!!!!!!!')
    console.log(conn)
    conn.on('data', data => {
      console.log(data)
    })
  }

  componentDidMount() {
    // console.log(this.state.peer)
    // this.state.peer.on('connection', conn => {
    //   console.log('CONNECTION OPEN!!!!!!!')
    //   console.log(conn)
    //   conn.on('data', data => {
    //     console.log(data)
    //   })
    // })


    // this.localConnection = new RTCPeerConnection()
    // const dChannel = this.localConnection.createDataChannel('dataChannel')
    // console.log('Created data channel: ' + dChannel)
    // dChannel.onopen = this.onSendChannelStateChange
    // dChannel.onclose = this.onSendChannelStateChange

    // this.localConnection.onicecandidate = e => {
    //   console.log('\x1b[36m%s\x1b[0m', "onIceCandidate")
    //   console.log(e.candidate)
    //   if (e.candidate) {
    //     this.setState({
    //       candidateQRCode: JSON.stringify(e.candidate)
    //     })
    //     console.log(`http://192.168.2.4:3000/remote?q=${this.state.qrcode}&c=${this.state.candidateQRCode}`)
    //     //console.log("localhost:3000/remote?q=" + encodeURI(JSON.stringify(this.state.qrcode)) + "&c=" + encodeURI(JSON.stringify(this.state.candidateQRCode)))
    //   }
    //   //!e.candidate || this.localConnection.addIceCandidate(e.candidate)
    // }

    // this.localConnection.createOffer()
    //   .then(offer => {
    //     this.localConnection.setLocalDescription(offer)
    //     console.log("localConnection:")
    //     console.log(this.localConnection)
    //     console.log("offer / localDescription:")
    //     console.log(this.localConnection.localDescription.sdp)
    //     //console.log("localhost:3000/remote?q=" + encodeURI(JSON.stringify(offer)) + "&c=" + encodeURI(JSON.stringify(this.state.candidateQRCode)))
    //     //console.log(`http://192.168.2.4:3000/remote?q=${encodeURI(JSON.stringify(offer))}&c=${encodeURI(JSON.stringify(this.state.candidateQRCode))}`)
    //     this.setState({
    //       localConnection: this.localConnection,
    //       qrcode: JSON.stringify(offer),
    //       dataChannel: dChannel
    //     })
    //   })
  }

  // onSendChannelStateChange() {
  //   const readyState = this.state.dataChannel.readyState
  //   console.log('Data channel state is: ' + readyState)
  // }

  // onClick(e) {
  //   const text = this.fileInput.current.value
  //   const mockedAnswer = {
  //     type: "answer",
  //     sdp: `v=0\r\no=- ${text} 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=msid-semantic: WMS\r\n`
  //   }
  //   console.log("mockedAnswer")
  //   console.log(mockedAnswer)
  //   this.state.localConnection.setRemoteDescription(mockedAnswer)
  // }

  render() {
    return (
      <>
        <TitleAndMetaTags title={"Best Boy"} gtagId={gtagId} />
        <div className="App">
          <div className="body-card">
            <span className="bestboy-title">bestboy</span>
            <QRCodeComponent
              value={`http://192.168.2.4:3000/remote?q=${this.state.qrcode}&c=${this.state.candidateQRCode}`}
              includeMargin={true}
              level={"L"}
              size={256}
            />
            <input type="text" defaultValue="" ref={this.fileInput} />
            <input type="text" defaultValue={"localhost:3000/remote?q=" + encodeURI(JSON.stringify(this.state.qrcode)) + "&c=" + encodeURI(JSON.stringify(this.state.candidateQRCode))} />
            <input type="button" value="set" onClick={this.onClick} />
          </div>
        </div>
      </>
    )
  }
}

export default connect()(QRCode)
