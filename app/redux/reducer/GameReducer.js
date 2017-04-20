/**
 * Created by soga on 2017/4/18.
 */
import {fromJS} from 'immutable';
const initGameState = fromJS({
    orderList: [], //订单数据
    balls: [], //选球结构
    moneyUnit: 1, //金额模式
    multiple: 1, //倍数
    onePrice: 2, //单价
    wayId: 68, //游戏id
    type: 'wuxing.zhixuan.fushi', //游戏类型
    title: '五星.直选.复式' //游戏类型
})

const gType = ActionType.GameType;

const gameState = (state = initGameState, action) => {

    switch (action.type) {
        case gType.ADD_ORDER:
            let shouldAdd = true;
            state.getIn(['orderList']).forEach(function(d, b) { //去重
                if(d.formatViewBalls == action.data.formatViewBalls) {
                    shouldAdd = false;
                    return false;
                }
            })

            if(shouldAdd) {
                return state.update('orderList', arr => arr.concat(action.data));
            }
            else {
                return state;
            }
        case gType.DEL_ORDER:
            if(action.id >= 0) {//删除某一个
                TLog(action.id)
                return state.deleteIn(['orderList', action.id ]);
            }
            else {//清空
                return state.merge({orderList: []})
            }
        case gType.SET_BALLS:
            return state.merge({balls: action.data})

        default:
            return state;
    }
}

export default gameState