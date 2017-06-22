

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
    }),

    setMoneyUnit: data => ({
        type: gType.SET_MONEYUNIT,
        data
    }),

    setMultiple: data => ({
        type: gType.SET_MULTIPLE,
        data
    }),

    setGameConfig: data => ({
        type: gType.SET_GAMECONFIG,
        data
    }),
}
