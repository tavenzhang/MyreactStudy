/**
 * Created by soga on 2017/5/10.
 */
import K3 from "./K3";

export default class SantonghaoDanxuan extends K3 {

    constructor(props) {
        super(props);
        this.ballFirstStart = 0;
        this.isShowOperate = false;
    }

    //设置球排列
    setBalls = () => [
        [-1]
    ];

    setBallText = () => ['通选'];

    //设置rowtitle
    setRowTitle = () => ['选球'];

    setBallData(x, y, value) {
        const me = this;
        const {balls} = this.state;
        const data = balls;
        if (y >= 0 && y < data.length && x >= 0) {
            data[y][x] = value;
            this.setState({balls: data});
        }
    }

    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result = result.concat(original[i].join('|'));
        }
        result = result.join('|');
        return result.replace('0', '通选');
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
        if(ball[0] > 0){
            nr = [0]
        }
        return nr;
    }

}