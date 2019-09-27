import React from 'react'
import { connect } from 'react-redux'

import { MdKeyboardArrowRight } from 'react-icons/md'

import style from './SidebarLeft.module.css'

const SIDEBAR_WIDTH = 320

class SidebarLeft extends React.Component {
  static getDerivedStateFromProps (props) {
    return {
      full: !props.globals.selectedFlower
    }
  }

  render () {
    const { full } = this.state
    const { dimensions, children, sideBarOpen, toggleSideBar } = this.props
    let position = (full) ? 0 : -dimensions.width
    if (sideBarOpen && !full) {
      position += SIDEBAR_WIDTH
    }

    return [
      <div
        key='sideBarContainer'
        className={style.sidebarContainer}
        style={{
          transform: `translateX(${position}px)`
        }}
      >
        <div
          className={style.content}
          style={{
            transform: `translateX(${(sideBarOpen) ? (!full) ? dimensions.width - SIDEBAR_WIDTH : 20 : dimensions.width - SIDEBAR_WIDTH}px)`
          }}
        >
          {children}
        </div>
      </div>,
      <div
        key='sideBarHandle'
        className={style.handleContainer}
        style={{
          left: dimensions.width,
          transform: `translateX(${position}px)`
        }}
        onClick={toggleSideBar}
      >
        <img
          className={style.handle}
          src='/Handle.svg'

        />
        <MdKeyboardArrowRight
          className={style.handleArrow}
          color='white'
          size={30}
          style={{
            transform: `rotate(${(sideBarOpen) ? 180 : 0}deg)`
          }}
          toggleSideBar={toggleSideBar}
        />
      </div>
    ]
  }
}

function mapStateToProps (state) {
  const { dimensions, globals } = state
  return { dimensions, globals }
}

export default connect(mapStateToProps)(SidebarLeft)
