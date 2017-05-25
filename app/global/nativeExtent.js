import {NativeModules, Platform} from 'react-native';
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
        if(G_ENV_DEBUG) {
            INativeModule.logClass("myLog", name + " \n" + JSON.stringify(obj));
        }
    }
    else {
        ANativeModule.logClass("myLog", name + " \n" + JSON.stringify(obj));
    }
};;


//移动端 统计分析 接口
global.T_Analysis =(name = null, dateObj = null) => {
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
global.T_CheckCodePush = (serverName, keyStr) => {

    let codeUpdate = (err, datas) => {
        if (__DEV__) {
            // debug模式
        } else {
            // release模式
            CodePush.checkForUpdate()
                .then( (update) =>{
                    if( !update ){
                        TLog("codePush--------","app是最新版了")
                    }else {
                        TLog("codePush--------",update)
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
                TLog("codePush-------error-",err);
            });
        }
    }

    if (G_PLATFORM_IOS) {
        INativeModule.codePushServer(serverName, codeUpdate);
    }
    else {
        ANativeModule.codePushServer(serverName, codeUpdate);
    }
}



global.T_AppReStart = () => {
    G_PLATFORM_IOS ?    RNRestart.Restart():ANativeModule.restartApp();

}

global.T_JSReload = () => {
   RNRestart.Restart();
}

