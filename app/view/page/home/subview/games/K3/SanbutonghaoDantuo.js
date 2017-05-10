/**
 * Created by soga on 2017/5/10.
 */
import K3 from "./K3";

export default class ErbutonghaoDantuo extends K3 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1]
    ];

    //设置rowtitle
    setRowTitle = () => ['胆码','拖码'];

    setBallData(x, y, value) {
        const me = this;
        const data = me.state.balls;
        let xLen = 0;

        if(x==0) {
            return false;
        }
        for (let val in data[0]) {
            if(data[0][val] > 0){
                xLen++;
            }
        }
        if(y == 0){
            if(value == 1){
                if(xLen > 1){
                    me.setBallData(me.lastSelectBallIndex, 0, -1);
                }
                //me.setBallData(x, 0, 1);
                me.setBallData(x, 1, -1);
                me.lastSelectBallIndex = x;
            }
        }

        if(y == 1){
            me.setBallData(x, 0, -1);
        }

        if (y >= 0 && y < data.length && x >= 0) {
            data[y][x] = value;
        }
    }

    makePostParameter(original) {
        var me = this,
            result = [],
            len,
            tempArr = [],
            i = 0;
        for(let k=0; k<original.length; k++) {
            tempArr[k]  = [];
            for(let j=0; j<original[k].length; j++) {
                tempArr[k][j] = original[k][j];
            }
        }

        len = tempArr.length;
        for (i =0; i < len; i++) {
            result = result.concat(tempArr[i].join(''));
        }
        return result.join('|');
    }

    checkBallIsComplete(){
        let me = this,
            ball = me.state.balls,
            i = 0,
            len = ball[0].length,
            num = 0, oNum = 0;

        for(;i < len;i++){
            if(ball[0][i] > 0){
                oNum++;
            }
            if(ball[1][i] > 0){
                num++;
            }
        }
        if(num >= 1 && oNum >= 1){
            return true;
        }

        return false;
    }

    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum){
        let me = this,
            ball = me.state.balls,
            i = 0,
            danMaLen = me.countBallsNumInLine(0),
            len = ball[1].length,
            result = [],
            arr = [],
            danMaArr = [],
            nr = [];

        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            for(;i < len;i++){
                if(ball[1][i] > 0){
                    arr.push(i);
                }
            }

            //存储单号组合
            result = me.combine(arr, 3 - danMaLen);
            for(let j=0;j<ball[0].length;j++){
                if(ball[0][j] == 1){
                    danMaArr.push(i);
                }
            }

            //加上单号各种组合
            for(let s=0;s<result.length;s++){
                nr.push(result[s].concat(danMaArr));
            }

            return nr;
        }
        return [];
    }
}