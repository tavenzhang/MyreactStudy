/**
 * Created by soga on 2017/4/25.
 */
import SSC from "./SSC";

export default class HousanQitaHeziweisu extends SSC {

    constructor(props) {
        super(props);
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['选球'];

    //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [],
            {balls} = this.state;
        me.setRandomArr();
        let i = me.getRandomNum();
        current[0] = [i];
        return current;
    }

    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        //组合结果
        return arr;

    }
    //并设置 isBallsComplete
    checkBallIsComplete(){
        const me = this;
        const {balls} = this.state;
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            num = 0;
        for(;i < len;i++){
            if(ball[i] > 0){
                num++;
            }
        }
        //二重号大于1 && 单号大于3
        if(num >= 1){
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
            return arr;
        }

        return [];
    }
}
