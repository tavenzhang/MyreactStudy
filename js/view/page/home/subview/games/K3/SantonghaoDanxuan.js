/**
 * Created by soga on 2017/5/10.
 */
import K3 from "./K3";

export default class SantonghaoDanxuan extends K3 {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 5; //一行几个球
        this.ballFirstStart = 0;
        this.isShowOperate = false;
        this.ballValueArray = ['1', '2', '3', '4', '5', '6'];
        this.ballTextArray = ['111', '222', '333', '444', '555', '666'];
    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1],
    ];

    setBallText = () => this.ballTextArray;

    //设置rowtitle
    setRowTitle = () => ['选球'];

    setBallData(x, y, value) {
        const me = this;
        const {balls} = this.state;
        const data = balls;
        if (y >= 0 && y < data.length && x >= 0) {
            data[y][x] = value;
            this.setState({balls: data});
        }
    }

    checkBallIsComplete() {
        let me = this,
            ball = me.state.balls[0],
            i = 0,
            len = ball.length,
            num = 0;

        for (; i < len; i++) {
            if (ball[i] > 0) {
                num++;
            }
        }

        if (num > 0) {
            return true;
        }
        return false;
    }

    makePostParameter(original) {
        let me = this,
            i = 0,
            len = original[0].length,
            result = [];
        for (; i < len; i++) {
            result[i] = me.ballValueArray[original[0][i]];
        }
        return result.join('|');
    }

    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum) {
        let me = this,
            ball = me.state.balls[0],
            i = 0,
            arr = [],
            nr = [];

        //校验当前的面板
        //获取选中数字
        if (me.checkBallIsComplete()) {
            for (; i < ball.length; i++) {
                if (ball[i] > 0) {
                    arr = me.ballValueArray[i].split("");
                    nr.push(arr);
                }
            }
        }
        return nr;
    }

}

