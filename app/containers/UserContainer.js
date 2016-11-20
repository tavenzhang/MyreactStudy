
import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserPage from '../pages/UserPage';

class UserContainer extends Component {
    render() {
        return (
            <UserPage {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin : state.appState.isLogin,
        userInfo : state.appState.userInfo
    }
}

export default connect(mapStateToProps)(UserContainer);