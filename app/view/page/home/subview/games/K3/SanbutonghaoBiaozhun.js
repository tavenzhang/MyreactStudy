/**
 * Created by soga on 2017/5/10.
 */
import K3 from "./K3";

export default class ErbutonghaoBiaozhun extends K3 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1]
    ];

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

        if(num >= 3){
            return true;
        }
        return false;
    }

    makePostParameter(original){
        return original[0].join('');
    }

    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum){
        var me = this,
            data = me.state.balls[0],
            arr = [];
        if(me.checkBallIsComplete()){
            for(let i=0; i<data.length; i++) {
                if(data[i] > -1){
                    arr.push(data[i]);
                }
            }
            arr = me.combine(arr, 3);
        }

        return arr;
    }
}