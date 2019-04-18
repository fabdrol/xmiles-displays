import React from 'react'
import { IWidgetPropTypes } from '../../types'
import './widget.css'

export default class Widget extends React.Component<IWidgetPropTypes> {
  convert (conversion:string, value:any):string {
    const val = value as number

    switch (conversion) {
      case 'knots': 
        return (val * 1.94384449).toFixed(1)

      case 'degrees':
        return (val * 180 / Math.PI).toFixed(1)

      default:
        return val.toFixed(1)
    }
  }

  render () {
    let classes = 'widget'
    let metric = '--'

    const {
      postfix,
      label,
      conversion,
      value,
      position
    } = this.props

    if (position === 'right') {
      classes += ' right'
    } else {
      classes += ' left'
    }

    if (typeof value === 'number' && !isNaN(value) && value !== -9999) {
      metric = (value as number).toFixed(1)
    }

    if (typeof value === 'number' && typeof conversion === 'string') {
      metric = this.convert(conversion, value)
    }

    return (
      <div className={classes}>
        <h1>{metric}{postfix || ''}</h1>
        <h2>{label || ''}</h2>
      </div>
    )
  }
}