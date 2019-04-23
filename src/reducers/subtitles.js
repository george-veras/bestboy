import {
  LOAD_SUBTITLES
} from '../constants/ActionTypes'

const initialState = {
  fileContents: "",
  subtitles: [],
}

function handleFileSelection(e) {
  console.log("entrou no reducer")
  let file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = e => {
    const { result } = e.target
    const subtitlesContext = result.split("\n\n")
    const subtitles = subtitlesContext.map(raw => {
      const [ ordinal, timeRange, ...text ] = raw.split("\n")
      const [ start, end ] = timeRange.split(" --> ")

      return {
        ordinal,
        entersAt: start,
        leavesAt: end,
        text,
      }
    })
  }

  reader.readAsText(file)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_FILE':
      return handleFileSelection(action.payload)
    default:
      return state
  }
}
