import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MainComponent from '../components/main-component';
import * as SampleActions from '../actions/actions';

/**
 * import-search-container Container
 *
 */
export default connect(
    state => {
        return {
            state: {
                SampleReducer: state.rootReducer.SampleReducer,
            },
        };
    },
    dispatch => {
        return {
            actions: {
                SampleActions: bindActionCreators(SampleActions, dispatch),
            }
        };
    }
)(MainComponent);