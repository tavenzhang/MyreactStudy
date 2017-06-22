/**
 * Created by soga on 2017/4/24.
 */
import SSC from "./SSC";

export default class ErxingZuxuanHouerFushi extends SSC {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['组选'];
    //随机选一注
    selectAutoOne() {
        const me = this;
        let len = 0;
        me.setRandomArr();
        for(let j=0;j<2;j++){
            let i=me.getRandomNum();
            me.selectBall(i, 0, 1);
        }
    }
    getLottery(isGetNum){
        let me = this,
            data = me.state.balls[0],
            i = 0,
            len = data.length,
            j = 0,
            len2,

            isEmptySelect = true,
            numArr = [],
            result = [],

            times = 0;



        for(i = 0;i < len;i++){
            if(data[i] > 0){
                times++;
                numArr.push(i);
            }
        }
        if(times > 1){
            isEmptySelect = false;
        }
        if(isEmptySelect){
            this.setState({isBallsComplete: false});
            return [];
        }
        this.setState({isBallsComplete: true});

        result = me.combine(numArr, 2);

        return result;

    }
}