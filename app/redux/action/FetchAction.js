
export const FetchAct = {
    fetchWithResult:(url ,callback = null,requestType="GET",requestData=null,isHideHint = true, isHideError = false, isText=false) => ({
        type: ActionType.FetchType.FETCH_REQUEST,
        isHideError,
        isHideHint,
        callback,
        isText,
        url:`${SERVERADDR}${url}`,
        requestData,
        requestType
    }),
    fetchVoWithResult:(dataVo,callback = null,isHideHint = false, isHideError = false, isText=false)=>({
            type: ActionType.FetchType.FETCH_REQUEST,
            url:`${SERVERADDR}${dataVo.url}`,
            requestType:dataVo.method ? dataVo.method:"GET",
            requestData:dataVo.body,
            isHideError,
            isHideHint,
            callback,
            isText,
        }
    ),
    fetchVoWithAction:(dataVo,endAction,callback = null,isHideHint = false, isHideError = false, isText=false)=>({
            type: ActionType.FetchType.FETCH_REQUEST,
            url:`${SERVERADDR}${dataVo.url}`,
            requestType:dataVo.method ? dataVo.method:"GET",
            requestData:dataVo.body,
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
