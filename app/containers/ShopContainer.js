/**
 * Created by soga on 16/10/24.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ShopPage} from '../pages';

class ShopContainer extends Component {

    render() {
        return (
            <ShopPage {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    return {
        slideIndex: state.appState.shopSelectIndex,
        mounts: state.appState.mounts,//坐骑
        vipmount: state.appState.vipmount,//贵族坐骑
        vipIcons: state.appState.vipIcons,//贵族勋章
        dialogOpen: state.appState.dialogOpen,//弹出框
        userInfo: state.appState.userInfo,//用户信息
        shopSelectItem: state.appState.shopSelectItem,//当前选中的产品
    }
}

export default connect(mapStateToProps)(ShopContainer);