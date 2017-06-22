/**
 * Created by soga on 2017/4/25.
 */

import SSC from "./SSC";

export default class BudingweiSanxingZhongsanerma extends SSC {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //设置rowtitle
    setRowTitle = () => ['不定位'];
    //随机选一注
    selectAutoOne() {
        const me = this;
        let len = 0;
        me.setRandomArr();
        for(let j=0;j<2;j++){
            let i=me.getRandomNum();
            me.selectBall(i, 0, 1);
        }
    }
    checkBallIsComplete(){
        let me = this,
            ball = me.state.balls[0],
            i = 0,
            len = ball.length,
            num = 0;
        for(;i < len;i++){
            if(ball[i] > 0){
                num++;
            }
        }
        if(num >= 2){
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    //获取组合结果
    getLottery(){
        let me = this,
            ball = me.state.balls[0],
            i = 0,
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
            return me.combine(arr, 2);
        }

        return [];
    }

}