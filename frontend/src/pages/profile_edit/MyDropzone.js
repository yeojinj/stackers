import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import profileEdit from '../../assets/profileEdit.svg'
import './mydropzone.css'

function MyDropzone({ setModalOpen, onChangeImage }) {
  const [img, setImage] = useState(false)
  const [imgblob, setImageBlob] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onChangeImage(acceptedFiles[0])

    const blob = new Blob([acceptedFiles[0]], {
      type: 'image/png'
    })
    setImageBlob(blob)
    const url = window.URL.createObjectURL(blob)
    const imgsrc = document.getElementById('dropimg')
    imgsrc.src = url
    setImage(true)
  }, onChangeImage)

  const uploadImg = () => {
    return console.log(imgblob)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const showModal = () => {
    setModalOpen(true)
  }
  useEffect(() => {
    showModal()
  }, [])

  return (
    <>
      <div {...getRootProps()} className="dropzone">
        <input type="image" {...getInputProps()} />
        <img
          className={!img ? 'dropzone-img-style' : 'dropzone-img'}
          id="dropimg"
          src={profileEdit}
          alt="프로필 사진"
        ></img>
        <div className="drag-drop-box">
          {/* {!img && <p>이곳에 파일을 끌어 업로드하세요</p>} */}
          {isDragActive
            ? '여기에 파일을 올려주세요'
            : '파일을 드래그하거나 여기를 클릭하세요'}
        </div>
      </div>
      <div>
        <button className="img-upload-btn" onClick={uploadImg}>
          업로드
        </button>
      </div>
    </>
  )
}

export default MyDropzone
