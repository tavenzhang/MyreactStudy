
export const FetchAct = {
    fetchWithResult:(url ,callback = null,requestType="GET",requestData=null,isHideHint = true, isModal=false,isHideError = false, isText=false) => ({
        type: ActionType.FetchType.FETCH_REQUEST,
        isHideError,
        isHideHint,
        isModal,
        callback,
        isText,
        url,
        requestData,
        requestType
    }),
    fetchVoWithResult:(dataVo,callback = null,isHideHint = false,isModal=false, isHideError = false, isText=false)=>({
            type: ActionType.FetchType.FETCH_REQUEST,
            url:`${G_SERVERADDR}${dataVo.url}`,
            requestType:dataVo.method ? dataVo.method:"GET",
            requestData:dataVo.body,
            isModal,
            isHideError,
            isHideHint,
            callback,
            isText,
        }
    ),
    fetchVoWithAction:(dataVo,endAction,callback = null,isHideHint = false,isModal=false, isHideError = false, isText=false)=>({
            type: ActionType.FetchType.FETCH_REQUEST,
            url:`${G_SERVERADDR}${dataVo.url}`,
            requestType:dataVo.method ? dataVo.method:"GET",
            requestData:dataVo.body,
            isModal,
            isHideError,
            isHideHint,
            endAction,
            callback,
            isText,
        }
    ),
    noticeFail:(data)=>({
        type: ActionType.FetchType.FETCH_FAILED,
        data
    }),
    noticeSuccess:()=>({
        type: ActionType.FetchType.FETCH_SUCCEED
    })
}
