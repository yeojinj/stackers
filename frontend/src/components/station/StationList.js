import React from 'react'
import PropTypes from 'prop-types'
import StationListItem from './StationListItem'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

StationList.propTypes = {
  isRanking: PropTypes.bool
}

function StationList({ isRanking }) {
  const stationItem = [1, 2, 3, 4, 5]
  return (
    // 5개씩 3개 -> 15개 스테이션 정렬
    <>
      <div className="station-list">
        {stationItem.map(() => {
          return (
            <>
              <StationListItem isRanking={isRanking} />
            </>
          )
        })}
        <KeyboardDoubleArrowRightIcon />
      </div>
    </>
  )
}

export default StationList
