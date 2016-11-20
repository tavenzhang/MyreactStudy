
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RegisterPage} from '../pages';

class RegisterContainer extends Component {
    render() {
        return (
            <RegisterPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {

    }
})(RegisterContainer);