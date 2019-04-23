export const handleFileLoading = (e) => {
  return dispatch => {

    dispatch(setLoadState())

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

export const startFileLoading = () => {
  return {
    type: 'FILE_LOADING_START'
  }
}

export const completeFileLoading = ({ fileContents, subtitles }) => {
  return {
    type: 'FILE_LOADING_COMPLETE'
  }
}

export const loadRawContents = (contents) => {
  return {
    type: 'LOAD_CONTENT',
    payload: contents
  }
}

export const updateSubtitles = (subtitles) => {
  return {
    type: 'UPDATE_SUBTITLES',
    payload: subtitles
  }
}
