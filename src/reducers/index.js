const INITIAL_STATE = {
  loadingFile: false,
  subtitleFileContents: "",
  subtitles: [],
  videoPath: "",
  subtitlesPath: "",
  subtitlesLoadingPercentage: 0,
  videoLoadingPercentage: 0,
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
    default:
      return state
  }
}

export default subtitles
