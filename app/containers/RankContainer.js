
import React, {Component} from 'react';
import {connect} from 'react-redux';
import RankPage from '../pages/RankPage';

class RankContainer extends Component {
    render() {
        return (
            <RankPage {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    const expLists = state.appState.expLists.day.slice(0, 3);
    const richLists = state.appState.richLists.day.slice(0, 3);
    return {
        rankSlideIndex: state.appState.rankSlideIndex,
        expLists: expLists,
        richLists: richLists
    }
}

export default connect(mapStateToProps)(RankContainer);