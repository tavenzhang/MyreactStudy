/**
 * Created by soga on 2017/4/25.
 */
import SSC from "./SSC";

export default class ZhongsanZhixuanHezhi extends SSC {

    constructor(props) {
        super(props);
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //设置BallText
    setBallText = () => [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];

    //设置rowtitle
    setRowTitle = () => ['选球']

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
        const {balls} = this.state;
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            arr = [],
            resultNum = [];

        for(;i < len;i++){
            if(ball[i] > 0){
                arr.push(i);
            }
        }
        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            for(var j=0;j < arr.length;j++){
                resultNum = resultNum.concat(me.mathResult(arr[j], 0, 9));
            }
            return resultNum;
        }
        return [];
    }


    //计算各种结果
    mathResult(sum, nBegin, nEnd){
        let arr = [],
            x,y,z;

        for (x=nBegin;x<=nEnd ;x++ ){
            for (y=nBegin;y<=nEnd ;y++ ){
                for (z=nBegin;z<=nEnd ;z++ ){
                    if(x+y+z==sum){
                        arr.push([x,y,z]);
                    }
                }
            }
        }
        return arr;
    }
}
