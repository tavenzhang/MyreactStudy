/**
 * Created by soga on 2017/5/10.
 */
import K3 from "./K3";

export default class SanlianhaoTongxuan extends K3 {

    constructor(props) {
        super(props);
        this.isShowOperate = false;
    }

    //设置球排列
    setBalls = () => [
        [-1,-1]
    ];

    setBallText = () => ['','通选'];

    //设置rowtitle
    setRowTitle = () => ['选球'];

    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result = result.concat(original[i].join('|'));
        }
        result = result.join('|');
        return result.replace('1', '通选');
    }

    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum){
        let me = this,
            ball = me.state.balls[0],
            i = 0,
            arr = [],
            nr = [];

        //校验当前的面板
        //获取选中数字
        if(ball[1] > 0){
            nr = [0]
        }
        return nr;
    }

}