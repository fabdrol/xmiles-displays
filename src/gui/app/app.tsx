import React from 'react'
import { IAppPropTypes, EDisplayTypes } from '../../types'
import './app.css'

import SailSteer from '../sailsteer'
import Wind from '../wind'
import Grid from '../grid'
import Freeboard from '../freeboard'

class App extends React.Component<IAppPropTypes> {
  render () {
    const { innerHeight, innerWidth } = window
    const {
      display,
      type,
      connected
    } = this.props

    if (connected === false) {
      return (
        <section className='sailsteer centered'>
          <h3 className='notification'>Connecting...</h3>
        </section>
      )
    }

    switch (display) {
      case EDisplayTypes.WIND:
        return <Wind
          type={type}
          width={innerWidth}
          height={innerHeight}
        />

      case EDisplayTypes.SAILSTEER:
        return <SailSteer
          widgets={true}
          width={innerWidth}
          height={innerHeight}
        />

      case EDisplayTypes.GRID1:
      case EDisplayTypes.GRID2:
      case EDisplayTypes.GRID4:
      case EDisplayTypes.GRID6:
        return <Grid
          width={innerWidth}
          height={innerHeight}
        />

      case EDisplayTypes.FREEBOARD:
        return <Freeboard
          width={innerWidth}
          height={innerHeight}
        />

      default:
        return (
          <p style={{ textAlign: 'center' }}>
            <strong style={{ color: 'white' }}>Loading...</strong>
          </p>
        )
    }
  }
}

export default App
