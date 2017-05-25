import {NativeModules, Platform} from 'react-native';
import RNRestart from 'react-native-restart'
import CodePush from 'react-native-code-push';
let INativeModule = NativeModules.INativeModule;//ios 扩展模块
let ANativeModule = NativeModules.ANativeModule;//andorid 扩展模块

/**
 * 打印
 */
export const TLog = (name = null, obj = []) => {
    //if( process.env.NODE_ENV == 'development') {//开发环境
    //	return console.TLog(name,obj)
    if (Platform.OS === 'ios') {
        INativeModule.logClass("myLog", name + " \n" + JSON.stringify(obj));
    }
    else {
        // if( process.env.NODE_ENV == 'development'){
        //     obj ? console.log(name, obj) : console.log(name);
        // }
        // else{
        //     ANativeModule.logClass("myLog",name+" \n"+ JSON.stringify(obj));
        // }
        ANativeModule.logClass("myLog", name + " \n" + JSON.stringify(obj));
    }
};

global.TLog = TLog;


//移动端 统计分析 接口
export const TAnalysis = (name = null, dateObj = null) => {
    if (Platform.OS === 'ios') {
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

global.TAnalysis = TAnalysis;


export const G_CheckCodePush = (serverName, keyStr) => {

    let codeUpdate = (err, datas) => {
        if (__DEV__) {
            // debug模式
        } else {
            // release模式
            CodePush.checkForUpdate()
                .then( (update) =>{
                    if( !update ){
                        TLog("codePush--------","app是最新版了")
                        console.log("app是最新版了");
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
                        MyStorage.setItem(EnumStroeKeys.CODE_PUSH,JSON.stringify(codePush));
                    }
                }).catch((err)=>{
                TLog("codePush-------error-",err);
            });
        }
    }

    if (Platform.OS === 'ios') {
        INativeModule.codePushServer(serverName, codeUpdate);
    }
    else {
        ANativeModule.codePushServer(serverName, codeUpdate);
    }
}

global.G_CheckCodePush = G_CheckCodePush;

export const G_AppReStart = () => {
    G_PLATFORM_IOS ?    RNRestart.Restart():ANativeModule.restartApp();

}
global.G_AppReStart = G_AppReStart;

export const JSReload = () => {
   RNRestart.Restart();
}

global.G_JSReload = JSReload;
