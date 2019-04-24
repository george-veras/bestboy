export const handleFileLoading = (e) => {
  return dispatch => {

    dispatch(startFileLoading())

    let file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = e => {

      const { results: contents } = e.target
      dispatch(loadRawContents(contents))

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

      dispatch(updateSubtitles(subtitles))
    }

    reader.readAsText(file)
  }
}

export const startFileLoading = () => {
  return {
    type: 'FILE_LOADING_START'
  }
}

export const completeFileLoading = () => {
  return {
    type: 'FILE_LOADING_COMPLETE'
  }
}

export const loadRawContents = contents => {
  return {
    type: 'LOAD_CONTENT',
    payload: contents
  }
}

export const updateSubtitles = subtitles => {
  return {
    type: 'UPDATE_SUBTITLES',
    payload: subtitles
  }
}
