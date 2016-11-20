/**
 * Created by soga on 16/10/25.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MyFavPage} from '../pages';

class MyFavContainer extends Component {
    render() {
        return (
            <MyFavPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {
        myFav: state.appState.myFav
    }
})(MyFavContainer);