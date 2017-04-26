/**
 * Created by soga on 2017/4/25.
 */
import SSC from "./SSC";

export default class QuweiWumaSanxing extends SSC {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1],
        [-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //设置rowtitle
    setRowTitle = () => ['万位','千位','百位'];


    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0,
            tempArr = [],
            names = ['小','大'];
        for (; i < len; i++) {
            if(i < 2){
                tempArr = [];
                $.each(original[i], function(j){
                    tempArr[j] = names[Number(original[i][j] )];
                });
                result = result.concat(tempArr.join(''));
            }else{
                result = result.concat(original[i].join(''));
            }

        }
        return result.join('|');
    }
}