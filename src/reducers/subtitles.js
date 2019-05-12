const INITIAL_STATE = {
  loadingFile: false,
  subtitleFileContents: "",
  subtitles: [],
  videoPath: ""
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
    default:
      return state
  }
}

export default subtitles
