import fs from 'fs'

export const handleFileLoading = e => {
  return dispatch => {

    dispatch(startFileLoading())

    let file = e.target.files[0]
    dispatch(updateSubtitlesPath(URL.createObjectURL(file)))

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

export const handleWebVTTFileLoading = e => {
  return dispatch => {

    dispatch(startFileLoading())

    const [ file ] = e.target.files
    dispatch(updateSubtitlesPath(URL.createObjectURL(file)))

    const reader = new FileReader()
    reader.onload = readEvt => {

      const { result: fileContents } = readEvt.target
      dispatch(loadRawContents(fileContents))

      loadSubtitleObjsFromWebVTT(fileContents)(dispatch)
      dispatch(completeFileLoading())
    }

    reader.readAsText(file)
  }
}

export const handleVideoSelection = e => {
  return dispatch => {

    const [ file ] = e.target.files
    dispatch(updateVideoPath(URL.createObjectURL(file)))
  }
}

export const saveSubtitles = subtitles => {

  const fileContents = subtitles.reduce((contents, subtitleObj) => {

    contents += subtitleObj.ordinal
    contents += `\n${subtitleObj.start} --> ${subtitleObj.end}\n`

    contents += subtitleObj.text.reduce((text, textLine) => {
      text += `${textLine}\n`
      return text
    })

    return contents
  }, "")

  let writeStream = fs.createWriteStream("test.srt")
  writeStream.write(fileContents)

  writeStream.on("finish", () => {
    console.log("FINISH")
  })

  writeStream.end()
}

export const handleSubtitlesShifting = (milliseconds, subtitles) => {
  return dispatch => {

    const shiftedSubtitles = subtitles.map(subtitle => {
      subtitle.start += milliseconds
      subtitle.end += milliseconds
      return subtitle
    })

    dispatch(updateSubtitleObjs(shiftedSubtitles))
  }
}

export const castMsToSrt = milliseconds => {

  let seconds = Math.floor(milliseconds / 1000)
  let minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  milliseconds = milliseconds % 1000
  seconds = seconds % 60
  minutes = minutes % 60

  return (hours < 10 ? '0' : '') + hours + ':'
       + (minutes < 10 ? '0' : '') + minutes + ':'
       + (seconds < 10 ? '0' : '') + seconds + ','
       + (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds
}

export const loadSubtitleObjs = rawText => {
  return dispatch => {
    const rawSubtitles = rawText.split(/\r\n\r\n|\n\n/)

    const subtitleObjs = rawSubtitles.map(raw => {
      const [ ordinal, timeRange, ...text ] = raw.split(/\r\n|\n/)
      const [ startSrtPattern, endSrtPattern ] = timeRange.split(" --> ")

      return {
        ordinal,
        start: srtTimeToMilliseconds(startSrtPattern),
        end: srtTimeToMilliseconds(endSrtPattern),
        text,
      }
    })

    dispatch(updateSubtitleObjs(subtitleObjs))
  }
}

export const loadSubtitleObjsFromWebVTT = rawText => {
  return dispatch => {
    const rawSubtitles = rawText.split(/\r\n\r\n|\n\n/)

    const subtitleObjs = rawSubtitles.map(raw => {
      const [ ordinal, timeRange, ...text ] = raw.split(/\r\n|\n/)
      const [ startSrtPattern, endSrtPattern ] = timeRange.split(" --> ")

      return {
        ordinal,
        start: srtTimeToMilliseconds(startSrtPattern),
        end: srtTimeToMilliseconds(endSrtPattern),
        text,
      }
    })

    dispatch(updateSubtitleObjs(subtitleObjs))
  }
}

export const srtTimeToMilliseconds = srtTime => {
  const [ hours, minutes, seconds ] = srtTime.split(":")

  let milliseconds
  milliseconds = parseInt(seconds.replace(',',''))
  milliseconds += parseInt(minutes) * 60 * 1000
  milliseconds += parseInt(hours) * 60 * 60 * 1000

  return milliseconds
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

export const updateVideoPath = videoPath => {
  return {
    type: 'UPDATE_VIDEO_PATH',
    payload: videoPath
  }
}

export const updateSubtitlesPath = subtitlesPath => {
  return {
    type: 'UPDATE_SUBTITLES_PATH',
    payload: subtitlesPath
  }
}
