import React from 'react'
import StationListItem from './StationListItem'

function StationList(props) {
  return (
    // 5개씩 3개 -> 15개 스테이션 정렬
    <>
      <div className="station-list">
        <StationListItem />
        <StationListItem />
        <StationListItem />
        <StationListItem />
        <StationListItem />
      </div>
    </>
  )
}

export default StationList
