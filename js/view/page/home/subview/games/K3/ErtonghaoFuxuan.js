/**
 * Created by soga on 2017/5/10.
 */
import K3 from "./K3";

export default class ErtonghaoFuxuan extends K3 {

    constructor(props) {
        super(props);
        this.ballFirstStart=1;
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1]
    ];

    //设置rowtitle
    setRowTitle = () => ['选球'];

    setBallText = () => ['','11*','22*','33*','44*','55*','66*'];

    //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [];
        me.setRandomArr();
        current[0] = [];
        let i = me.getRandomNum();
        current[0].push(i);

        return current;
    }

    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me = this;
        return arr[0];
    }

    checkBallIsComplete(){
        var me = this,
            ball = me.state.balls[0],
            i = 0,
            len = ball.length,
            num = 0;
        for(;i < len;i++){
            if(ball[i] > 0){
                num++;
            }
        }
        //console.log(num);
        if(num >= 1){
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    formatViewBalls(original) {
        let me = this,
            result = [],
            len = original[0].length,
            i = 0;

        for (; i < len; i++) {
            result.push(me.state.ballText[original[0][i]]);
        }

        result = result.join('|');
        return result;

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
        }

        return arr;
    }
}