/**
 * Created by soga on 16/10/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RankExp} from '../pages';

class RankExpContainer extends Component {

    render() {
        return (
            <RankExp {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    return {
        rankSlideIndex: state.appState.rankSlideIndex,
        expLists: state.appState.expLists
    }
}

export default connect(mapStateToProps)(RankExpContainer);