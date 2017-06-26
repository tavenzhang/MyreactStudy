/**
 * Created by soga on 2017/4/24.
 */
import SSC from "./SSC";

export default class WuxingZuxuanZuxuan120 extends SSC {

    constructor(props) {
        super(props);

        //名称
        this.state.name = 'wuxing.zuxuan.zuxuan120';
        //玩法提示
        this.state.tips = '五星组选120玩法说明';
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['选球'];

    //随机选一注
    selectAutoOne() {
        const me = this;
        let len = 0;
        me.setRandomArr();
        //第一位
        for (let j = 0; j < 5; j++) {
            let i = me.getRandomNum();
            me.selectBall(i, 0, 1);
        }
    }
    //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [],
            {balls} = this.state;
        me.setRandomArr();
        //第一位
        current[0] = [];
        for (let j = 0; j < 5; j++) {
            let i = me.getRandomNum();
            current[0].push(i);
        }
        current[0].sort(function (a, b) {
            return a > b ? 1 : -1;
        })
        return current;
    }
    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me = this;
        return me.combine(arr[0], 5);
    }

    //并设置 isBallsComplete
    checkBallIsComplete(){
        const me = this;
        let ball = me.state.balls[0],
            i = 0,
            len = ball.length,
            num = 0;
        for(;i < len;i++){
            if(ball[i] > 0){
                num++;
            }
        }
        if(num >= 5){
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    //获取组合结果
    getLottery(){
        const me = this;
        const {balls} = this.state;
        const ball = balls;

        let i = 0,
            len = ball[0].length,
            arr = [];

        for(;i < len;i++){
            if(ball[0][i] > 0){
                arr.push(i);
            }
        }
        TLog('arr',arr);
        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            return me.combine(arr, 5);
        }
        return [];
    }

}