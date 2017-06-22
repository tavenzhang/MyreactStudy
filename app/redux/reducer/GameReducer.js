/**
 * Created by soga on 2017/4/18.
 */
import {fromJS} from 'immutable';
const initGameState = fromJS({
    gameId: null,
    lottery_items: null,
    isTrace:0,//追号信息
    traceTimes:1,//追号信息
    traceMultiple:1,//追号倍数
    traceInfo:1,//追号数据
    gameNumbers: [],
    orderList: [], //订单数据
    moneyUnit: 1, //金额模式
    multiple: 1, //倍数
})

const gType = ActionType.GameType;

const gameState = (state = initGameState, action) => {

    switch (action.type) {
        case gType.ADD_ORDER:
            let shouldAdd = true;
            state.getIn(['orderList']).forEach(function(d, b) { //去重
                if(d.viewBalls == action.data.viewBalls) {
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
                return state.deleteIn(['orderList', action.id ]);
            }
            else {//清空
                return state.merge({orderList: []})
            }
        case gType.SET_BALLS:
            return state.merge({balls: action.data})

        case gType.SET_MONEYUNIT:
            return state.merge({moneyUnit:action.data})

        case gType.SET_TRACE:
            const traceInfo=action.data;
            // TLog('......INFO',traceInfo.traceInfo);
            return state.merge({
                isTrace:traceInfo.isTrace,
                traceTimes:traceInfo.traceTimes,
                traceMultiple:traceInfo.traceMultiple,
                traceInfo:traceInfo.traceInfo
            })

        case gType.SET_MULTIPLE:
            return state.merge({multiple:action.data})

        case gType.SET_GAMECONFIG:
            //TLog('gameConfig====',action.httpResult)
            const data = action.httpResult.data;
            return state.merge({
                gameId: data.gameId,
                lottery_items: data.currentNumber,
                gameNumbers: data.gameNumbers,
            })
        default:
            return state;
    }
}

export default gameState