/**
 * Created by soga on 2017/5/6.
 */
import KL10 from "./KL10";

export default class RenxuanDantuo4z4 extends KL10 {

    constructor(props) {
        super(props);
        this.cfgNum = 4;

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1],
    ];

    //设置rowtitle
    setRowTitle = () => ['胆码','拖码'];
//随机选一注
    selectAutoOne() {
        const me = this;
        me.setRandomArr();
        //第一位
        let i = me.getRandomNum();
        me.selectBall(i, 0, 1);
        //第二位
        for (let j = 0; j < 3; j++) {
            let i = me.getRandomNum();
            me.selectBall(i, 1, 1);
        }
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
                if(xLen > (me.cfgNum - 2)){
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

    checkBallIsComplete() {

        let me = this,
            cfgNum = me.cfgNum,
            ball = me.state.balls,
            i = 0,
            len = ball[0].length,
            num = 0,
            oNum = 0;

        for (; i < len; i++) {
            if (ball[0][i] > 0) {
                oNum++;
            }
            if (ball[1][i] > 0) {
                num++;
            }
        }
        if (oNum >= 1 && num >= 1 && (oNum + num) >= cfgNum) {
            this.setState({isBallsComplete: true});
            return true;
        }

        this.setState({isBallsComplete: false});
        return false;
    }

    //获取组合结果
    getLottery() {
        let me = this,
            cfgNum = me.cfgNum,
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
        if (me.checkBallIsComplete()) {
            for (i = 0; i < len; i++) {
                if (ball[1][i] > 0) {
                    arr.push(i);
                }
            }

            //存储单号组合
            result = me.combine(arr, cfgNum - danMaLen);
            for (let j = 0; j < ball[0].length; j++) {
                if (ball[0][j] == 1) {
                    danMaArr.push(j);
                }
            }

            //加上单号各种组合
            for (let s = 0; s < result.length; s++) {
                nr.push(result[s].concat(danMaArr));
            }

            return nr;
        }
        return [];
    }
}