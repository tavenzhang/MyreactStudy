/**
 * Created by soga on 2017/5/8.
 */
import SSCDanshi from "./../SSC/SSCDanshi";

export default class SanxingZusanDanshi extends SSCDanshi {

    constructor(props) {
        super(props);

        this.state.normalTips = ['说明：',
            '支持常见的各种单式格式，间隔符如： 换行符 回车 逗号 分号等',
            '',
            '格式范例：123 234 887 330 988'
        ].join('\n')
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //检测单注号码是否通过
    checkSingleNum(lotteryNum){
        const me = this;
        if(lotteryNum.length != me.state.balls.length){
            return false;
        }
        if(lotteryNum[0] != lotteryNum[1] && lotteryNum[0] != lotteryNum[2] && lotteryNum[1] != lotteryNum[2]){
            return false;
        }
        if(lotteryNum[0] == lotteryNum[1] && lotteryNum[0] == lotteryNum[2]){
            return false;
        }
        return true;
    }
}