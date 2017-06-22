/**
 * Created by soga on 2017/4/24.
 */

import KL10 from "./KL10";

export default class QiansanZuxuanFushi extends KL10 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [

        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //设置rowtitle
    setRowTitle = () => ['前三'];

    //随机选一注
    selectAutoOne() {
        const me = this;
        me.setRandomArr();
        //第一位
        for (let j = 0; j < 3; j++) {
            let i = me.getRandomNum();
            me.selectBall(i, 0, 1);
        }
    }

    checkBallIsComplete() {
        const me = this;
        const balls = this.state.balls;
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            num = 0;
        for (; i < len; i++) {
            if (ball[i] > 0) {
                num++;
            }
        }
        //二重号大于1 && 单号大于3
        if (num >= 3) {
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
        const balls = this.state.balls;
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            arr = [];

        for (; i < len; i++) {
            if (ball[i] > 0) {
                arr.push(i);
            }
        }
        //校验当前的面板
        //获取选中数字
        if (me.checkBallIsComplete()) {
            return me.combine(arr, 3);
        }

        return [];
    }

}