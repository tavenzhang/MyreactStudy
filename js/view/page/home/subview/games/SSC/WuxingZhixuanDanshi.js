/**
 * Created by soga on 2017/4/21.
 */


import SSCDanshi from "./SSCDanshi";

export default class WuxingZhixuanDanshi extends SSCDanshi {

    constructor(props) {
        super(props);

        //名称
        this.state.name = 'wuxing.zhixuan.danshi';
        //玩法提示
        this.state.tips = '五星直选单式玩法说明';
        this.state.normalTips = ['说明：',
            '支持常见的各种单式格式，间隔符如： 换行符 回车 逗号 分号等',
            '',
            '格式范例：12345 23456 88767 33021 98897 '
        ].join('\n')
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    ];


}
