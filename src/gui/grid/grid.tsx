import React from 'react'
import { IGridPropTypes, EDisplayTypes } from '../../types'
import './grid.css'
import Widget from '../widget'

export default class Wind extends React.Component<IGridPropTypes> {
  render () {
    const {
      layout,
      widgets,
      paths,
      configs
    } = this.props

    let content = null
    let blocks = widgets.map((path:string) => {
      const value = paths[path]
      const config = configs[path]

      if (typeof config !== 'object' || !config) {
        return null
      }

      return (
        <Widget
          key={path}
          conversion={config.conversion}
          postfix={config.postfix}
          label={config.label}
          value={value}
        />
      )
    })

    switch (layout) {
      case EDisplayTypes.GRID2:
        content = (
          <div className='rows'>
            <div className='row double'>
              <div className='col xs-6'>
                {blocks[0]}
              </div>
              <div className='col xs-6'>
                {blocks[1]}
              </div>
            </div>
          </div>
        )
        break

      case EDisplayTypes.GRID4:
        content = (
          <div className='rows'>
            <div className='row'>
              <div className='col xs-6'>
                {blocks[0]}
              </div>
              <div className='col xs-6'>
                {blocks[1]}
              </div>
            </div>
            <div className='row'>
              <div className='col xs-6'>
                {blocks[2]}
              </div>
              <div className='col xs-6'>
                {blocks[3]}
              </div>
            </div>
          </div>
        )
        break

      case EDisplayTypes.GRID6:
        content = (
          <div className='rows'>
            <div className='row'>
              <div className='col xs-4'>
                {blocks[0]}
              </div>
              <div className='col xs-4'>
                {blocks[1]}
              </div>
              <div className='col xs-4'>
                {blocks[2]}
              </div>
            </div>
            <div className='row'>
              <div className='col xs-4'>
                {blocks[3]}
              </div>
              <div className='col xs-4'>
                {blocks[4]}
              </div>
              <div className='col xs-4'>
                {blocks[5]}
              </div>
            </div>
          </div>
        )
        break

      default:
        content = (
          <div className='rows'>
            <div className='row double'>
              <div className='col xs-12'>
                {blocks[0]}
              </div>
            </div>
          </div>
        )
        break
    }
    
    return (
      <section className='grid'>
        {content}
      </section>
    )
  }
}
