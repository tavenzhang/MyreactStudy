/**
 * Created by soga on 2017/4/25.
 */

import D3 from "./D3";

export default class ErxingZhixuanHouerFushi extends D3 {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['十位','个位'];

}