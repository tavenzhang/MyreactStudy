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
            '1、支持常见的各种单式格式，间隔符如： 换行符 回车 逗号 分号等',
            '2、上传文件后缀必须是.txt格式,最大支持10万注，并支持拖拽文件到文本框进行上传',
            '3、文件较大时会导致上传时间较长，请耐心等待！',
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
    //
    ////设置rowtitle
    //setRowTitle = () => ['万位','千位','百位','十位','个位'];
    //
    ////设置BallText
    //setBallText = () => [0,1,2,3,4,5,6,7,8,9];


}
