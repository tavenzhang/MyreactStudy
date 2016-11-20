
import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomePage from '../pages/HomePage';

class HomeContainer extends Component {

    render() {
        return (
            <HomePage {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    return {
        slideIndex: state.appState.homeSlideIndex,
        videoListsAll: state.appState.videoListsAll,
        videoListsRec: state.appState.videoListsRec,
        videoListsSls: state.appState.videoListsSls,
        videoListsOrd: state.appState.videoListsOrd
    }
}

export default connect(mapStateToProps)(HomeContainer);