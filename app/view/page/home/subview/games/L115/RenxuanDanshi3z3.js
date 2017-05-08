/**
 * Created by soga on 2017/5/8.
 */
import L115Danshi from "./L115Danshi";

export default class RenxuanDanshi3z3 extends L115Danshi {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //检测单注号码是否通过
    checkSingleNum(lotteryNum) {
        let me = this,
            lotteryNum = lotteryNum.sort(),
            len = lotteryNum.length,
            isPass = true;
        if(lotteryNum.length != 3){
            return false;
        }
        for(let i = 0;i < len;i++){
            if(lotteryNum[i] == lotteryNum[i+1]){
                return isPass = false;
            }
        }
        for(let i=0; i<lotteryNum.length; i++) {
            if (!me.checkNum.test(lotteryNum[i])  || Number(lotteryNum[i]) < 1 || Number(lotteryNum[i]) > 11) {
                isPass = false;
                return false;
            }
        }
        return isPass;
    }

}
