/**
 * Created by soga on 2017/4/22.
 */
import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert
} from 'react-native';

import Games from './Games'
import Button from './../Button'

export default class GameDanshi extends Games {

    constructor(props) {
        super(props);

        this.state.text = '';
        this.state.checkFont = /[\u4E00-\u9FA5]|[/\n]|[/W]/g;
        //过滤方法
        this.state.filtration = /[^\d]/g;
        this.state.ballData = {
            sameData : [], //重复号
            errorData : [], //错误号
            tData : [],
        };

        this.state.normalTips = '';

        this.iterator = this.iterator.bind(this);
        this.filterLotters = this.filterLotters.bind(this);
        this.checkSingleNum = this.checkSingleNum.bind(this);
        this.removeOrderError = this.removeOrderError.bind(this);
        this.checkBallIsComplete = this.checkBallIsComplete.bind(this);
    }

    addBallsToBasket() {
        const me = this;
        const {ballData} = this.state;

        const sameTip = ballData.sameData.length > 0 ? `重复号: ${me.formatViewBalls(ballData.sameData)}` : '';
        const errorTip = ballData.errorData.length > 0 ? `错误号: ${me.formatViewBalls(ballData.errorData)}` : '';

        if(sameTip || errorTip) {
            Alert.alert(
                '',
                `${errorTip} ${sameTip}, 是否确定清理后加入购彩篮?`,
                [
                    {text: '取消'},
                    {text: '确定', onPress: () => me.beforeAddBallsToBasket()}
                ]
            )
        }
        else {
            me.beforeAddBallsToBasket();
        }
    }

    buildUI() {
        const me = this;
        const {text, ballData} = this.state;

        const sameTip = ballData.sameData.length > 0 ? `重复号: ${me.formatViewBalls(ballData.sameData)}` : '';
        const errorTip = ballData.errorData.length > 0 ? `错误号: ${me.formatViewBalls(ballData.errorData)}` : '';

        return <View style={styles.uiBox}>
            <Text style={styles.uiBoxTitleText}>请在下方的输入框内输入或粘贴投注内容</Text>
            <TextInput
                style={styles.textarea}
                multiline={true}
                numberOfLines={10}
                onChangeText={text => {
                    this.setState({ text: text})
                    const lotterys = me.checkBallIsComplete(text);
                    this.setState({lotterys: lotterys});
                }}
                placeholder={this.state.normalTips}
                keyboardType='numeric'
                //onBlur={ text => me.checkBallIsComplete(text)}
                value={text} />
            <View style={styles.btnGrounp}>
                <Button
                    btnName="清理错误与重复"
                    onPress={()=>{
                        if(sameTip || errorTip) {
                            Alert.alert(
                                '',
                                `${errorTip} ${sameTip}, 是否确定清理?`,
                                [
                                    {text: '取消'},
                                    {text: '确定', onPress: () => me.removeOrderError()}
                                ]
                            )
                        }
                    }}
                    leftIcon="check"
                    />

                <Button
                    btnName="清空文本框"
                    onPress={()=>Alert.alert(
                        '',
                        `是否确定要清空文本框?`,
                        [
                            {text: '取消'},
                            {text: '确定', onPress: () => me.clearAllBall()}
                        ]
                    )}
                    leftIcon="trash-o"
                    />
            </View>
        </View>
    }

    //用拆分符号拆分成单注
    iterator(data) {
        const me= this;
        let result = [];

        data = data.replace(me.state.filtration, ' ');
        data = data.replace(/\s+/g, ' ');
        data = data.trim();
        result = data.split(' ');

        return result;
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
    //正则过滤输入框HTML
    //提取正确的投注号码
    filterLotters(data){
        const me = this;
        let result = '';

        result = data.replace(/<br>+|&nbsp;+/gi, ' ');
        result = result.replace(/[\s]|[,]+|[;]+|[，]+|[；]+/gi, ' ');
        result = result.replace(/<(?:"[^"]*"|'[^']*'|[^>'"]*)+>/g, ' ');
        result = result.replace(me.state.checkFont,'') +  ' ';

        return result;
    }

    //检测单注号码是否通过
    checkSingleNum(lotteryNum){
        const me = this;

        return lotteryNum.length == me.state.balls.length;
        /**
         return me.defConfig.checkNum.test(lotteryNum) && lotteryNum.length == me.balls.length;
         **/
    }
    //检测选球是否完整，是否能形成有效的投注
    //并设置 isBallsComplete
    checkBallIsComplete(data){
        const me = this;
        let len,
            i = 0,
            balls,
            ballData = {},
            has = {},
            result = [];

        ballData.sameData = [];
        ballData.errorData = [];
        ballData.tData = [];
        //按规则进行拆分结果
        result = me.iterator(data);
        len = result.length;

        for(i = 0; i < len; i++){
            balls = result[i].split('');
            //检测基本长度
            if(me.checkSingleNum(balls)){
                if(has[balls]){
                    //重复
                    ballData.sameData.push(balls);
                }else{
                    ballData.tData.push(balls);
                    has[balls] = true;
                }
            }else{
                ballData.errorData.push(balls);
            }
        }

        this.setState({ballData: ballData});
        //校验
        if(ballData.tData.length > 0){
            this.setState({isBallsComplete: true});
            return ballData.tData;
        }else{
            this.setState({isBallsComplete: false});
            return [];
        }
    }
    //返回正确的索引
    countInstances(mainStr, subStr){
        let count = [],
            offset = 0;
        do{
            offset = mainStr.indexOf(subStr, offset);
            if(offset != -1){
                count.push(offset);
                offset += subStr.length;
            }
        }while(offset != -1)
        return count;
    }
    //三项操作提示
    //显示正确项
    //排除错误项
    removeOrderError(){
        const me  = this;
        const {ballData} = this.state;
        const tData = ballData.tData;
        let str = [],len = tData.length;
        for(let i = 0; i < len; i++){
            str[i] = tData[i].join('');
        }
        str = str.join(' ').trim();
        if(str == ''){

            Alert.alert(
                '',
                '没有符合条件的注单',
                [
                    {text: '知道了'},
                ]
            )
        }

        this.setState({
            text: str,
            ballData: {
                sameData : [], //重复号
                errorData : [], //错误号
                tData : tData,
            }
        });
    }

    //清空选区
    clearAllBall(){

        this.setState({
            text: '',
            ballData: {
                sameData : [], //重复号
                errorData : [], //错误号
                tData : [],
            }
        });
        //清空选号状态
        //Games.getCurrentGameStatistics().reSet();
        //me.showNormalTips();
    }

    getOriginal() {
        return this.state.ballData.tData;
    }

    makePostParameter(original) {
        let me = this,
            result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result[i] = original[i].join('');
        }
        return result.join('|');
    }

    formatViewBalls(original) {
        return this.makePostParameter(original)
    }
}


const styles = StyleSheet.create({
    uiBox: {
        padding: 10,
        backgroundColor: '#fff'
    },

    uiBoxTitleText: {
        margin: 10,
        textAlign: 'center',
        color: G_Theme.fontGray
    },

    textarea: {
        height: 200,
        borderWidth:1,
        flex:1,
        borderRadius:2,
        padding: 8,
        fontSize: 14,
        borderColor: G_Theme.second
    },

    btnGrounp: {
        flexDirection : 'row',
        marginTop: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    }
});