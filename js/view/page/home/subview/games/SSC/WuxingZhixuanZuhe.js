/**
 * Created by soga on 2017/4/21.
 */

import SSC from "./SSC";

export default class WuxingZhixuanZuhe extends SSC {

    constructor(props) {
        super(props);
        //名称
        this.state.name = 'wuxing.zhixuan.zuhe';
        //玩法提示
        this.state.tips = '五星直选组合玩法说明';
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['万位','千位','百位','十位','个位'];


    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum) {
        const me = this;
        const {balls} = this.state;
        const data = balls;

        let i = 0,
            len = data.length,
            row,
            isEmptySelect = true,
            j = 0,
            len2 = 0,
            result = [],
            //普通组合结果
            combinationResult = [],
            //最终结果
            finalResult = [],
            tempArr = [],
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
                    //需要计算组合则推入结果
                    if(!isGetNum){
                        result[i].push(j);
                    }
                    rowNum++;
                }
            }
            if(isEmptySelect){
                this.setState({isBallsComplete: false});
                return [];
            }
        }

        this.setState({isBallsComplete: true});

        combinationResult = me.combination(result);
        len = combinationResult.length;
        i = 0;
        for(;i < len;i++){
            len2 = combinationResult[i].length;
            j = 0;
            for(;j < len2;j++){
                tempArr = combinationResult[i].slice(j);
                finalResult.push(tempArr);
            }

        }
        //组合结果
        return finalResult;
    }
}
