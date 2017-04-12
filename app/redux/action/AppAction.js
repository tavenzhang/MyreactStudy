import {ActionType } from "./ActionType";

const action = (type, payload = {}) => ({
    type,
    ...payload
});

export const AppAct={

    showLoading:() => action(ActionType.AppType.SHOW_LOADING),

    hideLoading:()=> action(ActionType.AppType.HIDE_LOADING),

    loginReault:(data)=>({
            type: ActionType.AppType.LOGIN_RESULT,
            data
        }
    ),
    loginOut:()=>({
            type: ActionType.AppType.LOG_OUT
        }
    ),

    showBox: (msg, style = 'success') => ({
        type: ActionType.AppType.SHOW_INFOBOX,
        msg,
        style
    }),
    hideBox: data => ({
        type: ActionType.AppType.HIDE_INFOBOX,
    }),
    showErrorBox: (msg, style = 'error') => ({
        type: ActionType.AppType.SHOW_INFOBOX,
        msg,
        style,
    }),
}