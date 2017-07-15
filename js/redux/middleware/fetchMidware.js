//优化 可取消的promise增强
const FetchMap=new Map();
const makeCancelable = (promise) => {
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) =>
          //  hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
            hasCanceled_ ? null : resolve(val)
        );
        promise.catch((error) =>
            hasCanceled_ ? null: reject(error)
        );
    });
    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

function fetchMiddleware(extraArgument) {
    return store => next => action => {
        let {dispatch,getState}=store
        let resHttp = "";
        if (action.type == ActionType.FetchType.FETCH_REQUEST) {
            let requestType = action.requestType || 'POST';
            let requestData = action.requestData;
            const requestHeader = {
                method: requestType,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "PHONEUA":G_PLATFORM_IOS ? "iPhone":"Android",
                }
            }
            if (requestType == 'POST') {
                let userData=getState().get("appState").get("userData");
                requestData = requestData ? requestData:{};

                if(userData.get("isLogined")) {
                    requestData.jsessionid = userData.get("data").get("jsessionid");
                }
                requestHeader.body = JSON.stringify(requestData);
            }
            TLog("http----------->" + action.url,requestHeader.body);
            let keyFetch=action.url+requestHeader.body;
            if(!FetchMap.get(keyFetch))
            {
                let fetchCanelAble=makeCancelable(fetch(action.url, requestHeader));
                FetchMap.set(keyFetch,fetchCanelAble);
                //fetch(action.url, requestHeader).then(response =>response.json())
                fetchCanelAble.promise.then(response =>response.text())
                    .then(res => {
                        FetchMap.set(keyFetch,null);
                        res=res.replace(/;/g,   "");
                        resHttp = res;
                        let data = JSON.parse(res);
                        TLog("http<--------------" + action.url,data);
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
                                        G_NavUtil.push(G_RoutConfig.LoginView)
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
                        FetchMap.set(keyFetch,null);
                        let errorMsg = e.toString();
                        TLog(`http<-------error---`, errorMsg);
                        TLog(`http<-------error--- ${action.url}`, resHttp);
                        next(ActionEnum.FetchAct.noticeFail());
                        if (!action.isHideError) {
                            next(ActionEnum.AppAct.showBox(errorMsg, 'error'));
                        }
                    })
            }
        }
        else if(action.type == ActionType.FetchType.FETCH_CANCEL) {
            let bodyStr =!action.body ? "":JSON.stringify(action.body);
            let key=action.url+bodyStr;
            let promise=FetchMap.get(key)
            if(promise) {
                TLog(`http--------canel----------------`, key);
                FetchMap.set(key,null);
                promise.cancel()
            }
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
