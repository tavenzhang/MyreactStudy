/**
 * Created by soga on 2017/4/25.
 */
import SSC from "./SSC";

export default class QiansanZhixuanKuadu extends SSC {

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
        const me=this,
            numArr=arr;
        let i=0,
            len = numArr.length,
            result=[];

            //组合结果
        for(i = 0;i < len;i++){
            result = result.concat(me.mathResult(numArr[i], 0, 9));
        }

        return result;

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
            k = 0,
            len2,
            minNums,
            maxNums,
            result = [];

        for(;i < 10;i++){
            for(j= 0;j < 10;j++){
                for(k= 0;k < 10;k++){
                    var numList = [i,j,k];
                    minNums = Math.min.apply(Math, numList);
                    maxNums = Math.max.apply(Math, numList);
                    if(maxNums - minNums == num){
                        result.push(numList);
                    }
                }
            }
        }
        return result;
    }
}
