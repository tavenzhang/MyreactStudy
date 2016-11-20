/**
 * Created by soga on 16/9/19.
 */
//import fetch from 'isomorphic-fetch'
//import request from 'superagent'
//import { ajax } from '../utils/util'
import { fetchAN } from '../actions/fetch'
import { appAN } from '../actions/app'
import { obj2ser } from '../utils/util'
//const getData = url => {
//    return fetch(url).then(response => response.json())
//}

function fetchMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        //console.log(new Date());
        //console.log(action.type);
        let requestType = action.requestType || 'POST';
        let requestData = action.requestData || {};
        //
        const requestHeader = {
            method: requestType,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        if(requestType == 'POST') {
            requestHeader.body = obj2ser(requestData);
        }
        //console.log(requestHeader)
        if( action.type === fetchAN.FETCH_REQUEST ) {

            fetch(action.url,requestHeader).then(response => response.json())
                .then(res => {
                    //const data = res.body;
                    //console.log("=========================success")
                    const data = res;
                    console.log("ajax请求数据：",data);
                    //更改请求状态
                    next({
                        type:fetchAN.FETCH_SUCCEED
                    });
                    //错误，显示错误信息
                    if(data && data.status == 0) {
                        next({
                            type:appAN.SHOW_INFOBOX,
                            msg:data.msg || "操作错误~",
                            style:'error'
                        })
                    }
                    else {
                        //设置数据
                        if(action.successAction) {
                            next({
                                type:action.successAction,
                                data:data
                            })
                        }
                        //callback
                        if(action.callback) {
                            action.callback(data)
                        }
                    }

                })
                .catch(e => {
                    console.log("=========================error")
                    console.log(e)
                    let errorMsg = "请求错误，请重新操作~";

                    next({
                        type:fetchAN.FETCH_FAILED
                    });
                    next({
                        type:appAN.SHOW_INFOBOX,
                        msg:errorMsg,
                        style:'error'
                    });
                })
        }

        if (typeof action === 'function') {

            return action(dispatch, getState, extraArgument);
        }

        return next(action);
    };
}

const fetchObject = fetchMiddleware();
fetchObject.withExtraArgument = fetchMiddleware;

export default fetchObject;
