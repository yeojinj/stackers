/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react'
import './Record.css'
import { ReactMediaRecorder } from 'react-media-recorder'

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  if (!stream) {
    return null
  }
  return <video ref={videoRef} width={500} height={500} autoPlay controls />
}

function Record(props) {
  const [enable, setEnable] = useState(true)
  const setStack = (src) => {
    props.stack(src)
  }
  return (
    <div className="record">
      <ReactMediaRecorder
        onStop={(blobUrl, blob) => {
          console.log(blobUrl + blob)
          setStack(blob)
        }}
        video
        blobPropertyBag={{
          type: 'video/mp4'
        }}
        render={({
          previewStream,
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl
        }) => {
          return (
            <div>
              <p>{status}</p>
              <div className="box">
                <button
                  onClick={() => {
                    startRecording()
                    setTimeout(stopRecording, 60000)
                  }}
                >
                  Start Recording
                </button>
                <button
                  onClick={() => {
                    stopRecording()
                    // const mediaBlob = fetch(mediaBlobUrl).then((r) => r.blob())
                    // const url = URL.createObjectURL(mediaBlob)

                    // const title = Date.now()
                    // const myFile = new File([mediaBlob], { title } + '.mp4', {
                    //   type: 'video/mp4',
                    // })
                    // const formData = new FormData() // preparing to send to the server

                    // formData.append('file', myFile) // preparing to send to the server

                    // console.log('after buttond')
                    // console.log(formData)
                    // setStack(formData)
                  }}
                >
                  Stop Recording
                </button>
                <button
                  onClick={() => {
                    startRecording()
                    setTimeout(stopRecording, 60000)
                    setEnable(!enable)
                  }}
                >
                  togglestreaming
                </button>
              </div>
              {/* <audio src={mediaBlobUrl} controls autoPlay loop /> */}
              <video className="stackVideo" src={mediaBlobUrl} controls />
              {enable && <VideoPreview stream={previewStream} />}
            </div>
          )
        }}
      />
    </div>
  )
}

export default Record
