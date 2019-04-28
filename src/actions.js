'use strict'

export const handleFileLoading = (e) => {
  return dispatch => {

    dispatch(startFileLoading())

    let file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = readEvt => {

      const { result: fileContents } = readEvt.target
      dispatch(loadRawContents(fileContents))

      loadSubtitleObjs(fileContents)(dispatch)
      dispatch(completeFileLoading())
    }

    reader.readAsText(file)
  }
}

export const loadSubtitleObjs = (rawText) => {
  return dispatch => {
    const rawSubtitles = rawText.split(/\r\n\r\n|\n\n/)

    const subtitleObjs = rawSubtitles.map(raw => {
      const [ ordinal, timeRange, ...text ] = raw.split(/\r\n|\n/)
      const [ start, end ] = timeRange.split(" --> ")

      return {
        ordinal,
        entersAt: start,
        leavesAt: end,
        text,
      }
    })

    dispatch(updateSubtitleObjs(subtitleObjs))
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

export const updateSubtitleObjs = subtitles => {
  return {
    type: 'UPDATE_SUBTITLES',
    payload: subtitles
  }
}
