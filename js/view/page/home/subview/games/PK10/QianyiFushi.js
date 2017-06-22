/**
 * Created by soga on 2017/4/24.
 */
import PK10 from "./PK10";

export default class QianyiFushi extends PK10 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //设置rowtitle
    setRowTitle = () => ['冠军'];

    checkBallIsComplete() {
        const me = this;
        const ball = this.state.balls;

        let i = 0,
            len = ball[0].length,
            firstNum = 0,
            secondNum = 0,
            thirdNum = 0;

        for (; i < len; i++) {
            if (ball[0][i] > 0) {
                this.setState({isBallsComplete: true});
                return true;

            }
        }

        this.setState({isBallsComplete: false});
        return false;
    }

    //过滤结果集合中的双重号和豹子号
    filterErrorData(arr, lenp, nump, savArray) {
        let me = this,
            saveArray = savArray || [],
            num = nump || 0,
            len = lenp || arr.length;

        if (num == len) {
            return saveArray;
        } else {
            if (arr[num][0] != arr[num][1] && arr[num][0] != arr[num][2] && arr[num][1] != arr[num][2]) {
                saveArray.push(arr[num]);
            }
            num++;
            return me.filterErrorData(arr, len, num, saveArray);
        }
    }

    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum) {
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