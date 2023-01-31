import React from 'react'
import '../../styles/stationlistitem.css'

function StationListItem() {
  const stationInfo = {
    video_url: '...',
    video_description: '비디오 설명이에요 비디오 설명이에요 비디오 설명이에요',
    video_tags: ['#disco', '#music', '#dance', '#music', '#guitar'],
  }

  return (
    <div className="station-item">
      {/* 컨트롤 바 없애기 */}
      {/* <img src={logo}></img> */}
      <video
        src={stationInfo.video_url}
        controls
        autoPlay
        loop
        height="287"
        width="197"
        style={{ borderRadius: '10px' }}
      ></video>
      <p className="station-description">{stationInfo.video_description}</p>
      <div className="station-tag">{stationInfo.video_tags}</div>
    </div>
  )
}

export default StationListItem
