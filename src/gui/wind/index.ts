import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import pick from 'object.pick'
import { IApplicationState } from '../../types'
import Wind from './wind'

const mapStateToProps = ({ signalk }: IApplicationState, ownProps: any) => {
  const { data } = signalk
  const paths = pick(data, [
    'environment.wind.speedApparent',
    'environment.wind.angleApparent',
    'environment.wind.speedTrue',
    'environment.wind.angleTrueWater'
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
)(Wind)
