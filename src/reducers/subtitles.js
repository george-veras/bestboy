const INITIAL_STATE = {
  loadingFile: false,
  fileContents: "",
  subtitles: [],
}

const subtitles = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_LOAD_STATE':
      return {
        ...state,
        loadingFile: true
      }
    case 'LOAD_FILE_SUCCESS':
      console.log(action.payload)
      return {
        loadingFile: false,
        fileContents: action.payload.fileContents,
        subtitles: action.payload.subtitles
      }
    default:
      return state
  }
}

export default subtitles
