/**
 * Created by soga on 2017/5/8.
 */

import PK10Danshi from "./PK10Danshi";

export default class QianerZhixuanDanshi extends PK10Danshi {

    constructor(props) {
        super(props);

        this.state.normalTips = ['说明：',
            '支持常见的各种单式格式，间隔符如： 换行符 回车 逗号 分号等, 号码之间则使用空格隔开',
            '',
            '格式范例：01 02|03 04|07 08'
        ].join('\n')

    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ];

    //检测单注号码是否通过
    checkSingleNum(lotteryNum) {
        const me = this;
        return me.checkData(lotteryNum,2)
    }

}
