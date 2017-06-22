import GameModel from "../model/GameModel";
import PlayModel from "../model/PlayModel";
import MobileTypes from "../model/MobileTypesModel";
import {fromJS} from 'immutable';
import BankCityModel from "../model/BankCityModel";

const initAppState = fromJS({
    requesting: false,
    fail: false,
    success: true,
    userData: {isLogined:false},
    infoBox: {
        show: false, //是否显示
        msg: "",//显示内容
        style: 'success'//success成功，error错误
    },
    playsDic: {arrayList: []},
    gameModel: new GameModel (),
    playModel: new PlayModel(),
    typesModel:new MobileTypes(),
    bankCityModel:new BankCityModel(),
    cardList:[],
    moneyBalance:0
})

const appState = (state = initAppState, action) => {
    switch (action.type) {
        case ActionType.AppType.SHOW_LOADING :
            return state.merge({
                requesting: true,
                fail: false,
                success: false
            });
        case ActionType.AppType.HIDE_LOADING :
            return state.merge({
                requesting: false,
                fail: false,
                success: true
            });
        case ActionType.AppType.MONEY_ACCOUNT__CHANGE:
            TLog("ActionType.AppType.MONEY_ACCOUNT__CHANGE----",action.httpResult.data)
            return state.merge({moneyBalance:parseFloat(action.httpResult.data.available)});
        case ActionType.AppType.LOGIN_RESULT:
            return state.merge({userData: {...action.data,isLogined:true},moneyBalance:Number(action.data.data.available)});
        case ActionType.AppType.LOG_OUT:
            return state.merge({userData: {isLogined:false},moneyBalance:0});
        case ActionType.AppType.SHOW_INFOBOX:
            return state.merge({infoBox: {
                    show: true,
                    msg: action.msg,
                    isError: action.isError
                }
            });
        case ActionType.AppType.HIDE_INFOBOX:
            return state.merge({
                infoBox: {
                    show: false,
                    isError: action.isError,
                    msg: '',
                    style: ''
                }
            })
        case ActionType.AppType.GAMELIST_RESULT:
            return state.merge({gameModel: new GameModel(action.httpResult.data)});
        case ActionType.AppType.PLAY_LIST_RESULT:
            return state.merge({playModel: new PlayModel(action.httpResult.data)});
        case ActionType.AppType.MOBILE_TYPES_RESULT:
            return state.merge({typesModel: new MobileTypes(action.httpResult)});
        case ActionType.AppType.BANG_CITY_INFO:
            return state.merge({bankCityModel: new BankCityModel(action.httpResult)});
        case ActionType.AppType.CARD_LIST_GET:
            let tempList= state.get("cardList");
            if( action.httpResult.data.current_page == 1)
            {
                tempList= action.httpResult.data.data;
            }
            else{
                if(action.httpResult.data.data)
                {
                    tempList=tempList.concat(action.httpResult.data.data);
                }
            }
           // TLog("ActionType.AppType.CARD_LIST_GET---",tempList)
            return state.merge({cardList:tempList});
        case ActionType.AppType.APP_BACK_RESET:
            return state.merge(initAppState);
        default:
            return state;
    }
}
export default appState
