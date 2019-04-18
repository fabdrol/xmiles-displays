import React from 'react'
import { Stage, Layer, Circle, Rect, Text, Group, Line, Wedge } from 'react-konva'
import Widget from '../widget'
import './app.css'
import { IAppPropType } from '../../types'

class App extends React.Component<IAppPropType> {
  private interval:any

  renderTack (side:string, awa:number, heading:number, colour:string = 'green') {
    if (isNaN(awa as number) || isNaN(heading as number)) {
      return null
    }

    let tack = awa

    if (awa < -90 || awa > 90) {
      return null
    }

    if (side === 'port') {
      tack = awa - 45
    }

    if (side === 'starboard') {
      tack = awa + 45
    }

    return (
      <Group
        rotation={tack}
        offsetX={innerWidth / 2}
        offsetY={innerHeight / 2}
        x={innerWidth / 2}
        y={innerHeight / 2}
      >
        <Line
          x={innerWidth / 2}
          y={55}
          stroke={colour}
          strokeWidth={8}
          points={[
            0, 0,
            0, (innerHeight / 2) - 55
          ]}
        />
      </Group>
    )
  }

  renderCenter (speedValue:number) {
    let val:string = '--'
    if (!isNaN(speedValue)) {
      val = this.msToKnots(speedValue).toFixed(1)
    }
    return (
      <Group>
        <Line
          x={innerWidth / 2}
          y={55}
          stroke='#ffffff80'
          strokeWidth={1}
          dash={[1, 5]}
          points={[
            0, 0,
            0, (innerHeight / 2) - 55
          ]}
        />
        <Line
          x={innerWidth / 2}
          y={innerHeight / 2}
          stroke='#ffffff80'
          strokeWidth={1}
          dash={[1, 5]}
          points={[
            (-innerHeight / 2) + 55, 0,
            (innerHeight / 2) - 55, 0
          ]}
        />
        <Line
          x={innerWidth / 2}
          y={100}
          stroke='#999999'
          strokeWidth={4}
          bezier={true}
          closed={true}
          points={[
            0, 0,
            60, 70,
            100, innerHeight - 200,
            0, innerHeight - 200,
            -100, innerHeight - 200,
            -60, 70,
            0, 0
          ]}
        />
        <Rect
          width={90}
          height={35}
          x={(innerWidth / 2) - 45}
          y={(innerHeight / 2) + 30}
          stroke='orange'
          strokeWidth={1}
          dash={[1, 2]}
          cornerRadius={5}
        />
        <Text
          width={90}
          height={35}
          x={(innerWidth / 2) - 45}
          y={(innerHeight / 2) + 30}
          lineHeight={2}
          text={`${val} kts`}
          align='center'
          fill='white'
          fontStyle='bold'
          fontFamily='-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          fontSize={18}
        />
      </Group>
    )
  }

  renderCircles (innerWidth:number, innerHeight:number, heading?:number) {
    if (heading === null || isNaN(heading as number)) {
      return null
    }

    const outerOuterRadius:number = (innerHeight / 2) - 10
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

      rects.push(
        <Rect
          key={i}
          x={innerWidth / 2}
          y={innerHeight / 2}
          points={[ count === 1 ? 10.5 : 20.5, innerHeight / 2 ]}
          width={1}
          height={ (innerHeight / 2) - (count === 1 ? 10 : 20) }
          stroke={count === 1 ? 'white' : '#666666'}
          rotation={i}
          offsetX={0.5}
          offsetY={ (innerHeight / 2) - (count === 1 ? 10 : 20) }
        />
      )

      if (count === 1 && i < 360) {
        texts.push(
          <Text
            key={i}
            x={innerWidth / 2}
            y={innerHeight / 2}
            width={40}
            height={10}
            fill='black'
            rotation={i}
            offsetX={10}
            offsetY={(innerHeight / 2) - 40}
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
        offsetX={innerWidth / 2}
        offsetY={innerHeight / 2}
        x={innerWidth / 2}
        y={innerHeight / 2}
      >
        <Circle
          x={innerWidth / 2}
          y={innerHeight / 2}
          radius={outerOuterRadius}
          fill='#444444'
        />
        {rects}
        <Circle
          x={innerWidth / 2}
          y={innerHeight / 2}
          radius={outerInnerRadius}
          fill='black'
        />
        <Circle
          x={innerWidth / 2}
          y={innerHeight / 2}
          radius={innerOuterRadius}
          fill='white'
        />
        <Circle
          x={innerWidth / 2}
          y={innerHeight / 2}
          radius={innerInnerRadius}
          fill='black'
        />
        {texts}
      </Group>
    )
  }

  renderTWA (innerWidth:number, innerHeight:number, value?:number, heading?:number) {
    if (value === null || isNaN(value as number)) {
      return null
    }

    if (heading === null || isNaN(heading as number)) {
      return null
    }
    
    const twa = value || 0
    return (
      <Group
        rotation={twa}
        offsetX={innerWidth / 2}
        offsetY={innerHeight / 2}
        x={innerWidth / 2}
        y={innerHeight / 2}
      >
        <Wedge
          x={innerWidth / 2}
          y={40}
          radius={35}
          angle={60}
          fill='#00FF00CC'
          rotation={60}
        />
        <Text
          x={(innerWidth / 2) + 5}
          y={70}
          width={40}
          height={40}
          fill='white'
          text='T'
          fontStyle='bold'
          fontFamily='-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          fontSize={18}
          rotation={180}
        />
      </Group>
    )
  }

  renderAWA (innerWidth:number, innerHeight:number, value?:number, heading?:number) {
    if (value === null || isNaN(value as number)) {
      return null
    }

    if (heading === null || isNaN(heading as number)) {
      return null
    }

    const awa = value || 0

    return (
      <Group
        rotation={awa}
        offsetX={innerWidth / 2}
        offsetY={innerHeight / 2}
        x={innerWidth / 2}
        y={innerHeight / 2}
      >
        <Wedge
          x={innerWidth / 2}
          y={40}
          radius={35}
          angle={60}
          fill='#0000FFCC'
          rotation={-120}
        />
        <Text
          x={(innerWidth / 2) - 6}
          y={10}
          width={40}
          height={40}
          fill='white'
          text='A'
          fontStyle='bold'
          fontFamily='-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
          fontSize={18}
        />
      </Group>
    )
  }

  renderCOG (innerWidth:number, innerHeight:number, value?:number, heading?:number) {
    if (value === null || isNaN(value as number)) {
      return null
    }

    if (heading === null || isNaN(heading as number)) {
      return null
    }

    const cog = value || 0
    const calculated = -(heading as number) + cog

    return (
      <Group
        rotation={calculated}
        offsetX={innerWidth / 2}
        offsetY={innerHeight / 2}
        x={innerWidth / 2}
        y={innerHeight / 2}
      >
        <Line
          x={innerWidth / 2}
          y={innerHeight / 2}
          strokeWidth={6}
          stroke='red'
          points={[
            0, (-innerHeight / 2) + 55,
            0, (-innerHeight / 2) + 35
          ]}
        />
      </Group>
    )
  }

  renderBTW (innerWidth:number, innerHeight:number, value?:number, heading?:number) {
    if (value === null || isNaN(value as number)) {
      return null
    }

    if (heading === null || isNaN(heading as number)) {
      return null
    }

    const btw = value || 0

    return (
      <Group
        rotation={-btw}
        offsetX={innerWidth / 2}
        offsetY={innerHeight / 2}
        x={innerWidth / 2}
        y={innerHeight / 2}
      >
        <Circle
          x={innerWidth / 2}
          y={55}
          strokeWidth={2}
          stroke='black'
          fill='yellow'
          radius={10}
        />
      </Group>
    )
  }

  render () {
    const {
      innerHeight,
      innerWidth
    } = window
    
    const { paths } = this.props
    const cog = paths['navigation.courseOverGroundTrue']
    const awa = paths['environment.wind.angleApparent']
    const twa = paths['environment.wind.angleTrueWater']
    const btw = null

    let heading = null

    if (typeof paths['navigation.headingMagnetic'] === 'number') {
      heading = paths['navigation.headingMagnetic'] as number
    } else if (typeof paths['navigation.headingTrue'] === 'number') {
      heading = paths['navigation.headingTrue'] as number
    } else if (typeof paths['navigation.courseOverGroundMagnetic'] === 'number') {
      heading = paths['navigation.courseOverGroundMagnetic'] as number
    } else {
      heading = null
    }

    if (heading === null) {
      return null
    } else {
      // convert to degrees
      heading = this.radToDegrees(heading)
    }

    let depth = paths['environment.depth.belowTransducer'] as number

    if (typeof depth !== 'number' || isNaN(depth)) {
      depth = -9999
    } else {
      depth = depth - 1
    }

    // console.log(`Port tack angle = ${this.radToDegrees(awa as number) - 45}`)
    // console.log(`Starboard tack angle = ${this.radToDegrees(awa as number) + 45}`)

    return (
      <section className='application'>
        <Stage width={innerWidth} height={innerHeight}>
          <Layer>
            {this.renderCircles(innerWidth, innerHeight, (heading as number))}
            {this.renderCenter(paths['navigation.speedOverGround'] as number)}
            {this.renderTack('port', this.radToDegrees(awa as number), (heading as number), '#FF000080')}
            {this.renderTack('starboard', this.radToDegrees(awa as number), (heading as number), '#00FF0080')}
            {twa !== null && this.renderTWA(innerWidth, innerHeight, this.radToDegrees(twa as number), (heading as number))}
            {awa !== null && this.renderAWA(innerWidth, innerHeight, this.radToDegrees(awa as number), (heading as number))}
            {cog !== null && this.renderCOG(innerWidth, innerHeight, this.radToDegrees(cog as number), (heading as number))}
            {btw !== null && this.renderBTW(innerWidth, innerHeight, this.radToDegrees(btw as number), (heading as number))}
          </Layer>
        </Stage>
        <div className='widgets-left'>
          <Widget position='left' label='COG' value={paths['navigation.courseOverGroundTrue']} conversion='degrees' postfix='°' />
          <Widget position='left' label='SOG' value={paths['navigation.speedOverGround']} conversion='knots' />
          <Widget position='left' label='Speed' value={paths['navigation.speedThroughWater']} conversion='knots' />
          <Widget position='left' label='VMG' value={paths['navigation.velocityMadeGood']} conversion='knots' />
        </div>
        <div className='widgets-right'>
          <Widget position='right' label='Depth' value={depth} />
          {/* <Widget position='right' label='WindR (app.)' value={this.radToDegrees(paths['environment.wind.angleApparent'] as number)} />
          <Widget position='right' label='WindR (waar)' value={this.radToDegrees(paths['environment.wind.angleTrueWater'] as number)} /> */}
          <Widget position='right' label='Windspd (A)' value={paths['environment.wind.speedApparent']} conversion='knots' />
          <Widget position='right' label='Windspd (T)' value={paths['environment.wind.speedTrue']} conversion='knots' />
          <Widget position='right' label='Current' value={paths['environment.current']} conversion='degrees' postfix='°' />
        </div>
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
    if (n === 0) {
      return ' N '
    }

    if (n === 90) {
      return ' O '
    }

    if (n === 180) {
      return ' Z '
    }

    if (n === 270) {
      return ' W '
    }

    let str:string = String(n)

    while (str.length < len) {
      str = `0${str}`
    }

    return str
  }
}

export default App
