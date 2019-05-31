import React from 'react'
import utils from 'nmea0183-utilities'
import { IWidgetPropTypes } from '../../types'
import './widget.css'

export default class Widget extends React.Component<IWidgetPropTypes> {
  convert (conversion:string, value:any):string {
    const val = value as number

    switch (conversion) {
      case 'percentage':
        return (val * 100).toFixed(1)
        
      case 'knots': 
        return (val * 1.94384449).toFixed(1)

      case 'temperature':
        return (val - 272.15).toFixed(1)

      case 'degrees':
        return (val * 180 / Math.PI).toFixed(1)

      default:
        return val.toFixed(1)
    }
  }

  renderPosition () {
    const { value, label } = this.props

    return (
      <div className='widget position'>
        <h1>
          {this.ddToDms((value as any).longitude, true)}<br />
          {this.ddToDms((value as any).latitude)}
        </h1>
        <h2>{label}</h2>
      </div>
    )
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

    if (typeof value === 'object' && Object.keys(value).includes('latitude')) {
      return this.renderPosition()
    }

    if (position === 'left' || position === 'right') {
      classes += ` ${position}`
    } else {
      classes += ' line-height'
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

  private ddToDms (deg:number, lng:boolean = false):string {
    if (isNaN(deg)) {
      return '--'
    }

    const z = (n:number, precision:number = 0):string => {
      let str:string = String(n)

      if (n < 10) {
        str = `0${n}`
      }

      if (precision > 0 && !str.includes('.')) {
        let decs:string = ''

        while (decs.length < precision) {
          decs += '0'
        }

        str += `.${decs}`
      }

      return str
    }
  
    let dir:string = ''
    let d:number = Math.round(deg)
    const minfloat:number = Math.abs((deg - d) * 60)
    let m:number = Math.floor(minfloat)
    let secfloat:number = (minfloat - m) * 60
    d = Math.abs(d)
  
    if (secfloat === 60) {
      m += 1
      secfloat = 0
    }
  
    if (m === 60) {
      d += 1
      m = 0
    }
  
    if (lng === true) {
      dir = deg < 0 ? 'W' : 'S'
    } else {
      dir = deg < 0 ? 'E' : 'N'
    }
  
    return `${z(d)}° ${z(m)}' ${z(parseFloat(secfloat.toFixed(1)), 1)}" ${dir}`
  }
}