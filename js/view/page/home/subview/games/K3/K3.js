/**
 * Created by soga on 2017/5/10.
 */

import Games from "../../../../../componet/game/Games";

export default class K3 extends Games {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 3; //一行几个球
        this.ballFirstStart = 1;
    }

    //设置BallText
    setBallText = () => [0,1,2,3,4,5,6];

    setBallData(x, y, value) {
        const me = this;
        const {balls} = this.state;
        const data = balls;
        if(x == 0){
            return;
        }
        if (y >= 0 && y < data.length && x > 0) {
            data[y][x] = value;
            this.setState({balls: data});
        }
    }

    makePostParameter(original){
        let me = this,
            i = 0,
            len = original.length,
            result = [];

        for(;i < len;i++){
            result.push(original[i].join('|'));
        }
        return result.join('');
    }

    formatViewBalls(original) {
        return this.makePostParameter(original);
    }

    //formatViewBallsSpecial(original) {
    //    let me = this,
    //        result = [],
    //        len = original.length,
    //        i = 0;
    //
    //    for (; i < len; i++) {
    //        for(let j=0; j<original[i].length; j++) {
    //            result.push(me.state.ballText[original[i][j]]);
    //        }
    //    }
    //
    //    result = result.join('|');
    //    return result;
    //
    //}

    //buildBallOperates() {
    //    //return null;
    //}

}
