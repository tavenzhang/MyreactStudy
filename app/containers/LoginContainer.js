
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LoginPage} from '../pages';

class LoginContainer extends Component {
    render() {
        return (
            <LoginPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {

    }
})(LoginContainer);