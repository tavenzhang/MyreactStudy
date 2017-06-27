/**
 * Created by soga on 2017/4/25.
 */
import SSC from "./SSC";

export default class ErxingZhixuanHouerKuadu extends SSC {

    constructor(props) {
        super(props);
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['选球']

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
        const me = this;
        let resultNum = [], len = arr[0].length,
            numArr = arr[0], i = 0;
        for (; i < len; i++) {
            resultNum = resultNum.concat(me.mathResult(numArr[i], 0, 9));
        }
        return resultNum;
    }
    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum) {
        const me = this;
        const {balls} = this.state;
        const data = balls[0];

        let i = 0,
            len = data.length,
            j = 0,
            len2,

            isEmptySelect = true,
            numArr = [],
            result = [];


        for(i = 0;i < len;i++){
            if(data[i] > 0){
                isEmptySelect = false;
                numArr.push(i);
            }
        }
        if(isEmptySelect){
            this.setState({isBallsComplete: false});
            return [];
        }
        this.setState({isBallsComplete: true});
        for(i = 0,len = numArr.length;i < len;i++){
            result = result.concat(me.mathResult(numArr[i], 0, 9));
        }

        return result;
    }

    //计算各种结果
    mathResult(num){
        let me = this,
            i = 0,
            len,
            j = 0,
            len2,
            result = [];

        for(;i < 10;i++){
            for(j= 0;j < 10;j++){
                if(j - i == num){
                    result.push([i,j]);
                    if(i != j){
                        result.push([j,i]);
                    }
                }
            }
        }
        return result;
    }
}

