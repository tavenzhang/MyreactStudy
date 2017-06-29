/**
 * Created by soga on 2017/4/25.
 */
import D3 from "./D3";

export default class SanxingZuxuanZuliu extends D3 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['组六'];
//随机选一注
    selectAutoOne() {
        const me = this;
        me.setRandomArr();
//第二位
        for (let j = 0; j < 3; j++) {
            let i = me.getRandomNum();
            me.selectBall(i, 0, 1);
        }
    }

    // //生成单注随机数
    createRandomNum() {
        const me = this,
            {balls} = this.state,
            current = [];
        current[0]=[];
        me.setRandomArr();
        for (let j = 0; j < 3; j++) {
            let i = me.getRandomNum();
            current[0].push(i);
        }
        return current;
    }

    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me=this;
        return me.combine(arr[0], 3);

    }
    //并设置 isBallsComplete
    checkBallIsComplete(){
        const me = this;
        const {balls} = this.state;
        const ball = balls[0];

        let i=0,
            len = ball.length,
            num = 0;
        for(;i < len;i++){
            if(ball[i] > 0){
                num++;
            }
        }
        //二重号大于1 && 单号大于3
        if(num >= 3){
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
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            arr = [];

        for(;i < len;i++){
            if(ball[i] > 0){
                arr.push(i);
            }
        }

        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            return me.combine(arr, 3);
        }

        return [];
    }
}