/**
 * Created by soga on 2017/4/18.
 */
class GameMethod {
    constructor(cfg) {
        this.balls = []
    }

    setBalls(data) {
        this.balls = data;
    }

    getOriginal() {
        const me = this;
        let balls = me.balls,
            len = balls.length,
            len2 = 0,
            i = 0,
            j = 0,
            row = [],
            result = [];
        for (; i < len; i++) {
            row = [];
            len2 = balls[i].length;
            for (j = 0; j < len2; j++) {
                if (balls[i][j] > 0) {
                    row.push(j);
                }
            }
            result.push(row);
        }
        return result;
    }

    formatViewBalls(original) {
        var me = this,
            result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result = result.concat(original[i].join(''));
        }
        return result.join('|');
    }

    getResultData(lotterys){
        const me = this;
        let onePrice = 2,
            multiple = 1,
            prize_group = 1950,
            lotterysOriginal = me.getOriginal(),
            method = 184;
        if(lotterys.length < 1){
            return {};
        }
        return {
            mid:'gameid',
            type:'wuxing.zhixuan.fushi',
            original:lotterysOriginal,
            lotterys:lotterys,
            formatViewBalls:me.formatViewBalls(lotterysOriginal),
            moneyUnit:'yuan',
            num:lotterys.length,
            multiple:multiple,
            //单价
            //onePrice:me.onePrice,
            //单价修改为从动态配置中获取，因为每个玩法有可能单注价格不一样
            onePrice:onePrice,
            prize_group:prize_group,
            //总金额
            amount:lotterys.length * onePrice * multiple,
        };
    }

    //生成单注随机数
    createRandomNum() {
        var me = this,
            current = [],
            len = me.getBallData().length,
            rowLen = me.getBallData()[0].length;
        //随机数
        for (var k = 0; k < len; k++) {
            current[k] = [Math.floor(Math.random() * rowLen)];
            current[k].sort(function (a, b) {
                return a > b ? 1 : -1;
            });
        }
        ;
        return current;
    }
    //限制随机投注重复
    checkRandomBets(hash, times) {
        var me = this,
            allowTag = typeof hash == 'undefined' ? true : false,
            hash = hash || {},
            current = [],
            times = times || 0,
            len = me.getBallData().length,
            rowLen = me.getBallData()[0].length,
            order = Games.getCurrentGameOrder().getTotal()['orders'];

        //生成单数随机数
        current = me.createRandomNum();
        //如果大于限制数量
        //则直接输出
        if (Number(times) > Number(me.getRandomBetsNum())) {
            return current;
        }
        //建立索引
        if (allowTag) {
            for (var i = 0; i < order.length; i++) {
                if (order[i]['type'] == me.defConfig.name) {
                    var name = order[i]['original'].join('');
                    hash[name] = name;
                }
            }
            ;
        }
        //对比结果
        if (hash[current.join('')]) {
            times++;
            return arguments.callee.call(me, hash, times);
        }
        return current;
    }
    //生成一个当前玩法的随机投注号码
    //该处实现复式，子类中实现其他个性化玩法
    //返回值： 按照当前玩法生成一注标准的随机投注单(order)
    randomNum() {
        const me = this;
        let i = 0,
            current = [],
            currentNum,
            ranNum,
            order = null,
            dataNum = me.balls,
            name = '',
            name_en = '',
            lotterys = [],
            original = [];

        current = me.checkRandomBets();
        original = current;
        lotterys = me.combination(original);

        order = {
            'type': name_en,
            'original': original,
            'lotterys': lotterys,
            'moneyUnit': 1,
            'multiple': 1,
            'onePrice': 2,
            'num': lotterys.length
        };
        order['amountText'] = Games.getCurrentGameStatistics().formatMoney(order['num'] * order['moneyUnit'] * order['multiple'] * order['onePrice']);
        return order;
    }

    combination(arr2) {
        if (arr2.length < 1) {
            return [];
        }
        let w = arr2[0].length,
            h = arr2.length,
            i, j,
            m = [],
            n,
            result = [],
            _row = [];

        m[i = h] = 1;

        while (i--) {
            m[i] = m[i + 1] * arr2[i].length;
        }
        n = m[0];
        for (i = 0; i < n; i++) {
            _row = [];
            for (j = 0; j < h; j++) {
                _row[j] = arr2[j][~~(i % m[j] / m[j + 1])];
            }
            result[i] = _row;
        }
        return result;
    }
}

module.exports = GameMethod;