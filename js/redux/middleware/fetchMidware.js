//
// const obj2ser = objs => {
//     let str = '';
//     for (var key in objs) {
//         if (!objs.hasOwnProperty(key)) continue;
//
//         str += key + "=" + objs[key] + "&";
//     }
//     return str.substring(0, str.length - 1);
// }

function fetchMiddleware(extraArgument) {
    return store => next => action => {
        let {dispatch,getState}=store
        let resHttp="";
        if (action.type == ActionType.FetchType.FETCH_REQUEST) {
            let requestType = action.requestType || 'POST';
            let requestData = action.requestData || {};
            action.requestData="";
            const requestHeader = {
                method: requestType,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
            if (requestType == 'POST') {
                let userData=getState().get("appState").get("userData");
                requestData = requestData ? requestData:{};

                if(userData.get("isLogined")) {
                    requestData.jsessionid = userData.get("data").get("jsessionid");
                }
                let {appState}=getState();
                requestHeader.body = JSON.stringify(requestData);
            }

            TLog("http---------->" + action.url,requestHeader.body);
             fetch(action.url, requestHeader).then(response =>response.text())
             //fetch(action.url, requestHeader).then(response =>response.json())
                .then(res => {
                    res=res.replace(/;/g,   "");
                   //TLog(`http<----------${action.url}:`,res);
                    resHttp = res
                    let data = JSON.parse(res);
                    //const data = res;
                    TLog(`http<----------${action.url}:`,data);
                    //错误，显示错误信息
                    if (data && data.status == 0) {
                        next(ActionEnum.AppAct.showBox(data.msg || "操作错误~",'error'));
                    }
                    else {
                        if (action.callback && undefined !=  action.callback) {

                            try{
                                action.callback(data);
                            }
                            catch (err){
                                TLog(`callback error<----------${action.url}:`,err);
                            }
                        }
                        //if(data.isSuccess&&action.endAction){
                        if(action.endAction){
                              next({type:action.endAction,httpResult:data});
                        }

                        if(data.Msg)//警告提示信息
                        {
                            if(data.isSuccess){
                                next(ActionEnum.AppAct.showBox(data.Msg));

                            }
                            else{
                                if(data.type=="loginTimeout") {
                                    next(ActionEnum.AppAct.showErrorBox("请登陆后 再做此操作！"));
                                    next(ActionEnum.AppAct.loginOut());
                                    G_NavUtil.pushToView(G_NavViews.LoginView());
                                }
                                else{
                                    next(ActionEnum.AppAct.showErrorBox(data.Msg));
                                }

                            }
                        }
                    }
                    //更改请求状态
                    if(!action.isHideHint)  {
                        next(ActionEnum.FetchAct.noticeSuccess());
                    }

                })
                .catch(e => {
                    let errorMsg = e.toString();
                    TLog(`http<-------error--- ${action.url}`, errorMsg);
                    TLog(`http<-------error--- ${action.url}`, resHttp);
                    next(ActionEnum.FetchAct.noticeFail());
                    if (!action.isHideError) {
                        next(ActionEnum.AppAct.showBox(errorMsg, 'error'));
                    }
                })
        }
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        //如果需要隐藏提示框 先返回null  不提示
        return action.isHideHint ? null : next(action);
      //  return next(action)
    };
}

const fetchObject = fetchMiddleware();
fetchObject.withExtraArgument = fetchMiddleware;

export default fetchObject;
