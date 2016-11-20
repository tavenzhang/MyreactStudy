/**
 * Created by soga on 16/10/27.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RechargePage} from '../pages';

class RechargeContainer extends Component {
    render() {
        return (
            <RechargePage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {

    }
})(RechargeContainer);