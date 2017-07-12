
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

    showBox: (msg, isError=false) => ({
        type: ActionType.AppType.SHOW_INFOBOX,
        msg,
        isError
    }),
    hideBox: data => ({
        type: ActionType.AppType.HIDE_INFOBOX,
        isError:false
    }),
    showErrorBox: (msg, isError=true) => ({
        type: ActionType.AppType.SHOW_INFOBOX,
        msg,
        isError,
    }),
    app_data_reset:()=>({
        type: ActionType.AppType.APP_BACK_RESET,
    }),
    app_route_state:(data)=>({
        type:ActionType.AppType.ROUT_STATE,
        data
    }),
    setStorgeUser:(name,pwd)=>({
        type:ActionType.AppType.STORAGE_USER,
        name,
        pwd,
    }),
    setAwardList:(data)=>({
        type:ActionType.AppType.AWARD_LIST,
        data
    }),
    setNoticeList:(data)=>({
        type:ActionType.AppType.NOTICE_LIST,
        data
    }),
    showConfigModel:(visible=true)=>({
        type:ActionType.AppType.SHOW_CONFIG_MODEL,
        visible
    })
}