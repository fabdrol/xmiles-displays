import React from 'react'
import { IAppPropTypes, EDisplayTypes } from '../../types'
import './app.css'

import SailSteer from '../sailsteer'
import Wind from '../wind'
import Grid from '../grid'

export default class App extends React.Component<IAppPropTypes> {
  render () {
    const { innerHeight, innerWidth } = window
    const {
      display,
      type
    } = this.props

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

      default:
        return (
          <p style={{ textAlign: 'center' }}>
            <strong style={{ color: 'white' }}>Loading...</strong>
          </p>
        )
    }
  }
}
