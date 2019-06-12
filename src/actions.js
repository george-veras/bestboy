import fs from 'fs'

const getSubtitlesFileType = file => {
  const fileExtension = file.name.split(".").pop()
  let fileType
  switch(fileExtension) {
    case "vtt":
      fileType = "WebVTT"
      break
    case "srt":
      fileType = "SubRip"
      break
    default:
      break
  }

  return fileType
}

export const handleSubtitlesFileLoading = e => {
  return async function(dispatch) {

    dispatch(startFileLoading())

    const [ file ] = e.target.files
    const subtitlesFileType = getSubtitlesFileType(file)

    dispatch(updateSubtitlesPath(URL.createObjectURL(file)))

    const fileContents = await getFileContents(file)
    let subtitleObjs
    switch (subtitlesFileType) {
      case "WebVTT":
        subtitleObjs = getSubtitleObjsFromWebVTT(fileContents)
        break
      case "SubRip":
        subtitleObjs = getSubtitleObjsFromSubRip(fileContents)
        break
      default:
        break
    }

    dispatch(updateSubtitleObjs(subtitleObjs))

    dispatch(completeFileLoading())
  }
}

const getFileContents = file => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort()
      reject(new DOMException("There was problem parsing input file."))
    }

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.readAsText(file)
  })
}

export const handleVideoSelection = e => {
  return dispatch => {
    const [ file ] = e.target.files
    dispatch(updateVideoPath(URL.createObjectURL(file)))
  }
}

export const handleSave = subtitles => {

  return async function(dispatch) {
    const renderedText = renderWebVTTSubtitles(subtitles)
    const blob = new Blob([renderedText], {
      type: "text/vtt;charset=utf8;"
    })

    const anchor = document.createElement("a")
    document.body.appendChild(anchor)
    anchor.setAttribute("href", window.URL.createObjectURL(blob))
    anchor.setAttribute("download", "test.vtt")
    anchor.style.display = ""

    anchor.click()

    document.body.removeChild(anchor)

  }
}

const renderWebVTTSubtitles = subtitles => {

  let renderedText = "WEBVTT\n\n"

  renderedText = subtitles.reduce((text, subtitleObj) => {
    text += `\n${castMsToSrt(subtitleObj.start)} --> ${castMsToSrt(subtitleObj.end)}\n`

    text += subtitleObj.text.reduce((text, textLine) => {
      text += `${textLine}\n`
      return text
    }, "")

    return text + '\n'
  }, renderedText)

  return renderedText
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

export const getSubtitleObjsFromSubRip = rawText => {

  const rawSubtitles = rawText.split(/\r\n\r\n|\n\n/)

  const subtitleObjs = rawSubtitles.map(raw => {
    const [ ordinal, timeRange, ...text ] = raw.split(/\r\n|\n/)
    const [ startSrtPattern, endSrtPattern ] = timeRange.split(" --> ")

    return {
      ordinal,
      start: srtTimeToMilliseconds(startSrtPattern),
      end: srtTimeToMilliseconds(endSrtPattern),
      text
    }
  })

  return subtitleObjs
}

export const getSubtitleObjsFromWebVTT = rawText => {

  const rawSubtitles = rawText.split(/\r\n\r\n|\n\n/)
  rawSubtitles.shift()

  const subtitleObjs = rawSubtitles.map(raw => {
    const [ timeRange, ...text ] = raw.split(/\r\n|\n/)
    const [ startWebvttPattern, endWebvttPattern ] = timeRange.split(" --> ")

    return {
      start: webvttTimeToMilliseconds(startWebvttPattern),
      end: webvttTimeToMilliseconds(endWebvttPattern),
      text
    }
  })

  return subtitleObjs
}

export const srtTimeToMilliseconds = srtTime => {
  const [ hours, minutes, seconds ] = srtTime.split(":")

  let milliseconds
  milliseconds = parseInt(seconds.replace(',',''))
  milliseconds += parseInt(minutes) * 60 * 1000
  milliseconds += parseInt(hours) * 60 * 60 * 1000

  return milliseconds
}

export const webvttTimeToMilliseconds = webvttTime => {

  const time = webvttTime.split(":")

  let milliseconds = parseInt(time.pop().replace('.',''))  // pop seconds
  milliseconds += parseInt(time.pop()) * 60 * 1000         // pop minutes
  if (time.length)
    milliseconds += parseInt(time.pop()) * 60 * 60 * 1000  // pop hours

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
