export const ActionType = {
    AppType: {
        SHOW_LOADING: "app/SHOW_LOADING",
        HIDE_LOADING: "app/HIDE_LOADING",
        LOGIN_RESULT: "app/LOGIN_RESULT",
        LOG_OUT: "app/LOG_OUT",
        SHOW_INFOBOX: "app/SHOW_INFOBOX",
        HIDE_INFOBOX: "app/HIDE_INFOBOX",
        GAMELIST_RESULT: "app/GAMELIST_RESULT",
        PLAY_LIST_RESULT: "app/PLAT_LIST_RESULT",
        MOBILE_TYPES_RESULT: "app/MOBILE_TYPES_RESULT",
        BANG_CITY_INFO:"app/BANG_CITY_INFO",
        CARD_LIST_GET:"app/CARD_LIST_GET",
        MONEY_ACCOUNT__CHANGE:"app/MONEY_ACCOUNT__CHANGE",
        APP_BACK_RESET:"app/APP_BACK_RESET",
    },
    FetchType: {
        FETCH_REQUEST: "fetch/REQUEST",
        FETCH_SUCCEED: "fetch/SUCCEED",
        FETCH_FAILED: "fetch/FAILED"
    },
    HomeType: {
        BANNERS_RESULT: "home/GET_BANNERS",
    },
    NoticeType: {
        NOTICE_DATA_LIST: "NoticeType/DATA_LIST",
    },
    GameType: {
        ADD_ORDER: "GameType/ADD_ORDER",
        DEL_ORDER: "GameType/DEL_ORDER",
        SET_BALLS: "GameType/SET_BALLS",
        SET_MONEYUNIT: "GameType/SET_MONEYUNIT",
        SET_MULTIPLE: "GameType/SET_MULTIPLE",
        SET_GAMECONFIG: "GameType/SET_GAMECONFIG",
    },
}
global.ActionType=ActionType;