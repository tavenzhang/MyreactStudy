/**
 * Created by soga on 2017/4/25.
 */
import SSC from "./SSC";

export default class XixingZuxuan6 extends SSC {

    constructor(props) {
        super(props);
    }
    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['二重号'];

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
        //二重号大于1 && 单号大于3
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
        for(var c=0;c<arr.length;c++){
            arr[c] = [arr[c], arr[c]];
        }
        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            return me.combine(arr, 2);
        }
        return [];
    }

}