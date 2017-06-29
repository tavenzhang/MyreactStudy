/**
 * Created by soga on 2017/4/25.
 */

import D3 from "./D3";

export default class YixingDingweidanFushi extends D3 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];


    //设置rowtitle
    setRowTitle = () => ['百位','十位','个位'];


    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me=this;
        let result=[];
        for(let i = 0,len = arr.length;i < len;i++){
            for(let j = 0,len2 = arr[i].length;j < len2;j++){
                result.push([arr[i][j]]);
            }
        }
        return result;

    }
    getLottery(isGetNum){
        let me = this,
            data = this.state.balls,
            i = 0,len = data.length,row,
            _tempRow = [],
            j = 0,len2 = 0,
            result = [],
            isEmptySelect,
            result2 = [],
        //总注数
            total = 1,
            rowNum = 0;

        //检测球是否完整
        for(;i < len;i++){
            result[i] = [];
            row = data[i];
            len2 = row.length;
            isEmptySelect = true;
            rowNum = 0;
            for(j = 0;j < len2;j++){
                if(row[j] > 0){
                    isEmptySelect = false;
                    this.setState({isBallsComplete: true});
                    //需要计算组合则推入结果
                    if(!isGetNum){
                        result[i].push(j);
                    }
                    rowNum++;
                }
            }
            //计算注数
            total *= rowNum;
        }

        //返回注数
        if(isGetNum){
            return total;
        }

        if(!isEmptySelect){
            //组合结果
            for(i = 0,len = result.length;i < len;i++){
                for(j = 0,len2 = result[i].length;j < len2;j++){
                    result2.push([result[i][j]]);
                }
            }
            return result2;
        }else{
            return [];
        }
    }


}