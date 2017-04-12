import { NativeModules,Platform } from 'react-native';
let IOSLog=NativeModules.IOSLog;


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


const DateUtil={
    //2017-02-22  15:47:00
    formatRecodData:(date:Date)=>{
        return date.Format("yyyy-MM-dd hh:mm:ss");
    },
    /**
     * 2012-11-16 10:36:50日期格式转时间戳
     * @param datetime
     * @returns {Number|*}
     */
    datetime2Date:(datetime) => {
        let tmp_datetime = datetime.replace(/:/g, '-');
        tmp_datetime = tmp_datetime.replace(/ /g, '-');
        let arr = tmp_datetime.split("-");
        let now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
        return parseInt(now.getTime() / 1000);
    },
    formatItemDateString(dataString)
    {
        let newstr=dataString.replace(/-/g,   "/");
        let  date = new Date(Date.parse(newstr));
        let dataName=` ${date.getMonth() +1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        return dataName
    },
    formatSimpleItemDateString(dataString)
    {
        let newstr=dataString.replace(/-/g,   "/");
        let  date = new Date(Date.parse(newstr));
        let day=date.getDate()>9 ? `${date.getDate()}日`:`0${date.getDate()}日`;
        let hour=date.getHours()>9 ? `${date.getHours()}`:`0${date.getHours()}`;
        let min=date.getMinutes()>9 ? `${date.getMinutes()}`:`0${date.getMinutes()}`;
        let dataName =` ${day} \n ${hour}:${min} `;
        return dataName
    }
}

global.DateUtil = DateUtil;


const StringUtil={
    //2017-02-22  15:47:00
    formatBankCard:(str)=>{
        let tempStr = str.substr(0, str.length - 4);
        tempStr = tempStr.replace(/./g, "*");
        tempStr += str.substr(str.length - 4);
         return tempStr;
    },
}
global.StringUtil=StringUtil;

/**
 * 打印
 */
export const TLog = (name = null, obj = []) => {
    //if( process.env.NODE_ENV == 'development') {//开发环境
    //	return console.TLog(name,obj)
     if(Platform.OS === 'ios')
     {
         IOSLog.logClass("myLog",name+" \n"+ JSON.stringify(obj));
     }
     else{
        obj ? console.log(name, obj) : console.log(name);
    }
};

global.TLog = TLog;





/**
 * 判断对象是否是空
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObj = obj => {
    for (let name in obj) {
        return false;
    }
    return true;
};

/**
 * 转换含url的字符串
 * @param str
 */
export const changLinkMsg = str => {
    let linkMsg = /@(.+?)@/g.exec(str);
    if (linkMsg) {
        const parms = linkMsg[0].split(" ");
        const text = parms[1].substring(6, parms[1].length - 1);
        const link = parms[2].substring(6, parms[2].length - 4);
        const strArray = str.split(linkMsg[0]);
        return [...strArray, link, text];
    }
    else {
        return [str];
    }
}

/**
 * 时间戳转日期格式
 * @param time
 * @returns {string}
 */
export const changeDate = time => {
    return new Date(parseInt(time) * 1000).toISOString().substr(0, 19).replace('T', ' ');
}

/**
 * 一级对象序列化
 * @param objs
 * @returns {string}
 */
export const obj2ser = objs => {
    let str = '';
    for (var key in objs) {
        if (!objs.hasOwnProperty(key)) continue;

        str += key + "=" + objs[key] + "&";
    }
    return str.substring(0, str.length - 1);
}



/**
 * 获取随机整数
 * @param start
 * @param end
 * @returns {*|number}
 */
export const rnd = (start, end) => {
    return Math.floor((Math.random() * (end - start)) + start);
}



