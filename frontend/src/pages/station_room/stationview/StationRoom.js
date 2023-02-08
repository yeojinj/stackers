import React from 'react'
import StationView from './StationView'
import Article from '../article/Article'
import '../Station.css'

function StationRoom() {
  const Info = {
    id: 13,
    stationInfo: {
      content: 'xptms',
      music: '테스트용 음악입니다',
      instrumentId: null,
      heartCnt: 0,
      remainDepth: 1,
      isPublic: 1,
      isComplete: 0,
      tags: [],
      prevStationId: 12,
      videoName: null,
      delete: false
    },
    regTime: '2023-02-07T13:34:41',
    writer: {
      id: 2,
      username: 'subin3',
      nickname: 'subin3',
      email: null,
      bio: null,
      imgPath: 'path',
      instruments: null,
      parties: null
    },
    commentCnt: 0,
    comments: [],
    musicians: [
      {
        instrumentId: 4,
        instrumentName: '자연의 소리',
        musicianUsername: 'subin3',
        musicianImgPath: 'path',
        musicianImgName: null
      },
      {
        instrumentId: 5,
        instrumentName: '루프 스테이션',
        musicianUsername: 'subin3',
        musicianImgPath: 'path',
        musicianImgName: null
      },
      {
        instrumentId: 1,
        instrumentName: '캐스터네츠',
        musicianUsername: 'subin3',
        musicianImgPath: 'path',
        musicianImgName: null
      }
    ]
  }
  return (
    <div className="total">
      <StationView station={Info.stationInfo} />
      <Article Info={Info} />
    </div>
  )
}

export default StationRoom
