import React from 'react'
import { Stage, Layer, Circle, Rect, Text, Group, Line, Wedge } from 'react-konva'
import { IWindPropTypes, EWindTypes } from '../../types'
import './wind.css'

export default class Wind extends React.Component<IWindPropTypes> {
  renderCenter (speed:number, angle:number) {
    let val:string = '--'
    if (!isNaN(speed)) {
      val = this.msToKnots(speed).toFixed(1)
    }

    const {
      width,
      height,
      type
    } = this.props

    const outerOuterRadius:number = (height / 2) - 10
    const outerInnerRadius:number = outerOuterRadius - 40

    return (
      <Group>
        <Line
          x={width / 2}
          y={55}
          stroke='#ffffff80'
          strokeWidth={1}
          dash={[1, 5]}
          points={[
            0, 0,
            0, (height / 2) - 55
          ]}
        />
        
        <Line
          x={width / 2}
          y={100}
          stroke='#999999'
          strokeWidth={4}
          bezier={true}
          closed={true}
          points={[
            0, 0,
            60, 70,
            100, height - 200,
            0, height - 200,
            -100, height - 200,
            -60, 70,
            0, 0
          ]}
        />
        <Rect
          width={90}
          height={35}
          x={(width / 2) - 45}
          y={(height / 2) + 5}
          stroke='orange'
          strokeWidth={1}
          dash={[1, 2]}
          cornerRadius={5}
        />
        <Text
          width={90}
          height={35}
          x={(width / 2) - 45}
          y={(height / 2) + 5}
          lineHeight={2.3}
          text={`${angle >= 0 ? '+' : ''}${this.radToDegrees(angle).toFixed(1)}°`}
          align='center'
          fill='white'
          fontStyle='bold'
          fontFamily='-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          fontSize={16}
        />
        <Rect
          width={90}
          height={35}
          x={(width / 2) - 45}
          y={(height / 2) + 50}
          stroke='orange'
          strokeWidth={1}
          dash={[1, 2]}
          cornerRadius={5}
        />
        <Text
          width={90}
          height={35}
          x={(width / 2) - 45}
          y={(height / 2) + 50}
          lineHeight={2.3}
          // text={`${this.radToDegrees(angle).toFixed(1)}`}
          text={`${val} kts`}
          align='center'
          fill='white'
          fontStyle='bold'
          fontFamily='-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          fontSize={16}
        />
        <Text
          width={90}
          height={35}
          x={(width / 2) - 45}
          y={(height / 2) + 85}
          lineHeight={2}
          text={type}
          align='center'
          fill='white'
          fontStyle='normal'
          fontFamily='-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          fontSize={14}
        />

        <Line
          x={width / 2}
          y={(height / 2)}
          stroke='magenta'
          strokeWidth={3}
          rotation={-180 + this.radToDegrees(angle)}
          shadowColor='black'
          shadowBlur={10}
          shadowOpacity={1}
          points={[
            0, (height / 2) - 45,
            0, 0
          ]}
        />
      </Group>
    )
  }

  renderCircles () {
    const {
      width,
      height
    } = this.props

    const heading:number = 0
    const outerOuterRadius:number = (height / 2) - 10
    const outerInnerRadius:number = outerOuterRadius - 20
    const innerOuterRadius:number = outerInnerRadius - 5
    const innerInnerRadius:number = innerOuterRadius - 20

    const rects = []
    const texts = []
    let count:number = 1

    for (let i = 0; i <= 360; i += 10) {
      if (count === 3) {
        count = 0
      }

      let colour = '#666666'

      if (count === 1 || (i >= 20 && i <= 70) || (i >= 290 && i <= 340)) {
        colour = 'white'
      }

      rects.push(
        <Rect
          key={i}
          x={width / 2}
          y={height / 2}
          points={[ count === 1 ? 10.5 : 20.5, height / 2 ]}
          width={1}
          height={ (height / 2) - (count === 1 ? 10 : 20) }
          stroke={colour}
          rotation={i}
          offsetX={0.5}
          offsetY={ (height / 2) - (count === 1 ? 10 : 20) }
        />
      )

      if (count === 1 && i < 360) {
        texts.push(
          <Text
            key={i}
            x={width / 2}
            y={height / 2}
            width={40}
            height={10}
            fill='black'
            rotation={i}
            offsetX={10}
            offsetY={(height / 2) - 40}
            text={this.compassDegrees(i)}
            fontStyle='bold'
            fontFamily='-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
            fontSize={13}
          />
        )
      }

      count += 1
    }

    return (
      <Group
        rotation={-(heading as number)}
        offsetX={width / 2}
        offsetY={height / 2}
        x={width / 2}
        y={height / 2}
      >
        <Circle
          x={width / 2}
          y={height / 2}
          radius={outerOuterRadius}
          fill='#444444'
        />
        <Wedge
          x={width / 2}
          y={height / 2}
          radius={outerOuterRadius}
          angle={50}
          fill='red'
          rotation={-70}
        />
        <Wedge
          x={width / 2}
          y={height / 2}
          radius={outerOuterRadius}
          angle={50}
          fill='green'
          rotation={-160}
        />
        {rects}
        <Circle
          x={width / 2}
          y={height / 2}
          radius={outerInnerRadius}
          fill='black'
        />
        <Circle
          x={width / 2}
          y={height / 2}
          radius={innerOuterRadius}
          fill='white'
        />
        <Circle
          x={width / 2}
          y={height / 2}
          radius={innerInnerRadius}
          fill='black'
        />
        {texts}
      </Group>
    )
  }

  render () {
    const {
      height,
      width,
      type
    } = this.props
    
    const { paths } = this.props
    let angle:number = 0
    let speed:number = 0

    if (type === EWindTypes.APPARENT) {
      angle = (paths['environment.wind.angleApparent'] as number)
      speed = (paths['environment.wind.speedApparent'] as number)
    } else {
      angle = (paths['environment.wind.angleTrueWater'] as number)
      speed = (paths['environment.wind.speedTrue'] as number)
    }

    if (isNaN(angle)) {
      angle = 0
    }

    if (isNaN(speed)) {
      speed = 0
    }

    return (
      <section className='wind'>
        <Stage width={width} height={height}>
          <Layer>
            {this.renderCircles()}
            {this.renderCenter(speed, angle)}
          </Layer>
        </Stage>
      </section>
    )
  }

  msToKnots (ms:number):number {
    return ms * 1.94384449
  }

  radToDegrees (rad:number):number {
    return rad * 180 / Math.PI
  }

  compassDegrees (n:number, len:number = 3):string {
    if (n === 0 || n === 180) {
      return ''
    }

    let str:string = String(n)

    if (n > 180) {
      str = String(180 - (n - 180))
    }

    while (str.length < len) {
      str = `0${str}`
    }

    return str
  }
}
