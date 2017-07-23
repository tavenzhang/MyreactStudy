import GameModel from "../model/GameModel";
import PlayModel from "../model/PlayModel";
import AppModel from "../model/AppModel";
import {fromJS} from 'immutable';
import BankCityModel from "../model/BankCityModel";

const initAppState = fromJS({
    requesting: false,
    fail: false,
    success: true,
    userData:{isLogined:false,data:{is_set_fund_password:55}},
    infoBox: {
        show: false, //是否显示
        msg: "",//显示内容
        style: 'success'//success成功，error错误
    },
    playsDic: {arrayList: []},
    gameModel: new GameModel (),
    playModel: new PlayModel(),
    appModel:new AppModel(),
    bankCityModel:new BankCityModel(),
    moneyBalance:0,
    routState:{isFlush:false},
    storageUser:{},
    awardList:[],
    noticeList:[],
    showConfigModel:false,
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
            //TLog("ActionType.AppType.MONEY_ACCOUNT__CHANGE----",action.httpResult.data)
            return state.merge({moneyBalance:parseFloat(action.httpResult.data.available)});
        case ActionType.AppType.LOGIN_RESULT:
            return state.merge({userData:fromJS({...action.data,isLogined:true}),moneyBalance:Number(action.data.data.available)});
        case ActionType.AppType.LOG_OUT:
            return state.merge({userData: fromJS({isLogined:false}),moneyBalance:0});
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
            return state.merge({appModel: new AppModel(action.httpResult)});
        case ActionType.AppType.BANG_CITY_INFO:
            return state.merge({bankCityModel: new BankCityModel(action.httpResult)});
        case ActionType.AppType.APP_BACK_RESET:
            return state.merge(initAppState);
        case ActionType.AppType.PWD_FOUND_SET:
            return state.setIn(["userData","data","is_set_fund_password"],1);
        case ActionType.AppType.PWD_LOGIN_SET:
            return state.merge(initAppState);
        case ActionType.AppType.ROUT_STATE:
            return state.merge({routState:{isFlush:action.isFlush,...action.data}});
        case ActionType.AppType.STORAGE_USER:
            return state.merge({storageUser: action});
        case ActionType.AppType.AWARD_LIST:
            return state.merge({awardList: action.data});
        case ActionType.AppType.NOTICE_LIST:
            return state.merge({noticeList: action.data});
        case ActionType.AppType.SHOW_CONFIG_MODEL:
            return state.merge({showConfigModel: action.visible});
        default:
            return state;
    }
}
export default appState
