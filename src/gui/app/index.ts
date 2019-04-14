import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState } from '../../types'
import App from './app'

const mapStateToProps = (state: IApplicationState, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
