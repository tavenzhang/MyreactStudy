
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
    })
}