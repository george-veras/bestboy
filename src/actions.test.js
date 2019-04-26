'use strict'

import fs from 'fs'
import path from 'path'

import { loadSubtitleObjs } from './actions'

describe('actions.js', () => {

  describe('.loadSubtitlesObjs(rawText)', () => {

    const mockedDispatch = jest.fn()
    let rawText, dispatchedAction

    beforeAll(() => {
      const subtitlePath = path.join(__dirname, './example.srt')
      rawText = fs.readFileSync(subtitlePath, { "encoding": "utf8" })
      dispatchedAction = loadSubtitleObjs(rawText)(mockedDispatch)
      console.log(dispatchedAction)
    })

    test('should load all the', () => {
      expect(mockedDispatch.mock.calls.length).toBe(1)
      expect(mockedDispatch.mock.calls[0][0]).toBe({})
    })

  })

})
