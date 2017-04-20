/**
 * Created by soga on 2017/4/18.
 */

import {ActionType} from "./ActionType";

const gType = ActionType.GameType;

export const GameAct={

    addOrderToBasket: data => ({
        type: gType.ADD_ORDER,
        data
    }),

    delOrder: id => ({
        type: gType.DEL_ORDER,
        id: id || id == 0 ? id : -1
    }),

    setBalls: data => ({
        type: gType.SET_BALLS,
        data
    })
}
