import React from 'react'
import './notfound.css'
import logo from '../assets/logo_white.png'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="wrapper">
        <ul id="scene" className="scene" onClick={() => navigate('/')}>
          <li className="layer" data-depth="0.00"></li>
          <li className="layer" data-depth="0.30">
            <a href="#0">
              <img src={logo} width={280} />
            </a>
          </li>
          <li className="layer" data-depth="0.60">
            <a href="#1" className="moveUp">
              N
            </a>
          </li>
          <li className="layer" data-depth="0.90">
            <a href="#2" className="moveDown">
              O
            </a>
          </li>
          <li className="layer" data-depth="0.70">
            <a href="#3" className="moveUp">
              T
            </a>
          </li>
          <li className="layer" data-depth="0.20">
            <a href="#4" className="moveDown">
              F
            </a>
          </li>
          <li className="layer" data-depth="0.30">
            <a href="#5" className="moveUp">
              O
            </a>
          </li>
          <li className="layer" data-depth="0.20">
            <a href="#6" className="moveDown">
              U
            </a>
          </li>
          <li className="layer" data-depth="0.60">
            <a href="#7" className="moveUp">
              N
            </a>
          </li>
          <li className="layer" data-depth="0.90">
            <a href="#8" className="moveDown">
              D
            </a>
          </li>
          <li className="layer" data-depth="0.70">
            <a href="#9" className="moveUp">
              404
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NotFound
