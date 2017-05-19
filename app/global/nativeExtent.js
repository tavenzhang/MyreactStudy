import { NativeModules,Platform} from 'react-native';
let INativeModule=NativeModules.INativeModule;//ios 扩展模块
let ANativeModule=NativeModules.ANativeModule;//andorid 扩展模块

/**
 * 打印
 */
export const TLog = (name = null, obj = []) => {
    //if( process.env.NODE_ENV == 'development') {//开发环境
    //	return console.TLog(name,obj)
    if(Platform.OS === 'ios')
    {
        INativeModule.logClass("myLog",name+" \n"+ JSON.stringify(obj));
    }
    else{
        // if( process.env.NODE_ENV == 'development'){
        //     obj ? console.log(name, obj) : console.log(name);
        // }
        // else{
        //     ANativeModule.logClass("myLog",name+" \n"+ JSON.stringify(obj));
        // }
        ANativeModule.logClass("myLog",name+" \n"+ JSON.stringify(obj));
    }
};

global.TLog = TLog;


//移动端 统计分析 接口
export const TAnalysis = (name = null, dateObj= null) => {
    if(Platform.OS === 'ios')
    {
        if(dateObj==null)
        {
            INativeModule.analysis(name);
        }
        else{
            INativeModule.analysisWithObj (name,dateObj);
        }
    }
    else{

        if(dateObj==null)
        {
            ANativeModule.analysis(name);
        }
        else{
            ANativeModule.analysisWithObj (name,dateObj);
        }
    }
};

global.TAnalysis = TAnalysis;
