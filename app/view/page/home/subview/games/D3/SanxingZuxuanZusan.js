/**
 * Created by soga on 2017/4/25.
 */

import D3 from "./D3";

export default class SanxingZuxuanZusan extends D3 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['组三'];
//随机选一注
    selectAutoOne() {
        const me = this;
        me.setRandomArr();
//第二位
        for (let j = 0; j < 2; j++) {
            let i = me.getRandomNum();
            me.selectBall(i, 0, 1);
        }
    }
    //并设置 isBallsComplete
    checkBallIsComplete(){
        const me = this;
        const {balls} = this.state;
        const ball = balls;

        let i = 0,
            len = ball[0].length,
            num = 0, oNum = 0;

        for(;i < len;i++){
            if(ball[0][i] > 0){
                oNum++;
            }
        }
        //二重号大于1 && 单号大于3
        if(oNum >= 2){
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    //获取组合结果
    getLottery(){
        const me = this;
        const {balls} = this.state;
        const ball = balls;

        let i = 0,
            len = ball[0].length,
            saveNum = [],
            checkNum = [],
            result = [],
            arr = [],
            nr = new Array();

        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            for(;i < len;i++){
                if(ball[0][i] > 0){
                    arr.push(i);
                }
            };
            for(let c=0;c<arr.length;c++){
                checkNum =[];
                saveNum = arr.concat();
                checkNum.push([[arr[c],arr[c]].join('')]);
                saveNum.splice(c, 1)
                checkNum.push(saveNum);
                result = result.concat(me.combination(checkNum));
            };

            for (let k = 0; k < result.length; k++) {
                result[k] = result[k].join('').split('');
            };

            return result;
        }
        return [];
    }
}