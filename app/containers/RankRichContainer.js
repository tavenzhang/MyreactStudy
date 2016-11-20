/**
 * Created by soga on 16/10/24.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RankRich} from '../pages';

class RankRichContainer extends Component {

    render() {
        return (
            <RankRich {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    return {
        richLists: state.appState.richLists
    }
}

export default connect(mapStateToProps)(RankRichContainer);