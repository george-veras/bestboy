'use strict'

import fs from 'fs'
import path from 'path'

import { loadSubtitleObjs } from './actions'

describe('actions.js', () => {

  describe('loadSubtitlesObjs(rawText)', () => {

    const mockedDispatch1 = jest.fn()
    let rawText

    beforeAll(() => {
      const subtitlePath = path.join(__dirname, './example.srt')
      rawText = fs.readFileSync(subtitlePath, { "encoding": "utf8" })
      loadSubtitleObjs(rawText)(mockedDispatch1)
    })

    test('should return a function that triggers an injected dispatcher with loaded subtitle objects.', () => {
      expect(mockedDispatch1.mock.calls.length).toBe(1)
      expect(mockedDispatch1.mock.calls[0][0]).toEqual({
        type: "UPDATE_SUBTITLES",
        payload: [
          {
            ordinal: "1",
            entersAt: "00:02:17,440",
            leavesAt: "00:02:20,375",
            text: [
              "Senator, we're making",
              "our final approach into Coruscant."
            ]
          },
          {
            ordinal: "2",
            entersAt: "00:02:20,476",
            leavesAt: "00:02:22,501",
            text: [
              "Very good, Lieutenant.",
              ""
            ]
          }
        ]
      })
    })

    describe('working on a text with more than 1500 subtitles.', () => {

      const mockedDispatch2 = jest.fn()
      let bigText, dispatchedObj

      beforeAll(() => {
        const subtitlePath = path.join(__dirname, './Red.Dragon.srt')
        bigText = fs.readFileSync(subtitlePath, { "encoding": "utf8" })
        loadSubtitleObjs(bigText)(mockedDispatch2)
        dispatchedObj = mockedDispatch2.mock.calls[0][0]
      })

      test.only('should perform well with no errors.', () => {
        console.log(dispatchedObj.payload)
        expect(dispatchedObj).toEqual(1)
      })

    })

  })

})
