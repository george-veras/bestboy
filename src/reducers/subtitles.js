import {
  LOAD_SUBTITLES
} from '../constants/ActionTypes'

const initialState = {
  fileContents: "",
  subtitles: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUBTITLES:
      return state
    default:
      return state
  }
}
