import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, EWindTypes } from '../../types'
import App from './app'

const mapStateToProps = ({ ui }: IApplicationState, ownProps: any) => {
  return {
    ...ownProps,
    display: ui.display,
    type: ui.windType,
    widgets: ui.widgets,
    connected: ui.connected
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

