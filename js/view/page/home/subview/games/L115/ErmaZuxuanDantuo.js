/**
 * Created by soga on 2017/4/24.
 */

import L115 from "./L115";

export default class ErmaZuxuanDantuo extends L115 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    ];

    //设置rowtitle
    setRowTitle = () => ['胆码','拖码'];

    checkBallIsComplete() {
        const me = this;
        const ball = this.state.balls;

        let i = 0,
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
        //二重号大于1 && 单号大于3
        if (num >= 1 && oNum >= 1) {
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum) {

        const me = this;
        const ball = this.state.balls;

        let i = 0,
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
            result = me.combine(arr, 2 - danMaLen);
            for(let j=0;j<ball[0].length;j++){
                if(ball[0][j] == 1){
                    danMaArr.push(j);
                }
            }

            //加上单号各种组合
            for(var s=0;s<result.length;s++){

                nr.push(result[s].concat(danMaArr));
            }

            return nr;
        }
        return [];
    }

    setBallData(x, y, value) {
        const me = this;
        const data = me.state.balls;
        let xLen = 0;
        if(x == 0){
            return;
        }
        for (let val in data[0]) {
            if(data[0][val] > 0){
                xLen++;
            }
        }
        if(y == 0){
            if(value == 1){
                if(xLen > 0){
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

        if (y >= 0 && y < data.length && x > 0) {
            data[y][x] = value;
        }
    }

}