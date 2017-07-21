import {NativeModules} from 'react-native';
import RNRestart from 'react-native-restart'
import CodePush from 'react-native-code-push';
let INativeModule = NativeModules.INativeModule;//ios 扩展模块
let ANativeModule = NativeModules.ANativeModule;//andorid 扩展模块

/**
 * 打印
 */
global.TLog = (name = null, obj = []) => {
    //obj ? console.log(name, obj) : console.log(name);
    if (G_PLATFORM_IOS) {
        if (G_ENV_DEBUG) {
            INativeModule.logClass("myLog", name + " \n" + JSON.stringify(obj));
        }
    }
    else {
        if (G_ENV_DEBUG){
            ANativeModule.logClass("myLog", name + " \n" + JSON.stringify(obj));
        }
    }
};


//移动端 统计分析 接口
global.T_Analysis = (name = null, dateObj = null) => {
    if (G_PLATFORM_IOS) {
        if (dateObj == null) {
            INativeModule.analysis(name);
        }
        else {
            INativeModule.analysisWithObj(name, dateObj);
        }
    }
    else {

        if (dateObj == null) {
            ANativeModule.analysis(name);
        }
        else {
            ANativeModule.analysisWithObj(name, dateObj);
        }
    }
};


//code push 更新检测
global.T_CheckCodePush = (serverName, keyStr,errHandle,isStorage=false) => {
    TLog("codePush--serverName="+serverName+"---story=="+isStorage,keyStr);
    let codeUpdate = (err, datas) => {
        if (__DEV__) {
            // debug模式
        } else {
            CodePush.checkForUpdate(keyStr)
                .then( (update) =>{
                    if( !update ){
                        TLog("codePush--------"+update,"app是最新版了")
                        CodePush.sync({
                            deploymentKey: keyStr,
                            updateDialog: {
                                optionalIgnoreButtonLabel: '稍后',
                                optionalInstallButtonLabel: '马上更新',
                                optionalUpdateMessage: '有新版本了，是否更新？',
                                title: '更新提示'
                            },
                            installMode: CodePush.InstallMode.IMMEDIATE
                        })
                    }else {
                        TLog("codePush--------=="+update,"更新同步")
                        CodePush.sync({
                            deploymentKey: keyStr,
                            updateDialog: {
                                optionalIgnoreButtonLabel: '稍后',
                                optionalInstallButtonLabel: '马上更新',
                                optionalUpdateMessage: '有新版本了，是否更新？',
                                title: '更新提示'
                            },
                            installMode: CodePush.InstallMode.IMMEDIATE
                        })
                        let codePush={};
                        codePush.keyStr=keyStr;
                        codePush.server=serverName;
                        G_MyStorage.setItem(G_EnumStroeKeys.CODE_PUSH,JSON.stringify(codePush));
                    }
                }).catch((err)=>{
                if(isStorage)
                {
                    G_MyStorage.setItem(G_EnumStroeKeys.CODE_PUSH,"",()=>{
                        if(errHandle) {
                            errHandle()
                        }
                    });
                }
                else{
                    if(errHandle) {
                        errHandle()
                    }
                }
                TLog("codePush-------error"+serverName,err);

            });
        }
    }

    if (G_PLATFORM_IOS) {
        INativeModule.codePushServer(serverName,keyStr, codeUpdate);
    }
    else {
        ANativeModule.codePushServer(serverName,keyStr, codeUpdate);
    }
}

global.T_AppReStart = () => {
    G_PLATFORM_IOS ? RNRestart.Restart() : ANativeModule.restartApp();

}

global.T_JSReload = () => {
    RNRestart.Restart();
}
let firstErrorTyr=false;

let CODER_SERVER_LIST=[];

global.T_TryCodePushConfig = () => {
    firstErrorTyr=true;
    let serverList=["http://dl.lgfoo.com/thomas.json"];
    for (let item of serverList) {
        ActDispatch.FetchAct.fetchWithResult(`${item}?a=${Math.random()}`,(result)=>{
            if(result.server&&CODER_SERVER_LIST.length==0)
            {
                CODER_SERVER_LIST = result.server;
                if(CODER_SERVER_LIST.length>0) {
                    errHanlde();
                }
            }
        })
    }
}

 let errHanlde=()=>{
    if(CODER_SERVER_LIST.length>0)
    {
        let data=CODER_SERVER_LIST.shift();
        T_CheckCodePush(data.server,G_PLATFORM_IOS ? data.key_ios:data.key_android,errHanlde)
    }
}


