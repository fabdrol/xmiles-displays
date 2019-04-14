import React from 'react'
import { Stage, Layer, Circle, Rect, Text, Group, Line, Wedge } from 'react-konva'
import Widget from '../widget'
import './app.css'

class App extends React.Component {
  private interval:any

  public state = {
    heading: 31,
    twa: 21,
    awa: 23,
    cog: 19,
    btw: null
  }

  /*
  componentDidMount () {
    this.interval = setInterval(() => {
      const {
        heading,
        twa,
        awa
      } = this.state

      this.setState({
        heading: heading === 359 ? 0 : heading + 1,
        twa: twa === 0 ? 359 : twa - 1,
        awa: awa === 0 ? 359 : awa - 1
      })
    }, 500)
  }
  // */

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  renderCenter () {
    return (
      <Group>
        <Line
          x={innerWidth / 2}
          y={55}
          stroke='white'
          strokeWidth={1}
          dash={[1, 5]}
          points={[
            0, 0,
            0, innerHeight - 110
          ]}
        />
        <Line
          x={innerWidth / 2}
          y={innerHeight / 2}
          stroke='white'
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
      </Group>
    )
  }

  renderCircles (innerWidth:number, innerHeight:number) {
    if (this.state.heading === null) {
      return null
    }

    const heading:number = this.state.heading
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
        rotation={-heading}
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

  renderTWA (innerWidth:number, innerHeight:number) {
    if (this.state.twa === null) {
      return null
    }
    
    const twa = this.state.twa || 0

    return (
      <Group
        rotation={(this.state.heading + twa)}
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

  renderAWA (innerWidth:number, innerHeight:number) {
    if (this.state.awa === null) {
      return null
    }

    const awa = this.state.awa || 0

    return (
      <Group
        rotation={(this.state.heading + awa)}
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

  renderCOG (innerWidth:number, innerHeight:number) {
    if (this.state.cog === null) {
      return null
    }
    
    const cog = this.state.cog || 0
    
    return (
      <Group
        rotation={-cog}
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

  renderBTW (innerWidth:number, innerHeight:number) {
    if (this.state.btw === null) {
      return null
    }
    
    const btw = this.state.btw || 0

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

    const {
      cog,
      awa,
      twa,
      btw
    } = this.state

    return (
      <section className='application'>
        <Stage width={innerWidth} height={innerHeight}>
          <Layer>
            {this.renderCircles(innerWidth, innerHeight)}
            {this.renderCenter()}
            {twa !== null && this.renderTWA(innerWidth, innerHeight)}
            {awa !== null && this.renderAWA(innerWidth, innerHeight)}
            {cog !== null && this.renderCOG(innerWidth, innerHeight)}
            {btw !== null && this.renderBTW(innerWidth, innerHeight)}
          </Layer>
        </Stage>
        <div className='widgets-left'>
          <Widget position='left' />
          <Widget position='left' />
          <Widget position='left' />
          <Widget position='left' />
        </div>
        <div className='widgets-right'>
          <Widget position='right' />
          <Widget position='right' />
          <Widget position='right' />
          <Widget position='right' />
        </div>
      </section>
    )
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
