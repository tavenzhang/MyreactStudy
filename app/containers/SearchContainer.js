
import React from 'react';
import {connect} from 'react-redux';
import {SearchPage} from '../pages';

class SearchContainer extends React.Component {
    render() {
        return (
            <SearchPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {
        videoLists: state.appState.searchVideoLists
    }
})(SearchContainer);