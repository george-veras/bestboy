'use strict'

import fs from 'fs'
import path from 'path'

import { loadSubtitleObjs, srtTimeToMilliseconds } from './actions'

describe('actions.js', () => {

  describe('loadSubtitlesObjs(rawText)', () => {

    const mockedDispatch = jest.fn()
    let rawText

    beforeAll(() => {
      const subtitlePath = path.join(__dirname, './example.srt')
      rawText = fs.readFileSync(subtitlePath, { "encoding": "utf8" })
      loadSubtitleObjs(rawText)(mockedDispatch)
    })

    test('should return a function that triggers an injected dispatcher with loaded subtitle objects.', () => {
      expect(mockedDispatch.mock.calls.length).toBe(1)
      expect(mockedDispatch.mock.calls[0][0]).toEqual({
        type: "UPDATE_SUBTITLES",
        payload: [
          {
            ordinal: "1",
            start: 137440,
            end: 140375,
            text: [
              "Senator, we're making",
              "our final approach into Coruscant."
            ]
          },
          {
            ordinal: "2",
            start: 140476,
            end: 142501,
            text: [
              "Very good, Lieutenant.",
              ""
            ]
          }
        ]
      })
    })

    describe('working on a text with line breaks represented by "\r\n" pattern.', () => {

      const mockedDispatch = jest.fn()
      let textLinebreakRN, dispatchedObj

      beforeAll(() => {
        const subtitlePath = path.join(__dirname, './Red.Dragon.linebreak.srt')
        textLinebreakRN = fs.readFileSync(subtitlePath, { "encoding": "utf8" })
        loadSubtitleObjs(textLinebreakRN)(mockedDispatch)
        dispatchedObj = mockedDispatch.mock.calls[0][0]
      })

      test('should be able to recognize line breaks and correctly separate raw text into subtitle objects.', () => {
        expect(dispatchedObj.payload.length).toEqual(3)
        expect(dispatchedObj.payload[0]).toEqual({
          ordinal: "1",
            start: 16362,
            end: 20196,
            text: [
              "[Suspenseful instrumental music]"
            ]
        })
        expect(dispatchedObj.payload[2]).toEqual({
          ordinal: "3",
            start: 54400,
            end: 57062,
            text: [
              "Baltimore, Maryland 1980"
            ]
        })
      })

    })

    describe('working on a text with more than 1500 subtitles.', () => {

      const mockedDispatch = jest.fn()
      let bigText, dispatchedObj

      beforeAll(() => {
        const subtitlePath = path.join(__dirname, './Red.Dragon.srt')
        bigText = fs.readFileSync(subtitlePath, { "encoding": "utf8" })
        loadSubtitleObjs(bigText)(mockedDispatch)
        dispatchedObj = mockedDispatch.mock.calls[0][0]
      })

      test('should perform flawlessly.', () => {
        expect(dispatchedObj.type).toBe("UPDATE_SUBTITLES")
        expect(dispatchedObj.payload.length).toEqual(1612)
        expect(dispatchedObj.payload[0]).toEqual({
          ordinal: "1",
            start: 16362,
            end: 20196,
            text: [
              "[Suspenseful instrumental music]"
            ]
        })
        expect(dispatchedObj.payload[1611]).toEqual({
          ordinal: "1612",
            start: 7208080,
            end: 7211015,
            text: [
              "[Dramatic instrumental music]"
            ]
        })
      })
    })

  })

  describe('srtTimeToMilliseconds', () => {

    let milliseconds

    beforeAll(() => {
      milliseconds = srtTimeToMilliseconds("03:59:53,699")
    })

    test('should translate time (string) in SRT file pattern to milliseconds (number)',() => {
      expect(milliseconds).toBe(14393699)
    })
  })

})
