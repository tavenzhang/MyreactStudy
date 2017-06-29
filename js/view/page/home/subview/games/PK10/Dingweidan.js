/**
 * Created by soga on 2017/5/6.
 */
import PK10 from "./PK10";

export default class Dingweidan extends PK10 {

    constructor(props) {
        super(props);
        this.ballFirstStart = 1;

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
    setRowTitle = () => ['冠军', '亚军', '季军', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];

    // //生成单注随机数
    createRandomNum() {
        const me = this,
            {balls} = this.state,
            current = [];
        me.setRandomArr();
        let i = me.getRandomNum();
        me.setRandomArr();
        let j = me.getRandomNum();
        current[i] = [j];

        for (let s = 0; s < balls.length; s++) {
            if (s == i) {
                current[s] = [j];
            } else {
                current[s] = [];
            }

        }

        TLog('current', current);
        return current;
    }

    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        let result=[];
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].length > 0) {
                result.push(j);
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
            for (j = 0; j < len2; j++) {
                if (ball[i][j] > 0) {
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
            for (j = 0; j < len2; j++) {
                if (ball[i][j] > 0) {
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