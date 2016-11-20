
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SeekPage from '../pages/SeekPage';

class SeekContainer extends Component {
    render() {
        return (
            <SeekPage {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    return {
        //activityList: state.appState.activityList
    }
}

export default connect(mapStateToProps)(SeekContainer);