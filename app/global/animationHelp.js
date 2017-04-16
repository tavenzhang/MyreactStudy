/**
 * Created by zhangxinhua on 2017/1/22.
 */
import {
    LayoutAnimation,
} from 'react-native';


export const LayoutAnimationHelp={
     defaultSpring:LayoutAnimation.Presets.spring,
     springNoDelete : {
        duration: 400,
        create: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.opacity,
            springDamping: 0.8,
        },
        update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 0.6,
        },
        // delete:{
        //     type: LayoutAnimation.Types.linear,
        //     property: LayoutAnimation.Properties.opacity
        // }
    },
}

global.LayoutAnimationHelp=LayoutAnimationHelp;