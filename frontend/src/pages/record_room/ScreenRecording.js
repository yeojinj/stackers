import React, { useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
const ScreenRecording = ({
  screen,
  audio,
  video,
  downloadRecordingPath,
  downloadRecordingType
}) => {
  const [recordingNumber, setRecordingNumber] = useState(0)
  const RecordView = () => {
    const {
      status,
      startRecording: startRecord,
      stopRecording: stopRecord,
      mediaBlobUrl
    } = useReactMediaRecorder({ screen, audio, video })
    const startRecording = () => {
      return startRecord()
    }
    const stopRecording = () => {
      const currentTimeSatmp = new Date().getTime()
      setRecordingNumber(currentTimeSatmp)
      return stopRecord()
    }
    const viewRecording = () => {
      window.open(mediaBlobUrl, '_blank').focus()
    }
    const downloadRecording = () => {
      const pathName = `${downloadRecordingPath}_${recordingNumber}.${downloadRecordingType}`
      try {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // for IE
          window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName)
        } else {
          // for Chrome
          const link = document.createElement('a')
          link.href = mediaBlobUrl
          link.download = pathName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      } catch (err) {
        console.error(err)
      }
    }

    return (
      <div>
        {status && status !== 'recording' && (
          <button
            onClick={startRecording}
            type="primary"
            className="margin-left-sm"
          >
            {mediaBlobUrl ? 'Record again' : 'Record your Problem'}
          </button>
        )}
        {status && status === 'recording' && (
          <button onClick={stopRecording} className="margin-left-sm">
            Stop Recording
          </button>
        )}
        {mediaBlobUrl && status && status === 'stopped' && (
          <button
            onClick={viewRecording}
            type="primary"
            className="viewRecording margin-left-sm"
          >
            View
          </button>
        )}
        {downloadRecordingType &&
          mediaBlobUrl &&
          status &&
          status === 'stopped' && (
            <button
              onClick={downloadRecording}
              className="downloadRecording margin-left-sm"
            >
              Download
            </button>
          )}
      </div>
    )
  }
  return (
    <div className="Scren-Record-Wrapper" style={{ padding: '5px 20px' }}>
      {RecordView()}
    </div>
  )
}
export default ScreenRecording
