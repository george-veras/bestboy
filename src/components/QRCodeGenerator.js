import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import io from 'socket.io-client'

class QRCodeGenerator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      remotePageLink: "",
      connection: {},
      dataChannel: {},
      qrcodeActive: false,
      socket: null
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.createOffer = this.createOffer.bind(this)
    this.createPeerConnection = this.createPeerConnection.bind(this)
  }

  handleButtonClick() {
    const socket = io.connect('http://localhost:3001')
    socket.on('message', message => {
      alert('The server has a message for you: ' + message)
    })
    socket.on('connect', () => {
      console.log('socket.io connected')
      this.setState({
        socket
      }, this.createPeerConnection)
    })
  }

  createPeerConnection() {
    const connection = new RTCPeerConnection()
    const dataChannel = connection.createDataChannel('dataChannel')

    // dataChannel.onopen = this.onSendChannelStateChange
    // dataChannel.onclose = this.onSendChannelStateChange

    connection.onicecandidate = ({candidate}) => {
      console.log('\x1b[36m%s\x1b[0m', "Sending ICE Candidate:")
      console.log(candidate)
      if (candidate) {
        this.state.socket.emit('candidate', candidate)
      }
    }

    this.setState({
      connection,
      dataChannel
    }, this.createOffer)
  }

  createOffer() {
    this.state.connection.createOffer()
      .then(offer => {
        this.state.connection.setLocalDescription(offer)
        this.setState({
          remotePageLink: `https://app.bestboy.io/remote-beta?offer=${JSON.stringify(offer)}`,
          qrcodeActive: true
        })
      })
  }

  render() {
    return (
      <div className="file-selector">
        <span className="label">Activate remote control</span>
        {
          this.state.qrcodeActive ?
            <QRCode
              value={this.state.remotePageLink}
              level={"L"}
              includeMargin={true}
              size={256}
            />
            :
            <input
              type="button"
              value="generate QR Code"
              className="button"
              onClick={this.handleButtonClick}
            />
        }
      </div>
    )
  }
}

export default QRCodeGenerator
