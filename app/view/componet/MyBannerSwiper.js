import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class MyBannerSwiper extends React.Component {

    render() {
        const {dataList}= this.props
        return (
            <Swiper
                height={100}
                loop={true}
                autoplay={true}
                dot={<View style={styles.customDot} />}
                activeDot={<View style={styles.customActiveDot} />}
                showsPagination={false}
                paginationStyle={{
                        bottom: 10
                    }}
            >
                { dataList ? dataList.map((banner,i) => {
                    return (
                        <TouchableOpacity key={i} activeOpacity={0.75} onPress={()=>{
                            this.bannerClick(banner);
                        }}>
                            <Image
                                style={styles.bannerImage}
                                source={{uri: banner.url}}
                                key={i}
                            />
                        </TouchableOpacity>
                    )
                }) : null}
            </Swiper>
        )
    }

    bannerClick=(data)=> {
        NavUtil.pushToView(NavViews.ADView(data));
    }
}

const styles = StyleSheet.create({
    swiper:{
        backgroundColor: '#77cc32',
    },
    bannerImage: {
        height: 100,
        width: GlobelTheme.screenWidth,
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