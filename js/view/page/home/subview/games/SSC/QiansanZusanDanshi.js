/**
 * Created by soga on 2017/5/8.
 */
import SSCDanshi from "./SSCDanshi";

export default class QiansanZusanDanshi extends SSCDanshi {

    constructor(props) {
        super(props);

        this.state.normalTips = ['说明：支持常见的各种单式格式','间隔符如： 换行符 回车 逗号 分号等',
            '格式范例：330 887 988  223 112'
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

    checkBallIsComplete(multiline, data) {
        let len,
            i = 0,
            balls,
            me=this,
            ballData = {},
            has = {},
            ballsstr,
            result = [];
        if (!data) {
            this.setState({isBallsComplete: false});
            return [];
        }
        ballData.sameData = [];
        ballData.errorData = [];
        ballData.tData = [];
        //按规则进行拆分结果
        result = me.iterator(data);
        len = result.length;
        for (i = 0; i < len; i++) {
            balls = result[i].split('');
            ballsstr = balls.sort();
            //检测基本长度
            if (me.checkSingleNum(balls)) {
                if (has[ballsstr]) {
                    //重复
                    ballData.sameData.push(balls);
                } else {
                    ballData.tData.push(balls);
                    has[ballsstr] = true;
                }
            } else {
                ballData.errorData.push(balls);
            }
        }
        this.setState({ballData: ballData});
        //校验
        if (ballData.tData.length > 0) {
            this.setState({isBallsComplete: true});
            return ballData.tData;
        } else {
            this.setState({isBallsComplete: false});
            return [];
        }
    }
}