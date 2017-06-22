/**
 * Created by soga on 2017/5/10.
 */
import K3 from "./K3";

export default class Hezhi extends K3 {

    constructor(props) {
        super(props);
        this.ballFirstStart = 3;
        this.state.rowBallNumber = 4; //一行几个球
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    setBallText = () => [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

    setBallData(x, y, value) {
        const me = this;
        const {balls} = this.state;
        const data = balls;
        if(x < 3){
            return;
        }
        if (y >= 0 && y < data.length && x > 0) {
            data[y][x] = value;
            this.setState({balls: data});
        }
    }

    //设置rowtitle
    setRowTitle = () => ['选球'];

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

        if(num >= 1){
            return true;
        }
        return false;
    }

    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result = result.concat(original[i].join('|'));
        }
        return result.join('|');
    }

    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum){
        let me = this,
            data = me.state.balls[0],
            arr = [];
        if(me.checkBallIsComplete()){
            for(let i=0; i<data.length; i++) {
                if(data[i] > -1){
                    arr.push(data[i]);
                }
            }
        }
        return arr;
    }
}