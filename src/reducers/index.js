const INITIAL_STATE = {
  subtitleFileContents: "",
  subtitles: [],
  videoPath: "",
  videoFileName: "",
  subtitleFileName: "",
  subtitlesPath: "",
  subtitlesLoadingPercentage: 0,
  videoLoadingPercentage: 0,
  sdp: ""
}

const subtitles = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FILE_LOADING_START':
      return {
        ...state,
        loadingFile: true
      }
    case 'FILE_LOADING_COMPLETE':
      return {
        ...state,
        loadingFile: false
      }
    case 'LOAD_CONTENT':
      return {
        ...state,
        fileContents: action.payload
      }
    case 'UPDATE_SUBTITLES':
      return {
        ...state,
        subtitles: action.payload
      }
    case 'UPDATE_VIDEO_PATH':
      return {
        ...state,
        videoPath: action.payload
      }
    case 'UPDATE_SUBTITLES_PATH':
      return {
        ...state,
        subtitlesPath: action.payload
      }
    case 'UPDATE_SUBTITLES_LOADING_PERCENTAGE':
      return {
        ...state,
        subtitlesLoadingPercentage: action.payload
      }
    case 'UPDATE_VIDEO_LOADING_PERCENTAGE':
      return {
        ...state,
        videoLoadingPercentage: action.payload
      }
    case 'UPDATE_VIDEO_FILE_NAME':
      return {
        ...state,
        videoFileName: action.payload
      }
    case 'UPDATE_SUBTITLE_FILE_NAME':
      return {
        ...state,
        subtitleFileName: action.payload
      }
    case 'UPDATE_SDP':
      return {
        ...state,
        sdp: action.payload
      }
    default:
      return state
  }
}

export default subtitles
