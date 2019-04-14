import React from 'react'
import { IWidgetPropTypes } from '../../types'
import './widget.css'

export default class Widget extends React.Component<IWidgetPropTypes> {
  render () {
    let classes = 'widget'

    if (this.props.position === 'right') {
      classes += ' right'
    } else {
      classes += ' left'
    }

    return (
      <div className={classes} />
    )
  }
}