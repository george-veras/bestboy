export const loadFile = (e) => {
  return dispatch => {
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

      dispatch(loadFileSuccess({
        fileContents: result,
        subtitles
      }))
    }

    reader.readAsText(file)
  }
}

export const loadFileSuccess = (payload) => {
  return {
    type: 'LOAD_FILE_SUCCESS',
    payload
  }
}
