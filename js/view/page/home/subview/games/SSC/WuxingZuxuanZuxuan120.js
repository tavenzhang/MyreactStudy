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
        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            return me.combine(arr, 5);
        }
        return [];
    }

}