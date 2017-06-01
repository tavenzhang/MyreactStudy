/**
 * Created by soga on 2017/5/8.
 */


import GameDanshi from "../../../../../componet/game/GameDanshi";

export default class L115Danshi extends GameDanshi {

    constructor(props) {
        super(props);

        this.state.normalTips = ['说明：',
            '支持常见的各种单式格式，间隔符如： 换行符 回车 逗号 分号等, 号码之间则使用空格隔开',
            '',
            '格式范例：01 02 03|03 04 05|07 08 11'
        ].join('\n')

        this.checkNum = /^\d{2}$/; 				//验证是否纯数字
        this.filtration = /[；|;]+|[\n\r]+|[,|，]+/g;


    }

    //用拆分符号拆分成单注
    iterator(data) {
        let me= this,
            temp,
            last = [],
            result = [];

        data = data.trim();
        data = data.replace(me.filtration, '|');
        data = data.replace(/\s+/g, ' ');
        data = data.trim();

        result = data.split('|');

        for(let i=0; i < result.length; i++) {
            temp = result[i].trim();
            if(temp != ''){
                last.push(temp.split(' '));
            }
        }

        return last;
    }

    //并设置 isBallsComplete
    checkBallIsComplete(data) {
        var me = this,
            i = 0,
            ballData = {},
            result = [];

        ballData.sameData = [];
        ballData.errorData = [];
        ballData.tData = [];

        //按规则进行拆分结果
        result = me.iterator(data);

        //判断结果
        for (; i < result.length; i++) {
            //判断单注合理
            if (me.checkSingleNum(result[i])) {
                if (me.checkResult(result[i], ballData.tData)) {
                    //正确结果[已去重]
                    ballData.tData.push(result[i]);
                } else {
                    if (me.checkResult(result[i], ballData.sameData)) {
                        //重复结果
                        ballData.sameData.push(result[i]);
                    }
                }
            } else {
                if (me.checkResult(result[i], ballData.errorData)) {
                    //错误结果[已去重]
                    ballData.errorData.push(result[i]);
                }
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


    //检测单注号码是否通过
    checkSingleNum(lotteryNum) {
        let me = this,
            isPass = true;
        for(let i=0; i<lotteryNum.length; i++) {
            if (!me.checkNum.test(lotteryNum[i])) {
                isPass = false;
                return false;
            }
        }
        return isPass;
    }

    //生成后端参数格式
    makePostParameter(original) {
        let me = this,
            result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result = result.concat(original[i].join(' '));
        }
        return result.join('|');
    }

    checkData(ln,num) {
        const me = this;
        let lotteryNum = ln.sort(),
            len = lotteryNum.length,
            isPass = true;

        if(lotteryNum.length != num){
            return isPass = false;
        }

        for(let i = 0;i < len;i++){
            if(lotteryNum[i] == lotteryNum[i+1]){
                return isPass = false;
            }
        }

        for(let i=0; i<lotteryNum.length; i++) {
            if (!me.checkNum.test(lotteryNum[i])  || Number(lotteryNum[i]) < 1 || Number(lotteryNum[i]) > 11) {
                return isPass = false;
            }
        }
        return isPass;
    }
}
