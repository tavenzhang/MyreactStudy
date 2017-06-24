/**
 * Created by soga on 2017/5/6.
 */
import L115 from "./L115";

export default class SanmaZhixuanFushi extends L115 {

    constructor(props) {
        super(props);
    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //设置rowtitle
    setRowTitle = () => ['前三'];

}