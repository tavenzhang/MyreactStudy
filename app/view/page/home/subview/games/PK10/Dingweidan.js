/**
 * Created by soga on 2017/5/6.
 */
import PK10 from "./PK10";

export default class Dingweidan extends PK10 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //设置rowtitle
    setRowTitle = () => ['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];

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