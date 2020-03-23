import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import pick from 'object.pick'
import { IApplicationState } from '../../types'
import SailSteer from './sailsteer'

const mapStateToProps = ({ signalk }: IApplicationState, ownProps: any) => {
  const { data } = signalk
  const paths = pick(data, [
    'name',
    'navigation.courseOverGroundMagnetic',
    'navigation.courseOverGroundTrue',
    'navigation.headingMagnetic',
    'navigation.headingTrue',
    'navigation.speedThroughWater',
    'navigation.speedOverGround',
    'navigation.position',
    
    'performance.velocityMadeGood',
    'environment.wind.speedApparent',
    'environment.wind.angleApparent',
    'environment.wind.speedTrue',
    'environment.wind.angleTrueWater',
    'environment.depth.belowTransducer',
    'environment.current'
  ])

  return {
    ...ownProps,
    paths
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SailSteer)
