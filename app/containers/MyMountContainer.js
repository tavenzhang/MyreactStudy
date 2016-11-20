/**
 * Created by soga on 16/10/25.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MyMountPage} from '../pages';

class MyMountContainer extends Component {
    render() {
        return (
            <MyMountPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {
        myMount : state.appState.myMount,//我的道具
    }
})(MyMountContainer);