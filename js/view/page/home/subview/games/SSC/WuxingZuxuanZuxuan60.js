/**
 * Created by soga on 2017/4/24.
 */
import SSC from "./SSC";

export default class WuxingZuxuanZuxuan60 extends SSC {

    constructor(props) {
        super(props);
        //名称
        this.state.name = 'wuxing.zuxuan.zuxuan60';
        //玩法提示
        this.state.tips = '五星组选60玩法说明';
    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    ];

    //设置rowtitle
    setRowTitle = () => ['二重号', '单号'];

    //随机选一注
    selectAutoOne() {
        const me = this;
        let len = 0;
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

    //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [],
            {balls} = this.state;
        me.setRandomArr();
        //第一位
        let i = me.getRandomNum();
        current[0] = [i];
        current[1] = [];

        //第2位
        for (let j = 0; j < 3; j++) {
            let i = me.getRandomNum();
            current[1].push(i);
        }
        current[1].sort(function (a, b) {
            return a > b ? 1 : -1;
        })
        return current;
    }

    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me = this;
        let result = [],
            nr = new Array();

        //存储单号组合
        result = me.combine(arr[1], 3);
        //二重号组合
        nr.push(result[0].concat([arr[0][0], arr[0][0]]));
        return nr;
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
        if (num >= 3 && oNum >= 1) {
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
            result = me.combine(arr, 3);
            //二重号组合
            for (let i = 0, current; i < ball[0].length; i++) {
                if (ball[0][i] == 1) {
                    //加上单号各种组合
                    for (var s = 0; s < result.length; s++) {
                        TLog('i', i);

                        if (me.arrIndexOf(i, result[s]) == -1) {

                            nr.push(result[s].concat([i, i]));
                        }
                    }
                }
            }
            return nr;
        }
        return [];
    }

}