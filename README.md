# 🎬 Bestboy

**A browser-based media player with subtitle support and WebSocket-powered remote control.**

Load a video and a subtitle file, watch with synced captions — then scan a QR code on your phone and control playback from the couch.

[![Netlify Status](https://api.netlify.com/api/v1/badges/cb8894af-7516-4ee1-839d-73bb31485fb3/deploy-status)](https://app.netlify.com/sites/bestboy/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ Features

- **Subtitle-synced playback** — load any local video file alongside a `.srt` or `.vtt` subtitle file and watch them perfectly in sync, no upload required (all processing happens in the browser)
- **Remote control via QR code** — the app generates a QR code linking to a companion remote page; scan it with any phone and control video playback over a WebSocket connection (no app install needed)
- **Zero-dependency playback** — uses the native HTML5 `<video>` element with `<track>` for subtitle rendering, so it works in any modern browser
- **Redux state management** — file paths and playback state flow through a Redux store, making the architecture easy to extend

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 17 + Redux + Redux Thunk |
| Routing | React Router 5 |
| Real-time comms | Socket.IO client (WebSocket) |
| Peer-to-peer | WebRTC (for remote control signalling) |
| QR code | qrcode.react |
| Styling | Sass |
| Deployment | Netlify |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 14 (see `.nvmrc`)
- Yarn

### Install & run

```bash
git clone https://github.com/george-veras/bestboy.git
cd bestboy
yarn install
yarn start
```

The app opens at `http://localhost:3000`.

### Remote control (optional)

The remote control feature requires the companion backend server:

```bash
# In a separate terminal
git clone https://github.com/george-veras/bestboy-backend.git
cd bestboy-backend
yarn install
yarn start   # starts the Socket.IO server on port 3001
```

Once both are running:
1. Open the app and load a video + subtitle file
2. Click **Generate QR Code**
3. Scan the QR code with your phone
4. Control playback from the remote page on your phone

---

## 📁 Project Structure

```
src/
├── components/
│   ├── VideoPlayer.js        # HTML5 video player with subtitle track
│   ├── FileSelectorsPanel.js # UI for loading local video + subtitle files
│   ├── QRCodeGenerator.js    # QR code + WebSocket/WebRTC remote setup
│   └── FileSelector.js       # Individual file input component
├── pages/
│   ├── index.js              # Main player page
│   ├── Remote.js             # Phone remote control page
│   └── QRCode.js             # QR code display page
├── reducers/
│   └── index.js              # Redux state: videoPath, subtitlesPath
├── actions.js                # Redux action creators
└── app-constants.js          # Version + analytics config
```

---

## 🎯 Supported Formats

| File type | Support |
|---|---|
| `.srt` | ✅ |
| `.vtt` (WebVTT) | ✅ |
| Video formats | Any format supported by your browser (mp4, webm, ogg) |

---

## 📄 License

MIT © [George Véras Valentim](https://github.com/george-veras)
