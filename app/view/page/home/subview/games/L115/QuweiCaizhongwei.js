/**
 * Created by soga on 2017/5/6.
 */
import L115 from "./L115";

export default class QuweiCaizhongwei extends L115 {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 4; //一行几个球
    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //设置BallText
    setBallText = () => [2,3,4,5,6,7,8,9];

    //设置rowtitle
    setRowTitle = () => ['猜中位'];

    makePostParameter(original) {
        let me = this,
            result = [],
            len,
            tempArr = [],
            i = 0;

        for(let k=0; k < original.length; k++) {
            tempArr[k]  = [];
            for(let j=0; j < original[k].length; j++ ) {
                tempArr[k][j] = '0' + (original[k][j] + 2);
            }
        }

        len = tempArr.length;
        for (i =0; i < len; i++) {
            result = result.concat(tempArr[i].join(' '));
        }
        return result.join('|');
    }


}