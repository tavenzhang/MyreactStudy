/**
 * Created by soga on 2017/5/6.
 */
import L115 from "./L115";

export default class Dingweidan extends L115 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //设置rowtitle
    setRowTitle = () => ['一位','二位','三位'];

    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me = this;
        let i=0,j=0,len=arr.length,len2,result=[];

        for (i = 0; i < len; i++) {
            len2 = arr[i].length;
            //result[i] = [];
            for(j = 0;j < len2;j++){
                if(arr[i][j] > 0){
                    result.push(j);
                }
            }
        }
        return result;

    }

    checkBallIsComplete() {
        let me = this,
            ball = me.state.balls,
            i = 0,
            len = ball.length,
            j = 0,
            len2 = 0;

        for (i = 0; i < len; i++) {
            len2 = ball[i].length;
            for(j =0;j < len2;j++){
                if(ball[i][j] > 0){
                    this.setState({isBallsComplete: true});
                    return true;
                }
            }
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    //获取组合结果
    getLottery() {
        let me = this,
            ball = me.state.balls,
            i = 0,
            len = ball.length,
            j = 0,
            tempNum,
            len2 = 0,
            num = 0,
            result = [];

        for (i = 0; i < len; i++) {
            len2 = ball[i].length;
            //result[i] = [];
            for(j = 0;j < len2;j++){
                if(ball[i][j] > 0){
                    result.push(j);
                }
            }
        }
        //console.log(me.checkBallIsComplete());
        //校验当前的面板
        //获取选中数字
        if (me.checkBallIsComplete()) {
            return result;
        }

        return [];
    }
}