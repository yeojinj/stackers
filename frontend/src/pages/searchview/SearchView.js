import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../styles/searchview.css'
import StationListItem from '../../components/station/StationListItem'

const TabMenu = styled.ul`
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  list-style: none;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    width: calc(100% / 3);
    padding: 10px 10px 0px 10px;
    font-size: 21px;
    transition: 0.5s;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    color: rgb(21, 20, 20);
  }

  & div.desc {
    text-align: center;
  }
`

const Desc = styled.div`
  text-align: center;
  margin-top: 36px;
`

function SearchView() {
  const [currentTab, clickTab] = useState(0)
  const searchResults = () => {
    const resultsList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return resultsList.map((result, i) => {
      return (
        <div key={i}>
          <StationListItem />
        </div>
      )
    })
  }

  const menuArr = [
    { i: 1, name: '인기', content: searchResults() },
    { i: 2, name: '계정', content: '계정이 들어갈거예요' },
    { i: 3, name: '스택', content: '스택들이 들어갈거예요' }
  ]

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index)
  }

  return (
    <div className="search-page">
      <Header />
      <div className="result">
        <div className="result-tap">
          <TabMenu>
            {menuArr.map((el, index) => (
              <li
                key={el.i}
                className={index === currentTab ? 'submenu focused' : 'submenu'}
                onClick={() => selectMenuHandler(index)}
              >
                {el.name}
              </li>
            ))}
          </TabMenu>
        </div>
        <Desc>{menuArr[currentTab].content}</Desc>
      </div>
      <Footer />
    </div>
  )
}

export default SearchView
