/**
 * Created by soga on 2017/4/21.
 */

import SSC from "./SSC";

export default class WuxingZuxuanZuxuan5 extends SSC {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    ];

    //设置rowtitle
    setRowTitle = () => ['四重号', '单号'];


//随机选一注
    selectAutoOne() {
        const me = this;
        let len = 0;
        me.setRandomArr();
        for(let j=0;j<2;j++){
            let i=me.getRandomNum();
            me.selectBall(i, j, 1);
        }
    }

    //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [],
            {balls} = this.state;
        me.setRandomArr();
        for (let j = 0; j < 2; j++) {
            let i = me.getRandomNum();
            current[j]=[i];
        }
        return current;
    }



    //并设置 isBallsComplete
    checkBallIsComplete() {
        const me = this;
        const {balls} = this.state;
        const ball = balls;

        let i = 0,
            len = ball[0].length,
            num = 0, oNum = 0;

        for (; i < len; i++) {
            if (ball[0][i] > 0) {
                oNum++;
            }
            if (ball[1][i] > 0) {
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

    //获取组合结果
    getLottery() {
        const me = this;
        const {balls} = this.state;
        const ball = balls;

        let i = 0,
            len = ball[1].length,
            result = [],
            arr = [],
            nr = new Array();

        //校验当前的面板
        //获取选中数字
        if (me.checkBallIsComplete()) {
            for (; i < len; i++) {
                if (ball[1][i] > 0) {
                    arr.push(i);
                }
            }
            //存储单号组合
            result = me.combine(arr, 1);
            //二重号组合
            for (let i = 0, current; i < ball[0].length; i++) {
                if (ball[0][i] == 1) {
                    //加上单号各种组合
                    for (var s = 0; s < result.length; s++) {
                        if (me.arrIndexOf(i, result[s]) == -1) {
                            nr.push(result[s].concat([i, i, i, i]));
                        }
                    }
                }
            }
            return nr;
        }
        return [];
    }

    //单组去重处理
    //removeSame(data) {
    //    var i = 0, result, me = this,
    //        numLen = this.getBallData()[0].length;
    //    len = data.length;
    //    result = Math.floor(Math.random() * numLen);
    //    for(;i<data.length;i++){
    //        if(result == data[i]){
    //            return arguments.callee.call(me, data);
    //        }
    //    }
    //    return result;
    //}
    //
    //makePostParameter(original){
    //    var me = this,
    //        result = [],
    //        len,
    //        arr1 = [],
    //        arr2 = [],
    //        i = 0;
    //    for(len = original[0].length;i < len;i++){
    //        arr1.push(original[0][i]);
    //    }
    //    for(i = 0,len = original[1].length;i < len;i++){
    //        arr2.push(original[1][i]);
    //    }
    //
    //    result = [arr1.join(''),arr2.join('')];
    //    return result.join(',');
    //}

}