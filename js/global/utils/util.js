import {InteractionManager} from 'react-native';


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


global.G_DateUtil= {

    formatSecondDate: (secondNum: Number) => {
        let data = new Date(secondNum)
        return data.Format("mm:ss");
    },
    //2017-02-22  15:47:00
    formatRecodData: (date: Date) => {
        return date.Format("yyyy-MM-dd hh:mm:ss");
    },
    /**
     * 2012-11-16 10:36:50日期格式转时间戳
     * @param datetime
     * @returns {Number|*}
     */
    datetime2Date: (datetime) => {
        let tmp_datetime = datetime.replace(/:/g, '-');
        tmp_datetime = tmp_datetime.replace(/ /g, '-');
        let arr = tmp_datetime.split("-");
        let now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
        return parseInt(now.getTime() / 1000);
    },
    formatItemDateString(dataString)
    {
        let newstr = dataString.replace(/-/g, "/");
        let date = new Date(Date.parse(newstr));
        let dataName = ` ${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        return dataName
    },
//友好时间格式，如果是今天，显示是分秒， 如果不是今天 ，显示年月日
    formatFrendlyDateString(dataString)
    {
        let Tdate = new Date();
        let Tday = Tdate.getDay();
        let Tmonth = Tdate.getMonth();
        let Tyear = Tdate.getFullYear();

        let newstr = dataString.replace(/-/g, "/");
        let date = new Date(Date.parse(newstr));
        let dataName='';
        if(date.getDay()==Tdate.getDay()&&date.getMonth()==Tdate.getMonth()&&date.getFullYear()==Tdate.getFullYear()){//今天
             dataName = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        }else{
            dataName = `${date.getFullYear() }年${date.getMonth() + 1}月${date.getDate()}日`
        }

        return dataName
    },
    formatymdDateString(dataString)
    {
        let newstr = dataString.replace(/-/g, "/");
        let date = new Date(Date.parse(newstr));
        let dataName = `${date.getFullYear() }年${date.getMonth() + 1}月${date.getDate()}日`
        return dataName
    },
    formatShortDateString(dataString)
    {
        let newstr = dataString.replace(/-/g, "/");
        let date = new Date(Date.parse(newstr));
        let dataName = `${date.getMonth() + 1}月${date.getDate()}日`
        return dataName
    },
    formatMonth(dataString)
    {
        let newstr = dataString.replace(/-/g, "/");
        let date = new Date(Date.parse(newstr));
        let dataName = `${date.getMonth() + 1}月`
        return dataName
    },
    formatDay(dataString)
    {
        let newstr = dataString.replace(/-/g, "/");
        let date = new Date(Date.parse(newstr));
        let dataName = `${date.getDate()}`
        return dataName
    },
    formatSimpleItemDateString(dataString)
    {
        if (!dataString) return ""
        let newstr = dataString.replace(/-/g, "/");
        let date = new Date(Date.parse(newstr));
        let day = date.getDate() > 9 ? `${date.getDate()}日` : `0${date.getDate()}日`;
        let hour = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
        let min = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
        let dataName = ` ${day} \n ${hour}:${min} `;
        return dataName
    },
    //处理钱
    formatMoney(num) {

        var num = Number(num),
            re = /(-?\d+)(\d{3})/,
            n = arguments[1] ? arguments[1] : 2;
        if (Number.prototype.toFixed) {
            num = (num).toFixed(n)
        } else {
            var j = 1;
            var b = 1;
            while (j >= n) {
                b = b * 10;
                j++;
            }
            num = Math.round(num * b) / b
        }
        num = '' + num;
        arr = num.split('.')
        while (re.test(arr[0])) {
            arr[0] = arr[0].replace(re, "$1,$2")
        }
        if (!!arr[1]) {
            num = arr[0] + '.' + arr[1];
        }
        return num
    }
}



global.G_StringUtil =  {
    //2017-02-22  15:47:00
    formatBankCard: (str) => {
        let tempStr = str.substr(0, str.length - 4);
        tempStr = tempStr.replace(/./g, "*");
        tempStr += str.substr(str.length - 4);
        return tempStr;
    },
};

global.G_RunAfterInteractions = (func,isInteractionManager=false) => {
    if(isInteractionManager)
    {
        InteractionManager.runAfterInteractions(() => {
            if (func) {
                func();
            }
        })
    }
    else{
        if (func) {
            func();
        }
    }
}


global.G_ArrayUtils = {
    addComapreCopy: (srcList, newList, proKey="id") => {
        for (let item of  newList) {
            let container = false;
            for (let index in srcList) {
                if (srcList[index][`${proKey}`] == item[`${proKey}`]) {
                    container = true;
                    srcList[index] = item;
                    break;
                }
            }
            if (!container) {
                srcList.push(item)
            }
        }
        return srcList.slice()
    }

}


// Number.prototype.toFixed =function(len)
// {
//     var tempNum = 0;
//     var s,temp;
//     var s1 = this + "";
//     var start = s1.indexOf(".");
//
//     //截取小数点后,0之后的数字，判断是否大于5，如果大于5这入为1
//     if(s1.substr(start+len+1,1)>=5)
//     {
//         tempNum=1;
//     }
//
//     //计算10的len次方,把原数字扩大它要保留的小数位数的倍数
//     var temp = Math.pow(10,len);
//     //求最接近this * temp的最小数字
//     //floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数
//     s = Math.floor(this * temp) + tempNum;
//     return s/temp;
//
// }

/**
 * 金额格式化
 */
export const moneyFormat = (numold, s) => {
    let num = Number(numold),
        re = /(-?\d+)(\d{3})/,
        n = s ? s : 2;

    if (Number.prototype.toFixed) {
        num = (num).toFixed(n)
    } else {
        let j = 1, b = 1;
        while (j >= n) {
            b = b * 10;
            j++;
        }
        num = Math.round(num * b) / b;
    }
    num = '' + num;
    let arr = num.split('.')
    while (re.test(arr[0])) {
        arr[0] = arr[0].replace(re, "$1,$2")
    }
    if (!!arr[1]) {
        num = arr[0] + '.' + arr[1];
    }
    return num
}

global.G_moneyFormat = moneyFormat;

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



