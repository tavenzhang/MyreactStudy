import React,{PropTypes} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import Swiper from 'react-native-swiper';
import {ImgHome} from "../../assets/index";


export default class TSwiper extends React.Component {

    static propTypes={
        dataList:PropTypes.array,
        isResouce:PropTypes.bool,
        onPress:PropTypes.func,
        height:PropTypes.number,
        styleDot:PropTypes.object,
        styleActiveDot:PropTypes.object,
    }

    static defaultProps={
        height:200,
    }
    render() {
        const {dataList,isResouce,onPress,height,styleDot,styleActiveDot}= this.props
        return (
            <Swiper
                height={height}
                loop={true}
                autoplay={true}
                dot={<View style={[styles.customDot,styleDot]} />}
                activeDot={<View style={[styles.customActiveDot,styleActiveDot]} />}
                showsPagination={true}
                paginationStyle={{bottom: 5}}
            >
                { dataList ? dataList.map((banner,i) => {
                    return (
                    <View key={i} >
                            <Image
                                style={styles.bannerImage}
                                source={isResouce ? banner.url :{uri: banner.url}}
                                key={i}
                            />
                            <View style={{position:"absolute",flex:1,zIndex:5, justifyContent:'center', alignItems:"center"}}>
                                <TouchableOpacity  onPress={()=>{
                                    TLog("TouchableOpacity-----",banner);
                                    console.log("onPress-----",onPress)
                                    onPress(banner);
                                }}>
                                <Image
                                    resizeMode={"center"}
                                    style={styles.bannerImage}
                                    source={ImgHome.player}
                                />
                                </TouchableOpacity>
                            </View>
                    </View>

                    )
                }) : null}
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    swiper:{
        backgroundColor: '#77cc32',
    },
    bannerImage: {
        height:G_Theme.bannerHeight,
        width: G_Theme.windowWidth,
    },

    customDot: {
        backgroundColor: '#ccc',
        height: 6,
        width: 6,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        borderRadius: 3,
    },

    customActiveDot: {
        backgroundColor: 'yellow',
        height: 6,
        width: 6,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        borderRadius: 3,
    },
})