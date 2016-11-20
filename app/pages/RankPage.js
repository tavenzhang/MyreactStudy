'use strict';

import React, { Component } from 'react';
import {
    View,
    InteractionManager
} from 'react-native';
//import { categoryListWithProduct } from '../actions/productActions';
//import Loading from '../components/Loading';
//import ProductContainer from '../containers/ProductContainer';
//import Common from '../common/constants';

import { RankExpContainer, RankRichContainer } from '../containers';

import { Header, RankPanel } from '../components';
//actions
import { appAct, appAN, fetchData } from '../actions';

//config
import { REQURL, CONFIG, STYLE } from '../config';

//页面变量
//let isLoading = true;
//let curCategoryIndex = 0;

export default class CategoryPage extends Component {
    constructor(props) {
        super(props);

        //let dsCategory = new ListView.DataSource({
        //    getRowData: (data, sectionId, rowId) => {
        //        return data[sectionId][rowId];
        //    },
        //    getSectionHeaderData: (data, sectionId) => {
        //        return data[sectionId];
        //    },
        //    rowHasChanged: (row1, row2) => row1 !== row2,
        //    sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        //});
        //
        //let dsProduct = new ListView.DataSource({
        //    getRowData: (data, sectionId, rowId) => {
        //        return data[sectionId][rowId];
        //    },
        //    getSectionHeaderData: (data, sectionId) => {
        //        return data[sectionId];
        //    },
        //    rowHasChanged: (row1, row2) => row1 !== row2,
        //    sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        //});
        //
        //this.state = {
        //    dsCategory: dsCategory,
        //    dsProduct: dsProduct
        //}
    }

    componentWillMount() {

    }


    componentDidMount() {
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            //获取排行榜数据
            dispatch(fetchData({
                url : REQURL.getVData.url,
                requestType : REQURL.getVData.type,
                successAction: appAN.UPDATE_RANK_LISTS
            }));
        });
    }

    goDetailPage(type) {
        if(type == 'exp') {
            InteractionManager.runAfterInteractions(()=>{
                this.props.navigator.push({
                    name: 'RankExpContainer',
                    component: RankExpContainer,
                    passProps: {
                        type: 'normal'
                    }
                })
            })
        }
        else {
            InteractionManager.runAfterInteractions(()=>{
                this.props.navigator.push({
                    name: 'RankRichContainer',
                    component: RankRichContainer,
                    passProps: {
                        type: 'normal'
                    }
                })
            })
        }
    }

    render() {
        const { richLists, expLists } = this.props;

        return (
            <View style={{flex: 1}}>
                <Header
                    title='排行'
                    />
                <RankPanel
                    iconSrc={require('../images/rank_exp.jpg')}
                    data={expLists}
                    type="exp"
                    onPress={()=>this.goDetailPage("exp")}
                    />
                <RankPanel
                    iconSrc={require('../images/rank_rich.jpg')}
                    data={richLists}
                    type="rich"
                    onPress={()=>this.goDetailPage("rich")}
                    />
            </View>
        )
    }

    //=== 分类栏方法 ===

    //_renderRowCategory(category, sectionId, rowId) {
    //    let categoryItemStyle = [styles.categoryItem];
    //    if (curCategoryIndex == rowId) {
    //        categoryItemStyle.push(styles.categoryItemActive);
    //    }
    //    return (
    //        <TouchableOpacity
    //            onPress={this._onPressCategory.bind(this, rowId)}
    //        >
    //            <View style={categoryItemStyle}>
    //                <Text>{category.name}</Text>
    //            </View>
    //        </TouchableOpacity>
    //    );
    //}
    //
    //_onPressCategory(rowId) {
    //    curCategoryIndex = rowId;
    //    this.forceUpdate();
    //}

    //=== 产品栏方法 ===

    //_renderRowProduct(product, sectionId, rowId) {
    //    return (
    //        <TouchableOpacity onPress={this._onPressProduct.bind(this, product.id)}>
    //            <View style={styles.productItem}>
    //                <Image
    //                    style={styles.productImage}
    //                    source={{uri: product.image_small}}
    //                />
    //                <View style={styles.productRight}>
    //                    <Text>{product.name}</Text>
    //                    <View style={{flexDirection:'row'}}>
    //                        <Text>￥{product.price}</Text>
    //                        <Text>￥{product.featured_price}</Text>
    //                    </View>
    //                    <Text>立减 ￥{product.price - product.featured_price}</Text>
    //                </View>
    //            </View>
    //        </TouchableOpacity>
    //    );
    //}
    //
    //_onPressProduct(product_id) {
    //    // Alert.alert(product_id);
    //    InteractionManager.runAfterInteractions(() => {
    //        this.props.navigator.push({
    //            name: 'ProductContainer',
    //            component: ProductContainer,
    //            passProps: {...this.props, product_id:product_id}
    //        })
    //    });
    //}
}

