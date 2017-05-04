/**
 * Created by soga on 2017/5/4.
 */
import SSC from "./SSC";

export default class QuweiHaoshichengshuang extends SSC {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //设置rowtitle
    setRowTitle = () => ['选球']

    getLottery(isGetNum){
        let me = this,
            data = me.state.balls,
            i = 0,
            len = data.length,
            row,
            isEmptySelect = true,
            _tempRow = [],
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
                //alert('第' + i + '行选球不完整');
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
        //console.log(finalResult);
        //组合结果
        return finalResult;
    }

}