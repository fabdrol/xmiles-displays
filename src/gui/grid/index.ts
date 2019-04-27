import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import pick from 'object.pick'
import configs from '../../config'
import { IApplicationState } from '../../types'
import Grid from './grid'

const mapStateToProps = ({ signalk, ui }: IApplicationState, ownProps: any) => {
  const { data } = signalk
  const paths = pick(data, ui.widgets)

  return {
    ...ownProps,
    layout: ui.display,
    widgets: ui.widgets,
    configs,
    paths
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)
