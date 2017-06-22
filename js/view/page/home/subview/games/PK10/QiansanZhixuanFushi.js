/**
 * Created by soga on 2017/4/24.
 */
import PK10 from "./PK10";

export default class QiansanZhixuanFushi extends PK10 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //设置rowtitle
    setRowTitle = () => ['冠军','亚军','季军'];
    //随机选一注
    selectAutoOne() {
        const me = this;
        const {balls} = this.state;
        me.setRandomArr();
        let len = balls.length;
        for (let j = 0; j < len; j++) {
            let i = me.getRandomNum();
            me.selectBall(i, j, 1);
        }
    }
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
                firstNum++;
            }
            if (ball[1][i] > 0) {
                secondNum++;
            }
            if (ball[2][i] > 0) {
                thirdNum++;
            }
        }
        //二重号大于1 && 单号大于3
        if (firstNum >= 1 && secondNum >= 1 && thirdNum >= 1) {
            this.setState({isBallsComplete: true});
            return true;
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

        const me = this;
        const data = this.state.balls;

        let i = 0,
            len = data.length,
            row,
            isEmptySelect = true,
            j = 0,
            len2 = 0,
            result = [],
        //总注数
            total = 1,
            rowNum = 0;

        //检测球是否完整
        for (; i < len; i++) {
            result[i] = [];
            row = data[i];
            len2 = row.length;
            isEmptySelect = true;
            rowNum = 0;
            for (j = 0; j < len2; j++) {
                if (row[j] > 0) {
                    isEmptySelect = false;
                    //需要计算组合则推入结果
                    if (!isGetNum) {
                        result[i].push(j);
                    }
                    rowNum++;
                }
            }
            if (isEmptySelect) {
                //alert('第' + i + '行选球不完整');
                this.setState({isBallsComplete: false});
                return [];
            }
            //计算注数
            total *= rowNum;
        }
        this.setState({isBallsComplete: true});
        //返回注数
        if (isGetNum) {
            return total;
        }

        return me.filterErrorData(me.combination(result));
    }

}