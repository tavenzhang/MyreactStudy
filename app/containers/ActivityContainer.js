/**
 * Created by soga on 16/10/24.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityPage} from '../pages';

class ActivityContainer extends Component {

    render() {
        return (
            <ActivityPage {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    return {
        activityList: state.appState.activityList
    }
}

export default connect(mapStateToProps)(ActivityContainer);