/**
 * Created by soga on 2017/4/25.
 */
import SSC from "./SSC";

export default class ErxingZuxuanQianerBaodan extends SSC {

    constructor(props) {
        super(props);
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['选球']

    setBallData(x, y, value) {
        const me = this;
        const {balls} = this.state;
        const data = balls[0];

        if(value == 1) {
            for(let i=0; i < data.length; i++) {
                if(data[i] == 1) {
                    balls[0][i] = -1;
                }
            }
            balls[0][x] = value;
            this.setState({balls: balls});
        }
    }

    checkBallIsComplete(){
        let me = this,
            ball = me.state.balls[0],
            i = 0,
            len = ball.length,
            num = 0;
        for(;i < len;i++){
            if(ball[i] > 0){
                num++;
            }
        }
        if(num >= 1){
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum) {
        const me = this;
        const {balls} = this.state;
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            arr = [];

        for(;i < len;i++){
            if(ball[i] > 0){
                arr.push(i);
            }
        }

        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            return me.mathResult(arr[0], 0, 9);
        }

        return [];
    }

    //检测结果重复
    checkResult(data, array){
        //检查重复
        for (let i = array.length - 1; i >= 0; i--) {
            if(array[i].join('') == data){
                return false;
            }
        };
        return true;
    }

    //计算各种结果
    mathResult(sum, nBegin, nEnd){
        let me = this,
            arr = [],
            checkArray = [],
            x,y;

        for (x=nBegin;x<=nEnd ;x++ ){
            for (y=nBegin;y<=nEnd ;y++ ){
                if((x == sum && y != sum) || (y == sum && x != sum)){
                    var postArray = [x,y].sort(function(a, b){
                        return a - b;
                    });
                    if(me.checkResult(postArray.join(''), checkArray)){
                        checkArray.push(postArray)
                        arr.push([x,y]);
                    }
                }
            }
        }
        return arr;
    }
}
