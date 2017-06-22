/**
 * Created by soga on 2017/5/6.
 */
import KENO from "./KENO";

export default class Renxuan7 extends KENO {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
        ]
    ];

    //设置rowtitle
    setRowTitle = () => ['选球'];

//随机选一注
    selectAutoOne() {
        const me = this;
        let len = 0;
        me.setRandomArr();
        for(let j=0;j<7;j++){
            let i=me.getRandomNum();
            me.selectBall(i, 0, 1);
        }
    }

    setRandomArr(num) {
        let me = this,
            balls = me.state.balls[0];
        if (!!num) {
            this.RandomArr.splice(num, 1);
        } else {
            this.RandomArr=[];
            for(let i=1;i<balls.length;i++){
                this.RandomArr.push(i);
            }
        }
    }
    //获取随机
    getRandomNum() {
        let me = this,
            i = Math.floor(Math.random() *this.RandomArr.length);
        let Num=this.RandomArr[i-1];
        TLog('IIII=',i);
        TLog('this.RandomArr=',this.RandomArr);
        TLog('this.RandomArr=',this.RandomArr[i-1]);

        me.setRandomArr(i-1);
        return Num;


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
        if (num >= 7) {
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    //获取组合结果
    getLottery() {
        let me = this,
            ball = me.state.balls[0],
            i = 0,
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
            return me.combine(arr, 7);
        }

        return [];
    }
}